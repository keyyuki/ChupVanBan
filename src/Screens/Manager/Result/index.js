import React, {Component} from 'react';
import { View, Text } from 'react-native';

export default class TakeCamera extends Component{
    static navigationOptions = {
        title: 'main',        
    };
    render(){
        return (
            <View style={{flex: 1}}>
                <Text>Welcome Result</Text>
            </View>
        )
    }
}