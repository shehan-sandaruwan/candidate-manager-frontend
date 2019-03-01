import axios from "axios"

export const CREATE_APPLICATIONS = 'applications:create';
export const APPLICATION_SAVED = 'applications:saved';
export const APPLICATION_SAVE_FAILED = 'applications:saveFailed';
export const HIDE_ALERT = 'applications:hideAlert';

export function createApplication(newApplication) {
    return function (dispatch) {
        dispatch({
            type: CREATE_APPLICATIONS
        });
        var formData = new FormData();
        formData.append("cv", newApplication.cv);
        formData.append("firstName", newApplication.firstName);
        formData.append("lastName", newApplication.lastName);
        formData.append("nic", newApplication.nic);
        formData.append("gender", newApplication.gender);
        formData.append("institute", newApplication.institute);
        formData.append("source", newApplication.source);
        formData.append("email", newApplication.email);
        formData.append("lastCompany", newApplication.lastCompany);
        formData.append("contactNumber", newApplication.contactNumber);
        formData.append("positionId", newApplication.jobId);
        // formData.append("experience", newApplication.experience);
        // formData.append("curremtPosition", newApplication.currentPosition)

        return axios.post('/application/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            newApplication = response.data.data
            let message = response.data.message
            dispatch(createApplicationSuccess(newApplication, message))
        })
            .catch((err) => {
                dispatch(createApplicationError(err))
            });
    }
}

export function hideAlert() {
    return ({
        type: HIDE_ALERT
    })
}

function createApplicationSuccess(newApplication, message) {
    return {
        type: APPLICATION_SAVED,
        payload: {
            application: newApplication,
            message: message
        }
    }
}

function createApplicationError(err) {
    return {
        type: APPLICATION_SAVE_FAILED,
        payload: {
            err: err
        }
    }
}

