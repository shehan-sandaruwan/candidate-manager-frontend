const adminPriviledgeApi = require('../api/adminPrivilegeAPI');

/*method to assign priviledge to new user
  modify the fetched data according to the backend requirements*/
const save = (newAdmin) => {
    let modifiedAdmin = new Object();
    modifiedAdmin.isAdmin = newAdmin.isAdmin ? 1 : 0;
    modifiedAdmin.isSuperAdmin = newAdmin.isSuperAdmin ? 1 : 0;
    modifiedAdmin.userByUserId = newAdmin.userByUserId;
    return adminPriviledgeApi.save(modifiedAdmin).then(response => {
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

/*method to get a users for a priviledge lwvwl
 modify the fetched data according to the frontend requirements*/
const findOne = (id) => {
    return adminPriviledgeApi.findOne(id).then(response => {
        if (response.status == 200) {
            const privilegedUsers = response.data;

            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = privilegedUsers;
            return responseObject;

        } else {
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            return responseObject;
        }
    });
}
const findAllByUserId = (id) => {
    return adminPriviledgeApi.findAllByUserId(id).then(response => {
        if (response.status == 200) {
            const privileges = response.data;
 
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = privileges;
            return responseObject;
 
        } else {
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            return responseObject;
        }
    });
 }

/*method to get all priviledges
 modify the fetched data according to the frontend requirements*/
const findAll = () => {
    return adminPriviledgeApi.findAll().then(response => {
        let responseObject = new Object();
        responseObject.message = response.message;
        responseObject.status = response.status;
        responseObject.data = response.data;
        return responseObject;
    });
}


/*method to update admin priviledges of existing user
 modify the fetched data according to the backend requirements*/
 const update = (id, body) => {
    let modifiedAdmin = new Object();
    modifiedAdmin.isAdmin=body.isAdmin?1:0;
    modifiedAdmin.isSuperAdmin=body.isSuperAdmin?1:0;
    modifiedAdmin.userByUserId=body.userByUserId;
    return adminPriviledgeApi.update(id, modifiedAdmin).then(response => {
        let responseObject = new Object();
        responseObject.message = response.message;
        responseObject.data = response.data;
        responseObject.status = response.status;
        return responseObject;
    });
}



module.exports = {
    save,
    findOne,
    findAll,
    update,
    findAllByUserId
}