const axios = require('axios');
const Base64 = require('base-64');
const tok = 'user1:password1';
const hash = Base64.encode(tok);
const Basic = 'Basic ' + hash;
var urljoin = require('url-join');
const constants = require('../../src/constants');

/*
   call the userPriviledge controller of the java backend to get a particular position
*/
const findOne = (id) => {
    id = id.toString();
    return axios.get(urljoin(constants.backendIpAddress, '/userPrivilege/', id), { headers: { 'Authorization': Basic } })
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

const findAllByUserId = (id) => {
    id = id.toString();
    return axios.get(urljoin(constants.backendIpAddress, '/userPrivilege/user/', id), { headers: { 'Authorization': Basic } })
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
   call the userPriviledge controller of the java backend to get all the existing positions
*/
const findAll = () => {
    return axios.get(urljoin(constants.backendIpAddress, '/userPrivilege/'), { headers: { 'Authorization': Basic } })
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
   call the userPriviledge controller of the java backend to create a particular privilege
*/
const save = (body) => {
    return axios.post(urljoin(constants.backendIpAddress, '/userPrivilege/'), body, { headers: { 'Authorization': Basic } })
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
   call the userPriviledge controller of the java backend to update an existing privilege
*/
const update = (id, body) => {
    return axios.put(constants.backendIpAddress+'/userPrivilege/'+id, body, { headers: { 'Authorization': Basic } })
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
    update,
    findAllByUserId
}