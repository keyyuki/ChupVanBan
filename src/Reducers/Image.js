import { IMAGEPROCESS_SET_IMAGEINFO, AUTH_LOGOUT } from '../Actions/Types';
const initialState = {
    info: null,    
};
export default ImageProcess = (state = initialState, action) => {
    switch(action.type){
        case IMAGEPROCESS_SET_IMAGEINFO:
            return {
                ...state,
                info: action.info
            }
        
        case AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
}