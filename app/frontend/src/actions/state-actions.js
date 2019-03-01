import axios from "axios";

export const REQUEST_STATES = "state:request";
export const GOT_STATES = "state:got";
export const UPDATE_STATE = "state:posting";
export const STATE_UPDATED = "state:posted";
export const ERROR_UPDATING = "state:error";




export function getStates(id) {
  return function (dispatch) {
    dispatch({
      type: REQUEST_STATES
    });

    return axios.get("/state/application/"+id).then(response => {
      let allStates = response.data.data;
      dispatch({
        type: GOT_STATES,
        payload: {
          allStates: allStates,
          
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

export function updateState(nextState) {
  let appId = nextState.applicationId
  return function(dispatch) {
    dispatch({
      type: UPDATE_STATE
    });
    return axios
      .post("/state/", nextState)
      .then(response => {
        dispatch({
          type: STATE_UPDATED,
          payload:{
            appId
          }
        });
      })
      .catch(error => {
        dispatch(errorSaving(error));
      });
  };
}