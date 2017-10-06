import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Icon, Google} from 'expo';

class Login extends React.Component{
    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: '126636368431-g07u48bd09lfnhd2ih6ad29klo23d2jo.apps.googleusercontent.com',
                //iosClientId: YOUR_CLIENT_ID_HERE,
                scopes: ['profile', 'email'],
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

    render(){
        return (
            <View style={styles.main}>
                <TouchableOpacity style={styles.LoginButton}> 
                    <Icon.MaterialCommunityIcons name="google" size={28} color="white"/>
                    <Text style={styles.LoginButtonText}>Login with Google</Text>
                </TouchableOpacity>
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
})
export default Login;