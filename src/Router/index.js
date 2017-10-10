import React from 'react';
import { AsyncStorage } from 'react-native';
import {View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Login from '../Screens/Unauth/Login';
import Load from '../Screens/Manager/Load';
import { logout, setAuthInfo } from '../Actions/Auth'

class Router extends React.Component{
    state = {
        authenticated: 'checking' // checking, authenticated, unauthenticated
    }
    componentDidMount(){
        // kiem tra storeage co accesstoken ko
        this.getStorageAccessToken().then(auth => {
            if(auth){
                this.setState({
                    authenticated: 'authenticated'
                });
                this.props.setAuthInfo(auth);
            } else {
                this.setState({
                    authenticated: 'unauthenticated'
                });
                this.props.logout();
            }
        })
    }

    getStorageAccessToken = async () => {
        try {
            var auth = AsyncStorage.getItem('@GoogleAuthenticate');
            if(auth){
                return JSON.parse(auth);
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    render(){
        if(this.state.authenticated == 'checking'){
            return (
                <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <View style={{flex: 1}}>
                    </View>
                    <View style={{flex: 1}}>
                        <ActivityIndicator size="large"/>
                    </View>
                </View>
            )
        }
        if(this.props.google){
            return <Load/>;
        } else {
            return <Login/>;
        }


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
            dispatch(logout())
        },
        setAuthInfo: (auth) => {
            dispatch(setAuthInfo(auth))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);