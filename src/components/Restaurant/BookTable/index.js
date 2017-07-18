import React from 'react';
import {
    Body, Button, Card, CardItem, Container, Content, Icon, Left, List, ListItem, Right, Text,
    View
} from 'native-base';
import {Image, ScrollView, TouchableOpacity} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../Common/ChesterIcon/index";
import {signStackStyle} from "../../../routers/SignStack";
import RestaurantLocation from "../common/RestaurantLocation/index";
import RestaurantContact from "../common/RestaurantContact/index";
import {connect} from "react-redux";
import Collapsible from 'react-native-collapsible';


class BookTable extends React.Component {


    state = {
        isOpen: false
    };

    render() {


        return (


            <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

                <View style={styles.container}>
                    <Container >
                        <Content>
                            <View style={{paddingHorizontal: 16,marginBottom: 11}}>
                                <Text style={styles.header}>

                                    Бронирование стола

                                </Text>
                                <Text style={styles.text}>
                                    Забронируйте столик на удобное вам время
                                </Text>

                            </View>
                            <TouchableOpacity onPress={() => {
                                this.setState({isOpen: !this.state.isOpen})
                            }}>
                                <View style={styles.dropdownHeader}>


                                    <Text style={styles.dropdownHeaderText}>2 человека, сегодня, 18:30</Text>
                                    {
                                        !this.state.isOpen ? <ChesterIcon name="arrow-down-orange-12" size={8}
                                                                         color={platform.brandWarning}
                                                                         style={styles.scheduleIcon}/> :
                                            <ChesterIcon name="arrow-up-12" size={8} color={platform.brandWarning}
                                                         style={styles.scheduleIcon}/>
                                    }

                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={!this.state.isOpen}>
                                <ScrollView horizontal style={styles.timeSheet}>

                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity style={styles.timeButton} onPress={() => {
                                            this.props.navigation.navigate('BookTableConfirm')
                                        }}>
                                            <Text style={styles.timeButtonText}>
                                                18:00
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.timeButton}>
                                            <Text style={styles.timeButtonText}>
                                                18:15
                                            </Text>
                                        </TouchableOpacity>
                                        <View style={styles.timeButtonFill}>
                                            <Text style={styles.timeButtonFillText}>
                                                18:30
                                            </Text>
                                        </View>
                                        <TouchableOpacity style={styles.timeButton}>
                                            <Text style={styles.timeButtonText}>
                                                18:45
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.timeButton}>
                                            <Text style={styles.timeButtonText}>
                                                19:00
                                            </Text>
                                        </TouchableOpacity>
                                        <View style={styles.timeButtonFill}>
                                            <Text style={styles.timeButtonFillText}>
                                                19:15
                                            </Text>
                                        </View>
                                    </View>


                                </ScrollView>
                            </Collapsible>

                            <View style={{paddingHorizontal: 16}}>
                                <Text style={{...styles.header, marginBottom: 0,marginTop:19}}>
                                    Рестобар Chester
                                </Text>
                                <RestaurantLocation
                                    restaurant={this.props.restaurants[this.props.navigation.state.params.key]}/>
                            </View>


                            <View style={{marginTop: 15}}>
                                <RestaurantContact restaurant={this.props.restaurants[this.props.navigation.state.params.key]}/>
                            </View>

                        </Content>
                    </Container>

                </View>
            </Image>
        );
    }
}

function bindAction(dispatch) {
    return {};
}
const mapStateToProps = state => ({
    restaurants: state.restaurant.restaurants
});
const BookTableSwag = connect(mapStateToProps, bindAction)(BookTable);
export default BookTableSwag;

const styles = {
    container: {
        flex: 1,

    },
    header: {
        color: platform.brandWarningAccent,
        fontFamily: platform.fontFamily,
        fontSize: 28,
        lineHeight: 40,
        marginBottom: 7,
        marginTop: 15,
    },
    dropdownHeader: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginBottom: 8
    },
    dropdownHeaderText: {
        fontFamily: platform.fontFamily,
        fontSize: 22,
        lineHeight: 31,


    },
    text: {
        color: platform.brandFontAccent,
        fontFamily: platform.fontFamily,
        fontSize: 14,
        lineHeight: 20
    },
    timeSheet: {
        paddingVertical: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: platform.brandDivider,
    },
    timeButton: {
        height: 30,
        width: 77,
        borderRadius: 8,
        backgroundColor: platform.brandWarning,
        overflow: 'hidden',
        marginHorizontal: 5
    },
    timeButtonText: {
        fontFamily: platform.fontFamily,
        fontSize: 20,
        lineHeight: 29,
        textAlign: 'center'
    },
    timeButtonFill: {
        height: 30,
        width: 77,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: platform.brandOutline,
        marginHorizontal: 5
    },
    timeButtonFillText: {
        fontFamily: platform.fontFamily,
        fontSize: 20,
        lineHeight: 29,
        textAlign: 'center',
        color: '#B3BBC1'
    }
};