import axios from "axios";

export const SAVE_ADMIN = "admin:save";
export const ADMIN_SAVED = "admin:saved";
export const ADMIN_EDITED_SAVED = "admin:editedSaved";
export const REQUEST_ADMIN = "admin:request";
export const GOT_ADMIN = "admin:got";
export const SHOW_ADMIN_EDIT = "admin:showAdminEdit";
export const HIDE_ADMIN_EDIT = "admin:hideAdminEdit";
export const HIDE_ADMIN_ALERT = "admin:hideAdminAlert";
export const ERROR_SAVING = "admin:errorSaving";


export function createAdmin(admin) {
  return function (dispatch) {
    dispatch({
      type: SAVE_ADMIN
    });
    return axios.post("/adminPrivilege/", admin).then(response => {

      let savedAdmin = response.data;
      savedAdmin.userByUserId = admin.userByUserId

      dispatch({
        type: ADMIN_SAVED,
        payload: {
          newAdmin: savedAdmin
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

export function updateAdmin(updatedAdmin) {
  return function (dispatch) {
    dispatch({
      type: SAVE_ADMIN
    });
    return axios
      .put("/adminPrivilege/" + updatedAdmin.id, updatedAdmin)
      .then(response => {
        let savedAdmin = response.data;
        savedAdmin.userByUserId = updatedAdmin.userByUserId
        savedAdmin.name = updatedAdmin.name
        dispatch({
          type: ADMIN_EDITED_SAVED,
          payload: {
            updatedAdmin: savedAdmin
          }
        });
      })
      .catch(error => {
        dispatch(errorSaving(error));
      });
  };
}

export function getAdmins() {
  return function (dispatch) {
    dispatch({
      type: REQUEST_ADMIN
    });

    return axios.get("/adminPrivilege").then(response => {
      let admins = response.data;
      dispatch({
        type: GOT_ADMIN,
        payload: {
          allAdmins: admins
        }
      });
    });
  };
}

export function showAdminEdit(admin) {
  return {
    type: SHOW_ADMIN_EDIT,
    payload: {
      admin: admin
    }
  };
}

export function hideAdminEdit() {
  return {
    type: HIDE_ADMIN_EDIT
  };
}

export function hideAdminAlert() {
  return {
    type: HIDE_ADMIN_ALERT
  };
}
