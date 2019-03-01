import axios from "axios";

export const SAVE_FIELD = "profile:createField";
export const FIELD_SAVED = "profile:savedField";
export const SAVE_PROFILE = "profile:createProfile";
export const PROFILE_SAVED = "profile:savedProfile";
export const SHOW_ADDFIELDFLYER = "profile:showAddFieldFlyer";
export const SHOW_ADDPROFILEFLYER = "profile:showAddProfileFlyer";
export const HIDE_FIELDFLYER = "profile:hideFieldFlyer";
export const HIDE_PROFILEFLYER = "profile:hideProfileFlyer";
export const GOT_PROFILES = "profile:getProfiles";
export const HIDE_SAVEALERT = "profile:hideSaveAlert";
export const ERROR_SAVING = "profile:errorSaving";
export const MAKE_EDITVISIBLE = "profileMakeEditVisible";
export const HIDE_SAVEEDIT = "profileHideSaveEdit";

export function createProfile(newProfile) {
    return function (dispatch) {
        dispatch({
            type: SAVE_PROFILE
        });
        return axios
            .post("/profile/", newProfile)
            .then(response => {
                let newProfile = response.data.data;
                dispatch({
                    type: PROFILE_SAVED,
                    payload: {
                        newProfile: newProfile
                    }
                });
            })
            .catch(error => {
                dispatch(errorSaving(error));
            });
    };
}

function errorSaving(error) {
    let msg = error.response.data.message;
    return {
        type: ERROR_SAVING,
        payload: {
            msg: msg
        }
    };
}

export function showAddFieldFlyer() {
    return {
        type: SHOW_ADDFIELDFLYER
    };
}

export function showAddProfileFlyer() {
    return {
        type: SHOW_ADDPROFILEFLYER
    };
}

export function hideFieldFlyer() {
    return {
        type: HIDE_FIELDFLYER
    };
}

export function hideProfileFlyer() {
    return {
        type: HIDE_PROFILEFLYER
    };
}

export function makeEditVisible(profile){
    return {
        type: MAKE_EDITVISIBLE,
        payload:{
            profile:profile
        }
    };
}


export function hideSaveEdit() {
  return {
    type: HIDE_SAVEEDIT
  };
}

export function hideSaveAlert() {
    return function (dispatch) {
        dispatch({
            type: HIDE_SAVEALERT
        });

        dispatch(
            getProfiles()
        );
    }
}

export function getProfiles() {
    return function (dispatch) {
        return axios.get("/profile/").then(response => {
            let profiles = response.data.data;
            console.log(profiles);
            dispatch({
                type: GOT_PROFILES,
                payload: {
                    profiles: profiles
                }
            });
        });
    };
}


