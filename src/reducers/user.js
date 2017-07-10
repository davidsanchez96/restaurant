
import {
    CONFIRM_CODE_FULFILLED,
    CONFIRM_CODE_PENDING, CONFIRM_CODE_REJECTED,
    SEND_CODE_FULFILLED, SEND_CODE_PENDING, SEND_CODE_REJECTED, SET_SIGN_STATE, SHOW_SIGN, SIGN_IN,
    SIGN_OUT
} from '../actions/user';
import moment from "moment";

export type State = {
    name: string,
    phoneNumber:string,
    logged:boolean
}

const initialState = {
    name: '',
    phoneNumber:'',
    logged:false,
    showSign:true
};

export default function (state:State = initialState, action) {
    if (action.type === SIGN_IN) {
        return {
            ...state,
            logged: true,
        };
    }
    if (action.type === SIGN_OUT) {
        return {
            ...state,
            logged: false,
        };
    }
    if (action.type === SET_SIGN_STATE) {
        return {
            ...state,
            showSign: action.payload
        };
    }
    if (action.type === SEND_CODE_FULFILLED) {
        return {
            ...state,
            sent: moment(),
            token:action.payload.token,
            sendCodePending:false
        };
    }
    if (action.type === SEND_CODE_PENDING) {
        return {
            ...state,
            sendCodePending:true
        };
    }
    if (action.type === SEND_CODE_REJECTED) {
        return {
            ...state,
            sendCodePending:false
        };
    }
    if (action.type === CONFIRM_CODE_FULFILLED) {
        return {
            ...state,
            sent: moment(),
            confirmCodePending:false,
            showSign: false
        };
    }
    if (action.type === CONFIRM_CODE_PENDING) {
        return {
            ...state,
            confirmCodePending:true
        };
    }
    if (action.type === CONFIRM_CODE_REJECTED) {
        return {
            ...state,
            confirmCodePending:false
        };
    }
    return state;
}
