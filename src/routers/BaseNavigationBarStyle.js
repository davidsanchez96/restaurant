import platform from "../../native-base-theme/variables/platform";
import {Constants} from 'expo';
import {Platform} from "react-native";

export const BaseNavigationBarStyle = {
    headerStyle: {

        backgroundColor: "rgba(43,48,52,0.85)",
        height: Platform.OS === "ios" ? 64 : (56 + Constants.statusBarHeight),
        paddingTop: Platform.OS === "ios" ? 20 : Constants.statusBarHeight,



        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 7,
        shadowRadius: 8

    },
    headerTitleStyle: {
        fontSize: 24,
        fontFamily: platform.fontFamilyAccent,
        fontWeight:"normal",
    },
    headerTintColor: '#FFF'
}