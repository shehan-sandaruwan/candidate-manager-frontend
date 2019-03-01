const axios = require('axios');
var urljoin = require('url-join');
const constants = require('../../src/constants');
const authHeader = require('../databaseAuth');

const save = (body) => {
    return axios.post(urljoin(constants.backendIpAddress, '/profile/'), body, { headers: { 'Authorization': authHeader.Basic } })
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
    return axios.get(urljoin(constants.backendIpAddress, '/profile/'), { headers: { 'Authorization': authHeader.Basic} })
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
    save,
    findAll
}