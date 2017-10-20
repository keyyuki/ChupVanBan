import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, ImagePicker } from 'expo';

export default class PickImage extends Component{
    static navigationOptions = {
        title: 'main',        
    };
    render(){
        return (
            <View style={{flex: 1, backgroundColor: '#000', position: 'relative'}}>
                <TouchableOpacity style={{
                    padding: 16
                }}>
                    <Icon.MaterialCommunityIcons name="arrow-left" color="white" size={26}/>
                </TouchableOpacity>
                
            </View>
        )
    }
}