import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Left, Right, Text, View} from 'native-base';
import {FlatList, Image, TouchableOpacity, Animated, TouchableWithoutFeedback} from "react-native";
import {signStackStyle} from "../../../routers/SignStack";

import CategoryList from "./CategoryList";
import {connect} from "react-redux";

class Category extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        title: navigation.state.params.name
    });


    render() {

        let restaurant = this.props.navigation.state.params.restaurant;
        let id = this.props.navigation.state.params.id;
        let currentCategory = restaurant.menu.categories.find((item) => {
            if (item.categories) {
                return item.categories.find((category) => category.id === id);
            }
            return item.id === id;
        });

        return (
            <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

                <CategoryList data={currentCategory.items} navigation={this.props.navigation}/>


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
const CategorySwag = connect(mapStateToProps, bindAction)(Category);
export default CategorySwag;
const styles = {};