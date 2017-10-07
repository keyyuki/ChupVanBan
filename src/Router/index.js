import React from 'react';
import { connect } from 'react-redux';
import Login from '../Screens/Unauth/Login';

class Router extends React.Component{
    render(){
        return <Login/>
    }
}

export default connect()(Router);