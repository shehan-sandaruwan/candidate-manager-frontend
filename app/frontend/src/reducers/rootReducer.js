import { combineReducers} from 'redux';
import applicationReducer from './applicationReducer';
import jobReducer from './jobReducer'
import preCheckReducer from './preCheckReducer'
import homeReducer from './homeReducer';
import userReducer from './userReducer';
import privilegeReducer from './userPrivilegeReducer';
import departmentReducer from './departmentReducer';
import lineShortlistReducer from './lineShortListReducer';
import userAdminReducer from './userAdminReducer';
import scheduledReducer from './scheduledReducer';
import stateReducer from './stateReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import feedbackReducer from './feedbackReducer';

const rootReducer = combineReducers({
    application: applicationReducer,
    job: jobReducer,
    user: userReducer,
    preCheck: preCheckReducer,
    home: homeReducer,
    privilege: privilegeReducer,
    department:departmentReducer,
    lineShortlist: lineShortlistReducer,
    loging:authReducer,
    admin:userAdminReducer,
    scheduledInterviews:scheduledReducer,
    state:stateReducer,
    profile:profileReducer,
    feedback:feedbackReducer
});

export default rootReducer;