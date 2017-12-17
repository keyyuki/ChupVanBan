import { addNavigationHelpers, NavigationActions } from "react-navigation";
import { AppNavigation } from '../Router/Authorized';
import { NAVIGATE, GOBACK } from '../Actions/Types';

const initialState = AppNavigation.router.getStateForAction(AppNavigation.router.getActionForPathAndParams('LoadScreen'));

export default navReducer = (state = initialState, action) => {
    let nextState;
    
    switch (action.type) {
        case NAVIGATE:            
            nextState = AppNavigation.router.getStateForAction(
                NavigationActions.navigate({ routeName: action.page, params: action.params}), 
                state);
            break;
        case GOBACK: 
        
            nextState = AppNavigation.router.getStateForAction(
                NavigationActions.back(), 
                state);
            break;
        default:
            nextState = AppNavigation.router.getStateForAction(action, state);
            break;
    }
        
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};