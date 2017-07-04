import React from 'react';
import PhoneInput from "react-native-phone-input";
import {View} from "native-base";
import platform from "../../../../native-base-theme/variables/platform";

export default class SignPhoneInput extends React.Component {

    constructor(props) {
        super(props);
    }


    changeNumber(number) {
        this.props.onChangePhoneNumber(number)
    }

    isValidNumber() {
        return this.refs.phone.isValidNumber();
    }

    render() {
        return (
            <View style={styles.phone}>
                <PhoneInput ref='phone' initialCountry="ru" textStyle={styles.phoneInput}
                            onChangePhoneNumber={(number) => this.changeNumber(number)}/>
            </View>

        );
    }
}


const styles = {
    phoneInput: {
        fontSize:platform.inputFontSize,
        color:platform.textColor,
        fontFamily:platform.fontFamily
    }

};

