import React from 'react';
import {StackNavigator} from 'react-navigation';
import Restaurants from "../components/Restaurant/Restaurants";
import DrawerIcon from './components/DrawerIcon'
export default RestaurantsStack = StackNavigator({
    Restaurant: {
        screen: Restaurants,
        navigationOptions:{
            title:'CHESTER'
        }
    },
}, {
    navigationOptions: props => ({

        headerLeft: <DrawerIcon {...props} />
    })

});