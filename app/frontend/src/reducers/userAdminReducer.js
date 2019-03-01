import {
    GOT_ADMIN,
    REQUEST_ADMIN,
    SHOW_ADMIN_EDIT,
    HIDE_ADMIN_EDIT,
    SAVE_ADMIN,
    ADMIN_SAVED,
    ADMIN_EDITED_SAVED,
    HIDE_ADMIN_ALERT,
    ERROR_SAVING

} from '../actions/user-admin-actions'

export default function userAdminReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_ADMIN:
            return Object.assign({}, state, { getting: true, got: false })
        case GOT_ADMIN:
            var newState = Object.assign({}, state, { allAdmins: action.payload.allAdmins, getting: false, got: true });
            return newState;
        case SHOW_ADMIN_EDIT:
            if (action.payload.admin) {
                return Object.assign({}, state, { isAdminEditVisible: true, saved: false, isEdit: true, currentEdit: action.payload.admin })
            } else {
                return Object.assign({}, state, { isAdminEditVisible: true, isEdit: false, saved: false, currentEdit: {} })
            }
        case HIDE_ADMIN_EDIT:
            return Object.assign({}, state, { isAdminEditVisible: false, savealertVisible: false })
        case SAVE_ADMIN:
            return Object.assign({}, state, { saving: true, savealertVisible: true, alertMsg: "Saving...", alertType: "info" })
        case ADMIN_SAVED:
            newState = Object.assign({}, state, { saved: true, saving: false, savealertVisible: true, alertMsg: "Successfully saved", alertType: "success" });
            newState.allAdmins = newState.allAdmins.concat(action.payload.newAdmin);
            return newState;
        case ADMIN_EDITED_SAVED:
            newState = Object.assign({}, state, { saved: true, saving: false, savealertVisible: true, alertMsg: "Successfully updated", alertType: "success" });
            let updatedAdmin = action.payload.updatedAdmin;
            newState.currentEdit = updatedAdmin
            newState.allAdmins = newState.allAdmins.filter((admin) => admin.id != updatedAdmin.id);
            newState.allAdmins = newState.allAdmins.concat(updatedAdmin);
            return newState;
        case HIDE_ADMIN_ALERT:
            return Object.assign({}, state, { saved: false, savealertVisible: false, isAdminEditVisible: false })
        case ERROR_SAVING:
            return Object.assign({}, state, { saving: false, alertMsg: action.payload.msg, alertType: "error" });
        
        default:
            return state;
    }

}