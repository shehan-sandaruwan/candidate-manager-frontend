const axios = require('axios');
var urljoin = require('url-join');
const constants = require('../../src/constants');
const authHeader = require('../databaseAuth');

/*
   call the position controller of the java backend to create a particular position
*/
const save = (body,id) => {
    return axios.post(urljoin(constants.backendIpAddress, '/schedule/'+id), body, { headers: { 'Authorization': authHeader.Basic } })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            if (!error.response) {
                let responseObject = new Object();
                responseObject.message = "Network error";
                responseObject.status = 800;
                return responseObject;
            } else {
                return error.response.data;
            }
        });
}

const findScheduledInterviews = (loggedUserId) => {
    return axios.get(constants.backendIpAddress + '/schedule/assignedTo/'+loggedUserId,{ headers: { 'Authorization': authHeader.Basic } })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            if (!error.response) {
                let responseObject = new Object();
                responseObject.message = "Network error";
                responseObject.status = 800;
                return responseObject;
            } else {
                return error.response.data;
            }
        });
}

/*custom method for retrieve active schedule for a certain application*/
const findScheduleByApplicationId = (applicationId) => {
    return axios.get(constants.backendIpAddress + '/schedule/application/'+applicationId,{ headers: { 'Authorization': authHeader.Basic } })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            if (!error.response) {
                let responseObject = new Object();
                responseObject.message = "Network error";
                responseObject.status = 800;
                return responseObject;
            } else {
                return error.response.data;
            }
        });
}

/* this API is used to proceed a candidate to a final state directly after an interview 
(or proceed to "interviewed" state until feedback profile sub system is implemented) */

const proceedToFinal = (body,id,nextState,userId)=>{
    return axios.post(urljoin(constants.backendIpAddress, '/schedule/'+id)+'/'+nextState+'/'+userId, body, { headers: { 'Authorization': authHeader.Basic } })
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            if (!error.response) {
                let responseObject = new Object();
                responseObject.message = "Network error";
                responseObject.status = 800;
                return responseObject;
            } else {
                return error.response.data;
            }
        });
}

module.exports = {
    save,
    findScheduledInterviews,
    proceedToFinal,
    findScheduleByApplicationId
}