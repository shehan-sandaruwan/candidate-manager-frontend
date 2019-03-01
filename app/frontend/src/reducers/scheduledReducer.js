import {
    GOT_SCHEDULEDINTERVIEWS,
    SAVE_FINAL_STATE,
    FINAL_STATE_SAVED,
    ERROR_SAVING,
    HIDE_SAVEEDIT,
    HIDE_SAVEALERT,
    SHOW_SAVEEDIT,
    SHOW_ALERT

} from '../actions/scheduled-actions'

export default function scheduledReducer(state = {}, action) {
    switch (action.type) {
        case GOT_SCHEDULEDINTERVIEWS:
            return Object.assign({}, state, { interviews: action.payload.scheduledInterviews });
        case SAVE_FINAL_STATE:
            return Object.assign({}, state, { saving: true, savealertVisible: true, alertMsg: "Saving...", alertType: "info" })
        case FINAL_STATE_SAVED:
            var newState = Object.assign({}, state, { saved: true, saving: false, savealertVisible: true, alertMsg: "Successfully saved", alertType: "success" });
            newState.interviews = newState.interviews.filter((schedule) => schedule.id != action.payload.newSchedule.id);
            return newState;
        case HIDE_SAVEALERT:
            return Object.assign({}, state, { saved: false, savealertVisible: false, isEditVisible: false })
        case ERROR_SAVING:
            return Object.assign({}, state, { saving: false, alertMsg: action.payload.msg, alertType: "error" })
        case SHOW_SAVEEDIT:
            if (action.payload.feedback) {
                return Object.assign({}, state, { isEditVisible: true, saved: false, isEdit: true, currentEdit: action.payload.feedback})
            } else {
                return Object.assign({}, state, { isEditVisible: true, isEdit: false, saved: false, currentEdit: {} })
            }
        case HIDE_SAVEEDIT:
            return Object.assign({}, state, { isEditVisible: false, savealertVisible: false })
        case SHOW_ALERT:
            return Object.assign({}, state, { savealertVisible: true, alertMsg: action.payload.msg, alertType: action.payload.type })

        default:
            return state;
    }
}
