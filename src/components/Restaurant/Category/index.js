import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Left, Right, Text, View} from 'native-base';
import {FlatList, Image, TouchableOpacity, Animated, TouchableWithoutFeedback} from "react-native";
import {signStackStyle} from "../../../routers/SignStack";

import CategoryList from "./CategoryList";

export default class Category extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: navigation.state.params.name
    });



    render() {
        this.data = [
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
        return (
            <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

                    <CategoryList data={this.data}/>


            </Image>

        );
    }
}


const styles = {};