import React from 'react';
import {Image, TouchableOpacity} from "react-native";
import {Button, Text, View} from "native-base";
import platform from "../../../../native-base-theme/variables/platform";
import {connect} from "react-redux";
import {setSignState, signOut} from "../../../actions/user";
import {ImagePicker} from "expo";

class UserInfo extends React.Component {
    render() {


        if (this.props.logged) {

            return (<View style={styles.container}>

                <View style={styles.avatarOuter}>
                    <TouchableOpacity onPress={this._pickImage}>
                        <View style={styles.avatarInner}>

                            <Image source={require('../../../../assets/images/navigation/user_icon.png')}
                                   style={{width: 48, resizeMode: 'contain'}}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => {

                    this.props.navigation.navigate('Profile')
                }
                }>
                    <Text style={styles.bottomAvatarText}>Ваш аккаунт</Text>
                </TouchableOpacity>
                <View>
                    <Button style={styles.button} rounded warning onPress={() => {
                        this.props.logOut()
                    }}>
                        <Text style={styles.buttonText}>Выйти</Text>
                    </Button>

                </View>
            </View>)
        }
        else {
            return (<View style={styles.container}>

                <View style={styles.avatarOuter}>
                    <View style={styles.avatarInner}>

                        <Image source={require('../../../../assets/images/navigation/user_icon.png')}
                               style={{width: 48, resizeMode: 'contain'}}/>
                    </View>
                </View>


                <Text style={styles.bottomAvatarText}>Ваш аккаунт</Text>

                <View>
                    <Button style={styles.button} rounded warning onPress={() => {
                        this.props.signIn()
                    }}>
                        <Text style={styles.buttonText}>Войти ></Text>
                    </Button>

                </View>
            </View>)
        }

    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({image: result.uri});
        }
    };
}

function bindAction(dispatch) {
    return {
        logOut: () => dispatch(signOut()),
        signIn: () => dispatch(setSignState(true))
    };
}

const mapStateToProps = state => ({
    logged: state.user.logged,
});


const UserInfoSwag = connect(mapStateToProps, bindAction)(UserInfo);
export default UserInfoSwag;
/*<View style={styles.container} >
 <Image/>
 <Text style={styles.bottomAvatarText}>Катя кищук</Text>
 <Button rounded warning>
 <Text>250 баллов ></Text>
 </Button>
 </View>*/
const styles = {
    container: {
        paddingTop: 15,
        alignItems: "center"
    },
    avatarOuter: {
        width: 112,
        height: 112,
        borderRadius: 112 / 2,
        borderColor: "#d1d3c9",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        marginBottom: 10
    },
    avatarInner: {
        width: 92,
        height: 92,
        borderRadius: 92 / 2,
        backgroundColor: "#7A8187",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10
    },
    bottomAvatarText: {
        backgroundColor: 'transparent',
        fontSize: 28,
        lineHeight: 35,
        fontFamily: platform.fontFamilyAccent,
        textAlign: 'center',
        marginBottom: 9
    },
    button: {
        height: 32,
        minWidth: 128

    },
    buttonText: {
        fontSize: 19,
        flex: 1,
        textAlign: "center"
    }
}