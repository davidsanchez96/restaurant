import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';
import ChesterIcon from "../../../components/Common/ChesterIcon/index";

export default BasketIcon = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity onPress={() => {

            } }>
                <ChesterIcon name="trash" size={22} color={"#fff"} style={{padding: 10, marginLeft: 10}}/>
            </TouchableOpacity>
        </View>
    );
};