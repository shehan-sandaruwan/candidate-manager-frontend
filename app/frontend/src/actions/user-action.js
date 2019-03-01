import axios from "axios";

export const SAVE_USER = "user:save";
export const USER_SAVED = "user:saved";
export const USER_EDITED_SAVED = "user:editedSaved";
export const REQUEST_USER = "user:request";
export const GOT_USER = "user:got";
export const SHOW_SAVEEDIT = "user:showSaveEdit";
export const HIDE_SAVEEDIT = "user:hideSaveEdit";
export const HIDE_SAVEALERT = "user:hideSaveAlert";
export const ERROR_SAVING = "user:errorSaving";
export const GOT_PRIVILEGEDUSER = "user:getPriviledgedUser";

export function createUser(newUser) {
  return function(dispatch) {
    dispatch({
      type: SAVE_USER
    });
    return axios
      .post("/user/", newUser)
      .then(response => {
       let savedUser = response.data;
        dispatch({
          type: USER_SAVED,
          payload: {
            newUser: savedUser
          }
        });
      })
      .catch(error => {
        dispatch(errorSaving(error));
      });
  };
}

function errorSaving(error) {
  let msg="Network Error. Please Check the Connection."
  if (error.response.status==400){
    msg=(error.response.data.lastName ? error.response.data.lastName : "");
    msg+=(error.response.data.firstName ? "\n"+error.response.data.firstName: "");
    msg+=(error.response.data.email ? "\nE-mail " +error.response.data.email: "");
  }
  return {
    type: ERROR_SAVING,
    payload:{
      msg:msg
    }
  };
}

export function updateUser(updatedUser) {
  return function(dispatch) {
    dispatch({
      type: SAVE_USER
    });
    return axios
      .put("/user/" + updatedUser.id, updatedUser)
      .then(response => {
        dispatch({
          type: USER_EDITED_SAVED,
          payload: {
            updatedUser: updatedUser
          }
        });
      })
      .catch(error => {
        dispatch(errorSaving(error));
      });
  };
}

export function getUsers() {
  return function(dispatch) {
    dispatch({
      type: REQUEST_USER
    });

    return axios.get("/user").then(response => {
      let users = response.data;
      dispatch({
        type: GOT_USER,
        payload: {
          allUsers: users
        }
      });
    });
  };
}

export function showSaveEdit(user) {
  return {
    type: SHOW_SAVEEDIT,
    payload: {
      user: user
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



