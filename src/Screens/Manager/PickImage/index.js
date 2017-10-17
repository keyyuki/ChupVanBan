import React, {Component} from 'react';
import { View, Text } from 'react-native';

export default class PickImage extends Component{
    static navigationOptions = {
        title: 'main',        
    };
    render(){
        return (
            <View style={{flex: 1}}>
                <Text>Welcome Pickimage</Text>
            </View>
        )
    }
}