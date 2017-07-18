import React from 'react';
import {
    Body, Button, Card, CardItem, Container, Content, Icon, Left, List, ListItem, Right, Text,
    View
} from 'native-base';
import {Image, ScrollView, TextInput, TouchableOpacity,Dimensions} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../Common/ChesterIcon/index";
import {signStackStyle} from "../../../routers/SignStack";
import RestaurantLocation from "../common/RestaurantLocation/index";
import RestaurantContact from "../common/RestaurantContact/index";
import {TextInputMask} from "react-native-masked-text";
import {Constants} from "expo";


export default class BookTableConfirm extends React.Component {


    render() {


        return (


            <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

                <Container >
                    <Content >
                        <View style={{...styles.container,minHeight:Dimensions.get('window').height-platform.toolbarHeight}}>

                            <View style={{paddingHorizontal: 16}}>
                                <Text style={styles.header}>

                                    Заказ стола
                                </Text>
                                <Text style={styles.text}>
                                    Рестобар Chester
                                </Text>
                                <Text style={styles.dateText}>
                                    2 человека, сегодня, 18:30
                                </Text>
                            </View>


                            <View style={{
                                borderTopWidth: 1,
                                borderColor: platform.brandDivider
                            }
                            }>

                                <View style={styles.inputBlock}>
                                    <Text style={styles.inputLabel}>Имя</Text>
                                    <TextInput style={styles.input} underlineColorAndroid="transparent"/>
                                </View>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.inputLabel}>Фамилия</Text>
                                    <TextInput style={styles.input} underlineColorAndroid="transparent"/>
                                </View>
                                <View style={styles.inputBlock}>
                                    <Text style={styles.inputLabel}>Телефон</Text>
                                    <TextInputMask
                                        style={styles.input}
                                        keyboardType="phone-pad"
                                        type={'custom'}
                                        ref={'phone'}
                                        options={{mask: '+7 (999) 999-99-99'}}


                                        value="+7"
                                        underlineColorAndroid="transparent"
                                        onChangeText={(text) => {
                                            this.changeNumber(text)
                                        }}
                                    />
                                </View>
                            </View>


                            <View style={{...styles.inputBlock, marginTop: 15, flex: 1, flexDirection: 'column',padding:16}}>

                                <Text style={{...styles.inputLabel, flex: 0, width: '100%'}}>Комментарий к заказу</Text>

                                <TextInput style={{flex: 1}} multiline={true} underlineColorAndroid="transparent"/>
                            </View>


                            <View style={styles.buttonBlock}>
                                <Button warning rounded style={{width: '100%'}}>
                                    <Text style={{textAlign: 'center', flex: 1}}>Забронировать стол</Text>
                                </Button>
                            </View>


                        </View>
                    </Content>
                </Container>
            </Image>
        );
    }
}


const styles = {
    container: {
        flex: 1,

    },
    header: {
        color: platform.brandWarningAccent,
        fontFamily: platform.fontFamily,
        fontSize: 28,
        lineHeight: 40,
        marginBottom:0,
        marginTop: 15,
    },
    text: {
        fontFamily: platform.fontFamily,
        fontSize: 20,
        lineHeight: 29
    },
    dateText: {
        fontFamily: platform.fontFamily,
        fontSize: 22,
        lineHeight: 31,
        marginTop:13,
        marginBottom: 15
    },
    inputBlock: {
        backgroundColor: '#2B3034',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: platform.brandDivider
    },
    inputLabel: {
        color: '#B3BBC1',
        fontFamily: platform.fontFamily,
        fontSize: 18,
        lineHeight: 20,
        flex: 1
    },
    input: {
        flex: 3,
        fontFamily: platform.fontFamily,
        fontSize: 20,
        height:52,
        paddingVertical: 16,
        color:"#fff"
    },
    buttonBlock: {
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingTop:30,
        paddingBottom:30,
        width: '100%',
        marginTop: 'auto'
    }
};