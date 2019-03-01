import {
    SAVE_PROFILE,
    PROFILE_SAVED,
    SHOW_ADDPROFILEFLYER,
    HIDE_FIELDFLYER,
    HIDE_PROFILEFLYER,
    GOT_PROFILES,
    HIDE_SAVEALERT,
    ERROR_SAVING,
    HIDE_SAVEEDIT,
    MAKE_EDITVISIBLE
} from '../actions/profile-action';

export default function profileReducer(state = {}, action) {
    switch (action.type) {
        case SAVE_PROFILE:
            return Object.assign({}, state, { isSaveAlertVisible: true, alertType: "info", alertMsg: "Saving..." });
        case PROFILE_SAVED:
            return Object.assign({}, state, { isSaveAlertVisible: true, alertType: "success", alertMsg: "Profile saved successfully" });
        case SHOW_ADDPROFILEFLYER:
            return Object.assign({}, state, { isAddProfileFlyerVisible: true });
        case HIDE_FIELDFLYER:
            return Object.assign({}, state, { isAddFieldFlyerVisible: false });
        case HIDE_PROFILEFLYER:
            return Object.assign({}, state, { isAddProfileFlyerVisible: false });
        case HIDE_SAVEALERT:
            return Object.assign({}, state, { isAddProfileFlyerVisible: false, isSaveAlertVisible: false });
        case GOT_PROFILES:
            return Object.assign({}, state, { allProfiles: action.payload.profiles });
        case ERROR_SAVING:
            return Object.assign({}, state, { isSaveAlertVisible: true, alertMsg: action.payload.msg, alertType: "error" });
        case MAKE_EDITVISIBLE:
            return Object.assign({}, state, { isSaveEditVisible:true,profile:action.payload.profile });
        case HIDE_SAVEEDIT:
            return Object.assign({}, state, { isSaveEditVisible:false });
        default:
            return state;
    }

}