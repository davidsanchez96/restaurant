/*
 * @flow
 */
import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Left, Right, Text, View} from 'native-base';
import {FlatList, Image, TouchableOpacity, Animated, TouchableWithoutFeedback, Dimensions} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../Common/ChesterIcon/index";
import {signStackStyle} from "../../../routers/SignStack";
import RestaurantLocation from "../common/RestaurantLocation/index";
import RestaurantContact from "../common/RestaurantContact/index";


export default class CategoryList extends React.Component {

    props: {
        basket?: boolean
    };
    state = {
        selected: {},
        active: null,
    };

    componentWillMount() {

        for (let dish of  this.props.data) {
            dish.fadeAnim = new Animated.Value(0);
        }

    }

    reset() {
        if (this.state.active !== null) {
            Animated.timing(                  // Animate over time
                this.props.data.find((it) => it.id === this.state.active).fadeAnim,            // The animated value to drive
                {
                    toValue: 0,                   // Animate to opacity: 1 (opaque)
                    duration: 300,              // Make it take a while
                }
            ).start();
            this.setState((prevState, props) => {
                let obj = {
                    selected: {
                        ...prevState.selected,
                    },
                    active: null
                };
                return obj;

            })
        }
    }


    addItem(item) {
        this.setState((prevState, props) => {

                let obj = {
                    selected: {
                        ...prevState.selected,
                    }
                };
                if (obj.selected[item.id] > 0) {
                    obj.selected[item.id] = obj.selected[item.id] + 1;
                }
                else {
                    obj.selected[item.id] = 1;
                }

                obj.active = item.id;

                if (prevState.active !== obj.active || obj.selected[item.id] === 1) {

                    Animated.timing(                  // Animate over time
                        item.fadeAnim,            // The animated value to drive
                        {
                            toValue: -50,                   // Animate to opacity: 1 (opaque)
                            duration: 300,              // Make it take a while
                        }
                    ).start();

                    if (prevState.active !== null && prevState.active !== obj.active) {
                        Animated.timing(                  // Animate over time
                            this.props.data.find((it) => it.id === prevState.active).fadeAnim,            // The animated value to drive
                            {
                                toValue: 0,                   // Animate to opacity: 1 (opaque)
                                duration: 300,              // Make it take a while
                            }
                        ).start();
                    }
                }
                else {

                }
                return obj;
            }
        );


    }

