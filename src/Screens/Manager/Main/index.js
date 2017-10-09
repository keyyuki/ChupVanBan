import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class Main extends React.Component{
    componentDidMount(){
        console.log('====================================');
        console.log(this.props.profile);
        console.log(this.props.google);
        console.log('====================================');
    }

    render(){
        return <View>
            <Text>Welcome !</Text>
        </View>
    }
}

const mapStateToProps = (state, owProps) => {
    return {
        profile: state.auth.profile,
        google: state.auth.google
    }
}

export default connect(mapStateToProps)(Main)