import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import user from "./user";
import restaurant from "./restaurant";

export default combineReducers({
    form: formReducer,
    restaurant,
    user
});

