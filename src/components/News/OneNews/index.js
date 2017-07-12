import React from 'react';
import {
    Body, Button, Card, CardItem, Container, Content, Icon, Left, List, ListItem, Right, Text,
    View
} from 'native-base';
import {Image, TouchableOpacity} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";

export default class OneNews extends React.Component {


    render() {

        return (
            <View style={styles.container}>


                <Image source={require('../../../../assets/images/cafe-1.png')} style={styles.image}>
                </Image>
                <View style={{marginHorizontal:16}}>
                    <View style={styles.infoBlock}>

                        <Text style={styles.infoDate}>3 июня</Text>
                        <View style={styles.infoPoint}/>
                        <Text style={styles.infoName}>Рестобар CHESTER</Text>
                    </View>
                    <Text style={styles.header}>
                        Открытие летней веранды рестобара
                    </Text>
                </View>


            </View>

        );
    }
}


const styles = {
    container: {
        flex: 1,
    },
    image: {
        height: 150,
        width: null,
        marginBottom: 7
    },
    infoBlock: {
        flexDirection: 'row',
        alignItems:'center'
    },
    infoDate: {
        color: platform.brandWarning,
        fontFamily: platform.fontFamily,
        fontSize: 16,
        lineHeight: 23
    },
    infoPoint: {
        width: 4,
        height: 4,
        borderRadius: 4,
        backgroundColor: "#fff",
        marginHorizontal: 7
    },
    infoName: {
        color: platform.brandWarning,
        fontFamily: platform.fontFamily,
        fontSize: 16,
        lineHeight: 23
    },
    header: {
        fontFamily: platform.fontFamily,
        fontSize: 20,
        lineHeight: 29
    }


};