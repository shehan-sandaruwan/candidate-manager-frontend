import axios from "axios";

export const SAVE_JOB = "job:create";
export const JOB_SAVED = "job:saved";
export const JOB_EDITED_SAVED = "job:editedSaved";
export const REQUEST_JOB = "job:request";
export const GOT_JOBS = "job:got";
export const SHOW_SAVEEDIT = "job:showSaveEdit";
export const HIDE_SAVEEDIT = "job:hideSaveEdit";
export const HIDE_SAVEALERT = "job:hideSaveAlert";
export const ERROR_SAVING = "job:errorSaving";
export const GOT_JOB = "job:getJob";

export function createJob(newJob) {
  return function(dispatch) {
    dispatch({
      type: SAVE_JOB
    });
    return axios
      .post("/position/", newJob)
      .then(response => {
        newJob = response.data.data;
        dispatch({
          type: JOB_SAVED,
          payload: {
            newJob: newJob
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
  if (error.response.status===400){
    msg=(error.response.data.data.name ? error.response.data.data.name : "");
    msg+=" \n" + (error.response.data.data.description ? error.response.data.data.description: "");
  }
  return {
    type: ERROR_SAVING,
    payload:{
      msg:msg
    }
  };
}

export function updateJob(updatedJob) {
  return function(dispatch) {
    dispatch({
      type: SAVE_JOB
    });
    return axios
      .put("/position/" + updatedJob.id, updatedJob)
      .then(response => {
        dispatch({
          type: JOB_EDITED_SAVED,
          payload: {
            updatedJob: updatedJob
          }
        });
      })
      .catch(error => {
        dispatch(errorSaving(error));
      });
  };
}

export function getJobs() {
  return function(dispatch) {
    dispatch({
      type: REQUEST_JOB
    });

    return axios.get("/position").then(response => {
      let jobs = response.data.data;
      dispatch({
        type: GOT_JOBS,
        payload: {
          allJobs: jobs
        }
      });
    });
  };
}

export function showSaveEdit(job) {
  return {
    type: SHOW_SAVEEDIT,
    payload: {
      job: job
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

export function getJob(positionId) {
  return function(dispatch) {
    return axios.get("/position/"+positionId).then(response => {
      let job = response.data.data;
      dispatch({
        type: GOT_JOB,
        payload: {
          job: job
        }
      });
    });
  };
}


