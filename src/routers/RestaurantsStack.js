import React from 'react';
import {StackNavigator} from 'react-navigation';
import Restaurants from "../components/Restaurant/Restaurants";
import DrawerIcon from './components/DrawerIcon'
import {BaseNavigationBarStyle} from "./BaseNavigationBarStyle";
import RestaurantTabs from "./RestaurantTabs";
import Category from "../components/Restaurant/Category/index";
import Dish from "../components/Restaurant/Dish/index";
import BookTableConfirm from "../components/Restaurant/BookTableConfirm/index";
import BasketIcon from "./components/BasketIcon/index";
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
    BookTableConfirm: {
        screen: BookTableConfirm,
        navigationOptions: {
            title: 'Подтверждение',
            headerBackTitleStyle: {
                color: "transparent"
            },


            headerStyle: BaseNavigationBarStyle.headerStyle,

        }
    },
}, {
    navigationOptions: props => ({
        ...BaseNavigationBarStyle,
        headerRight: <BasketIcon {...props} />
    }),
    cardStyle: {
        backgroundColor: 'transparent',
    }

});