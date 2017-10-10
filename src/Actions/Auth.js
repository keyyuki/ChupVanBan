import {AUTH_LOGOUT, AUTH_SETGOOGLEAUTH, AUTH_SETPROFILE} from './Types';
import { Alert } from 'react-native';
import {Google} from 'expo';



const setAuthInfo = (auth) => {
    return (dispath, getState) => {
        return dispath({
            type: AUTH_SETGOOGLEAUTH,
            google: auth
        });
    }
}

const logout = () => {
    return (dispath, getState) => {
        dispath({
            type: AUTH_LOGOUT
        });
    }
}

const setProfile = (profile) => {
    return (dispath, getState) => {
        dispath({
            type: AUTH_SETPROFILE,
            profile
        });
    }
}

export default {

    setAuthInfo,
    logout,
    setProfile
}