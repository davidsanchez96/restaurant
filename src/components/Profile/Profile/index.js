import React from 'react';
import {
    Body, Button, Card, CardItem, Container, Content, Icon, Left, List, ListItem, Picker, Right, Switch, Text,
    View
} from 'native-base';
import {Image, TouchableOpacity, Dimensions, ScrollView, ListView} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";

import UserInfo from "../../../routers/components/UserInfo/index";
import {connect} from "react-redux";
import {signStackStyle} from "../../../routers/SignStack";
import InputBlock, {InputBlockStyles} from "../../Common/Form/InputBlock/index";
import {TextInputMask} from "react-native-masked-text";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Swipeout from "react-native-swipeout";
import ChesterIcon from "../../Common/ChesterIcon/index";
import MyModal from "../../Common/MyModal/index";


class Profile extends React.Component {

    state = {
        push: true,
        isRemoveOpen: false,
        removeCard: null
    };

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    render() {

        return <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>
            <KeyboardAwareScrollView
                resetScrollToCoords={{x: 0, y: 0}}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
            >
                <ScrollView>

                    <View>
                        <UserInfo/>
                    </View>
                    <View style={{
                        borderTopWidth: 1,
                        borderColor: platform.brandDivider,
                        marginTop: 15
                    }
                    }>

                        <InputBlock name="Имя" keyboardType="email-address"/>
                        <InputBlock name="Фамилия"/>
                        <InputBlock name="Email"/>
                    </View>

                    <View style={{
                        borderTopWidth: 1,
                        borderColor: platform.brandDivider,
                        marginTop: 15
                    }
                    }>

                        <View style={InputBlockStyles.inputBlock}>
                            <Text style={InputBlockStyles.inputLabel}>Телефон</Text>

                            <TextInputMask
                                style={InputBlockStyles.input}
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

                    <View style={{
                        borderTopWidth: 1,
                        borderColor: platform.brandDivider,
                        marginTop: 15
                    }
                    }>
                        <View style={InputBlockStyles.inputBlock}>
                            <Text style={InputBlockStyles.inputLabel}>Push-уведомления</Text>

                            <View style={{paddingVertical: 16}}>
                                <Switch value={this.state.push} onValueChange={(push) => {
                                    this.setState({push})
                                }} onTintColor={platform.brandWarning}/>
                            </View>

                        </View>

                    </View>

                    <View>
                        <Text style={styles.cardsHeader}>Методы оплаты</Text>
                    </View>
                    <View style={{
                        borderTopWidth: 1,
                        borderColor: platform.brandDivider,
                        marginTop: 15
                    }}>
                        {
                            this._renderList()
                        }
                    </View>


                </ScrollView>
            </KeyboardAwareScrollView>


            <MyModal style={{height: 215, backgroundColor: "#7A8187"}} isOpen={this.state.isRemoveOpen} ref="modal"
                     position={'bottom'}
                     onRequestClose={() => this.onClose()}>
                <View>
                    <View>
                        <Text>Удаление карты</Text>
                        <Text>Вы действительно хотите удалить карту?</Text>
                    </View>

                    <View>
                        <Button bordered rounded light>
                            <Text>Отмена</Text>
                        </Button>
                        <Button danger rounded>
                            <Text>Удалить</Text>
                        </Button>
                    </View>

                </View>

            </MyModal>


            <MyModal style={{height: 215, backgroundColor: "#7A8187"}} isOpen={this.state.isRemoveOpen} ref="modal"
                     position={'bottom'}
                     onRequestClose={() => this.onClose()}>
                <View >
                    <View style={styles.removeCard.hintRow}>
                        <View style={styles.removeCard.textRow}>
                            <Text style={styles.removeCard.removeText}>Удаление карты</Text>
                            <Text style={styles.removeCard.removeTextQuestion}>Вы действительно хотите удалить карту?</Text>
                        </View>
                        <Image source={require(`../../../../assets/images/payment/visa.png`)}/>
                    </View>

                    <View style={styles.removeCard.buttonRow}>
                        <Button bordered rounded light style={styles.removeCard.cancelButton}>
                            <Text>Отмена</Text>
                        </Button>
                        <Button danger rounded style={styles.removeCard.removeButton}>
                            <Text>Удалить</Text>
                        </Button>
                    </View>

                </View>

            </MyModal>

        </Image>
    }


