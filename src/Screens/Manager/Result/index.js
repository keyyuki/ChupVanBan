import React, {Component} from 'react';
import { View, Text, Image, ActivityIndicator, TextInput, Dimensions, ScrollView, Clipboard, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../../Components/Header';
import { Icon, LinearGradient, ImagePicker, ImageCropper } from 'expo';

import firebase from 'firebase';
import Layout from './Layout';
import Toast from 'react-native-smart-toast'

const screenHeight = Dimensions.get('window').height;
class MyScreen extends Component{
    static navigationOptions = {
        title: 'Result',
    };

    constructor(props){
        super(props);

        this.uri = this.props.navigation.state.params.uri;

        this.state = {
            status: 'loading',
            errorMsg: '',
            inputHeight: screenHeight -56,
            fontSize: 12,
            showmenu: true
        };

    }

    componentDidMount() {
        this.detectText();
        
    }
    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
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

            if(rs.code){
                this.setState({
                    status: 'complete',
                    result: rs.data,
                    origin: rs.data,
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

    getInputSize = (event) => {
        this.setState({
            inputHeight: event.nativeEvent.layout.height
        })
    }

    upFontSize = () => {
        if(this.state.fontSize < 36){
            this.setState({
                fontSize: this.state.fontSize + 1
            })
        }
    }
    downFontSize = () => {
        if(this.state.fontSize > 4){
            this.setState({
                fontSize: this.state.fontSize - 1
            })
        }
    }
    nl2sp = () => {
        var newResult = this.state.result.replace(/\n/g, " ");
        this.setState({
            result: newResult
        })
    }
    copyToClipboard = () => {
        Clipboard.setString(this.state.result);
        this._toast.show({
            position: Toast.constants.gravity.top,
            children: <View><Text style={{color: 'white'}}>Đã sao chép văn bản.</Text></View>
        })
    }
    onChangeText = (text) => {
        this.setState({
            result: text
        })
    }

    _keyboardDidShow = () => {
        this.setState({
            showmenu: false
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            showmenu: true
        })
    }

    renderBody(){
        if(this.state.status == 'loading'){
            return (
                <View style={{flex: 1}}>

                    <View style={{marginVertical: 8, flexDirection: 'row', justifyContent: 'center'}}>
                        <ActivityIndicator size="small"/>
                        <Text style={{marginLeft: 8}}>Đang phân tích...</Text>
                    </View>
                    <View style={{flex: 1, paddingHorizontal: 16}}>
                    <Image source={{uri: 'data:image/jpeg;base64,' + this.props.imageInfo.base64}}  style={{
                        flex: 1,
                        alignContent: 'flex-start',
                        resizeMode: 'contain'
                    }}/>
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

            return <Layout
            data={this.state}
            getInputSize={this.getInputSize}
            upFontSize={this.upFontSize}
            downFontSize={this.downFontSize}
            copyToClipboard={this.copyToClipboard}
            nl2sp={this.nl2sp}
            onChangeText={this.onChangeText}



            />
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
                <Toast
                     ref={ component => this._toast = component }
                    marginTop={64}>
                </Toast>
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