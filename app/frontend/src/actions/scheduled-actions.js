import axios from "axios";

export const GOT_SCHEDULEDINTERVIEWS = "scheduledInterviews:getScheduledInterviews";
export const SAVE_FINAL_STATE = "scheduledInterviews:saveFinalState";
export const FINAL_STATE_SAVED = "scheduledInterviews:finalStateSaved";
export const ERROR_SAVING = "scheduledInterviews:errorSaving";
export const HIDE_SAVEEDIT = "scheduledInterviews:hideSaveEdit";
export const HIDE_SAVEALERT = "scheduledInterviews:hideSaveAlert";
export const SHOW_SAVEEDIT = "scheduledInterviews:showSaveEdit";
export const SHOW_ALERT = "scheduledInterviews:showAlert";



export function getScheduledInterviews(userId) {
    return function (dispatch) {
        return axios
            .get("/schedule/assignedTo/" + userId)
            .then(response => {
                let scheduledInterviews = response.data.data;
                dispatch({
                    type: GOT_SCHEDULEDINTERVIEWS,
                    payload: {
                        scheduledInterviews: scheduledInterviews
                    }
                });
            })
            .catch(error => {
                return error;
            });
    };
}

export function createFeedback(newSchedule) {
    return function (dispatch) {
        let scheduleId = newSchedule.id;
        dispatch({
            type: SAVE_FINAL_STATE
        });

        return axios
            .post("/schedule/" + scheduleId, newSchedule)
            .then(response => {
                newSchedule = response.data.data;
                dispatch({
                    type: FINAL_STATE_SAVED,
                    payload: {
                        newSchedule: newSchedule
                    }
                });
            })
            .catch(error => {
                dispatch(errorSaving(error));
            });
    };
}

function errorSaving(error) {
    let msg = "Network Error. Please Check the Connection."

    if (error.response.status === 400) {
        msg = (error.response.data ? error.response.data.message : "");
    }
    return {
        type: ERROR_SAVING,
        payload: {
            msg: msg
        }
    };
}


export function showSaveEdit(feedback) {
    return {
        type: SHOW_SAVEEDIT,
        payload: {
            feedback: feedback
        }
    };
}


export function hideSaveEdit() {
    return {
        type: HIDE_SAVEEDIT
    };
}

export function hideSaveAlert() {
    return {
        type: HIDE_SAVEALERT
    };
}

export function showAlert(alertType, alertMsg) {
    return {
        type: SHOW_ALERT,
        payload: {
            type: alertType,
            msg: alertMsg
        }
    };
}