    _renderList() {

        return <View>
            {[
                {
                    type: 'visa',
                    text: 'MasterCard **** 4511',
                    main: true
                },
                {
                    type: 'mastercard',
                    text: 'VISA **** 2816',
                    main: false
                }
                ,
                {
                    type: 'apple',
                    text: 'Apple Pay',
                    main: false
                }
            ].map((card) => {
                let swipeoutBtns = [
                    {
                        onPress: () => {
                            this.setState({removeCard: card, isRemoveOpen: true})
                        },
                        component: (<Button danger style={styles.swipeButton}
                                            onPress={() => {
                                                this.setState({removeCard: card, isRemoveOpen: true})
                                            }}
                        >
                            <Text style={styles.swipeButtonText}>Удалить</Text>
                        </Button>),
                        underlayColor: '#9b4f47'
                    }
                ];

                if (!card.main) {
                    swipeoutBtns.push(
                        {
                            width: 88,
                            component: <Button warning style={styles.swipeButton}><Text style={styles.swipeButtonText}>Сделать
                                основной</Text></Button>,
                            underlayColor: 'transparent'
                        })
                }
                let source;
                switch (card.type) {
                    case 'visa': {
                        source = require(`../../../../assets/images/payment/visa.png`);
                        break;
                    }
                    case 'mastercard': {
                        source = require(`../../../../assets/images/payment/mastercard.png`);
                        break;
                    }
                    case 'apple': {
                        source = require(`../../../../assets/images/payment/apple.png`);
                        break;
                    }
                }


                return <View key={card.type}>
                    <Swipeout backgroundColor={'#2B3034'} right={swipeoutBtns} buttonWidth={88}>
                        <View style={styles.cardListItem}>
                            <View style={styles.cardListItemImage}>
                                <Image source={source} style={{}}/>
                            </View>
                            <Text style={styles.cardListItemText}>
                                {card.text}
                            </Text>
                            {card.main &&
                            <Text style={styles.cardListItemTextMain}>
                                Основная
                            </Text>

                            }
                        </View>
                    </Swipeout>
                </View>
            })}

            <TouchableOpacity style={styles.cardListItem}>
                <View style={styles.cardListItemImage}>
                    <ChesterIcon name="plus-24" size={22} color={"#fff"}/>
                </View>

                <Text style={styles.cardListItemText}>Добавить метод оплаты</Text>
            </TouchableOpacity>
        </View>
    }
}

function bindAction(dispatch) {
    return {};
}
const mapStateToProps = state => ({
    restaurants: state.restaurant.restaurants
});
const ProfileSwag = connect(mapStateToProps, bindAction)(Profile);
export default ProfileSwag;

const styles = {
    container: {
        flex: 1,
    },
    cardsHeader: {
        marginTop: 15,
        fontSize: 22,
        lineHeight: 31,
        paddingHorizontal: 16
    },
    cardList: {
        marginTop: 15,
        marginBottom: 30
    },
    cardListItem: {
        backgroundColor: '#2B3034',
        height: 52,
        borderColor: platform.brandDivider,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
    },
    cardListItemImage: {
        width: 40,
        marginRight: 16,
        alignItems: 'center'
    },
    cardListItemText: {
        fontSize: 20,
        lineHeight: 20
    },
    cardListItemTextMain: {
        marginLeft: 'auto',
        fontSize: 18,
        lineHeight: 20,
        color: platform.brandListItem
    },
    swipeButton: {
        width: 88,
        borderRadius: 0,
        height: 52,
        padding: 16,
        justifyContent: 'center'
    },
    swipeButtonText: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center'
    }
};