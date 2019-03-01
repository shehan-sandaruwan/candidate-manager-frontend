import axios from "axios";

export const PRECHECK_UPDATED = "preCheck:updated";
export const REQUEST_MATCH_APPLICATIONS = "preCheck:request";
export const GOT_MATCH_APPLICATIONS = "preCheck:gotMatchApplications";
export const UPDATE_PRECHECK = "preCheck:update";
export const ERROR_UPDATING = "preCheck:errorUpdating";


export function getMatches(firstName, lastName, email, phone, nic, candidateId) {
    return function(dispatch) {
      dispatch({
        type: REQUEST_MATCH_APPLICATIONS
      });
  
      return axios.get("/application/match", {params: {firstName: firstName, lastName:lastName, email:email, phone:phone, nic:nic, candidateId:candidateId}}).then(response => {
        let applications = response.data.data;
        dispatch({
          type: GOT_MATCH_APPLICATIONS,
          payload: {
            allMatches: applications
          }
        });
      });
    };
  }

  function errorSaving(error) {
    let msg="Network Error. Please Check the Connection."
    return {
      type: ERROR_UPDATING,
      payload:{
        msg:msg
      }
    };
  }

  export function updateState(transition) {
    return function(dispatch) {
      dispatch({
        type: UPDATE_PRECHECK
      });
      return axios
        .post("/state/", transition)
        .then(response => {
          dispatch({
            type: PRECHECK_UPDATED
          });
        })
        .catch(error => {
          dispatch(errorSaving(error));
        });
    };
  }




