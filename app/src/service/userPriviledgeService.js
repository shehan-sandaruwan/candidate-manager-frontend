const userPriviledgeApi = require('../api/userPriviledgeApi');

/*method to assign priviledge to new user
  modify the fetched data according to the backend requirements*/
const save = (newPriviledge) => {
    let modifiedPrivilege = new Object();
    modifiedPrivilege.canInterview=newPriviledge.canInterview?1:0;
    modifiedPrivilege.canShortList=newPriviledge.canShortList?1:0;
    modifiedPrivilege.positionByPositionId=newPriviledge.positionByPositionId;
    modifiedPrivilege.userByUserId=newPriviledge.userByUserId;
    return userPriviledgeApi.save(modifiedPrivilege).then(response => {
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
    return userPriviledgeApi.findOne(id).then(response => {
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
    return userPriviledgeApi.findAllByUserId(id).then(response => {
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
    return userPriviledgeApi.findAll().then(response => {
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = response.data;
            return responseObject;      
    });
}


/*method to update priviledges of existing user
 modify the fetched data according to the backend requirements*/
const update = (id, body) => {
    let modifiedPrivilege = new Object();
    modifiedPrivilege.canInterview=body.canInterview?1:0;
    modifiedPrivilege.canShortList=body.canShortList?1:0;
    modifiedPrivilege.positionByPositionId=body.positionByPositionId;
    modifiedPrivilege.userByUserId=body.userByUserId;
    return userPriviledgeApi.update(id, modifiedPrivilege).then(response => {
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