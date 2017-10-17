import React from "react";
import { BackHandler } from "react-native";
import { addNavigationHelpers, NavigationActions, DrawerNavigator } from "react-navigation";
import { connect } from 'react-redux';

import MainScreen from '../Screens/Manager/Main';
import LoadScreen from '../Screens/Manager/Load';
import PickImageScreen from '../Screens/Manager/PickImage';
import ResultScreen from '../Screens/Manager/Result';
import TakeCameraScreen from '../Screens/Manager/TakeCamera';


export const AppNavigation = DrawerNavigator(
    {
        MainScreen: { screen: MainScreen },
        LoadScreen: { screen: LoadScreen },
        PickImageScreen: { screen: PickImageScreen },
        ResultScreen: { screen: ResultScreen },
        TakeCameraScreen: { screen: TakeCameraScreen },
    },
    {
        drawerWidth: 200,
        drawerBackgroundColor: 'transparent',
        initialRouteName: 'LoadScreen'
    }
);

class ReduxNavigation extends React.Component {
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

export default connect(mapStateToProps)(ReduxNavigation)