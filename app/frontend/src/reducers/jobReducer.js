import {
    GOT_JOBS,
    REQUEST_JOB,
    SHOW_SAVEEDIT,
    HIDE_SAVEEDIT,
    SAVE_JOB,
    JOB_SAVED,
    JOB_EDITED_SAVED,
    HIDE_SAVEALERT,
    ERROR_SAVING,
    GOT_JOB

} from '../actions/job-actions'

export default function jobReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_JOB:
            return Object.assign({}, state, { getting: true, got: false })
        case GOT_JOBS:
            var newState = Object.assign({}, state, { allJobs: action.payload.allJobs, getting: false, got: true });
            return newState;
        case SHOW_SAVEEDIT:
            if (action.payload.job) {
                return Object.assign({}, state, { isEditVisible: true, saved: false, isEdit: true, currentEdit: action.payload.job })
            } else {
                return Object.assign({}, state, { isEditVisible: true, isEdit: false, saved: false, currentEdit: {} })
            }
        case HIDE_SAVEEDIT:
            return Object.assign({}, state, { isEditVisible: false, savealertVisible: false })
        case SAVE_JOB:
            return Object.assign({}, state, { saving: true, savealertVisible: true, alertMsg: "Saving...", alertType: "info" })
        case JOB_SAVED:
            newState = Object.assign({}, state, { saved: true, saving: false, savealertVisible: true, alertMsg: "Successfully saved", alertType: "success" });
            newState.allJobs = newState.allJobs.concat(action.payload.newJob);
            return newState;
        case JOB_EDITED_SAVED:
            newState = Object.assign({}, state, { saved: true, saving: false, savealertVisible: true, alertMsg: "Successfully updated", alertType: "success" });
            let updatedJob = action.payload.updatedJob;
            newState.allJobs = newState.allJobs.filter((job) => job.id != updatedJob.id);
            newState.allJobs = newState.allJobs.concat(updatedJob);
            return newState;
        case HIDE_SAVEALERT:
            return Object.assign({}, state, { saved: false, savealertVisible: false, isEditVisible: false })
        case ERROR_SAVING:
            return Object.assign({}, state, { saving: false, alertMsg: action.payload.msg, alertType: "error" })
        case GOT_JOB:
            return Object.assign({}, state, {job: action.payload.job});
        default:
            return state;
    }

}