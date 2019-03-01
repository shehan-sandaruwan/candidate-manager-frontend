import {
    REQUEST_ASSIGNED_APPLICATIONS,
    GOT_ASSIGNED_APPLICATIONS,
    LINE_SHORTLIST_UPDATED,
    ERROR_UPDATING,
    UPDATE_LINE_SHORTLIST,
    SHOW_SIDEBAR,
    HIDE_SIDEBAR
} from '../actions/lineShorlist-action'

export default function lineShortListReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_ASSIGNED_APPLICATIONS:
            return Object.assign({}, state, {getting: true, got: false})
        case GOT_ASSIGNED_APPLICATIONS:
            var newState = Object.assign({}, state, {
                assignedApplications: action.payload.allMatches,
                getting: false,
                got: true
            });
            return newState;
        case UPDATE_LINE_SHORTLIST:
            return Object.assign({}, state, {
                saving: true,
                savealertVisible: true,
                alertMsg: "Saving...",
                alertType: "info"
            })
        case LINE_SHORTLIST_UPDATED:
            newState = Object.assign({}, state, {
                saved: true,
                saving: false,
                savealertVisible: true,
                alertMsg: "Successfully saved",
                alertType: "success"
            });
            newState.assignedApplications = newState.assignedApplications.filter((application) => application.id != action.payload.applicationId);
            return newState;
        case ERROR_UPDATING:
            return Object.assign({}, state, {saving: false, alertMsg: action.payload.msg, alertType: "error"})
        case LINE_SHORTLIST_UPDATED:
            return Object.assign({}, state, {
                saved: true,
                saving: false,
                savealertVisible: true,
                alertMsg: "Successfully saved",
                alertType: "success"
            });

        case SHOW_SIDEBAR:
            return Object.assign({}, state, {sideBarVisible: true, currentEdit: action.payload.currentEdit});

        case HIDE_SIDEBAR:
            return Object.assign({}, state, {sideBarVisible: false, savealertVisible: false});
        default:
            return state;
    }

}