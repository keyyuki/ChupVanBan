import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import thunk from 'redux-thunk';
import AppReducer from './Reducers';
import Router from './Router';

var config = {
    apiKey: "AIzaSyCQNsSl7ZFB7XDz242iif2-E6ry7SUoDOc",
    authDomain: "anhhunglau-7b113.firebaseapp.com",
    databaseURL: "https://anhhunglau-7b113.firebaseio.com",
    projectId: "anhhunglau-7b113",
    storageBucket: "anhhunglau-7b113.appspot.com",
    messagingSenderId: "126636368431"
};
firebase.initializeApp(config);

const store = createStore(AppReducer, applyMiddleware(thunk));

class App extends Component{
    render(){
        return (
            <Provider store={store}>
            <Router/>
            </Provider>
        )
    }
}
export default App;