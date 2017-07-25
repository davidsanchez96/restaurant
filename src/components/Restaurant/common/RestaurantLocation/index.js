import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Left, Right, Text, View} from 'native-base';
import {Image, TouchableOpacity, Platform, Picker} from "react-native";
import platform from "../../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../../Common/ChesterIcon/index";
import {Permissions, Location} from "expo";
import {Constants} from "expo";
let geoLib = require('geolib');

export default class RestaurantLocation extends React.Component {

    state = {
        distance: null
    };

    constructor() {
        super();


    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {

        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {

        }


        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

        let distance = geolib.getDistance(location.coords, {
            latitude: this.props.restaurant.address_lat,
            longitude: this.props.restaurant.address_lon
        });

        if (distance > 1000) {
            distance = (distance / 1000).toFixed(2) + "км"
        }
        else {
            distance = distance + "м"
        }


        this.setState({
            distance
        });
    };

    render() {
        navigator.geolocation.getCurrentPosition(() => {
        });


        return <View style={styles.infoLine}>
            <ChesterIcon name="location-16" size={16} color={platform.brandWarning}/>
            <Text
                style={styles.infoAddress}>{this.props.restaurant.address_title + (this.state.distance ? ',' : '') }</Text>
            <Text style={styles.infoDistance}>{this.state.distance ? this.state.distance : ""}</Text>
        </View>


    }
}


const styles = {
    infoLine: {
        flexDirection: 'row',
        alignItems: "center"
    },
    infoDistance: {
        color: platform.brandWarning,
        fontSize: 18,
        lineHeight: 26,
    },
    infoAddress: {
        fontSize: 18,
        paddingLeft: 6,
        paddingRight: 4,
        lineHeight: 26
    },
}