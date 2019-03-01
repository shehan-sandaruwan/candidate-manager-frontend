const axios = require('axios');
const authHeader = require('../databaseAuth');
const constants = require('../../src/constants');
var urljoin = require('url-join');

const findSpecificApplications = (state) => {
    return axios.get(constants.backendIpAddress+'/application/state/'+ state, { headers: { 'Authorization': authHeader.Basic } })
        .then(function (response) {
            return response.data;
        }).catch((error) => {
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

const findOne = (id) => {
    id = id.toString();
    return axios.get(urljoin(constants.backendIpAddress,'/application/', id), { headers: { 'Authorization': authHeader.Basic } })
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

const findAll = () => {
    return axios.get(urljoin(constants.backendIpAddress,'/application/'), { headers: { 'Authorization': authHeader.Basic } })
        .then(function (response) {
            return response.data;
        }).catch((error) => {
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

const match = (firstName, lastName, email, phone, nic, candidateId) => {
    return axios.get(urljoin(constants.backendIpAddress,'/application/match'), 
    { headers: { 'Authorization': authHeader.Basic } , 
    params: {firstName: firstName, lastName:lastName, email:email, phone:phone, nic:nic, candidateId:candidateId}})
        .then(function (response) {
            return response.data;
        }).catch((error) => {
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

const save = (body) => {
    return axios.post(urljoin(constants.backendIpAddress,'/application/'), body, { headers: { 'Authorization': authHeader.Basic } })
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

const getAssigned = (id) => {
    return axios.get(urljoin(constants.backendIpAddress,'/application/assignedTo/'+id), { headers: { 'Authorization': authHeader.Basic } })
        .then(function (response) {
            return response.data;
        }).catch((error) => {
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
    findSpecificApplications,
    save,
    findOne,
    findAll,
    match,
    getAssigned
}