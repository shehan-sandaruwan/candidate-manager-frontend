const axios = require('axios');
var urljoin = require('url-join');
const constants = require('../../src/constants');
const authHeader = require('../databaseAuth');

/*
   call the department controller of the java backend to get a particular department
*/
const findOne = (id) => {
    id = id.toString();
    return axios.get(urljoin(constants.backendIpAddress, '/department/', id), { headers: { 'Authorization': authHeader.Basic } })
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

/*
   call the department controller of the java backend to get all the existing departments
*/
const findAll = () => {
    return axios.get(urljoin(constants.backendIpAddress, '/department/'), { headers: { 'Authorization': authHeader.Basic} })
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

/*
   call the department controller of the java backend to create a particular department
*/
const save = (body) => {
    return axios.post(urljoin(constants.backendIpAddress, '/department/'), body, { headers: { 'Authorization': authHeader.Basic } })
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

/*
   call the position controller of the java backend to update an existing position
*/
const update = (id, body) => {
    return axios.put(constants.backendIpAddress+'/department/'+id, body, { headers: { 'Authorization': authHeader.Basic } })
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
    findAll,
    update
    
}