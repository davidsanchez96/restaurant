import React from 'react';
import {Body, Button, Card, CardItem, Container, Content, Icon, Left, Picker, Right, Text, View} from 'native-base';
import {Image, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import platform from "../../../../native-base-theme/variables/platform";


import {connect} from "react-redux";
import CategoryList from "../../Restaurant/Category/CategoryList";
import {signStackStyle} from "../../../routers/SignStack";


class BasketPage extends React.Component {


    componentWillMount() {

    }

    componentWillUnmount() {

    }

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


        return <Image source={require('../../../../assets/images/background/background.png')} style={signStackStyle}>

            <ScrollView>

                <View>

                    <TouchableOpacity style={styles.timeButton} key={i}
                                      onPress={() => {
                                          this.props.navigation.navigate('BookTableConfirm')
                                      }}>
                        <Text style={styles.timeButtonText}>
                            Заебру сам -20%
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.timeButton} key={i}
                                      onPress={() => {
                                          this.props.navigation.navigate('BookTableConfirm')
                                      }}>
                        <Text style={styles.timeButtonText}>
                            Ланч в ресторане
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text>Рестобар Chester </Text>
                <View>

                    <CategoryList data={this.data}/>
                </View>
            </ScrollView>
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
};