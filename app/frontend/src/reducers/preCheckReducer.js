import { 
    REQUEST_MATCH_APPLICATIONS,
    GOT_MATCH_APPLICATIONS,
    PRECHECK_UPDATED,
    ERROR_UPDATING,
    UPDATE_PRECHECK,
} from '../actions/preCheck-action'

export default function preCheckReducer(state = {}, action){
    switch (action.type){
        case REQUEST_MATCH_APPLICATIONS:
            return Object.assign({},state, {getting:true, got: false, savealertVisible:false })
        case GOT_MATCH_APPLICATIONS:
            return Object.assign({},state, {matches:action.payload.allMatches,getting:false, got:true});
        case UPDATE_PRECHECK:
            return Object.assign({},state,{saving:true, savealertVisible:true, alertMsg:"Saving...", alertType:"info" })
        case PRECHECK_UPDATED:
            window.location.href = "/candidatemanager/applicationpage"
            return Object.assign({},state, {saved:true, saving:false, savealertVisible:true, alertMsg:"Successfully saved", alertType:"success" });
        case ERROR_UPDATING:
            return Object.assign({},state,{saving:false, alertMsg:action.payload.msg, alertType:"error" })
        default:
            return state;
    }
    
}