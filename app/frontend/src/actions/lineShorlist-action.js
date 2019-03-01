import axios from "axios";

export const LINE_SHORTLIST_UPDATED = "lineShortlist:updated";
export const REQUEST_ASSIGNED_APPLICATIONS = "lineShortlist:request";
export const GOT_ASSIGNED_APPLICATIONS = "lineShortlist:getAssigned";
export const UPDATE_LINE_SHORTLIST = "lineShortlist:update";
export const ERROR_UPDATING = "lineShortlist:errorUpdating";
export const SHOW_SIDEBAR = "lineShortlist:showSideBar";
export const HIDE_SIDEBAR = "lineShortlist:hideSideBar";


export function showSideBar(currentEdit) {
  return function(dispatch) {
    dispatch({
      type: SHOW_SIDEBAR,
      payload:{
        currentEdit: currentEdit
      }
    });
  }
}

export function hideSideBar() {
  return function(dispatch) {
    dispatch({
      type: HIDE_SIDEBAR
    });
  }
}

export function getAssigned() {
    return function(dispatch) {
      dispatch({
        type: REQUEST_ASSIGNED_APPLICATIONS
      });
      
      return axios.get("/application/assignedTo/", ).then(response => {
        let applications = response.data.data;
        dispatch({
          type: GOT_ASSIGNED_APPLICATIONS,
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
        type: UPDATE_LINE_SHORTLIST
      });
      return axios
        .post("/state/", transition)
        .then(response => {
          dispatch({
            type: LINE_SHORTLIST_UPDATED,
            payload: {
              applicationId: transition.applicationId
            }
          });
        })
        .catch(error => {
          dispatch(errorSaving(error));
        });
    };
  }