const axios = require('axios');
const Base64 = require('base-64');
const tok = 'user1:password1';
const hash = Base64.encode(tok);
const Basic = 'Basic ' + hash;
var urljoin = require('url-join');
const constants = require('../../src/constants');
const authHeader = require('../databaseAuth');


/*
   call the user controller of the java backend to get a particular position
*/
const findOne = (id) => {
    id = id.toString();
    return axios.get(urljoin(constants.backendIpAddress, '/user/', id), { headers: { 'Authorization': Basic } })
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

const findOneByEmail = (email) => {
    email = email.toString();
    return axios.get(urljoin(constants.backendIpAddress, '/user/email/', email), { headers: { 'Authorization': Basic } })
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
   call the user controller of the java backend to get all the existing positions
*/
const findAll = () => {
    return axios.get(urljoin(constants.backendIpAddress, '/user/'), { headers: { 'Authorization': Basic } })
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
   call the user controller of the java backend to create a particular position
*/
const save = (body) => {
    return axios.post(urljoin(constants.backendIpAddress, '/user/'), body, { headers: { 'Authorization': Basic } })
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
    return axios.put(constants.backendIpAddress+'/user/'+id, body, { headers: { 'Authorization': Basic } })
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

const findPrivilegedUsers = (positionId,action) => {
    return axios.get(constants.backendIpAddress+ '/user/privilege/'+positionId+'/'+action, { headers: { 'Authorization': Basic } })
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

const authorize = (body) => {
    return axios.post(urljoin(constants.backendIpAddress, '/user/auth/'), body, { headers: { 'Authorization': authHeader.Basic} })
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
    findOneByEmail,
    findPrivilegedUsers,
    authorize
    
}