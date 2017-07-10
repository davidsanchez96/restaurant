import {AuthService} from "./api/auth";
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_SIGN_STATE = 'SET_SIGN_STATE';

export const SEND_CODE = 'SEND_CODE';
export const SEND_CODE_PENDING = 'SEND_CODE_PENDING';
export const SEND_CODE_FULFILLED = 'SEND_CODE_FULFILLED';
export const SEND_CODE_REJECTED = 'SEND_CODE_REJECTED';

export const CONFIRM_CODE = 'CONFIRM_CODE';
export const CONFIRM_CODE_PENDING = 'CONFIRM_CODE_PENDING';
export const CONFIRM_CODE_FULFILLED = 'CONFIRM_CODE_FULFILLED';
export const CONFIRM_CODE_REJECTED = 'CONFIRM_CODE_REJECTED';


const delay = (ms) => new Promise(resolve =>
    setTimeout(resolve, ms)
);

export function signIn() {
    return {
        type: SIGN_IN
    };
}

export function signOut() {
    return {
        type: SIGN_OUT
    };
}

export function setSignState(state) {
    return {
        type: SET_SIGN_STATE,
        payload: state
    };
}
export function sendCodeAction(promise) {
    return {
        type: SEND_CODE,
        payload: promise
    }
}

export const sendCode = (number) => {
    return dispatch => {
        let promise = AuthService.sendCode(number);
        dispatch(sendCodeAction(promise));
        return promise;
    }
};

export function confirmCodeAction(promise) {
    return {
        type: CONFIRM_CODE,
        payload: promise
    }
}

export const confirmCode = (code) => {
    return dispatch => {
        let promise = AuthService.confirmCode(code);
        dispatch(confirmCodeAction(promise));
        return promise;
    }
};
