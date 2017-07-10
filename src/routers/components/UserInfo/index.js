import React from 'react';
import {Image} from "react-native";
import {Button, Text, View} from "native-base";
import platform from "../../../../native-base-theme/variables/platform";
import {connect} from "react-redux";
import {setSignState, signOut} from "../../../actions/user";
class UserInfo extends React.Component {
    render() {


        if(this.props.logged)
        {

        }
        else
        {
            return (<View style={styles.container}>

                <View style={styles.avatarOuter}>

                    <View style={styles.avatarInner}>

                        <Image source={require('../../../../assets/images/navigation/user_icon.png')}/>
                    </View>
                </View>

                <Text style={styles.bottomAvatarText}>Ваш аккаунт</Text>
                <View>
                    <Button  style={styles.button} rounded warning onPress={() => {
                        this.props.signIn()
                    }}>
                        <Text style={styles.buttonText}>Войти ></Text>
                    </Button>

                </View>
            </View>)
        }

    }
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
        paddingTop: 20,
        alignItems: "center"
    },
    avatarOuter: {
        width: 112,
        height: 112,
        borderRadius: 112 / 2,
        borderColor: "#d1d3c9",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2
    },
    avatarInner: {
        width: 92,
        height: 92,
        borderRadius: 92 / 2,
        backgroundColor: "#d1d3c9",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10
    },
    bottomAvatarText: {
        backgroundColor: 'transparent',
        fontSize: 28,
        fontFamily: platform.fontFamilyAccent,
        textAlign: 'center',
        marginBottom:10
    },
    button:{
        height:32,
        minWidth:128

    },
    buttonText:{
        fontSize:19,
        flex:1,
        textAlign:"center"
    }
}