import React from 'react';
import {
    Body, Button, Card, CardItem, Container, Content, Icon, Left, List, ListItem, Right, Text,
    View
} from 'native-base';
import {Image, TouchableOpacity} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../Common/ChesterIcon/index";
import {signStackStyle} from "../../../routers/SignStack";
import Collapsible from 'react-native-collapsible';
import SearchInput from "../common/SearchInput/index";
import {LinearGradient, Svg} from "expo";

export default class Dish extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: navigation.state.params.name
    });

    render() {

        return (

            <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

                <View style={styles.container}>
                    <View>

                        <Image source={require('../../../../assets/images/cafe-1.png')} style={styles.image}>
                        </Image>
                        <LinearGradient
                            colors={['#000', 'transparent']}
                            start={[0.5, 1]}
                            end={[0.5, 0]}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: 75,
                            }}
                        >


                        </LinearGradient>

                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0
                            }}
                        >

                            <Text>
                                
                            </Text>
                        </View>

                    </View>


                    <View style={styles.contentBlock}>
                        <View>
                            <Text style={styles.header}>Капрезе</Text>
                            <Text style={styles.text}>Ha</Text>
                        </View>
                        <View style={styles.buttonBlock}>
                            <Button success rounded style={{flex:1,marginRight:15}}>
                                <Text style={{flex:1,textAlign:'center'}}>За баллы</Text>
                            </Button>
                            <Button warning rounded style={{flex:1}}>
                                <Text style={{flex:1,textAlign:'center'}}>250 ₽</Text>
                            </Button>
                        </View>
                    </View>


                </View>
            </Image>
        );
    }
}


const styles = {
    container: {
        flex: 1,
    },
    image: {
        height: 260,
        width: null
    },
    contentBlock: {
        paddingHorizontal: 15,
        flex: 1,
    },
    buttonBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
        paddingBottom:30
    },
    header: {
        color: platform.brandWarningAccent,
        fontFamily: platform.fontFamily,
        fontSize: 28,
        lineHeight: 40
    },
    text: {
        color: platform.brandFontAccent,
        fontFamily: platform.fontFamily,
        fontSize: 14,
        lineHeight: 20
    },

};