import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Left, Picker, Right, Text, View} from 'native-base';
import {Image, TouchableOpacity, Dimensions, ScrollView, Animated} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import {Platform} from "react-native";


import {connect} from "react-redux";
import CategoryList from "../../Restaurant/Category/CategoryList";
import {signStackStyle} from "../../../routers/SignStack";
import {modalCardStyles} from "../../Profile/Profile/index";
import ChesterIcon from "../../Common/ChesterIcon/index";
import MyModal from "../../Common/MyModal/index";
import {Constants} from "expo";
import moment from "moment";

class BasketPage extends React.Component {


    state = {
        type: 'out',
        isOpenClearBasket: false,
        isOpenLunchWarning: false
    };

    componentWillMount() {

    }

    componentWillUnmount() {

    }


    clearBasket() {
        this.setState({isOpenClearBasket: false})
    }

    requestLunch() {
        let k =moment().format('H');
        let hour = parseInt(k);

        if (hour > 12 && hour < 16) {
            this.setState({type: 'lunch'})
        }
        else {
            this.setState({isOpenLunchWarning: true})
        }

    }


    render() {
        this.data = [
            {
                name: "Салат греческий",
                id: 12,
                weight: 280,
                price: 240,
                count: 2,


                fadeAnim: new Animated.Value(0),
            }, {
                name: "Руккола с беконом",
                id: 14,
                weight: 320,
                count: 1,
                price: 340,
                fadeAnim: new Animated.Value(0),
            },
            {
                name: "Салат из баклажанов",
                id: 16,
                weight: 280,
                price: 300,
                count: 2,
                fadeAnim: new Animated.Value(0),
            }, {
                name: "Руккола с беконом",
                id: 133,
                weight: 320,
                count: 1,
                price: 340,
                fadeAnim: new Animated.Value(0),
            },
            {
                name: "Салат из баклажанов",
                id: 13333,
                weight: 280,
                price: 300,
                count: 2,
                fadeAnim: new Animated.Value(0),
            }
        ];


        return <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

            <ScrollView>

                <View style={styles.pills}>

                    <TouchableOpacity style={[styles.pill, this.state.type === 'out' && styles.activePill]}
                                      onPress={() => {
                                          this.setState({type: 'out'})
                                      }}>
                        <Text style={styles.pillText}>
                            Заберу сам -20%
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.pill, this.state.type === 'lunch' && styles.activePill]}
                                      onPress={() => {
                                          this.requestLunch();
                                      }}>
                        <Text style={styles.pillText}>
                            Ланч в ресторане
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.header}>Рестобар Chester </Text>
                <View style={styles.categoryList}>
                    <CategoryList data={this.data} basket={true}/>
                </View>
                <View style={styles.clear}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({isOpenClearBasket: true})
                    }}>
                        <Text style={styles.clearText}>Очистить корзину</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.price}>
                        <Text style={styles.priceText}>1000 ₽</Text>
                        <Text style={styles.priceTextDiscount}>700 ₽</Text>
                    </View>
                    <Button warning full rounded style={styles.submit}
                            onPress={() => {
                                this.props.navigation.navigate('Order', {type: this.state.type})
                            }}>
                        <Text uppercase={false}>Оформить заказ</Text>
                    </Button>
                    <Text style={styles.mark}>Вы получите 12 баллов</Text>

                </View>


            </ScrollView>


            <MyModal style={{height: 215, backgroundColor: "#7A8187"}} isOpen={this.state.isOpenClearBasket} ref="modal"
                     position={'bottom'}
                     onRequestClose={() => this.setState({isOpenClearBasket: false})}>
                <View style={modalCardStyles.modal}>
                    <View style={modalCardStyles.hintRow}>
                        <View style={modalCardStyles.textRow}>
                            <Text style={modalCardStyles.removeText}>Очистка корзины</Text>
                            <Text style={modalCardStyles.removeTextQuestion}>Вы действительно хотите удалить все товары
                                из корзины?</Text>
                        </View>
                        <ChesterIcon name="trash" size={56} color={"#fff"}/>
                    </View>

                    <View style={modalCardStyles.buttonRow}>
                        <Button bordered rounded light style={modalCardStyles.cancelButton} onPress={() => {
                            this.setState({isOpenClearBasket: false})
                        }
                        }>
                            <Text uppercase={false} style={modalCardStyles.buttonText}>Отмена</Text>
                        </Button>
                        <Button danger rounded style={modalCardStyles.removeButton}>
                            <Text uppercase={false} style={modalCardStyles.buttonText} onPress={() => {
                                this.clearBasket();
                            }
                            }>Удалить</Text>
                        </Button>
                    </View>

                </View>

            </MyModal>

            <MyModal style={{height: 215, backgroundColor: "#7A8187"}} isOpen={this.state.isOpenLunchWarning}
                     ref="modal"
                     position={'bottom'}
                     onRequestClose={() => this.setState({isOpenLunchWarning: false})}>
                <View style={modalCardStyles.modal}>
                    <View style={modalCardStyles.hintRow}>
                        <View style={modalCardStyles.textRow}>
                            <Text style={modalCardStyles.removeText}>Ланч в ресторане</Text>
                            <Text style={modalCardStyles.removeTextQuestion}>Извините, но ланч в ресторане доступен
                                только с 12:00 до 16:00</Text>
                        </View>
                        <ChesterIcon name="trash" size={56} color={"#fff"}/>
                    </View>

                    <View style={modalCardStyles.buttonRow}>
                        <Button bordered rounded light full style={modalCardStyles.cancelButton} onPress={() => {
                            this.setState({isOpenLunchWarning: false})
                        }
                        }>
                            <Text uppercase={false} style={modalCardStyles.buttonText}>ОК</Text>
                        </Button>
                    </View>

                </View>

            </MyModal>

        </Image>
    }
}

