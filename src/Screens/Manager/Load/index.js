import React, { Component } from 'react';
import {View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Google } from 'expo';
import { logout, setProfile } from '../../../Actions/Auth';

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
                return this.props.setProfile(result);
            }
            return this.props.logout();
        } catch (error) {
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadScreen);
