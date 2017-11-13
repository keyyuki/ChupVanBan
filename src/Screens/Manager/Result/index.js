import React, {Component} from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../../Components/Header';
import { Icon, LinearGradient, ImagePicker, ImageCropper } from 'expo';
import TestKey from '../../../../testKey.json';
import firebase from 'firebase';

class MyScreen extends Component{
    static navigationOptions = {
        title: 'Result',        
    };

    constructor(props){
        super(props);

        this.uri = this.props.navigation.state.params.uri;
        
        this.state = {
            status: 'loading',
            errorMsg: ''
        };
        console.log(this.props.imageInfo)
        console.log('====================================');
        console.log('size', this.props.imageInfo.base64.length);
        console.log('====================================');
    }

    componentDidMount() {
        this.detectText();
    }

    detectText = async() => {
        var fileSize = getBase64FileSize(this.props.imageInfo.base64);
        if(fileSize >= 4* 1000 * 1000){
            this.setState({
                status: 'error',
                errorMsg: ['Dung lượng ảnh quá lớn, tối đa là 4Mb. Vui lòng tùy chỉnh lại camera hoặc chọn ảnh khác.']
            });
            return;
        }
        try {
            var params = {
                imageBase64: this.props.imageInfo.base64
            }
            var idToken = await firebase.auth().currentUser.getIdToken(true);

            var response = await fetch('https://us-central1-anhhunglau-7b113.cloudfunctions.net/app/m/textrecognition' ,
            {
                method: 'POST',
                headers: {
                    
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + idToken
                },
                body: JSON.stringify(params)
            });
            rs = await response.json();
            console.log('==============RS=================');
            console.log(rs);
            console.log('====================================');
            if(rs.code){
                this.setState({
                    status: 'complete',
                    result: rs.data
                })
            } else {
                this.setState({
                    status: 'error',
                    errorMsg: rs.messages
                })
            }
            
        } catch (error) {
            console.log('==============Error==================');
            console.log(error);
            console.log('====================================');
            this.setState({
                    status: 'error',
                    errorMsg: ['Hệ thống xảy ra lỗi']
                })
        }
    }
    renderBody(){
        if(this.state.status == 'loading'){
            return (
                <View style={{flex: 1}}>
                    
                        
                    <View style={{flex: 1, padding: 16}}>
                    <Image source={{uri: 'data:image/jpeg;base64,' + this.props.imageInfo.base64}}  style={{
                        flex: 1,
                        alignContent: 'flex-start',
                        resizeMode: 'contain'
                    }}/>
                    </View>
                    <View style={{marginTop: 8, flexDirection: 'row', justifyContent: 'center'}}>
                        <ActivityIndicator size="small"/>
                        <Text style={{marginLeft: 8}}>Đang phân tích...</Text>
                    </View>
                </View>
            )
        }
        if(this.state.status == 'error'){
             return (
                <View style={{flex: 1}}>                  
                        
                   
                    <View style={{justifyContent: 'center', alignItems: 'center', padding: 16}}>
                        <Text style={{color: 'red'}}>{this.state.errorMsg}</Text>
                    </View>
                </View>
            )
        }
        if(this.state.status == 'complete'){
            return (
                <View style={{flex: 1}}>                  
                        
                   
                    <View style={{justifyContent: 'center', alignItems: 'center', padding: 16}}>
                        <Text>{this.state.result}</Text>
                    </View>
                </View>
            )
        }
    }
    
    render(){
        
        return (
            <View style={{flex: 1, backgroundColor: '#FAFAFA',}}>
                <Header 
                    left="arrow-left"
                    onLeftPress={() => {this.props.navigation.goBack()}}
                    title="Kết quả"
                />
                { this.renderBody() }
            </View>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        imageInfo: state.image.info,
        googleAccessToken: state.auth.google.accessToken,
    }
}
function getBase64FileSize(base64Encodeed) {
    if (!base64Encodeed) {
        return 0;
    }
    return parseInt(base64Encodeed.replace(/=/g, "").length * 0.75);
}

export default connect(mapStateToProps)(MyScreen)