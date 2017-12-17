import React, { Component } from 'react';
import {View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Google } from 'expo';
import firebase from 'firebase';
import { logout, setProfile } from '../../../Actions/Auth';
import { navigate } from '../../../Actions/Nav';



class LoadScreen extends Component{
    static navigationOptions = {
        title: 'main',        
    };
    componentDidMount(){
        this.loadUserInfo();
    }

    loadUserInfo = async() => {
        try {
            var userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${this.props.googleAccessToken}`},
              });
            var result = await userInfoResponse.json();

            if(result && result.id){                
                // signin Firebase
                var credential = firebase.auth.GoogleAuthProvider.credential(this.props.googleIdToken);
                firebase.auth().signInWithCredential(credential).then(res => {
                    
                    console.log('res', res);

                    console.log('firebase', firebase.auth().currentUser);
                    firebase.auth().currentUser.getIdToken(true).then(token => {console.log('token', token)});
                });
                

                this.props.setProfile(result);
                this.props.navigate('MainScreen');
                return;
            }
            return this.props.logout();
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
            this.props.logout();
        }
    }

    render(){
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{flex: 1}}>
                </View>
                <View style={{flex: 1}}>
                    {
                        this.props.user ?
                        <Text>{this.props.user.name}</Text> :
                        <ActivityIndicator size="large"/>
                    }

                </View>
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        googleAccessToken: state.auth.google.accessToken,
        googleIdToken: state.auth.google.idToken,
        user: state.auth.profile
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setProfile: (profile) => {
            dispatch(setProfile(profile));
        },
        logout: () => {
            dispatch(logout());
        },
        navigate: (page) => {
            dispatch(navigate(page))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadScreen);
