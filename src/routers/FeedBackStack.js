import React from 'react';
import {StackNavigator} from 'react-navigation';
import Profile from "../components/Profile/Profile";
import AddCard from "../components/Profile/AddCard";
import DrawerIcon from './components/DrawerIcon'
import {BaseNavigationBarStyle} from "./BaseNavigationBarStyle";

import BasketIcon from "./components/BasketIcon/index";
import AllNews from "../components/News/AllNews/index";
import OneNewsPage from "../components/News/OneNewsPage/index";
import FeedBackPage from "../components/FeedBack/FeedBackPage/index";

export default FeedBackStack = StackNavigator({
    FeedBack: {
        screen: FeedBackPage,
        navigationOptions: props => ({
            title: 'Обратная связь',
            headerLeft: <DrawerIcon {...props} />
        })
    },
}, {
    navigationOptions: props => ({
        ...BaseNavigationBarStyle
    }),
    cardStyle: {
        backgroundColor: 'transparent',
    }

});