import {
    REQUEST_APPLICATIONS,
    GOT_APPLICATIONS,
    SHOW_SAVEEDIT,
    HIDE_SAVEEDIT,
    HIDE_SAVEALERT,
    SHOW_HRSHORTLIST,
    CREATED_HRSHORTLISTREJECTSTATE,
    CREATE_HRSHORTLISTEDSTATE,
    CREATED_HRSHORTLISTEDSTATE,
    HIDE_HRSHORTLISTALERT,
    ERROR_SAVING,
    SHOW_SCHEDULE_INTERVIEW,
    SCHEDULE_SAVED,
    SAVING_SCHEDULE,
    ERROR_SAVING_SCHEDULE,
    REQUEST_SCHEDULE,
    GOT_SCHEDULE,
    GOT_PROFILES,
    SHOW_OFFER,
    CREATE_OFFERACCEPTSTATE,
    CREATED_OFFERACCEPTSTATE,
    NAME_SEARCHED,
    SHOW_SAVEEDITNOFLYER

} from '../actions/home-actions'
import {
    STATE_UPDATED,
    UPDATE_STATE,
    ERROR_UPDATING
} from '../actions/state-actions'

export default function homeReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_APPLICATIONS:
            return Object.assign({}, state, { getting: true, got: false })
        case GOT_APPLICATIONS:
            var newState = Object.assign({}, state, { allApplications: action.payload.allApplications, getting: false, got: true });
            return newState;
        case SHOW_SAVEEDIT:
            return Object.assign({}, state, { isEditVisible: true, isEdit: true, currentEdit: action.payload.application });
        
        case SHOW_OFFER:
            return Object.assign({}, state, { isacceptVisible: true, isEdit: true, currentEdit: action.payload.application });
        
        
        case HIDE_SAVEEDIT:
            return Object.assign({}, state, {
                isEditVisible: false, savealertVisible: false, isacceptVisible: false, isHRShortListVisible: false,
                isScheduleInterviewVisible: false, isScheduleEdit: false
            })
        case HIDE_SAVEALERT:
            return Object.assign({}, state, { savealertVisible: false });
        case SHOW_HRSHORTLIST:
            return Object.assign({}, state, { isHRShortListVisible: true, currentEdit: action.payload.application, hrShortListAlertVisible: false });
        case CREATED_HRSHORTLISTREJECTSTATE:
            newState = Object.assign({}, state, { hrShortListAlertVisible: true, hrShortListAlertMsg: "Rejected", hrShortListAlertType: "error" });
            return newState;
        case HIDE_HRSHORTLISTALERT:
            newState = Object.assign({}, state, { hrShortListAlertVisible: false, isHRShortListVisible: false });
            return newState;

        case CREATE_OFFERACCEPTSTATE:
            return Object.assign({}, state);

        case CREATED_OFFERACCEPTSTATE:
            return Object.assign({}, state);

        case CREATE_HRSHORTLISTEDSTATE:
            return Object.assign({}, state, { hrShortListAlertVisible: true, hrShortListAlertType: "info", hrShortListAlertMsg: "HR Shortlisting..." });
        case CREATED_HRSHORTLISTEDSTATE:
            return Object.assign({}, state, { hrShortListAlertVisible: true, hrShortListAlertType: "success", hrShortListAlertMsg: "HR ShortListed Successfully" });
        case ERROR_SAVING:
            return Object.assign({}, state, { hrShortListAlertVisible: true, hrShortListAlertMsg: action.payload.msg, hrShortListAlertType: "error" });

        case SHOW_SCHEDULE_INTERVIEW:
            if (action.payload.state === "interviewed") {
                return Object.assign({}, state, { isScheduleInterviewVisible: true, currentEdit: action.payload.application, scheduleAlertVisible: false, isInterviewed: true });
            } else {
                return Object.assign({}, state, { isScheduleInterviewVisible: true, currentEdit: action.payload.application, scheduleAlertVisible: false, isInterviewed: false });

            }
        case SAVING_SCHEDULE:
            return Object.assign({}, state, { scheduleAlertVisible: true, scheduleAlertType: "info", scheduleAlertMsg: "Saving schedule..." });
        case SCHEDULE_SAVED:
            let stateCopy = Object.assign({}, state, { scheduleAlertVisible: true, scheduleAlertType: "success", scheduleAlertMsg: "Successfully saved..." });
            stateCopy.allApplications = stateCopy.allApplications.filter((application) => application.id != action.payload.id)
            return stateCopy;
        case ERROR_SAVING_SCHEDULE:
            return Object.assign({}, state, { scheduleAlertVisible: true, scheduleAlertMsg: action.payload.msg, scheduleAlertType: "error" });
        case REQUEST_SCHEDULE:
            return Object.assign({}, state, { isScheduleEdit: true, isScheduleInterviewVisible: true, getting: true, got: false, scheduleAlertVisible: false })
        case GOT_SCHEDULE:
            return Object.assign({}, state, { currentSchedule: action.payload.schedule, getting: false, got: true })
        case GOT_PROFILES:
            return Object.assign({}, state, { allProfiles: action.payload.profiles });
        case UPDATE_STATE:
            return Object.assign({}, state, { scheduleAlertVisible: true, scheduleAlertType: "info", scheduleAlertMsg: "Saving schedule..." });
        case STATE_UPDATED:
            stateCopy = Object.assign({}, state, { scheduleAlertVisible: true, scheduleAlertType: "success", scheduleAlertMsg: "Successfully saved..." });
            stateCopy.allApplications = stateCopy.allApplications.filter((application) => application.id != action.payload.appId)
            return stateCopy;
        case ERROR_UPDATING:
            return Object.assign({}, state, { scheduleAlertVisible: true, scheduleAlertMsg: action.payload.msg, scheduleAlertType: "error" });

        case NAME_SEARCHED:
            return {...state,
                allApplications:action.payload.results
            
            }

        case NAME_SEARCHED:
            return {...state,
                allApplications:action.payload.results
            
            }
        
        case SHOW_SAVEEDITNOFLYER:
            return Object.assign({}, state, { isEditVisible: false, isEdit: false, currentEdit: action.payload.application });
        default:
            return state;
    }

}
