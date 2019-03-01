/*
 This methods basically do the data modification according to the frontend and backend requests
 Get  httprequets from routes file and call the relevant api
 */
const scheduleApi = require('../api/scheduleApi');

const save = (schedule) => {
    let scheduleCopy = Object.assign({}, schedule);
    let userId = scheduleCopy.userId;
    delete scheduleCopy.userId;

    return scheduleApi.save(scheduleCopy, userId).then(response => {
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

const findScheduledInterviews = (loggedUserId) => {
    return scheduleApi.findScheduledInterviews(loggedUserId).then(response => {
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

const findScheduleByApplicationId = (applicationId) => {
    return scheduleApi.findScheduleByApplicationId(applicationId).then(response => {
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

/* this service is used to proceed a candidate to a final state directly after an interview 
(or proceed to "interviewed" state until feedback profile sub system is implemented) */
const proceedToFinal = (scheduleFeedback,scheduleId,userId) => {
    let scheduleFeedbackCopy = Object.assign({}, scheduleFeedback);
    let nextState = scheduleFeedbackCopy.nextState;
    

    return scheduleApi.proceedToFinal(scheduleFeedbackCopy, scheduleId, nextState, userId).then(response => {
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



module.exports = {
    save,
    findScheduledInterviews,
    proceedToFinal,
    findScheduleByApplicationId

}