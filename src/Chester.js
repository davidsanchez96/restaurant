import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import SignStack, {signStackStyle} from "./routers/SignStack";
import { connect } from "react-redux";
import NavigationDrawer from "./routers/NavigationDrawer";
class App extends React.Component {
    render() {

        if (this.props.showSign) {
            return (
            <Image  source={require('../assets/images/login&registration/login-bg.png')}  style={signStackStyle}>
                <SignStack />
            </Image>

            )
        }
        return (
            <NavigationDrawer/>
        );
    }
}


function bindAction(dispatch) {
    return {};
}
const mapStateToProps = state => ({
    logged: state.user.logged,
    showSign: state.user.showSign,
});
const Chester = connect(mapStateToProps, bindAction)(App);

export default Chester;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});