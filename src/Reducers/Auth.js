import { AUTH_LOGOUT, AUTH_SETGOOGLEAUTH, AUTH_SETPROFILE } from '../Actions/Types';
const initialState = {
    google: null,
    profile: null
};
export default Auth = (state = initialState, action) => {
    switch(action.type){
        case AUTH_SETGOOGLEAUTH:
            return {
                ...state,
                google: action.google
            }
        case AUTH_SETPROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
}
