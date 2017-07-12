import {RestaurantService} from "./api/restaurant";
export const GET_DATA = 'GET_DATA';
export const GET_DATA_PENDING = 'GET_DATA_PENDING';
export const GET_DATA_FULFILLED = 'GET_DATA_FULFILLED';
export const GET_DATA_REJECTED = 'GET_DATA_REJECTED';



const delay = (ms) => new Promise(resolve =>
    setTimeout(resolve, ms)
);

export function getDataAction(promise) {
    return {
        type: GET_DATA,
        payload: promise
    }
}

export const getRestaurants = (_hash) => {
    return dispatch => {
        let promise = RestaurantService.getData(_hash);
        dispatch(getDataAction(promise));
        return promise;
    }
};

