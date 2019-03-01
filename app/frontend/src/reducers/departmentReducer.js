import {
    SAVE_DEPARTMENT,
    DEPARTMENT_SAVED,
    DEPARTMENT_EDITED_SAVED,
    REQUEST_DEPARTMENT,
    GOT_DEPARTMENTS,
    SHOW_SAVEEDIT,
    HIDE_SAVEEDIT,
    HIDE_SAVEALERT,
    ERROR_SAVING
}
from "../actions/department-actions";

export default function departmentReducer(state = {}, action){
    switch (action.type){
        case REQUEST_DEPARTMENT:
            return Object.assign({},state, {getting:true, got: false})
        case GOT_DEPARTMENTS:
            return  Object.assign({},state, {allDepartments:action.payload.allDepartments});
        case SHOW_SAVEEDIT:
            if (action.payload.department){
                return Object.assign({},state,{isEditVisible:true, saved:false, isEdit:true, currentEdit:action.payload.department})
            }else{
                return Object.assign({},state,{isEditVisible:true, isEdit:false, saved: false, currentEdit:{}})
            }
        case HIDE_SAVEEDIT:
            return Object.assign({},state,{isEditVisible:false, savealertVisible:false})
        case SAVE_DEPARTMENT:
            return Object.assign({},state,{saving:true, savealertVisible:true, alertMsg:"Saving...", alertType:"info" })
        case DEPARTMENT_SAVED:
            var newState = Object.assign({},state, {saved:true, saving:false, savealertVisible:true, alertMsg:"Successfully saved", alertType:"success" });
            newState.allJobs = newState.allJobs.concat(action.payload.newJob);
            return newState;
        case DEPARTMENT_EDITED_SAVED:
            newState = Object.assign({},state, {saved:true, saving:false, savealertVisible:true, alertMsg:"Successfully updated", alertType:"success" });
            let updatedJob = action.payload.updatedJob;
            newState.allJobs = newState.allJobs.filter((job)=>job.id != updatedJob.id);
            newState.allJobs = newState.allJobs.concat(updatedJob);
            return newState;
        case HIDE_SAVEALERT:
            return Object.assign({},state,{saved:false, savealertVisible: false})
        case ERROR_SAVING:
            return Object.assign({},state,{saving:false, alertMsg:action.payload.msg, alertType:"error" })
        default:
            return state;
    }
    
}