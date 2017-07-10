import Restaurant from "../components/Restaurant/Restaurant/index";
import {TabBarTop, TabNavigator} from "react-navigation";
import platform from "../../native-base-theme/variables/platform";
import Menu from "../components/Restaurant/Menu/index";
const RestaurantTabs = TabNavigator({
    Home: {
        screen: Restaurant,
        navigationOptions: {
            title: 'Информация'
        }
    },
    Menu: {
        screen: Menu,
        navigationOptions: {
            title: 'Меню'
        }

    },
    Notifications2: {
        screen: Restaurant,
        navigationOptions: {
            title: 'Заказ стола'
        }

    },
    Notifications3: {
        screen: Restaurant,
        navigationOptions: {
            title: 'Акции'
        }

    },
    Notifications4: {
        screen: Restaurant,
        navigationOptions: {
            title: 'Команда'
        }

    }
}, {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    backBehavior:"none",
    swipeEnabled:true,
    lazy:true,
    tabBarOptions: {
        style: {
            backgroundColor: "rgba(43,48,52,0.85)"
        },
        tabStyle: {
            paddingLeft: 0,
            paddingRight: 0,
            marginRight:5,
            marginLeft:5,
            paddingBottom:16,
            paddingTop:16
        },
        upperCaseLabel: false,
        labelStyle: {
            fontSize: 12,
            margin: 0,
            fontFamily:platform.fontFamily
        },
        activeTintColor: platform.brandWarning,
        inactiveTintColor: "#fff",
        indicatorStyle: {
            backgroundColor: platform.brandWarning,
        }
    },
});
export default RestaurantTabs;