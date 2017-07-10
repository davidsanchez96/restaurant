import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Left, Right, Text, View} from 'native-base';
import {Image, TouchableOpacity} from "react-native";
import platform from "../../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../../Common/ChesterIcon/index";

export default class RestaurantContact extends React.Component {

    render() {
        return (
            <View style={styles.container}>

                <View >


                    <View style={styles.status}>
                        <ChesterIcon name="time-16" size={16} color={platform.brandWarning} style={styles.timeIcon}/>
                        <Text style={styles.statusText}>Сегодня открыто</Text>

                    </View>

                    <View style={styles.statusBottom}>

                        <Text style={styles.timeTableText}>10:00 - 22:00</Text>
                        <View style={styles.schedule}>
                            <Text style={styles.scheduleText}>Режим работы</Text>
                            <ChesterIcon name="arrow-down-orange-12" size={8} color={platform.brandWarning}
                                         style={styles.scheduleIcon}/>
                        </View>
                    </View>
                </View>
                <View style={styles.circleBlock}>

                    <TouchableOpacity style={{...styles.circle,marginRight:15}}>
                        <ChesterIcon name="phone-16" size={18} color={platform.brandWarning}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circle}>
                        <ChesterIcon name="location-16" size={18} color={platform.brandWarning}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: platform.brandDivider,
        paddingVertical: 12,
        paddingHorizontal: 15
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusBottom: {
        paddingLeft: 21
    },
    timeIcon: {
        marginRight: 5
    },
    schedule: {
        flexDirection: 'row',

    },
    statusText: {
        fontSize: 16,
        lineHeight:23,
        color: platform.brandFontAccent
    },
    timeTableText: {
        fontSize: 14,
        lineHeight:20,
        color: platform.brandFontAccent
    },
    scheduleText: {
        fontSize: 14,
        lineHeight:20,
        color: platform.brandWarning
    },

    scheduleIcon: {
        marginTop: 5,
        marginLeft: 5
    },
    circleBlock: {
        flexDirection: 'row',

    },
    circle: {
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 40,
        borderColor: platform.brandOutline
    }


};