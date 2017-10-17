import { addNavigationHelpers, NavigationActions } from "react-navigation";
import { AppNavigation } from '../Router/Authorized';

const initialState = AppNavigation.router.getStateForAction(AppNavigation.router.getActionForPathAndParams('LoadScreen'));

export default navReducer = (state = initialState, action) => {
    const nextState = AppNavigation.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};