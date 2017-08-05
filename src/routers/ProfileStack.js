import React from 'react';
import {StackNavigator} from 'react-navigation';
import Profile from "../components/Profile/Profile";
import DrawerIcon from './components/DrawerIcon'
import {BaseNavigationBarStyle} from "./BaseNavigationBarStyle";

import BasketIcon from "./components/BasketIcon/index";
export default ProfileStack = StackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: props => ({
            title: 'Ваш профиль',
            headerLeft: <DrawerIcon {...props} />

        })
    }
}, {
    navigationOptions: props => ({
        ...BaseNavigationBarStyle,
        headerRight: <BasketIcon {...props} />
    }),
    cardStyle: {
        backgroundColor: 'transparent',
    }

});