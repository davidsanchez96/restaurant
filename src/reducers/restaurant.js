import {GET_DATA, GET_DATA_FULFILLED, GET_DATA_PENDING, GET_DATA_REJECTED} from "../actions/restaurant";

export type State = {
    restaurants: []
}

const initialState = {
    restaurants: []
};

export default function (state: State = initialState, action) {
    if (action.type === GET_DATA_FULFILLED) {
        return {
            ...state,
            getDataPending: false,
            restaurants: action.payload.restaurants,
            restaurantsArray: Object.keys(action.payload.restaurants).map((key) => action.payload.restaurants[key])
        };
    }
    if (action.type === GET_DATA_PENDING) {
        return {
            ...state,
            getDataPending: true
        };
    }
    if (action.type === GET_DATA_REJECTED) {
        return {
            ...state,
            getDataPending: false
        };
    }

    return state;
}
