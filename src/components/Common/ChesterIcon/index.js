import React from 'react';
import {createIconSetFromIcoMoon} from '@expo/vector-icons';
import icoMoonConfig from './config.json';
import {Font} from 'expo';
import {View} from "native-base";
let Icon = null;

export default class ChesterIcon extends React.Component {
    state = {
        fontLoaded: false
    };

    async componentDidMount() {
        Icon = createIconSetFromIcoMoon(icoMoonConfig, 'icomoon');
        this.setState({fontLoaded: true});

    }

    render() {
        if (!this.state.fontLoaded) {
            return <View></View>;
        }

        return (
            <Icon {...this.props}/>
        );
    }
}