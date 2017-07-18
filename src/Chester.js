import React from 'react';
import {Image, StyleSheet, Text, View, StatusBar} from 'react-native';
import SignStack, {signStackStyle} from "./routers/SignStack";
import {connect} from "react-redux";
import NavigationDrawer from "./routers/NavigationDrawer";
import {getRestaurants} from "./actions/restaurant";
import {variables} from "native-base";
import Api from "./actions/api/api"
class App extends React.Component {


    constructor(props) {
        super(props);

        variables.androidRipple = false;
    }

    componentWillMount() {

    }

    async loadPrefetch() {
        Api.jwt(this.props.user.token);
        let restaurants = await this.props.getRestaurants();
        Object.keys(restaurants.restaurants).forEach((item, i) => {
            Image.prefetch(restaurants.restaurants[item].photos[0].url);
        });
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.isLoading!==nextProps.isLoading)
        {
            this.loadPrefetch();
        }
    }

    render() {

        StatusBar.setBarStyle('light-content', true);
        if (this.props.showSign) {
            return (
                <Image source={require('../assets/images/login&registration/login-bg.png')} style={signStackStyle}>
                    <SignStack />
                </Image>

            )
        }
        return (
            <Image source={require('../assets/images/background/background.png')} style={signStackStyle}>
                <NavigationDrawer style={{backgroundColor: '#000'}}/>
            </Image>
        );
    }
}


function bindAction(dispatch) {
    return {
        getRestaurants: () => {
            return dispatch(getRestaurants());
        }
    };
}
const mapStateToProps = state => ({
    logged: state.user.logged,
    restaurants: state.restaurant.restaurants,
    user: state.user,
    showSign: state.user.showSign,
});
const Chester = connect(mapStateToProps, bindAction)(App);

export default Chester;

