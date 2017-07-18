import React from 'react';
import {
    Body, Button, Card, CardItem, Container, Content, Icon, Left, List, ListItem, Right, Text,
    View
} from 'native-base';
import {Image, TouchableOpacity} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../Common/ChesterIcon/index";
import {signStackStyle} from "../../../routers/SignStack";
import OneNews from "../OneNews/index";

export default class News extends React.Component {


    render() {

        let news = [
            {name: 'Открытие'}
        ];
        return (


            <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

                <View style={styles.container}>
                    <Container >
                        <Content>
                            <Text style={styles.header}>

                                Новости и акции

                            </Text>


                            <View style={{marginBottom: 25}}>
                                <OneNews />
                            </View>
                            <View style={{marginBottom: 25}}>
                                <OneNews />
                            </View>
                            <View style={{marginBottom: 25}}>
                                <OneNews />
                            </View>
                            <View style={{marginBottom: 25}}>
                                <OneNews />
                            </View>

                        </Content>
                    </Container>

                </View>
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
        marginBottom: 14,
        marginTop: 15,
        paddingHorizontal: 16
    },

};