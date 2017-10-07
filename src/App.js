import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AppReducer from './Reducers';
import Router from './Router';

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