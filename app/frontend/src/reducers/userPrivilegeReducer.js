import {
    GOT_PRIVILEDGE,
    REQUEST_PRIVILEDGE,
    SHOW_SAVEEDIT,
    HIDE_SAVEEDIT,
    SAVE_PRIVILEDGE,
    PRIVILEDGE_SAVED,
    PRIVILEDGE_EDITED_SAVED,
    HIDE_SAVEALERT,
    ERROR_SAVING,
    GOT_SPECIFICPRIVILEGEDUSER

} from '../actions/userPriviledge-actions'

export default function userPrivilegeReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_PRIVILEDGE:
            return Object.assign({}, state, { getting: true, got: false })
        case GOT_PRIVILEDGE:
            var newState = Object.assign({}, state, { allPrivileges: action.payload.allPriviledges, getting: false, got: true });
            return newState;
        case SHOW_SAVEEDIT:
            if (action.payload.privilege) {
                return Object.assign({}, state, { isPrivilegeEditVisible: true, saved: false, isPriviledgeEdit: true, currentEdit: action.payload.privilege })
            } else {
                return Object.assign({}, state, { isPrivilegeEditVisible: true, isPriviledgeEdit: false, saved: false, currentEdit: {} })
            }
        case HIDE_SAVEEDIT:
            return Object.assign({}, state, { isPrivilegeEditVisible: false, savealertVisible: false })
        case SAVE_PRIVILEDGE:
            return Object.assign({}, state, { saving: true, savealertVisible: true, alertMsg: "Saving...", alertType: "info" })
        case PRIVILEDGE_SAVED:
            newState = Object.assign({}, state, { saved: true, saving: false, savealertVisible: true, alertMsg: "Successfully saved", alertType: "success" });
            newState.allPrivileges = newState.allPrivileges.concat(action.payload.newPrivilege);
            return newState;
        case PRIVILEDGE_EDITED_SAVED:
            newState = Object.assign({}, state, { saved: true, saving: false, savealertVisible: true, alertMsg: "Successfully updated", alertType: "success" });
            let updatedPriviledge = action.payload.updatedPriviledge;
            newState.allPrivileges = newState.allPrivileges.filter((privilege) => privilege.id != updatedPriviledge.id);
            newState.allPrivileges = newState.allPrivileges.concat(updatedPriviledge);
            return newState;
        case HIDE_SAVEALERT: //reload issue
            return Object.assign({}, state, { saved: false, savealertVisible: false,isPrivilegeEditVisible: false})
        case ERROR_SAVING:
            return Object.assign({}, state, { saving: false, alertMsg: action.payload.msg, alertType: "error" });
        case GOT_SPECIFICPRIVILEGEDUSER:
            return Object.assign({}, state, { privilegedUsers: action.payload.privilegedUsers });
        default:
            return state;
    }

}