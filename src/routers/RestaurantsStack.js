import React from 'react';
import {StackNavigator} from 'react-navigation';
import Restaurants from "../components/Restaurant/Restaurants";
import DrawerIcon from './components/DrawerIcon'
import {BaseNavigationBarStyle} from "./BaseNavigationBarStyle";
import RestaurantTabs from "./RestaurantTabs";
import Category from "../components/Restaurant/Category/index";
import Dish from "../components/Restaurant/Dish/index";
export default RestaurantsStack = StackNavigator({
    Restaurants: {
        screen: Restaurants,
        navigationOptions: props => ({
            title: 'CHESTER',
            headerLeft: <DrawerIcon {...props} />

        })
    },
    Restaurant: {
        screen: RestaurantTabs,
        navigationOptions: {
            title: 'Ресторан',
            headerBackTitleStyle: {
                color: "transparent"
            },


            headerStyle: {
                ...BaseNavigationBarStyle.headerStyle,
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0
            }
        }
    },
    Category: {
        screen: Category,
        navigationOptions: {
            headerBackTitleStyle: {
                color: "transparent"
            },


            headerStyle: {
                ...BaseNavigationBarStyle.headerStyle
            }
        }
    },
    Dish: {
        screen: Dish,
        navigationOptions: {
            headerBackTitleStyle: {
                color: "transparent"
            },


            headerStyle: {
                ...BaseNavigationBarStyle.headerStyle,
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 0,
                shadowRadius: 0
            }
        }
    },
}, {
    navigationOptions: props => ({
        ...BaseNavigationBarStyle
    }),
    cardStyle: {
        backgroundColor: 'transparent',
    }

});