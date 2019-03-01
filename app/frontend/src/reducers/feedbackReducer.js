import {
    SAVE_FEEDBACKS,
    FEEDBACKS_SAVED,
    HIDE_ALERT,
    GET_FEEDBACKS,
    FEEDBACKS_GOT
} from '../actions/feedback-actions';

export default function feedbackReducer(state = {}, action) {
    switch (action.type) {
        case SAVE_FEEDBACKS:
            return Object.assign({}, state, { getting: true, got: false, alertVisible: true, alertMsg: "sending", alertType: "info" });
        case FEEDBACKS_SAVED:
            return Object.assign({}, state, { getting: false, got: true, alertVisible: true, alertMsg: "Successfully saved feedback.", alertType: "success" });
        case HIDE_ALERT:
            return Object.assign({}, state, { getting: false, got: false, alertVisible: false });
        case GET_FEEDBACKS:
            return Object.assign({}, state, { getting: true, got: false });
        case FEEDBACKS_GOT:
            return Object.assign({}, state, { getting: false, got: true,feedbacks:action.payload.feedbacks });
        default:
            return state;
    }

}