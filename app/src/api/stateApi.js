const axios = require('axios');
const authHeader = require('../databaseAuth');
const constants = require('../../src/constants');
var urljoin = require('url-join');

const update = (id, body) => {
    return axios.put(constants.backendIpAddress + '/state/' + id, body, { headers: { 'Authorization': authHeader.Basic } })
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

const save = (body) => {
    return axios.post(urljoin(constants.backendIpAddress, '/state/'), body, { headers: { 'Authorization': authHeader.Basic } })
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

const findOne = (id) => {
    id = id.toString();
    return axios.get(constants.backendIpAddress + '/state/' + id, { headers: { 'Authorization': authHeader.Basic } })
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

const findAllByAppId = (id) => {
    id = id.toString();
    return axios.get(constants.backendIpAddress + '/state/application/' + id, { headers: { 'Authorization': authHeader.Basic } })
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
    findOne,
    update,
    findAllByAppId
}