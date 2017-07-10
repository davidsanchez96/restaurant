import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Left, Right, Text, View} from 'native-base';
import {Image, TouchableOpacity} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../Common/ChesterIcon/index";
import RestaurantLocation from "../common/RestaurantLocation/index";

export default class Restaurants extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Container >
                    <Content style={styles.content}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Restaurant')
                        }}>
                            <Card style={{...styles.card, ...styles.cardTransparent}}>
                                <CardItem cardBody style={styles.cardTransparent}>
                                    <Image source={require('../../../../assets/images/cafe-1.png')}
                                           style={styles.image}/>
                                </CardItem>
                                <CardItem style={styles.info}>

                                    <Text style={styles.infoHeader}>Рестобар</Text>


                                    <RestaurantLocation/>

                                    <View style={styles.infoLine}>
                                        <ChesterIcon name="time-16" size={16} color={platform.brandWarning}/>
                                        <Text style={styles.time}>Открыто</Text>
                                    </View>

                                </CardItem>


                            </Card>
                        </TouchableOpacity>

                        <Card style={{...styles.card, ...styles.cardTransparent}}>
                            <CardItem cardBody style={styles.cardTransparent}>
                                <Image source={require('../../../../assets/images/cafe-1.png')} style={styles.image}/>
                            </CardItem>
                            <CardItem style={styles.info}>

                                <Text style={styles.infoHeader}>Рестобар</Text>

                                <View style={styles.infoLine}>
                                    <ChesterIcon name="location-16" size={16} color={platform.brandWarning}/>
                                    <Text style={styles.infoAddress}>ТРЦ Аэропарк</Text>
                                    <Text style={styles.infoDistance}>1.8км</Text>
                                </View>
                                <View style={styles.infoLine}>
                                    <ChesterIcon name="time-16" size={16} color={platform.brandWarning}/>
                                    <Text style={styles.time}>Открыто</Text>
                                </View>

                            </CardItem>


                        </Card>

                    </Content>
                </Container>
            </View>

        );
    }
}


const styles = {
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    content: {

    },
    card: {
        marginVertical: 20,
        marginBottom: 15,
        marginTop:15,
        marginLeft: 0,
        marginRight: 0

    },

    cardTransparent: {
        backgroundColor: "transparent",
        borderWidth: 0,
        borderColor: 'transparent'
    },
    info: {
        backgroundColor: "transparent",
        borderWidth: 0,
        borderColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'column',
        alignItems: "flex-start"
    },
    infoHeader: {
        fontFamily: platform.fontFamily,
        fontSize: 30,
        lineHeight: 43
    },
    infoLine: {
        flexDirection: 'row',
        alignItems: "center"
    },
    time: {
        paddingLeft: 5,
        fontSize: 14,
        lineHeight: 20
    },
    image: {
        height: 160,
        width: null,
        flex: 1
    }
}