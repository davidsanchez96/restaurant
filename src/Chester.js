import React from 'react';
import {Image, StyleSheet, View, StatusBar} from 'react-native';
import SignStack, {signStackStyle} from "./routers/SignStack";
import {connect} from "react-redux";
import NavigationDrawer from "./routers/NavigationDrawer";
import {getRestaurants} from "./actions/restaurant";
import {Text, variables} from "native-base";
import Api from "./actions/api/api"
import {AppLoading} from "expo";
class App extends React.Component {

    props: {
        basket?: boolean
    };

    constructor(props) {
        super(props);

        variables.androidRipple = false;
    }

    componentWillMount() {

    }

    async loadPrefetch() {


        let restaurants = await this.props.getRestaurants();
        if(restaurants.restaurants)
        {
            Object.keys(restaurants.restaurants).forEach((item, i) => {
                //Image.prefetch(restaurants.restaurants[item].photos[0].url);
            });
        }

    }

    componentWillReceiveProps(nextProps) {
        if(this.props.isLoading!==nextProps.isLoading)
        {
            this.loadPrefetch();
        }

        if(nextProps.user.token)
        {
            Api.jwt(nextProps.user.token);
        }
        else
        {
            Api.jwt(null);
        }
    }

    render() {

        StatusBar.setBarStyle('light-content', true);
        if(this.props.isLoading)
        {
            return <AppLoading></AppLoading>
        }
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

