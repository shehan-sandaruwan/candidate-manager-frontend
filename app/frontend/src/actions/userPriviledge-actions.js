import axios from "axios";

export const SAVE_PRIVILEDGE = "priviledge:save";
export const PRIVILEDGE_SAVED = "priviledge:saved";
export const PRIVILEDGE_EDITED_SAVED = "priviledge:editedSaved";
export const REQUEST_PRIVILEDGE = "priviledge:request";
export const GOT_PRIVILEDGE = "priviledge:got";
export const SHOW_SAVEEDIT = "priviledge:showPrivilegeEdit";
export const HIDE_SAVEEDIT = "priviledge:hidePrivilegeEdit";
export const HIDE_SAVEALERT = "priviledge:hideSaveAlert";
export const ERROR_SAVING = "priviledge:errorSaving";
export const GOT_SPECIFICPRIVILEGEDUSER = "priviledge:getSpecificPrivilegedUsers";


export function createPriviledge(privilege) {
  return function (dispatch) {
    dispatch({
      type: SAVE_PRIVILEDGE
    });
    return axios.post("/userPrivilege/", privilege).then(response => {
      let savedPrivilege = response.data;
      savedPrivilege.userByUserId = privilege.userByUserId
      savedPrivilege.positionByPositionId = privilege.positionByPositionId
      dispatch({
        type: PRIVILEDGE_SAVED,
        payload: {
          newPrivilege: savedPrivilege
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
  return {
    type: ERROR_SAVING,
    payload: {
      msg: msg
    }
  };
}

export function updatePriviledge(updatedPriviledge) {
  return function (dispatch) {
    dispatch({
      type: SAVE_PRIVILEDGE
    });
    return axios
      .put("/userPrivilege/" + updatedPriviledge.id, updatedPriviledge)
      .then(response => {
        dispatch({
          type: PRIVILEDGE_EDITED_SAVED,
          payload: {
            updatedPriviledge: updatedPriviledge
          }
        });
      })
      .catch(error => {
        dispatch(errorSaving(error));
      });
  };
}

export function getPriviledges() {
  return function (dispatch) {
    dispatch({
      type: REQUEST_PRIVILEDGE
    });

    return axios.get("/userPrivilege").then(response => {
      let priviledges = response.data;
      dispatch({
        type: GOT_PRIVILEDGE,
        payload: {
          allPriviledges: priviledges
        }
      });
    });
  };
}

export function showPrivilegeEdit(privilege) {
  return {
    type: SHOW_SAVEEDIT,
    payload: {
      privilege: privilege
    }
  };
}

export function hidePrivilegeEdit() {
  return {
    type: HIDE_SAVEEDIT
  };
}

export function hidePrivilegeAlert() {
  return {
    type: HIDE_SAVEALERT
  };
}

export function getSpecificPrivilegedUsers(positionId,action) {
  return function(dispatch) {
    return axios.get("/user/privilege/"+positionId+"/"+action).then(response => {
      let users = response.data;
      dispatch({
        type: GOT_SPECIFICPRIVILEGEDUSER,
        payload: {
          privilegedUsers: users
        }
      });
    });
  };
}