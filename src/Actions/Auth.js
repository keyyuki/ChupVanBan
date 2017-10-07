import {AUTH_LOGOUT, AUTH_SETGOOGLEAUTH, AUTH_SETPROFILE} from './Types';
import { Alert } from 'react-native';
import {Google} from 'expo';

const requestSigninToGoogle = async() => {
    try {
        const result = await Google.logInAsync({
            androidClientId: '126636368431-g07u48bd09lfnhd2ih6ad29klo23d2jo.apps.googleusercontent.com',
            //iosClientId: YOUR_CLIENT_ID_HERE,
            scopes: [
                'profile', 'email', 
                'https://www.googleapis.com/auth/cloud-platform', 
                'https://www.googleapis.com/auth/cloud-vision'
            ],
        });

        if (result.type === 'success') {
            return result.accessToken;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

const signinByGoogle = () => {
    return (dispath, getState) => {
        requestSigninToGoogle().then(rs => {
            if(rs){
                return dispath({
                    type: AUTH_SETGOOGLEAUTH,
                    google: rs
                });
            } else {
                dispath({
                    type: AUTH_LOGOUT
                });
                Alert.alert('Error', 'Something wrong!');
            }
        })
    }
}

const logout = () => {
    return (dispath, getState) => {
        dispath({
            type: AUTH_LOGOUT
        });
    }
}

export default {
    signinByGoogle,
    logout
}