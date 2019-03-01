import axios from "axios";

export const REQUEST_APPLICATIONS = "home:request";
export const GOT_APPLICATIONS = "home:got";
export const SHOW_OFFER = "home:offeraccept";
export const SHOW_SAVEEDIT = "home:showSaveEdit";
export const HIDE_SAVEEDIT = "home:hideSaveEdit";
export const HIDE_SAVEALERT = "home:hideSaveAlert";
export const SHOW_HRSHORTLIST = "home:showHRShortList";
export const HIDE_HRSHORTLIST = "home:hideHRShortList";
export const CREATED_HRSHORTLISTREJECTSTATE = "home:createdHRShortListState";
export const CREATE_HRSHORTLISTEDSTATE = "home:createHRShortListedState"; 
export const CREATED_HRSHORTLISTEDSTATE = "home:createdHRShortListedState";
export const CREATE_OFFERACCEPTSTATE = "home:createOfferAcceptedState";
export const CREATED_OFFERACCEPTSTATE = "home:createdOfferAcceptedState";
export const HIDE_HRSHORTLISTALERT = "home:hideHRShortListAlert";
export const ERROR_SAVING = "home:errorSaving";
export const SHOW_SCHEDULE_INTERVIEW = "home.showScheduleInterview"
export const SAVING_SCHEDULE = "home.savingSchedule"
export const SCHEDULE_SAVED = "home.scheduleSaved"
export const ERROR_SAVING_SCHEDULE = "home.errorSavingSchedule"
export const HIDE_SCHEDULE_ALEART = "home:hideScheduleAleart";
export const REQUEST_SCHEDULE = "home:gettingSchedule";
export const GOT_SCHEDULE = "home:gotSchedule";
export const GOT_PROFILES = "home:gotProfiles";
export const NAME_SEARCHED = "home:nameSearched";
export const SHOW_SAVEEDITNOFLYER = "home:showSaveEditNoFlyer";




//this method is not using
export function getApplications() {
  return function (dispatch) {
    dispatch({
      type: REQUEST_APPLICATIONS
    });

    return axios.get("/application/").then(response => {
      let applications = response.data.data;
      dispatch({
        type: GOT_APPLICATIONS,
        payload: {
          allApplications: applications,

        }
      });
    });
  };
}

export function getApplicationsByState(state) {
  return function (dispatch) {
    dispatch({
      type: REQUEST_APPLICATIONS
    });
    return axios.get("/application/state/" + state).then(response => {
      let applications = response.data.data;
      dispatch({
        type: GOT_APPLICATIONS,
        payload: {
          allApplications: applications,
        }
      });
    })
  };
}

export function showSaveEdit(application) {
  return {
    type: SHOW_SAVEEDIT,
    payload: {
      application: application
    }
  };
}

export function showSaveEditNoFlyer(application) {
  return {
    type: SHOW_SAVEEDITNOFLYER,
    payload: {
      application: application
    }
  };
}


export function offeraccept(application) {
  return {
    type: SHOW_OFFER,
    payload: {
      application: application
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

export function showHRShortList(application) {
  return {
    type: SHOW_HRSHORTLIST,
    payload: {
      application: application
    }
  };
}

export function hrReject(rejectState) {
  return function (dispatch) {
    return axios
      .post("/state/", rejectState)
      .then(response => {
        dispatch({
          type: CREATED_HRSHORTLISTREJECTSTATE,
        });
      })
      .catch(error => {
        dispatch(errorSaving(error));
      });
  };
}

export function offeraccepted(offeracceptedstate){
  return function (dispatch){
    dispatch({
      type: CREATE_OFFERACCEPTSTATE
    });
    return axios
      .post("/state/", offeracceptedstate)
      .then(response => {
          dispatch({
            type: CREATED_OFFERACCEPTSTATE
          });
      })
      .catch(error => {
          dispatch(errorSaving(error));
      });
  }
}

export function hrShortListed(shortListedState) {
  return function (dispatch) {
    dispatch({
      type: CREATE_HRSHORTLISTEDSTATE
    });
    return axios
      .post("/state/", shortListedState)
      .then(response => {
        dispatch({
          type: CREATED_HRSHORTLISTEDSTATE,
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
    msg = ("Invalid Data entry");
  }
  return {
    type: ERROR_SAVING,
    payload: {
      msg: msg
    }
  };
}

export function hideHRShortListAlert() {
  return function (dispatch) {
    dispatch({
      type: HIDE_HRSHORTLISTALERT
    });

    dispatch(
      getApplicationsByState("pre-checked")
    );
  }
}

//when showing schedule panel, profile get request is also made
export function showScheduleInterview(application, state) {
  return function (dispatch) {
    dispatch({
      type: SHOW_SCHEDULE_INTERVIEW,
      payload: {
        application: application,
        state: state
      }
    });
    return axios.get("/profile/").then(response => {
      let feedbackProfiles = response.data.data;
      dispatch({
        type: GOT_PROFILES,
        payload: {
          profiles: feedbackProfiles
        }
      });
    })
  };
}


export function saveSchedule(schedule) {
  return function (dispatch) {
    dispatch({
      type: SAVING_SCHEDULE
    });
    return axios
      .post("/schedule/", schedule)
      .then(response => {
        dispatch({
          type: SCHEDULE_SAVED,
          payload: {
            id: schedule.applicationByApplicationId.id
          }
        });
      })
      .catch(error => {
        let msg = "Network Error. Please Check the Connection."
        if (error.response.status === 400) {
          msg = ("Invalid Data entry");
        }
        return {
          type: ERROR_SAVING_SCHEDULE,
          payload: {
            msg: msg
          }
        };
      });
  };
}

export function hideScheduleAleart() {
  return {
    type: HIDE_SCHEDULE_ALEART
  };
}

export function showScheduleEdit(application) {
  let applicationId = application.id;
  return function (dispatch) {
    dispatch({
      type: REQUEST_SCHEDULE
    });
    return axios.get("/schedule/application/" + applicationId).then(response => {
      let activeSchedule = response.data.data;
      console.log(activeSchedule)
      dispatch({
        type: GOT_SCHEDULE,
        payload: {
          schedule: activeSchedule,
        }
      });
    })
  };
}

export function searchFilterApplications(applications, name){

  // console.log('actions called')
  // console.log(name);
  // console.log(applications)
  // let appCopy = applications

  // let appCopy = applications.filter((application) => {
  //   let fullname = toString(application.firstName + application.lastName)
  //   console.log(fullname)
  //   return fullname.includes(name);
  // })

  let appCopy = applications.map((app) => {
    let fullName = app.firstName + app.lastName;
    if (fullName.includes(name)){
      return app;
    }
    return null;
  })

  let filter = appCopy.filter((app) => {
    return app !== null
  })




  // console.log(filter);
  return function(dispatch) {
    dispatch({
      type: NAME_SEARCHED,
      payload: {
        results: filter
      }
    })
  }


}


