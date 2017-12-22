import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../../Components/Header';
import { Icon, LinearGradient, ImagePicker, ImageCropper, Permissions } from 'expo';
import { setImageInfo } from '../../../Actions/ImageProcess';
import { navigate } from '../../../Actions/Nav';


class Main extends React.Component{
    static navigationOptions = {
        title: 'main',
    };

    componentDidMount(){
        console.log('====================================');
        console.log(this.props.profile);
        console.log(this.props.google);
        console.log('====================================');
    }


    onPressImagePicker = async() => {

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            //quality: 0.5,
            base64: true
        });



        if (!result.cancelled) {
            this.props.setImageInfo(result);
            this.props.navigate('ResultScreen', {uri: result.uri})
        }

    }

    onPressCamera = async() => {

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
            base64: true
        });

        if (!result.cancelled) {
            this.props.setImageInfo(result);
            this.props.navigate('ResultScreen', {uri: result.uri})
        }

    }


    render(){
        return (
        <View style={{
            backgroundColor: '#FAFAFA',
            flex: 1,

        }}>
            <Header
                left="menu"
                onPressLeft={() => {}}
                title="Chụp văn bản"
            />
            <View style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity>
                        <LinearGradient
                        colors={['#FFFFFF', '#F5F5F5']}
                        style={{
                            padding: 16,
                            borderWidth:2,
                            borderColor: '#424242',
                            borderRadius: 5,
                            elevation: 4
                        }}>
                            <Icon.MaterialCommunityIcons name="camera" size={88}/>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={this.onPressImagePicker}>
                        <LinearGradient
                        colors={['#FFFFFF', '#F5F5F5']}
                        style={{
                            padding: 16,
                            borderWidth:2,
                            borderColor: '#424242',
                            borderRadius: 5,
                            elevation: 4
                        }}>
                        <Icon.MaterialCommunityIcons name="folder-multiple-image" size={88}/>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>)
    }
}

const mapStateToProps = (state, owProps) => {
    return {
        profile: state.auth.profile,
        google: state.auth.google
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setImageInfo: (info) => {
            dispatch(setImageInfo(info))
        },
        navigate: (page, params= null) => {
            dispatch(navigate(page, params))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)