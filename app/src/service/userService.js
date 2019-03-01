const userApi = require('../api/userApi');

/*method to create a new user
  modify the fetched data according to the backend requirements*/
const save = (newUser) => {
    return userApi.save(newUser).then(response => {
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

/*method to get a existing position
 modify the fetched data according to the frontend requirements*/
const findOne = (id) => {
    return userApi.findOne(id).then(response => {
        if (response.status == 200) {
            const user = response.data;
            
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = user;
            return responseObject;
            
        } else {
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            return responseObject;
        }
    });
}

const findOneByEmail = (email) => {
    return userApi.findOneByEmail(email).then(response => {
        if (response.status == 200) {
            const user = response.data;
            
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = user;
            return responseObject;
            
        } else {
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            return responseObject;
        }
    });
}

/*method to get existing user
 modify the fetched data according to the frontend requirements*/
const findAll = () => {
    return userApi.findAll().then(response => {
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
            return responseObject;
        }
    });
}


/*method to update a existing user
 modify the fetched data according to the backend requirements*/
const update = (id, body) => {
    return userApi.update(id, body).then(response => {
        let responseObject = new Object();
        responseObject.message = response.message;
        responseObject.data = response.data;
        responseObject.status = response.status;
        return responseObject;
    });
}

const findPrivilegedUsers = (positionId,action) => {
    
    return userApi.findPrivilegedUsers(positionId,action).then(response => {
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
            return responseObject;
        }
    });
}

const authorize = (emailMessage) => {
    return userApi.authorize(emailMessage).then(response => {
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
    findOne,
    findAll,
    update,
    findPrivilegedUsers,
    findOneByEmail,
    authorize
}