import React from 'react';
import {
    Body, Button, Card, CardItem, Container, Content, Icon, Left, List, ListItem, Right, Text,
    View
} from 'native-base';
import {Image, ScrollView, TouchableOpacity} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import {signStackStyle} from "../../../routers/SignStack";
import {connect} from "react-redux";
import SelectDate from "./SelectDate";

import moment from "moment";
import 'moment-round'
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";

class BookTable extends React.Component {


    state = {
        isOpen: false
    };

    constructor() {
        super();
        let currentHour = parseInt(moment().format('H'));
        let currentMinute = parseInt(moment().format('m'));
        if (currentHour < 10) {
            this.state.date = moment().floor(24, 'hours').add(10, 'hours');
        }
        else if (currentHour < 23 || (currentHour === 23 && currentMinute <= 30)) {

            if (currentHour + 2 < 23) {
                this.state.date = moment().add(2, 'hours').ceil(30, 'minutes');
            }
            else {
                this.state.date = moment().ceil(30, 'minutes');
            }
        }
        else {
            this.state.date = moment().ceil(24, 'hours').add(10, 'hours');
        }


        this.state.count = 2;
    }


    getCurrentSelection() {
        let dateFormatted = '';
        dateFormatted += this.state.count + ' ' + (this.state.count === 1 || this.state.count >= 5 ? 'человек' : 'человека');
        dateFormatted += ', ';
        if (this.state.date.day() === moment().day()) {
            dateFormatted += 'сегодня, ' + this.state.date.format('HH:mm');
        }
        else {
            dateFormatted += this.state.date.format('ddd D MMMM, HH:mm');
        }
        return dateFormatted;
    }

    getCurrentSelectionTabs() {
        let startDate = this.state.date.clone().add(-30, 'minutes');
        let result = [];
        for (let i = 0; i < 5; i++) {
            result.push({
                label: startDate.format('HH:mm'),
                value: startDate.clone()
            });
            startDate.add(15, 'minutes');
        }
        return result;
    }

    setModalVisible(visible) {
        this.setState({isOpen: visible});
    }

    render() {

        let restaurant = this.props.restaurants[this.props.navigation.state.params.key];

        return (


            <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

                <View style={styles.container}>

                    <SelectDate isOpen={this.state.isOpen}
                                date={this.state.date}
                                onDateSelected={(selected) => {
                                    this.setState({date: selected.date, count: selected.count});
                                }}
                                onClose={() => {
                                    this.setState({isOpen: false});
                                }}/>


                    <Container >
                        <Content>
                            <View style={{paddingHorizontal: 16, marginBottom: 20}}>
                                <Text style={styles.header}>

                                    Бронирование стола

                                </Text>
                                <Text style={styles.restaurantName}>
                                    {restaurant.title_full}
                                </Text>

                            </View>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(true)
                            }}>
                                <View style={styles.selectDate}>

                                    <Octicons name="calendar" size={14}
                                              color={'#fff'}
                                              style={styles.selectDateIcon}/>
                                    <Text style={styles.selectDateText}>{this.getCurrentSelection()}</Text>


                                </View>
                            </TouchableOpacity>

                            <View style={styles.timeSheet}>
                                <Text style={styles.timeSheetHint}>Забронируйте столик на удобное вам время:</Text>
                                <ScrollView horizontal style={{paddingBottom:22,paddingTop:14}}>
                                    <View style={{flexDirection: 'row'}}>
                                        {
                                            this.getCurrentSelectionTabs().map((item, i) => {
                                                return <TouchableOpacity style={styles.timeButton} key={i}
                                                                         onPress={() => {
                                                                             this.props.navigation.navigate('BookTableConfirm')
                                                                         }}>
                                                    <Text style={styles.timeButtonText}>
                                                        {item.label}
                                                    </Text>
                                                </TouchableOpacity>
                                            })
                                        }
                                    </View>
                                </ScrollView>
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
        marginTop: 15,
    },
    restaurantName: {
        fontSize: 20,
        lineHeight: 29,
    },
    selectDate: {
        height: 36,
        marginHorizontal: 8,
        marginBottom: 19,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#4A545B',
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectDateIcon: {
        paddingRight: 8

    },
    selectDateText: {
        fontFamily: platform.fontFamily,
        fontSize: 16,
        lineHeight: 23,
    },
    text: {
        color: platform.brandFontAccent,
        fontFamily: platform.fontFamily,
        fontSize: 14,
        lineHeight: 20
    },
    timeSheet: {
        paddingTop: 13,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: platform.brandDivider,
    },
    timeSheetHint:{
        fontSize: 14,
        lineHeight: 20,
        paddingHorizontal:16
    },
    timeButton: {
        height: 32,
        width: 77,
        borderRadius: 8,
        backgroundColor: platform.brandWarning,
        overflow: 'hidden',
        marginLeft: 4,
        marginRight: 3
    },
    timeButtonText: {
        fontFamily: platform.fontFamily,
        fontSize: 20,
        lineHeight: 29,
        textAlign: 'center'
    },
    timeButtonFill: {
        height: 32,
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