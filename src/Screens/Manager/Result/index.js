import React, {Component} from 'react';
import { View, Text, Image, ActivityIndicator, TextInput, Dimensions, ScrollView, Clipboard, Keyboard, Alert } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../../Components/Header';
import { Icon, LinearGradient, ImagePicker, ImageCropper } from 'expo';

import firebase from 'firebase';
import Layout from './Layout';
import Toast from 'react-native-smart-toast';
import Api from './Api';
import { goBack } from '../../../Actions/Nav'

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
            showmenu: true,
            translate: {
                from: '',
                to: '',
                status: 'none'
            },
            resultDisplay: 'result'
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

    translate = async() => {
        if(!this.state.result){
            return null;
        }
        
        if( this.state.translate.status != 'none' ){
            return null;
        }

        if(this.state.result == this.state.translate.from ){
            if(this.state.translate.to){
                this.setState({
                    resultDisplay: this.state.resultDisplay == 'result' ? 'translate' : 'result'
                });
                console.log('aaa')
            }
            return null;
        }
        this.setState({
            translate: {
                from : this.state.result,
                to: '',
                status: 'loading'
            },
        });
        var rs = await Api.translate(this.state.result);
        if(rs.code){
            this.setState({
                translate: {
                    from : this.state.translate.from,
                    to: rs.data,
                    status: 'none'
                },
                resultDisplay: 'translate'
            });
        } else {
            this.setState({
                translate: {
                    from : '',
                    to: '',
                    status: 'none'
                },
                resultDisplay: 'result'
            });
            Alert.alert('Lỗi', rs.messages.join("\n"));
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
        if(this.state.resultDisplay == 'result'){
            var newResult = this.state.result.replace(/\n/g, " ");
       
            this.setState({
                result: newResult
            })
        } else {
            var newResult = this.state.translate.to.replace(/\n/g, " ");
       
            this.setState({
                translate: {
                    ...this.state.translate,
                    to: newResult
                }
            })
        }
        
    }
    copyToClipboard = () => {
        Clipboard.setString(this.state.resultDisplay == 'result' ? this.state.result : this.state.translate.to);
        this._toast.show({
            position: Toast.constants.gravity.top,
            children: <View><Text style={{color: 'white'}}>Đã sao chép văn bản.</Text></View>
        })
    }
    onChangeText = (text) => {
        if(this.state.resultDisplay == 'result'){
            this.setState({
                result: text
            })
        } else {
            this.setState({
                translate: {
                    ...this.state.translate,
                    to: text
                }
            })
        }
        
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
            translate={this.translate}        


            />
        }
    }

    render(){

        return (
            <View style={{flex: 1, backgroundColor: '#FAFAFA',}}>
                <Header
                    left="arrow-left"
                    onPressLeft={this.props.goBack}
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
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        goBack: () => {
            dispatch(goBack())
        }
    }
}

function getBase64FileSize(base64Encodeed) {
    if (!base64Encodeed) {
        return 0;
    }
    return parseInt(base64Encodeed.replace(/=/g, "").length * 0.75);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyScreen)