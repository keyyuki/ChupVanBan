import { combineReducers } from 'redux';

import Auth from './Auth';
import Nav from './Nav';

export default combineReducers({
    auth: Auth,    
    nav: Nav
});