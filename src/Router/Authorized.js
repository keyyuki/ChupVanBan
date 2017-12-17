import React from "react";
import { BackHandler } from "react-native";
import { addNavigationHelpers, NavigationActions, DrawerNavigator, StackNavigator } from "react-navigation";
import { connect } from 'react-redux';

import MainScreen from '../Screens/Manager/Main';
import LoadScreen from '../Screens/Manager/Load';
import PickImageScreen from '../Screens/Manager/PickImage';
import ResultScreen from '../Screens/Manager/Result';
import TakeCameraScreen from '../Screens/Manager/TakeCamera';
import { goBack } from '../Actions/Nav'


export const AppNavigation = StackNavigator(
    {
        MainScreen: { screen: MainScreen },
        LoadScreen: { screen: LoadScreen },
        PickImageScreen: { screen: PickImageScreen },
        ResultScreen: { screen: ResultScreen },
        TakeCameraScreen: { screen: TakeCameraScreen },
    },
    {
        headerMode: 'none',
        initialRouteName: 'LoadScreen'
    }
);

class ReduxNavigation extends React.Component {

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backHandler)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler)
    }

    backHandler = () => {
        const { nav } = this.props;
        if(nav.index == 0){
            return false;
        }
        this.props.goBack();
        return true;
    }
    render() {
        const { dispatch, nav } = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav
        });

        return <AppNavigation navigation={navigation} />;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        nav: state.nav
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        goBack: () => {
            dispatch(goBack())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigation)