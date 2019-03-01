import {
    REQUEST_STATES,
    GOT_STATES,
    STATE_UPDATED,
    UPDATE_STATE,
    ERROR_UPDATING
} from "../actions/state-actions";

export default function stateReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_STATES:
            return Object.assign({}, state, { getting: true, got: false });
        case GOT_STATES:
            return Object.assign({}, state, { allStates: action.payload.allStates, getting: false, got: true });
        case UPDATE_STATE:
            return Object.assign({}, state, { saving: true, saved: false });
        case STATE_UPDATED:
            return Object.assign({}, state, { saving: false, saved: true });
        case ERROR_UPDATING:
            return Object.assign({}, state, { saving: false, alertMsg: action.payload.msg, alertType: "error" })
        default:
            return state;
    }

}
