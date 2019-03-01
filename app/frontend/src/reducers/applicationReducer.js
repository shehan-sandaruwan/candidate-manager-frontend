import {
    CREATE_APPLICATIONS,
    APPLICATION_SAVED,
    HIDE_ALERT,
    APPLICATION_SAVE_FAILED
} from '../actions/application-actions'

export default function applicationReducer(state = {}, action) {
    switch (action.type) {
        case CREATE_APPLICATIONS:
            return Object.assign({}, state, { saving: true, doneSaving: false, alertVisible: true, alertMsg: "Saving", alertType: 'info', errorSaving: false })
        case APPLICATION_SAVED:
            let newState = Object.assign({}, state, { saving: false, doneSaving: true, alertMsg: action.payload.message, alertType: 'success', errorSaving: false });
            newState.applications = newState.applications.concat(action.payload.application);
            return newState;
        case APPLICATION_SAVE_FAILED:
            newState = Object.assign({}, state, { saving: false, doneSaving: true, alertMsg:"Error in saving application", alertType: 'error', errorSaving: true });
            newState.applications = newState.applications.concat(action.payload.err);
            return newState;
        case HIDE_ALERT:
            return Object.assign({}, state, { isEdit: false, alertVisible: false })
        default:
            return state;
    }
}