import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Left, Right, Text, View} from 'native-base';
import {Image, TouchableOpacity} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../Common/ChesterIcon/index";
import {signStackStyle} from "../../../routers/SignStack";
import RestaurantLocation from "../common/RestaurantLocation/index";
import RestaurantContact from "../common/RestaurantContact/index";

export default class Restaurant extends React.Component {

    render() {
        return (
            <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

                <View style={styles.container}>
                    <Image source={require('../../../../assets/images/cafe-1.png')}
                           style={styles.image}/>


                    <View style={styles.infoBlock}>
                        <Text style={styles.infoHeader}>Рестобар Chester</Text>
                        <RestaurantLocation/>

                        <Text style={styles.infoText}>Начиная свой вечер в спокойной атмосфере, в паре с авторской
                            кухней от Бренд-шефа Семена
                            Колесникова и приятной лаунж музыкой в живом исполнении, вы можете закончить его на танцполе
                            под популярные коммерческие миксы от брянских DJ!</Text>
                    </View>
                    <View style={styles.restaurantContact}>
                        <RestaurantContact />
                    </View>
                </View>
            </Image>
        );
    }
}


const styles = {
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    image: {
        height: 160,
        width: "100%"
    },
    infoBlock: {

        paddingHorizontal: 15,
        paddingVertical: 15,
        paddingRight:30
    },
    restaurantContact: {
        marginTop: 5
    },
    infoHeader: {
        color: platform.brandWarning,
        fontSize: 28,
        lineHeight: 40
    },
    infoText: {
        fontSize: 14,
        color: platform.brandFontAccent,
        lineHeight: 20
    }
}