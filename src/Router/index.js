import React from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Login from '../Screens/Unauth/Login';
import Main from '../Screens/Manager/Main';
import { logout } from '../Actions/Auth'

class Router extends React.Component{
    state = {
        authenticated: 'checking' // checking, authenticated, unauthenticated
    }
    componentDidMount(){
        // kiem tra storeage co accesstoken ko
        
    }

    getStorageAccessToken = async () => {
        try {
            var accesstoken = AsyncStorage.getItem('@GoogleAccessToken');
            if(accesstoken){
                return accesstoken;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    render(){
        return <Login/>
    }
}

const  mapStateToProps = (state, ownProps) => {
    return {
        google: state.auth.google
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch(logout)
        }
    }
}

export default connect()(Router);