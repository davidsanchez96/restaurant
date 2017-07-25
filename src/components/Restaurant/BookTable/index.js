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
import SelectDate from "./SelectDate";

import moment from "moment";
import 'moment-round'

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
        else
        {
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
                            <View style={{paddingHorizontal: 16, marginBottom: 11}}>
                                <Text style={styles.header}>

                                    Бронирование стола

                                </Text>
                                <Text style={styles.text}>
                                    Забронируйте столик на удобное вам время
                                </Text>

                            </View>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(true)
                            }}>
                                <View style={styles.dropdownHeader}>


                                    <Text style={styles.dropdownHeaderText}>{this.getCurrentSelection()}</Text>

                                    <ChesterIcon name="arrow-down-orange-12" size={8}
                                                 color={platform.brandFontAccent}
                                                 style={styles.scheduleIcon}/>


                                </View>
                            </TouchableOpacity>

                            <ScrollView horizontal style={styles.timeSheet}>
                                <View style={{flexDirection: 'row'}}>
                                    {
                                        this.getCurrentSelectionTabs().map((item, i) => {
                                            return <TouchableOpacity style={styles.timeButton} key={i} onPress={() => {
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


                            <View style={{paddingHorizontal: 16}}>
                                <Text style={{...styles.header, marginBottom: 0, marginTop: 19}}>
                                    Рестобар Chester
                                </Text>
                                <RestaurantLocation
                                    restaurant={restaurant}/>
                            </View>


                            <View style={{marginTop: 15}}>
                                <RestaurantContact restaurant={restaurant}/>
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
        paddingBottom: 6
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
        height: 26,
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
        lineHeight: 26,
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