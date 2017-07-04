import React from 'react';
import {Button, Container, Form, Input, Item, Label, Spinner, Text, View} from 'native-base';
import {sendCode, setSignState} from "../../../actions/user";
import connect from "react-redux/es/connect/connect";
import {Constants} from 'expo';
import PhoneInput from "react-native-phone-input";
import {Image} from "react-native";
import {signStackStyle} from "../../../routers/SignStack";
import SignPhoneInput from "../SignPhoneInput/index";
class SignFirstStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: null,
            valid: false
        };
    }


    changeNumber(number) {
        this.setState({
            number: number,
            valid: this.refs.phone.isValidNumber()
        });
        this.number = number;
    }

    sendCode() {

        this.props.sendCode(this.number).then(() => {
            this.props.navigation.navigate('SignSecond', {number: this.number})
        })
    }


    render() {
        return (
            <Container >
                <Image source={require('../../../../assets/images/login&registration/login-bg.png')} style={signStackStyle}>
                    <View style={styles.container}>

                        <View style={styles.image}>
                            <Image source={require('../../../../assets/images/login&registration/login-logo.png')}></Image>
                        </View>

                        <View style={styles.message}>
                            <Text style={styles.messageText} theme={h1}>Введите свой номер телефона, чтобы вступить в программу
                                лояльности и получать скидки!</Text>
                        </View>


                        <View style={styles.phoneBlock}>


                            <View style={styles.phone}>
                              <SignPhoneInput ref="phone" onChangePhoneNumber={(number) => this.changeNumber(number)}/>
                            </View>
                        </View>

                        <View style={styles.button}>


                            {this.props.sendCodePending ? <Spinner/>
                                : <Button block rounded warning disabled={!this.state.valid} onPress={() => {
                                    this.sendCode()
                                }}>
                                    <Text>Далее ></Text>
                                </Button>
                            }


                            <View>
                                <Button transparent warning onPress={() => {
                                    this.props.signInAfter()
                                }}>
                                    <Text>Вступить в клуб позже ></Text>
                                </Button>
                            </View>

                        </View>

                    </View>

                </Image>
            </Container>

        );
    }
}

function bindAction(dispatch) {
    return {
        signInAfter: () => dispatch(setSignState(false)),
        sendCode: (number) => dispatch(sendCode(number))
    };
}
const mapStateToProps = state => ({
    sendCodePending: state.user.sendCodePending,
});


const styles = {
    container: {
        flex: 1,
        backgroundColor: 'transparent',

    },
    image: {
        height: 150,
        alignItems:'center',
        paddingTop:40,
    },
    message: {
        paddingTop:40,
        alignItems: 'center',
    },
    messageText: {
        width: 280,
        paddingBottom: 20,
        color: '#fff',
        textAlign: 'center'
    },
    phoneBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: '#d6d6d6',
        paddingBottom: 5,
        borderBottomWidth: 1,

    },
    phone: {
        width: 200,
    },

    button: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 15,
        paddingLeft: 15
    },
};


const SignFirstStepSwag = connect(mapStateToProps, bindAction)(SignFirstStep);
export default SignFirstStepSwag;