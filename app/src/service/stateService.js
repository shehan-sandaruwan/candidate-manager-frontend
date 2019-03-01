const stateApi = require('../api/stateApi');

const update = (id, body,loggedUserId) => {
    let modifiedState = new Object();
    modifiedState.stateName = body.stateName;
    modifiedState.comment = body.comment;
    modifiedState.isActive = body.isActive;
    modifiedState.applicationByApplicationId = new Object();
    modifiedState.applicationByApplicationId.id = body.applicationId;
    modifiedState.userByUserId = new Object();
    modifiedState.userByUserId.id = loggedUserId;
    return stateApi.update(id, modifiedState).then(response => {
        let responseObject = new Object();
        responseObject.message = response.message;
        responseObject.status = response.status;
        return responseObject;
    });
}

const save = (newState,loggedUserId) => {
    let modifiedNewState = new Object();
    modifiedNewState.stateName = newState.stateName;
    modifiedNewState.comment = newState.comment;
    modifiedNewState.isActive = newState.isActive;
    modifiedNewState.applicationByApplicationId = new Object();
    modifiedNewState.applicationByApplicationId.id = newState.applicationId;
    modifiedNewState.userByUserId = new Object();
    modifiedNewState.userByUserId.id = loggedUserId;
    modifiedNewState.departmentStatesById = [];
    if (newState.departments) {
        for (var count = 0; count < newState.departments.length; count++) {
            let selectedDepartment = new Object();
            selectedDepartment.departmentByDepartmentId = new Object();
            selectedDepartment.departmentByDepartmentId.id = newState.departments[count].departmentId;
            selectedDepartment.userByAssignedTo = new Object();
            selectedDepartment.userByAssignedTo.id = newState.departments[count].shortLister;
            selectedDepartment.isActive = 1;
            modifiedNewState.departmentStatesById.push(selectedDepartment);
        }
    }
    return stateApi.save(modifiedNewState).then(response => {
        let responseObject = new Object();
        responseObject.data = response.data;
        responseObject.status = response.status;
        if (response.status == 400) {
            responseObject.message = "Invalid data entry";
        } else if (response.status == 500) {
            responseObject.message = "Internal server error";
        } else {
            responseObject.message = response.message;
        }
        return responseObject;
    });

}

const findOne = (id) => {
    return stateApi.findOne(id).then(response => {
        if (response.status == 200) {
            const state = response.data;
            let modifiedState = new Object();
            modifiedState.id = state.id;
            modifiedState.stateName = state.stateName;
            modifiedState.comment = state.comment;
            if (state.isActive == 1) {
                modifiedState.isActive = true;
            } else {
                modifiedState.isActive = false;
            }
            modifiedState.applicationByApplicationId = new Object();
            modifiedState.applicationByApplicationId.id = state.applicationByApplicationId.id;
            modifiedState.applicationByApplicationId.firstName = application.firstName;
            modifiedState.applicationByApplicationId.lastName = application.lastName;
            modifiedState.applicationByApplicationId.nic = application.nic;
            modifiedState.applicationByApplicationId.institute = application.institute;
            modifiedState.applicationByApplicationId.source = application.source;
            modifiedState.applicationByApplicationId.gender = application.gender;
            modifiedState.applicationByApplicationId.lastCompany = application.lastCompany;
            modifiedState.applicationByApplicationId.email = application.email;
            modifiedState.applicationByApplicationId.contactNumber = application.contactNumber;
            modifiedState.applicationByApplicationId.cvName = application.cvName;
            modifiedState.applicationByApplicationId.createdDate = application.createdTime;
            modifiedState.applicationByApplicationId.positionByPositionId = new Object();
            modifiedState.applicationByApplicationId.positionByPositionId.id = application.positionByPositionId.id;
            modifiedState.applicationByApplicationId.positionByPositionId.name = application.positionByPositionId.name;
            modifiedState.applicationByApplicationId.positionByPositionId.description = application.positionByPositionId.description;
            modifiedState.applicationByApplicationId.positionByPositionId.isOpen = application.positionByPositionId.isOpen;
            modifiedState.userByUserId = new Object();
            modifiedState.userByUserId.id = state.userByUserId.id;
            modifiedState.userByUserId.email = state.userByUserId.email;
            modifiedState.userByUserId.firstName = state.userByUserId.firstName;
            modifiedState.userByUserId.lastName = state.userByUserId.lastName;
            modifiedState.departmentStatesById = state.departmentStatesById;
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = modifiedState;
            return responseObject;
        } else {
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = null;
            return responseObject;
        }
    });
}

const findAllByAppId = (id) => {
    return stateApi.findAllByAppId(id).then(response => {
        if (response.status == 200) {
            const stateList = response.data;
            
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = stateList;
            return responseObject;
            
        } else {
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            return responseObject;
        }
    });
}

module.exports = {
    save,
    findOne,
    update,
    findAllByAppId
}