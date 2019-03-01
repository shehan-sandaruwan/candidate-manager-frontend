export const SUBMIT_CREDENTIALS = "loging:sendemail";
export const SUBMIT_SUCCESS = "loging:sentemail";
export const HIDE_ALERT = "loging:hidealert";
import axios from "axios";

export function sendEmail(authUser) {
    return function (dispatch) {
        dispatch({
            type: SUBMIT_CREDENTIALS
        });
        axios.post("/auth/signin/", authUser,{headers:{'Content-Type': "application/json"}}).then(response => {
            dispatch({
                type: SUBMIT_SUCCESS
            });
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