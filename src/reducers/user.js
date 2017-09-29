import {
    CONFIRM_CODE_FULFILLED,
    CONFIRM_CODE_PENDING, CONFIRM_CODE_REJECTED, GET_TABLE_RESERVES, GET_TABLE_RESERVES_FULFILLED,
    GET_TABLE_RESERVES_PENDING,
    GET_TABLE_RESERVES_REJECTED, GET_USER_DATA,
    GET_USER_DATA_FULFILLED,
    SEND_CODE_FULFILLED, SEND_CODE_PENDING, SEND_CODE_REJECTED, SEND_TICKET, SEND_TICKET_FULFILLED, SEND_TICKET_PENDING,
    SEND_TICKET_REJECTED,
    SET_SIGN_STATE,
    SHOW_SIGN, SIGN_IN,
    SIGN_OUT, UPDATE_USER_DATA, UPDATE_USER_DATA_FULFILLED
} from '../actions/user';
import moment from "moment";

export type State = {
    name: string,
    phone: string,
    logged: boolean
}

const initialState = {
    name: '',
    phone: '',
    logged: false,
    showSign: true,
    history: null
};

export default function (state: State = initialState, action) {
    if (action.type === SIGN_IN) {
        return {
            ...state,
            logged: true,
        };
    }
    if (action.type === SIGN_OUT) {
        return {
            ...state,
            token: null,
            phone: '',
            logged: false,
            isAuth: false
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
            token: action.payload.token,
            phone: action.payload.phone,
            sendCodePending: false
        };
    }
    if (action.type === SEND_CODE_PENDING) {
        return {
            ...state,
            sendCodePending: true,
            logged: false
        };
    }
    if (action.type === SEND_CODE_REJECTED) {
        return {
            ...state,
            sendCodePending: false
        };
    }
    if (action.type === CONFIRM_CODE_FULFILLED) {
        return {
            ...state,
            sent: moment(),
            confirmCodePending: false,
            logged: true,
            showSign: false
        };
    }
    if (action.type === CONFIRM_CODE_PENDING) {
        return {
            ...state,
            confirmCodePending: true
        };
    }
    if (action.type === CONFIRM_CODE_REJECTED) {
        return {
            ...state,
            confirmCodePending: false
        };
    }
    /*if (action.type === GET_USER_DATA) {
        return {
            ...state,
            confirmCodePending: false
        };
    }*/
    if (action.type === GET_USER_DATA_FULFILLED) {
        return {
            ...state,
            userData: action.payload
        };
    }

    /*if (action.type === UPDATE_USER_DATA) {
        return {
            ...state,
            confirmCodePending: false
        };
    }
    if (action.type === UPDATE_USER_DATA_FULFILLED) {
        return {
            ...state,
            confirmCodePending: false
        };
    }*/


    if (action.type === SEND_TICKET_PENDING) {
        return {
            ...state,
            sendTicketPending: true,
        };
    }

    if (action.type === SEND_TICKET_FULFILLED) {
        return {
            ...state,
            sendTicketPending: false,
        };
    }

    if (action.type === SEND_TICKET_REJECTED) {
        return {
            ...state,
            sendTicketPending: false,
        };
    }


    if (action.type === GET_TABLE_RESERVES_PENDING) {
        return {
            ...state,
            getHistoryPending: true,
        };
    }

    if (action.type === GET_TABLE_RESERVES_FULFILLED) {
        return {
            ...state,
            history: action.payload,
            getHistoryPending: false,
        };
    }

    if (action.type === GET_TABLE_RESERVES_REJECTED) {
        return {
            ...state,
            history: null,
            getHistoryPending: false,
        };
    }

    return state;
}
