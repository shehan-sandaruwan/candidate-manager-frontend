var urljoin = require('url-join');
const constants = require('../../src/constants');
const authHeader = require('../databaseAuth');
const axios = require('axios');

const save = (body) => {
    return axios.post(urljoin(constants.backendIpAddress, '/feedback/'), body, { headers: { 'Authorization': authHeader.Basic } })
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
const getAllByScheduleId = (scheduleId) => {
    return axios.get(urljoin(constants.backendIpAddress, '/feedback/schedule/',scheduleId),{ headers: { 'Authorization': authHeader.Basic } })
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
    getAllByScheduleId   
}