import React from 'react';
import {DrawerItems, DrawerNavigator} from 'react-navigation';
import RestaurantsStack from "./RestaurantsStack";
import {Button, Text, View} from "native-base";
import {setSignState, signOut} from "../actions/user";
import {connect} from "react-redux";
import {Constants} from 'expo';
import {Image} from "react-native";
import UserInfo from "./components/UserInfo/index";
import platform from "../../native-base-theme/variables/platform";
import ChesterIcon from "../components/Common/ChesterIcon/index";

export default NavigationDrawer = DrawerNavigator({
        Restaurant: {
            screen: RestaurantsStack,
            navigationOptions: {
                title: 'Рестораны'
            }
        },
        News1: {
            screen: RestaurantsStack,
            navigationOptions: {
                title: 'Моя карта'
            }
        },
        News2: {
            screen: RestaurantsStack,
            navigationOptions: {
                title: 'Акции & Новости'
            }
        },
        News3: {
            screen: RestaurantsStack,
            navigationOptions: {
                title: 'История заказов'
            }
        },
        News4: {
            screen: RestaurantsStack,
            navigationOptions: {
                title: 'Связаться с нами'
            }
        },
    },
    {
        cardStyle: {
            backgroundColor: '#2B3034',
        },
        contentComponent: (props) => <CustomNavigationDrawerSwag disableGestures={true} {...props}/>
    });


class CustomNavigationDrawer extends React.Component {
    render() {

        let button = null;
        if (this.props.logged) {
            button = <Button onPress={() => this.props.logOut()}>
                <Text>
                    Выйти
                </Text>
            </Button>

        } else {
            button = <Button onPress={() => this.props.signIn()}>
                <Text>
                    Войти
                </Text>
            </Button>
        }


        return (
            <Image source={require('../../assets/images/navigation/nav-bg.png')} style={styles.background}>

                <View style={styles.container}>
                    <View style={styles.userInfo}>
                        <UserInfo {...this.props} />
                    </View>

                    <DrawerItems {...this.props}
                                 activeTintColor={platform.brandWarning}
                                 activeBackgroundColor="transparent"
                                 labelStyle={styles.drawerItemsText}
                                 inactiveTintColor="#fff"
                    />

                        <Button bordered warning rounded style={styles.scanBarButton} >
                            <ChesterIcon name="camera-24" size={20} color={platform.brandWarning}
                                         style={{marginTop: -5, paddingRight: 5}}/>
                            <Text style={styles.scanBarButtonText} uppercase={false}>Сканировать чек</Text>
                        </Button>



                </View>
            </Image>)
    }
}

function bindAction(dispatch) {
    return {

    };
}
const mapStateToProps = state => ({

});

const styles = {
    container: {
        paddingTop: Constants.statusBarHeight,
        flex:1
    },
    background: {
        flex: 1,
        width: null,
        height: null,
    },
    userInfo: {
        marginBottom: 15
    },
    drawerItemsText: {
        fontFamily: platform.fontFamily,
        fontSize: 22,
        flex: 1,
        textAlign: 'center',
        fontWeight:"normal"
    },
    scanBarButton: {
        alignSelf: "center",
        marginTop: 'auto',
        marginBottom:35,
        height:36
    },
    scanBarButtonText:{
        fontSize:19
    }
};

const CustomNavigationDrawerSwag = connect(mapStateToProps, bindAction)(CustomNavigationDrawer);
