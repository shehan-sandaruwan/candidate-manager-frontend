import axios from "axios";

export const SAVE_DEPARTMENT = "department:create";
export const DEPARTMENT_SAVED = "department:saved";
export const DEPARTMENT_EDITED_SAVED = "department:editedSaved";
export const REQUEST_DEPARTMENT = "department:request";
export const GOT_DEPARTMENTS = "department:got";
export const SHOW_SAVEEDIT = "department:showSaveEdit";
export const HIDE_SAVEEDIT = "department:hideSaveEdit";
export const HIDE_SAVEALERT = "department:hideSaveAlert";
export const ERROR_SAVING = "department:errorSaving";

export function createDepartment(newDepartment) {
  return function (dispatch) {
    dispatch({
      type: SAVE_DEPARTMENT
    });
    return axios
      .post("/department/", newDepartment)
      .then(response => {
        newDepartment = response.data.data;
        dispatch({
          type: DEPARTMENT_SAVED,
          payload: {
            newDepartment: newDepartment
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
    msg = (error.response.data.data.message ? error.response.data.data.message : "");
  }
  return {
    type: ERROR_SAVING,
    payload: {
      msg: msg
    }
  };
}

export function updateDepartment(updatedDepartment) {
  return function (dispatch) {
    dispatch({
      type: SAVE_DEPARTMENT
    });
    return axios
      .put("/department/" + updatedDepartment.id, updatedDepartment)
      .then(response => {
        dispatch({
          type: DEPARTMENT_EDITED_SAVED,
          payload: {
            updatedDepartment: updatedDepartment
          }
        });
      })
      .catch(error => {
        // dispatch(errorSaving(error));
        console.log(error);
      });
  };
}

export function getDepartments() {
  return function (dispatch) {
    dispatch({
      type: REQUEST_DEPARTMENT

    });
    return axios.get("/department").then(response => {
      let departments = response.data.data;
      dispatch({
        type: GOT_DEPARTMENTS,
        payload: {
          allDepartments: departments
        }
      });
    });
  };
}

export function showSaveEdit(department) {
  return {
    type: SHOW_SAVEEDIT,
    payload: {
      department: department
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