function bindAction(dispatch) {
    return {};
}
const mapStateToProps = state => ({
    restaurants: state.restaurant.restaurants
});
const BasketPageSwag = connect(mapStateToProps, bindAction)(BasketPage);
export default BasketPageSwag;

const styles = {
    container: {
        flex: 1,
    },
    pills: {
        marginTop: 17,
        marginBottom: 10,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: platform.brandWarning,
        borderRadius: 4,
        flexDirection: 'row'
    },
    pill: {
        flex: 1,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activePill: {
        backgroundColor: platform.brandWarning
    },
    pillText: {
        lineHeight: 18,
        fontSize: 13,
        color: '#fff'
    },
    header: {
        color: platform.brandWarningAccent,
        fontFamily: platform.fontFamily,
        fontSize: 28,
        lineHeight: 40,
        marginBottom: 15,
        marginHorizontal: 16
    },
    categoryList: {
        minHeight: Dimensions.get('window').height -
        (Platform.OS === "ios" ? 64 : (56 + Constants.statusBarHeight)) - 45 - 49 - 130 - 46,
        borderTopWidth: 1,
        borderColor: platform.brandDivider
    },
    clear: {
        marginTop: 'auto',
        height: 34,
        width: '100%',
        borderColor: platform.brandDivider,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: '#2B3034',
        alignItems: 'center',
        justifyContent: 'center'
    },
    clearText: {
        lineHeight: 20,
        fontSize: 14,
        color: platform.brandWarning,
    },
    bottom: {

        backgroundColor: '#2B3034',
        width: '100%',
        alignItems: 'center'
    },
    price: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8
    },
    priceText: {
        textDecorationLine: 'line-through',
        fontSize: 28,
        lineHeight: 40,
        color: '#7A8187',
        marginRight: 10
    },
    priceTextDiscount: {
        fontSize: 28,
        lineHeight: 40,
        color: '#fff'
    },
    submit: {
        marginHorizontal: 16,
        justifyContent: 'center'
    },
    mark: {
        fontSize: 13,
        lineHeight: 18,
        color: '#fff',
        marginVertical: 8
    }

};