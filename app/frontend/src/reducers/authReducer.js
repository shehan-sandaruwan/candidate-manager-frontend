import {
    SUBMIT_CREDENTIALS,
    SUBMIT_SUCCESS,
    HIDE_ALERT
} from "../actions/auth-action"

export default function authReducer(state = {}, action) {
    switch (action.type) {

        case SUBMIT_CREDENTIALS:
            var newState = Object.assign({}, state, { getting: true, got: false, alertVisible: true, alertMsg: "sending", alertType: "info" });
            return newState;
        case SUBMIT_SUCCESS:
            newState = Object.assign({}, state, { getting: false, got: true, alertVisible: true, alertMsg: "check your email", alertType: "success" });
            return newState;
        case HIDE_ALERT:
            newState = Object.assign({}, state, { getting: false, got: false, alertVisible: false});
            return newState;
        default:
            return state;
    }

}