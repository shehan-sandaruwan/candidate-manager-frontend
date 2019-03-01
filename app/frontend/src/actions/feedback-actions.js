import axios from "axios";

export const SAVE_FEEDBACKS = "feedback:saveFeedbacks";
export const FEEDBACKS_SAVED = "feedback:savedFeedbacks";
export const HIDE_ALERT = "feedback:hidealert";
export const GET_FEEDBACKS = "feedback:getFeedbacks";
export const FEEDBACKS_GOT = "feedback:gotFeedbacks"

export function saveFeedbacks(feedbacks) {
    return function (dispatch) {
        dispatch({
            type: SAVE_FEEDBACKS
        });
        return axios
            .post("/feedback/", feedbacks)
            .then(response => {
                let feedbacks = response.data.data;
                dispatch({
                    type: FEEDBACKS_SAVED,
                    payload: {
                        feedbacks:feedbacks
                    }
                });
            })
            .catch(error => {
                
            });
    };
}

export function getFeedbacks(scheduleId) {
    return function (dispatch) {
        dispatch({
            type: GET_FEEDBACKS
        });
        return axios
            .get("/feedback/"+scheduleId)
            .then(response => {
                let feedbacks = response.data.data;
                dispatch({
                    type: FEEDBACKS_GOT,
                    payload: {
                        feedbacks:feedbacks
                    }
                });
            })
            .catch(error => {
                
            });
    };
}

export function hideAlert() {
    return function (dispatch) {
        dispatch({
            type: HIDE_ALERT
        });
    };
}

