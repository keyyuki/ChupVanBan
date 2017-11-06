import React, {Component} from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../../Components/Header';
import { Icon, LinearGradient, ImagePicker, ImageCropper } from 'expo';
import TestKey from '../../../../testKey.json';

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
        try {
            var params = {
                "requests":{
                    "image": {
                        "content": 'ok, i test' //this.props.imageInfo.base64
                    },
                    "features": [
                        {
                        "type": "DOCUMENT_TEXT_DETECTION"
                        }
                    ]
                }
            }
            
            var response = await fetch('https://us-central1-anhhunglau-7b113.cloudfunctions.net/helloWorld' ,
            {
                method: 'POST',
                headers: {
                    
                    'Content-Type': 'application/json',
                    //'Certificate': 
                },
                body: JSON.stringify({request: 123})
            });
            rs = await response.json();
            console.log('==============RS=================');
            console.log(rs);
            console.log('====================================');
        } catch (error) {
            console.log('==============Error==================');
            console.log(error);
            console.log('====================================');
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
                <View style={{flex: 1}}>
                    <View style={{marginTop: 8, flexDirection: 'row', justifyContent: 'center'}}>
                        <ActivityIndicator size="small"/>
                        <Text style={{marginLeft: 8}}>Đang phân tích...</Text>
                    </View>
                        
                    <View style={{flex: 1, padding: 16}}>
                    <Image source={{uri: 'data:image/jpeg;base64,' + this.props.imageInfo.base64}}  style={{
                        flex: 1,
                        alignContent: 'flex-start',
                        resizeMode: 'contain'
                    }}/>
                    </View>
                </View>
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


export default connect(mapStateToProps)(MyScreen)