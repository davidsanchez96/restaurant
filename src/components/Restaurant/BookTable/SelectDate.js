import React from 'react';
import {
    Body, Button, Card, CardItem, Container, Content, Icon, Left, List, ListItem, Right, Text,
    View
} from 'native-base';
import MyModal from "../../Common/MyModal/index";
import platform from "../../../../native-base-theme/variables/platform";
import {Picker, TouchableOpacity} from "react-native";
import moment from "moment";


export default class SelectDate extends React.Component {

    state = {
        days: [],
        day: 0,
        hours: [],
        hour: 0,
        minutes: [],
        minute: 0

    };

    timesheet = [
        {
            id: "monday",
            day: 1,
            name: "Пн",
            start:39600

        },
        {
            id: "tuesday",
            day: 2,
            name: "Вт",
            start:39600
        },
        {
            id: "wednesday",
            day: 3,
            name: "Ср",
            start:39600
        },
        {
            id: "thursday",
            day: 4,
            name: "Чт",
            start:39600
        },
        {
            id: "friday",
            day: 5,
            name: "Пт",
            start:39600
        },
        {
            id: "saturday",
            day: 6,
            name: "Сб",
            periods:[

            ]
        },
        {
            id: "sunday",
            day: 0,
            name: "Вс",
            start:39600,
            end:86400
        }
    ];


    constructor() {
        super();
        let days = [];
        let start = 0;
        let currentHour = parseInt(moment().format('H'));
        let currentMinute = parseInt(moment().format('m'));
        if (currentHour === 23 && currentMinute > 45) {
            start = 1;
        }
        for (let i = start; i < 7; i++) {
            days.push({
                name: i === 0 ? 'сегодня' : moment().add(i, 'days').format('ddd D MMMM'),
                date: moment().add(i, 'days').format('L'),
                value: days.length
            });
        }
        this.state.days = days;
    }


    componentWillMount() {
        let hours = this.updateHours(this.state.days[0]);
        this.updateMinutes(this.state.days[0], hours[0]);
    }

    updateHours(day) {

        let currentHour = parseInt(moment().format('H'));
        if (day.value === 0) {
            let currentMinute = parseInt(moment().format('m'));

            if (currentMinute > 45) {
                currentHour += 1;
            }
        }

        let hours = [];
        if (day.date === moment().format('L')) {
            for (let i = currentHour; i < 24; i++) {
                let name = i > 9 ? i.toString() : '0' + i;
                hours.push({
                    name: name,
                    date: i,
                    value: hours.length
                })
            }
        }
        else {
            for (let i = 0; i < 24; i++) {
                let name = i > 9 ? i.toString() : '0' + i;
                hours.push({
                    name: name,
                    date: i,
                    value: i
                })
            }
        }
        this.setState({
            hours: hours,
            hour: 0
        });
        return hours;

    }

    updateMinutes(day, hour) {


        let currentHour = parseInt(moment().format('H'));
        let currentMinute = parseInt(moment().format('m'));
        if (hour.date === currentHour) {

            if (currentMinute <= 15) {
                currentMinute = 15;
            }
            else if (currentMinute > 15 && currentMinute <= 30) {
                currentMinute = 30;
            }
            else if (currentMinute > 30) {
                currentMinute = 45;
            }
        }

        let minutes = [];
        if (day.value === 0 && hour.date === currentHour) {
            for (let i = currentMinute; i < 60; i += 15) {
                minutes.push({
                    name: i.toString(),
                    date: i,
                    value: minutes.length
                })
            }
        }
        else {
            for (let i = 0; i < 60; i += 15) {
                minutes.push({
                    name: i.toString(),
                    date: i,
                    value: minutes.length
                })
            }
        }


        this.setState({
            minutes: minutes,
            minute: currentMinute
        })

    }

    setDay(day) {
        this.setState({
            day
        });
        let hours = this.updateHours(this.state.days[day]);
        this.updateMinutes(this.state.days[day], hours[0]);

    }

    setHour(hour) {
        this.setState({
            hour
        });
        this.updateMinutes(this.state.days[this.state.day], this.state.hours[hour]);
    }


    render() {
        return <MyModal style={{height: 240, backgroundColor: "#2B3034"}} isOpen={this.props.isOpen} ref="modal"
                        position={'bottom'}
                        onRequestClose={() => this.props.onClose()}>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: platform.brandDivider
            }}>


                <TouchableOpacity

                    onPress={() => {
                        this.refs.modal.close();
                    }}
                >
                    <Text style={{
                        color: platform.brandWarning,
                        fontSize: 20,
                        lineHeight: 29
                    }}>
                        Отмена
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{
                        color: platform.brandWarning,
                        fontSize: 20,
                        lineHeight: 29
                    }}>Готово</Text>
                </TouchableOpacity>
            </View>

            <View >

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 17,
                    marginTop: -15,
                }}>


                    <Picker style={{width: 70, borderWidth: 0}}
                            itemStyle={{fontFamily: platform.fontFamily, color: '#fff'}}
                            selectedValue={this.state.count}
                            onValueChange={(itemValue, itemIndex) => this.setState({count: itemValue})}
                    >
                        <Picker.Item label="1 чел" value="1"/>
                        <Picker.Item label="2 чел" value="2"/>
                        <Picker.Item label="3 чел" value="3"/>
                        <Picker.Item label="4 чел" value="4"/>
                        <Picker.Item label="5 чел" value="5"/>
                        <Picker.Item label="6 чел" value="6"/>
                    </Picker>
                    <Picker style={{flex: 1}}
                            itemStyle={{fontFamily: platform.fontFamily, color: '#fff'}}
                            selectedValue={this.state.day}
                            onValueChange={(itemValue, itemIndex) => this.setDay(itemValue)}
                    >
                        {this.state.days.map((item) => {
                            return <Picker.Item key={item.value} label={item.name} value={item.value}/>
                        })}
                    </Picker>
                    <Picker style={{width: 35}}
                            itemStyle={{fontFamily: platform.fontFamily, color: '#fff'}}
                            selectedValue={this.state.hour}
                            onValueChange={(itemValue, itemIndex) => this.setHour(itemValue)}
                    >
                        {this.state.hours.map((item) => {
                            return <Picker.Item key={item.value} label={item.name} value={item.value}/>
                        })}
                    </Picker>
                    <Picker style={{width: 35}}
                            itemStyle={{fontFamily: platform.fontFamily, color: '#fff'}}
                            selectedValue={this.state.minute}
                            onValueChange={(itemValue, itemIndex) => this.setState({minute: itemValue})}

                    >
                        {this.state.minutes.map((item) => {
                            return <Picker.Item key={item.value} label={item.name} value={item.value}/>
                        })}
                    </Picker>
                </View>

                <View
                    style={{
                        position: 'absolute',
                        top: 75,
                        left: 17,
                        right: 17,
                        height: 1,
                        backgroundColor: "#3B4248"
                    }}/>
                <View
                    style={{
                        position: 'absolute',
                        top: 110,
                        left: 17,
                        right: 17,
                        height: 1,
                        backgroundColor: "#3B4248"
                    }}/>
            </View>

        </MyModal>
    }
}


const styles = {
    container: {
        flex: 1,

    },
};