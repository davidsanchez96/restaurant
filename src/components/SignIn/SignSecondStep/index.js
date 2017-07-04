import React from 'react';
import {Button, Container, Form, Input, Item, Text, View} from 'native-base';
import {connect} from "react-redux";
import {dispatch} from "redux";
import {confirmCode, signIn} from "../../../actions/user";
import moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";
import {Image} from "react-native";
import {signStackStyle} from "../../../routers/SignStack";

class SignSecondStep extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            sec: 30
        };

    }

    tick() {
        if (this.state.sec === 0) {
            clearInterval(this.timerID);
            return;
        }
        this.setState((prevState, props) => ({
            sec: prevState.sec - 1
        }));

    }

    componentDidMount() {
        let current = moment();
        let sent = this.props.sent;
        let diff = current.diff(sent, 'seconds');
        let sec = 30;
        if (diff > 30) {
            sec = 0;
        }
        this.setState((prevState, props) => ({
            sec
        }));


        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    changeCode(text) {
        if (text.length > 5) {
            this.props.confirmCode(text);
        }
    }

    render() {


        return (
            <Container style={styles.container}>
                <Image source={require('../../../../assets/images/login&registration/login-bg.png')}
                       style={signStackStyle}>
                    <View style={styles.container}>


                        <Spinner visible={this.props.pending} textContent={"Подождите..."} textStyle={{color: '#FFF'}}/>

                        <View style={styles.image}>
                        </View>

                        <View style={styles.message}>
                            <Text style={styles.messageText}>Код подтверждения был отправлен на номер
                                +{this.props.navigation.state.params.number}!</Text>
                        </View>


                        <View style={styles.phoneBlock}>

                            <View>
                                <Item underline style={styles.codeItem}>
                                    <Input placeholder='Код' style={styles.codeInput}
                                           onChangeText={(text) => this.changeCode(text)}
                                           keyboardType="phone-pad"
                                    />
                                </Item>

                            </View>
                        </View>
                        <View>
                            {
                                this.state.sec === 0
                                    ?
                                    <Button transparent warning onPress={() => {
                                        this.props.signInAfter()
                                    }}>
                                        <Text>Отправить код повторно></Text>
                                    </Button>
                                    : <Text>Отправить код повторно 0:{this.state.sec}</Text>
                            }


                        </View>

                        <View style={styles.button}>

                            <View>
                                <Button transparent warning onPress={() => {
                                    this.props.signInAfter()
                                }}>
                                    <Text>Вступить в клуб позже></Text>
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
        signIn: () => dispatch(signIn()),
        confirmCode: (text) => dispatch(confirmCode(text))
    };
}

const mapStateToProps = state => ({
    logged: state.user.logged,
    sent: state.user.sent,
    pending: state.user.confirmCodePending
});
const styles = {
    container: {
        flex: 1,
        backgroundColor: 'transparent',

    },
    image: {
        height: 150,

    },
    button: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 15,
        paddingLeft: 15
    },
    phoneBlock: {
        borderColor: '#d6d6d6',
        borderBottomWidth: 1,
    },
    code: {},
    codeInput: {
        textAlign: 'center',
        paddingLeft: 0
    },
    codeItem: {
        borderColor: 'transparent',
    },
    message: {
        alignItems: 'center',
    },
    messageText: {
        width: 250,
        textAlign: 'center',
        paddingBottom: 20,
    }
};

const SignSecondStepSwag = connect(mapStateToProps, bindAction)(SignSecondStep);
export default SignSecondStepSwag;