import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Icon, LinearGradient, ImagePicker, ImageCropper } from 'expo';

const screenHeight = Dimensions.get('window').height - 56;

export default class Layout extends React.PureComponent{
    _renderInput(){
        return (
            <View style={{flex:1}} onLayout={this.props.getInputSize}>
            <KeyboardAvoidingView keyboardVerticalOffset={16}>
                <TextInput 
                    style={{
                        height: this.props.data.inputHeight,
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    textAlignVertical: 'top',
                    fontSize: this.props.data.fontSize
                    }}
                    multiline={true}
                    value={this.props.data.result}
                    underlineColorAndroid="transparent"
                    onChangeText={this.props.onChangeText}
                />
            </KeyboardAvoidingView>
            </View>
        )
    }

    _renderTextView(){
        return (
            <View style={{flex:1}}>
                <ScrollView>
                    <Text style={{fontSize: this.props.data.fontSize}}>{this.props.data.result}</Text>
                </ScrollView>
            </View>
        )
    }

    _renderControls(){
        if(!this.props.data.showmenu){
            return null;
        }
        return (
            <View style={{
                borderTopColor: '#999',
                borderTopWidth: 1,
                padding: 8
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{flex: 1, padding: 8}}>
                        <TouchableOpacity style={styles.button}>                            
                            <Icon.MaterialCommunityIcons name="keyboard" size={24}/>                            
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, padding: 8}}>
                        <TouchableOpacity style={styles.button} onPress={this.props.nl2sp}>                            
                            <Icon.MaterialCommunityIcons name="keyboard-return" size={24}/>                            
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, padding: 8}}>
                        <TouchableOpacity style={styles.button} onPress={this.props.copyToClipboard}>                            
                            <Icon.MaterialCommunityIcons name="content-copy" size={24}/>                            
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{flex: 1, padding: 8}}>
                        <TouchableOpacity style={styles.button}>                            
                            <Icon.MaterialCommunityIcons name="translate" size={24}/>                            
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, padding: 8}}>
                        <TouchableOpacity style={styles.button} onPress={this.props.upFontSize}>                            
                            <Icon.MaterialCommunityIcons name="magnify-plus" size={24}/>                            
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, padding: 8}}>
                        <TouchableOpacity style={styles.button} onPress={this.props.downFontSize}>                            
                            <Icon.MaterialCommunityIcons name="magnify-minus" size={24}/>                            
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    
    }

    render(){
        return (
            <View style={{flex: 1}}>
                { this._renderInput() }
                { this._renderControls() }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        borderColor: '#999',
        borderWidth:1,
        borderRadius: 4,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fafafa'
    }
})