import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Left, Right, Text, View} from 'native-base';
import {Image, TouchableOpacity} from "react-native";
import platform from "../../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../../Common/ChesterIcon/index";


export default class RestaurantLocation extends React.Component {

    render() {
        return (
            <View style={styles.infoLine}>
                <ChesterIcon name="location-16" size={16} color={platform.brandWarning}/>
                <Text style={styles.infoAddress}>ТРЦ Аэропарк</Text>
                <Text style={styles.infoDistance}>1.8км</Text>
            </View>
        );
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
        paddingLeft: 5,
        paddingRight: 5,
        lineHeight: 26
    },
}