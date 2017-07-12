import Restaurant from "../components/Restaurant/Restaurant/index";
import {TabBarTop, TabNavigator} from "react-navigation";
import platform from "../../native-base-theme/variables/platform";
import Menu from "../components/Restaurant/Menu/index";
import News from "../components/News/News/index";
import Team from "../components/Restaurant/Team/index";



const defaultTobBar ={
    style: {
        backgroundColor: "rgb(44, 47, 51)",
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 7,
        shadowRadius: 8,
        zIndex:5
    },
    tabStyle: {
        paddingLeft: 0,
        paddingRight: 0,
        marginRight:5,
        marginLeft:5,
        paddingBottom:16,
        paddingTop:16        ,
        zIndex:5
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
}

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
    News: {
        screen: News,
        navigationOptions: {
            title: 'Акции'
        }

    },
    Team: {
        screen: Team,
        navigationOptions: {
            title: 'Команда'
        }

    }
}, {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    backBehavior:"none",
    swipeEnabled:true,
    lazy:false,
    tabBarOptions: defaultTobBar
});




export default RestaurantTabs;