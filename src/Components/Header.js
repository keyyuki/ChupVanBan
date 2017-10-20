import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'expo';

export default class Header extends React.Component{
    static propTypes = {
        left: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
        title: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
        right: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
        onPressLeft: React.PropTypes.func,
        onPressRight: React.PropTypes.func
    }

    render(){
        return (
            <View style={{
                height: 56,
                flexDirection: 'row',
                alignItems: 'stretch',
                backgroundColor: '#f5f5f5',
                borderBottomColor: '#E0E0E0',
                borderBottomWidth: 1,
                elevation: 4
            }}>
                { this.renderLeft() }
                { this.renderTitle()}
                { this.renderRight()}
            </View>
        )
    }

    renderLeft(){
        if(!this.props.left){
            return <View style={{width: 72}}/>;
        }
        if(typeof this.props.left == 'string'){
            return (
                <TouchableOpacity style={{width: 72, paddingLeft: 16, justifyContent: 'center'}} onPress={this.props.onPressLeft}>
                    <Icon.MaterialCommunityIcons name={this.props.left} size={26}/>
                </TouchableOpacity>
            )
        } else {
            return this.props.left;
        }

    }

    renderTitle(){
        if(typeof this.props.title == 'string'){
            return (
                <View style={{justifyContent: 'center', flex: 1}}>
                    <Text style={{color: '#000', fontSize: 20}}>{this.props.title}</Text>
                </View>
            )
        } else {
            return this.props.title;
        }
    }

    renderRight(){
        if(!this.props.right){
            return null ;
        }
        if(typeof this.props.left == 'string'){
            return (
                <TouchableOpacity style={{ paddingHorizontal: 16, justifyContent: 'center'}} onPress={this.props.onPressRight}>
                    <Icon.MaterialCommunityIcons name={this.props.right}/>
                </TouchableOpacity>
            )
        } else {
            return this.props.right;
        }

    }
}