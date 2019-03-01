/*
 This methods basically do the data modification according to the frontend and backend requests
 Get  httprequets from routes file and call the relevant api
 */

const applicationApi = require('../api/applicationApi');

const findSpecificApplications = (state) => {
    return applicationApi.findSpecificApplications(state).then(response => {
        if (response.status == 200) {
            return response;
        } else {
            return response.error;
        }
    });
}

const save = (newApplication) => {
    let modifiedNewApplication = new Object();
    modifiedNewApplication.firstName = newApplication.firstName;
    modifiedNewApplication.lastName = newApplication.lastName;
    modifiedNewApplication.nic = newApplication.nic;
    modifiedNewApplication.institute = newApplication.institute;
    modifiedNewApplication.source = newApplication.source;
    modifiedNewApplication.gender = newApplication.gender;
    modifiedNewApplication.lastCompany = newApplication.lastCompany;
    modifiedNewApplication.email = newApplication.email;
    modifiedNewApplication.contactNumber = newApplication.contactNumber;
    // modifiedNewApplication.currentPosition = newApplication.currentPosition;
    // modifiedApplication.experience = newApplication.experience;
    let timestamp = new Date();
    modifiedNewApplication.cvName = newApplication.nic;
    modifiedNewApplication.positionByPositionId = new Object();
    modifiedNewApplication.positionByPositionId.id = newApplication.positionId;
    return applicationApi.save(modifiedNewApplication).then(response => {
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
    return applicationApi.findOne(id).then(response => {
        if (response.status == 200) {
            const application = response.data;
            let modifiedApplication = new Object();
            modifiedApplication.id = application.id;
            modifiedApplication.firstName = application.firstName;
            modifiedApplication.lastName = application.lastName;
            modifiedApplication.nic = application.nic;
            modifiedApplication.institute = application.institute;
            modifiedApplication.source = application.source;
            modifiedApplication.gender = application.gender;
            modifiedApplication.lastCompany = application.lastCompany;
            modifiedApplication.email = application.email;
            modifiedApplication.contactNumber = application.contactNumber;
            modifiedApplication.cvName = application.cvName;
            modifiedApplication.createdDate = application.createdTime;
            // modifiedNewApplication.currentPosition = application.currentPosition;
            // modifiedApplication.experience = application.experience;
            modifiedApplication.positionByPositionId = new Object();
            modifiedApplication.positionByPositionId.id = application.positionByPositionId.id;
            modifiedApplication.positionByPositionId.name = application.positionByPositionId.name;
            modifiedApplication.positionByPositionId.description = application.positionByPositionId.description;
            modifiedApplication.positionByPositionId.isOpen = application.positionByPositionId.isOpen;
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = modifiedApplication;
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

const findAll = () => {
    return applicationApi.findAll().then(response => {
        if (response.status == 200) {
            let modifiedApplications = [];
            response.data.map(application => {
                let modifiedApplication = new Object();
                modifiedApplication.id = application.id;
                modifiedApplication.firstName = application.firstName;
                modifiedApplication.lastName = application.lastName;
                modifiedApplication.nic = application.nic;
                modifiedApplication.institute = application.institute;
                modifiedApplication.source = application.source;
                modifiedApplication.gender = application.gender;
                modifiedApplication.lastCompany = application.lastCompany;
                modifiedApplication.email = application.email;
                modifiedApplication.contactNumber = application.contactNumber;
                modifiedApplication.cvName = application.cvName;
                modifiedApplication.createdDate = application.createdTime;
                // modifiedNewApplication.currentPosition = application.currentPosition;
                // modifiedApplication.experience = application.experience;
                modifiedApplication.positionByPositionId = new Object();
                modifiedApplication.positionByPositionId.id = application.positionByPositionId.id;
                modifiedApplication.positionByPositionId.name = application.positionByPositionId.name;
                modifiedApplication.positionByPositionId.description = application.positionByPositionId.description;
                modifiedApplication.positionByPositionId.isOpen = application.positionByPositionId.isOpen;
                modifiedApplications.push(modifiedApplication);
            });
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = modifiedApplications;
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

const match = (firstName, lastName, email, phone, nic, candidateId) => {
    return applicationApi.match(firstName, lastName, email, phone, nic, candidateId).then(response => {
        if (response.status == 200) {           
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = response.data;
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

const getAssigned = (id) => {
    return applicationApi.getAssigned(id).then(response => {
        if (response.status == 200) {
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = response.data;
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

module.exports = {
    findSpecificApplications,
    save,
    findOne,
    findAll,
    match,
    getAssigned
}