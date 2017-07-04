import React, {Component} from 'react';
import {Provider} from 'react-redux';

import {StyleProvider} from 'native-base';
import Chester from './Chester';
import configureStore from './configureStore';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform'
import {Image} from "react-native";

export default class ChesterWithRedux extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            store: configureStore(() => this.setState({isLoading: false})),
        };
    }



    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
                <Provider store={this.state.store}>
                    <Chester />


                </Provider>
            </StyleProvider>
        );
    }
}