    minusItem(item) {
        this.setState((prevState, props) => {

                let obj = {
                    selected: {
                        ...prevState.selected,
                    }
                };
                if (obj.selected[item.id] !== 0) {
                    obj.selected[item.id] = obj.selected[item.id] - 1;
                }

                if (obj.selected[item.id] === 0) {
                    Animated.timing(                  // Animate over time
                        item.fadeAnim,            // The animated value to drive
                        {
                            toValue: 0,                   // Animate to opacity: 1 (opaque)
                            duration: 300,              // Make it take a while
                        }
                    ).start();
                }


                return obj;
            }
        )
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => {


        return (
            <Animated.View style={{...styles.menuItem, marginLeft: item.fadeAnim}}>


                <View style={styles.info}>
                    <TouchableOpacity style={styles.infoTouch} onPress={() => {
                        this.props.navigation.navigate('Dish', {name: item.title, dish: item})
                    }}>


                        <View style={styles.infoImageBlock}>
                            <Image source={{uri: item.photos.thumb}} style={styles.image}/>
                            {item.available_for_bonus === 1 && <View style={styles.infoBonusBlock}>

                                <Text style={styles.infoBonusText}>За баллы</Text>

                            </View>}
                        </View>

                        <View style={styles.infoBlockText}>
                            <Text style={styles.infoText}>{item.title}</Text>
                            <Text style={styles.weight}>{item.weight}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View>

                    {this.renderButton(item)}
                </View>


            </Animated.View>)

    };

    renderButton(item) {
        if (this.props.basket) {
            return this.renderBasketButton(item);
        }
        else {
            return this.renderCategoryButton(item);
        }
    }

    renderBasketButton(item) {
        return (  <Button bordered warning rounded style={styles.addItemButton} onPress={() => {
            this.props.navigation.navigate('Dish', {name: item.name})
        }}>
            <Text style={styles.addItemButtonText}>{item.count + ' ' + 'X' + ' ' + item.price + " ₽"}</Text>
        </Button>        )
    }

    renderCategoryButton(item) {
        if (item.id === this.state.active && this.state.selected[item.id] > 0) {
            return (
                <View style={styles.changeCountItemButton}>
                    <Button dark bordered warning rounded style={styles.minusItemButton} onPress={() => {
                        this.minusItem(item)
                    }}>
                        <Icon name="remove" size={24}/>
                    </Button>

                    <View style={styles.counterItemButton}>
                        <Text style={styles.counterItemButtonText}> {this.state.selected[item.id]}</Text>
                    </View>

                    <View style={styles.plusItemButton}>
                        <Button androidRippleColor="rgba(0, 0, 0, 0.15)" bordered warning rounded
                                style={styles.plusItemButton} onPress={() => {
                            this.addItem(item)
                        }}>
                            <ChesterIcon name="plus-24" color={platform.brandWarning} size={16}/>
                        </Button>
                    </View>


                </View>
            )
        }
        else if (this.state.selected[item.id] > 0) {
            return (

                <View>

                    <Button bordered warning rounded style={styles.addItemButton} onPress={() => {
                        this.addItem(item)
                    }}>


                        <Text style={styles.addItemButtonText}>{item.price + " ₽"}</Text>
                    </Button>
                    <View style={styles.countItemBadgeBlock}>
                        <Text style={styles.countItemBadge}> {this.state.selected[item.id]}</Text>
                    </View>
                </View>

            )
        }
        else {
            return (  <Button bordered warning rounded style={styles.addItemButton} onPress={() => {
                this.addItem(item)
            }}>
                <Text style={styles.addItemButtonText}>{item.price + " ₽"}</Text>
            </Button>        )

        }


    }

    componentWillReceiveProps(nextProps) {

    }

    render() {


        return (
            <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>
                <TouchableWithoutFeedback onPress={() => this.reset()}>


                    <FlatList
                        data={this.props.data}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />


                </TouchableWithoutFeedback>
            </Image>
        );
    }
}


const styles = {
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },

    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: platform.brandDivider,
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 100,

    },
    info: {
        justifyContent: 'center',
        width: Dimensions.get('window').width - 140
    },
    infoTouch: {
        flexDirection: "row",
        alignItems: 'center'
    },
    infoBlockText: {
        marginLeft: 16
    },
    infoText: {
        fontFamily: platform.fontFamily,
        fontSize: 18,
        lineHeight: 20

    },
    weight: {
        fontFamily: platform.fontFamily,
        fontSize: 14,
        lineHeight: 20,
        color: platform.brandWarning

    },
    infoImageBlock: {},
    image: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    infoBonusBlock: {
        position: 'absolute',
        bottom: 0,

        left: 6,
        overflow: 'hidden',
        height: 17,
        width: 57,
        borderWidth: 2,
        borderColor: '#2B3034',
        borderRadius: 100,
        backgroundColor: '#6FB423',
        justifyContent: 'center'
    },
    infoBonusText: {
        fontFamily: platform.fontFamily,
        fontSize: 10,
        textAlign: "center"
    },
    addItemButton: {
        height: 28,
        borderRadius: 8
    },
    addItemButtonText: {
        fontSize: 14,
        color: platform.brandWarning
    },
    changeCountItemButton: {
        flexDirection: 'row'
    },
    minusItemButton: {
        height: 34,
        width: 37,
        borderBottomLeftRadius: 34,
        borderTopLeftRadius: 34,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        paddingLeft: 0,
        paddingRight: 0,
        flexDirection: 'row',
        justifyContent: "center"
    },
    plusItemButton: {
        height: 34,
        width: 37,
        borderBottomRightRadius: 34,
        borderTopRightRadius: 34,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        paddingLeft: 0,
        paddingRight: 0,
        flexDirection: 'row',
        justifyContent: "center",
        overflow: 'hidden'
    },
    counterItemButton: {
        height: 34,
        width: 40,
        backgroundColor: platform.brandWarning,
        justifyContent: "center",
        alignItems: "center"
    },
    counterItemButtonText: {
        fontFamily: platform.fontFamily,
        fontSize: 18,
        lineHeight: 26,
        textAlign: "center"

    },
    countItemBadgeBlock: {
        position: 'absolute',
        left: -9,
        top: -9,
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: platform.brandWarning,
        backgroundColor: "#2B3034",
        overflow: 'hidden',
        paddingRight: 2

    },
    countItemBadge: {
        fontFamily: platform.fontFamily,
        fontSize: 12,
        textAlign: "center",
        lineHeight: 17
    },
}