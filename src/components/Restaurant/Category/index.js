import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Left, Right, Text, View} from 'native-base';
import {FlatList, Image, TouchableOpacity, Animated, TouchableWithoutFeedback} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../Common/ChesterIcon/index";
import {signStackStyle} from "../../../routers/SignStack";
import RestaurantLocation from "../common/RestaurantLocation/index";
import RestaurantContact from "../common/RestaurantContact/index";
let data = [
    {
        name: "Салат греческий",
        id: 12,
        weight: 280,
        price: 240,


        fadeAnim: new Animated.Value(0),
    }, {
        name: "Руккола с беконом",
        id: 14,
        weight: 320,
        price: 340,
        fadeAnim: new Animated.Value(0),
    },
    {
        name: "Салат из баклажанов", id: 16, weight: 280, price: 300,
        fadeAnim: new Animated.Value(0),
    }
];
export default class Category extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: navigation.state.params.name
    });


    state = {
        selected: {},
        active: null,
    };

    reset() {
        if (this.state.active !== null) {
            Animated.timing(                  // Animate over time
                data.find((it) => it.id === this.state.active).fadeAnim,            // The animated value to drive
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
                            data.find((it) => it.id === prevState.active).fadeAnim,            // The animated value to drive
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
                    <TouchableOpacity  style={styles.infoTouch} onPress={()=>{
                        this.props.navigation.navigate('Dish', {name: item.name})
                    }}>


                    <Image source={require('../../../../assets/images/cafe-1.png')} style={styles.image}/>
                    <View style={styles.infoBlockText}>
                        <Text style={styles.infoText}>{item.name}</Text>
                        <Text style={styles.weight}>{item.weight + "г"}</Text>
                    </View>
                    </TouchableOpacity>
                </View>

                <View>

                    {this.renderButton(item)}
                </View>


            </Animated.View>)

    };

    renderButton(item) {

        if (item.id === this.state.active && this.state.selected[item.id] > 0) {
            return (
                <View style={styles.changeCountItemButton}>
                    <Button bordered warning rounded style={styles.minusItemButton} onPress={() => {
                        this.minusItem(item)
                    }}>
                        <Icon name="remove" size={24}/>
                    </Button>

                    <View style={styles.counterItemButton}>
                        <Text style={styles.counterItemButtonText}> {this.state.selected[item.id]}</Text>
                    </View>

                    <Button bordered warning rounded style={styles.plusItemButton} onPress={() => {
                        this.addItem(item)
                    }}>
                        <ChesterIcon name="plus-24" color={platform.brandWarning} size={16}/>
                    </Button>


                </View>
            )
        }
        else if (this.state.selected[item.id] > 0) {
            return (  <Button bordered warning rounded style={styles.addItemButton} onPress={() => {
                this.addItem(item)
            }}>

                <View style={styles.countItemBadgeBlock}>
                    <Text style={styles.countItemBadge}> {this.state.selected[item.id]}</Text>
                </View>

                <Text style={styles.addItemButtonText}>{item.price + "р"}</Text>
            </Button>        )
        }
        else {
            return (  <Button bordered warning rounded style={styles.addItemButton} onPress={() => {
                this.addItem(item)
            }}>
                <Text style={styles.addItemButtonText}>{item.price + "р"}</Text>
            </Button>        )

        }


    }


    render() {


        return (
            <TouchableWithoutFeedback onPress={() => this.reset()}>
                <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

                    <FlatList
                        data={data}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />


                </Image>
            </TouchableWithoutFeedback>
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
        paddingHorizontal: 15,
        height: 100
    },
    info: {
        flexDirection: "row",
        alignItems: 'center'
    },
    infoTouch:{
        flexDirection: "row",
        alignItems: 'center'
    },
    infoBlockText: {
        marginLeft: 15
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

    image: {
        width: 70,
        height: 70,
        borderRadius: 40
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
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
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
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        paddingLeft: 0,
        paddingRight: 0,
        flexDirection: 'row',
        justifyContent: "center"
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