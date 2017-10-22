import { combineReducers } from 'redux';

import Auth from './Auth';
import Nav from './Nav';
import Image from './Image';

export default combineReducers({
    auth: Auth,    
    nav: Nav,
    image: Image
});