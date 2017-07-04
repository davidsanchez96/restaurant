import React from 'react';
import {DrawerItems, DrawerNavigator} from 'react-navigation';
import RestaurantsStack from "./RestaurantsStack";
import {Button, Text, View} from "native-base";
import {setSignState, signOut} from "../actions/user";
import {connect} from "react-redux";
import {Constants} from 'expo';

export default NavigationDrawer = DrawerNavigator({
        Restaurant: {
            screen: RestaurantsStack,
            navigationOptions: {
                title: 'Рестораны'
            }
        },
    },
    {
        contentComponent: (props) => <CustomNavigationDrawerSwag {...props}/>
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


        return (<View style={styles.container}>
            {button}
            <DrawerItems {...this.props} />


        </View>)
    }
}

function bindAction(dispatch) {
    return {
        logOut: () => dispatch(signOut()),
        signIn: () => dispatch(setSignState(true))
    };
}
const mapStateToProps = state => ({
    logged: state.user.logged,
});

const styles ={
    container: {
        paddingTop: Constants.statusBarHeight,
    },
};

const CustomNavigationDrawerSwag = connect(mapStateToProps, bindAction)(CustomNavigationDrawer);
