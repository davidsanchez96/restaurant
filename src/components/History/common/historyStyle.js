import {Platform, Dimensions} from "react-native";
import {Constants} from "expo";

const historyStyles = {
        scrollContainer: {
           height: Dimensions.get('window').height -
            (Platform.OS === "ios" ? 64 : (56 + Constants.statusBarHeight))
        }
    }
;
export default historyStyles;