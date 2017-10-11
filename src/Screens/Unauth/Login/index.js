import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
import {Icon, Google} from 'expo';
import { logout, setAuthInfo } from '../../../Actions/Auth';

class Login extends React.Component{
    state = {
        isSigning : false
    }
    requestSigninToGoogle = async() => {
        try {
            var result = await Google.logInAsync({
                androidClientId: '126636368431-g07u48bd09lfnhd2ih6ad29klo23d2jo.apps.googleusercontent.com',
                //iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: [
                    'profile', 'email',
                    'https://www.googleapis.com/auth/cloud-platform',
                    'https://www.googleapis.com/auth/cloud-vision'
                ],
            });

            if (result && result.type === 'success') {
                return result;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    }
    sigin = () => {
        this.setState({
            isSigning: true
        })
        this.requestSigninToGoogle().then(auth => {
            if(auth){
                AsyncStorage.setItem('@GoogleAuthenticate', JSON.stringify(auth));
                this.props.setAuthInfo(auth);
            } else {
                Alert.alert('Lỗi', 'Lỗi chưa rõ');
                this.setState({
                    isSigning: false
                })
            }
        })
    }

    render(){
        return (
            <View style={styles.main}>
                {
                    this.state.isSigning ?
                    <ActivityIndicator size="large" />:
                    (<TouchableOpacity style={styles.LoginButton} onPress={this.sigin}>
                        <Icon.MaterialCommunityIcons name="google" size={28} color="white"/>
                        <Text style={styles.LoginButtonText}>Login with Google</Text>
                    </TouchableOpacity>)
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    LoginButton: {
        height: 56,
        paddingHorizontal: 16,
        borderColor: '#d34836',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#d34836',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 12,
        width: null
    },
    LoginButtonText:{
        fontSize: 20, fontWeight: 'bold', marginLeft: 16, color: 'white'
    }
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAuthInfo: () => {
            dispatch(setAuthInfo());
        }
    };
};
export default connect(null, mapDispatchToProps) (Login);