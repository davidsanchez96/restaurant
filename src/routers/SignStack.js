import {StackNavigator} from 'react-navigation';
import SignFirstStep from "../components/SignIn/SignFirstStep/index";
import SignSecondStep from "../components/SignIn/SignSecondStep/index";


export default SignStack = StackNavigator({
    SignFirst: {
        screen: SignFirstStep,
        navigationOptions: {
            header:null,
            headerStyle: {
                position: 'absolute',
                backgroundColor: 'transparent',
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0
            }
        }
    },
    SignSecond: {
        screen: SignSecondStep,
        navigationOptions: {
            title: "Подтверждение",
            headerStyle: {
                position: 'absolute',
                backgroundColor: 'transparent',
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0
            }
        }
    },
},{
    cardStyle:{
        backgroundColor:'transparent',
    }
});

export const signStackStyle={
    flex:1,
    width: null,
    height: null,
}
