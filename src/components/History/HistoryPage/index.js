import React from 'react';
import {connect} from "react-redux";

import {FlatList, Image, ScrollView, TouchableOpacity} from "react-native";
import moment from "moment";
import {Text, View, Icon, Button} from "native-base";
import Swipeout from "react-native-swipeout";
import platform from "../../../../native-base-theme/variables/platform";
import {signStackStyle} from "../../../routers/SignStack";


class HistoryPage extends React.Component {


    state = {};

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    openHistory(history, title) {

        switch (history.type) {
            case 0: {
                this.props.navigation.navigate('BookTableHistory', {name: title, history: history});
                break;
            }
            case 1: {
                this.props.navigation.navigate('TakeAwayOrderHistory', {name: title, history: history});
                break;
            }
            case 2: {
                this.props.navigation.navigate('ScanBillHistory', {name: title, history: history});
                break;
            }
            case 3: {
                this.props.navigation.navigate('LunchHistory', {name: title, history: history});
                break;
            }
            case 4: {
                this.props.navigation.navigate('BuyByBonusHistory', {name: title, history: history});
                break;
            }
        }
    }


    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => {


        let title = '';
        switch (item.type) {
            case 0: {
                title = "Бронирование стола";
                break;
            }
            case 1: {
                title = "Заказ на вынос";
                break;
            }
            case 2: {
                title = "Сканирование чека";
                break;
            }
            case 3: {
                title = "Ланч в ресторане";
                break;
            }
            case 4: {
                title = "Покупка за баллы";
                break;
            }
        }
        let swipeoutBtns = [
            {
                onPress: () => {

                },
                component: (<Button danger style={styles.swipeButton}
                                    onPress={() => {

                                    }}
                >
                    <Text style={styles.swipeButtonText} uppercase={false}>Удалить</Text>
                </Button>),
                underlayColor: '#9b4f47'
            }
        ];

        let bonus = item.type === 4 ? -item.bonus : item.bonus;
        let bonusText = bonus + ' ' + 'бал.';


        return (

            <Swipeout backgroundColor={'#2B3034'} right={swipeoutBtns} buttonWidth={88}
                      autoClose={true} scroll={() => false}>
                <TouchableOpacity style={styles.listItemTouch} onPress={() => {
                    this.openHistory(item, title)
                }}>
                    <View style={styles.listItem}>

                        <View style={styles.listItemBody}>
                            <Text style={styles.listItemHeader}>{title}</Text>
                            <View style={styles.listItemPointBlock}>
                                <Text style={styles.listItemPointText}>{moment(item.date).format('D MMM, HH:mm')}</Text>
                                {item.type !== 4 && <View style={styles.listItemPriceBlock}>
                                    <View style={styles.infoPoint}/>
                                    <Text style={styles.listItemPointText}>{item.price + ' ₽'}</Text>
                                </View>}
                                <View style={styles.infoPoint}/>
                                <Text style={styles.listItemPointText}>{bonusText}</Text>
                            </View>
                            <Text style={styles.listItemRestaurant}>{item.restaurant}</Text>
                        </View>
                        <Icon style={styles.listItemIcon} name="arrow-forward"/>
                    </View>
                </TouchableOpacity>
            </Swipeout>

        )
    };

    render() {


        let data = [
            {
                id: 1,
                type: 1,
                price: 200,
                date: moment(),
                restaurant: 'Росторан в метрополис',
                bonus: 20,
                dateOrder: moment(),
            },
            {
                id: 2,
                type: 1,
                price: 200,
                date: moment(),
                restaurant: 'Росторан в метрополис',
                bonus: 20,
                dateOrder: moment(),
            },
            {
                id: 3,
                type: 3,
                price: 200,
                date: moment(),
                restaurant: 'Росторан в метрополис',
                bonus: 20,
                dateOrder: moment(),
            },
            {
                id: 4,
                type: 2,
                price: 200,
                date: moment(),
                restaurant: 'Росторан в метрополис',
                bonus: 20,
                dateOrder: moment(),
            },
            {
                id: 5,
                type: 4,
                price: 200,
                date: moment(),
                restaurant: 'Росторан в метрополис',
                bonus: 20,
                dateOrder: moment(),
            },
            {
                id: 6,
                type: 0,
                price: 200,
                date: moment(),
                restaurant: 'Росторан в метрополис',
                bonus: 20,
                dateOrder: moment(),
            }
        ];


        return <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

            <FlatList
                style={styles.list}
                data={data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ListHeaderComponent={() => (<View style={styles.listHeader}/>)}
                ListFooterComponent={() => (<View style={styles.listFooter}/>)}
            />


        </Image>
    }
}

function bindAction(dispatch) {
    return {};
}

const mapStateToProps = state => ({
    restaurants: state.restaurant.restaurants
});
const HistoryPageSwag = connect(mapStateToProps, bindAction)(HistoryPage);
export default HistoryPageSwag;

const styles = {
    container: {
        flex: 1,
    },
    infoPoint: {
        width: 4,
        height: 4,
        borderRadius: 4,
        backgroundColor: "#fff",
        marginHorizontal: 7
    },
    list: {},
    listHeader: {
        marginTop: 15
    },
    listFooter: {
        borderBottomWidth: 1,
        borderColor: platform.brandDivider
    },
    listItemTouch: {
        borderTopWidth: 1,
        borderColor: platform.brandDivider
    },
    listItem: {
        padding: 16,
        backgroundColor: '#2B3034',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    listItemBody: {},
    listItemHeader: {
        fontSize: 20,
        lineHeight: 20,
        color: '#ffffff'
    },
    listItemPointBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItemPriceBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    listItemPointText: {
        fontSize: 16,
        lineHeight: 23,
        color: platform.brandWarning
    },
    listItemRestaurant: {
        fontSize: 16,
        lineHeight: 23,
        color: platform.brandListItem
    },
    listItemIcon: {

        fontSize: 12,
        color: platform.brandListItem
    },
    swipeButton: {
        width: 88,
        borderRadius: 0,
        height: '100%',
        padding: 16,
        justifyContent: 'center'
    },
    swipeButtonText: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        color: '#fff'
    }
};