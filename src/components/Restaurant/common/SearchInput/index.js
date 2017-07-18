import React from 'react';
import {
    Body, Button, Card, CardItem, Container, Content, Icon, Input, Item, Left, Right, Text,
    View
} from 'native-base';
import {Image, TouchableOpacity} from "react-native";
import platform from "../../../../../native-base-theme/variables/platform";
import ChesterIcon from "../../../Common/ChesterIcon/index";


export default class SearchInput extends React.Component {

    render() {
        return (
            <View style={styles.searchInputWarp}>
                <Item style={styles.searchInput}>
                    <ChesterIcon name="search-12" size={12} color="#fff"/>
                    <Input placeholder={"Поиск по меню"} style={styles.codeInput} placeholderTextColor="#fff"
                           onChangeText={(text) => this.props.onChangeText(text)}
                    />
                </Item>

            </View>


        );
    }
}


const styles = {
    searchInputWarp: {
        margin: 10
    },
    searchInput: {
        flexDirection: 'row',
        borderBottomWidth: 0,
        backgroundColor: '#4A545B',
        height: 32,
        borderRadius: 5,
        paddingLeft:10
    },
    codeInput: {
        color: '#fff',
        paddingLeft: 0,
        marginLeft: 5,
        fontSize: 14,
        fontFamily: platform.fontFamily,
        lineHeight: 20,
        height: 32,
    },

};