import {
    GOT_USER,
    REQUEST_USER,
    SHOW_SAVEEDIT,
    HIDE_SAVEEDIT,
    SAVE_USER,
    USER_SAVED,
    USER_EDITED_SAVED,
    HIDE_SAVEALERT,
    ERROR_SAVING

} from '../actions/user-action'

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_USER:
            return Object.assign({}, state, { getting: true, got: false })
        case GOT_USER:
            var newState = Object.assign({}, state, { allUsers: action.payload.allUsers, getting: false, got: true });
            return newState;
        case SHOW_SAVEEDIT:
            if (action.payload.user) {
                return Object.assign({}, state, { isEditVisible: true, saved: false, isEdit: true, currentEdit: action.payload.user })
            } else {
                return Object.assign({}, state, { isEditVisible: true, isEdit: false, saved: false, currentEdit: {} })
            }
        case HIDE_SAVEEDIT:
            return Object.assign({}, state, { isEditVisible: false, savealertVisible: false })
        case SAVE_USER:
            return Object.assign({}, state, { saving: true, savealertVisible: true, alertMsg: "Saving...", alertType: "info" })
        case USER_SAVED:
            newState =Object.assign({}, state, { saved: true, saving: false, savealertVisible: true, alertMsg: "Successfully saved", alertType: "success" });
            newState.allUsers = newState.allUsers.concat(action.payload.newUser);
            return newState;
        case USER_EDITED_SAVED:
            newState = Object.assign({}, state, { saved: true, saving: false, savealertVisible: true, alertMsg: "Successfully updated", alertType: "success" });
            let updatedUser = action.payload.updatedUser;
            newState.allUsers = newState.allUsers.filter((user) => user.id != updatedUser.id);
            newState.allUsers = newState.allUsers.concat(updatedUser);
            return newState;
        case HIDE_SAVEALERT:
            return Object.assign({}, state, { saved: false, savealertVisible: false })
        case ERROR_SAVING:
            return Object.assign({}, state, { saving: false, alertMsg: action.payload.msg, alertType: "error" });
        
        default:
            return state;
    }

}