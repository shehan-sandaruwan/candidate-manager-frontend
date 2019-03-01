const departmentApi = require('../api/departmentApi');

const save = (newDepartment) => {
    return departmentApi.save(newDepartment).then(response => {
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

const findOne = (id) => {
    return departmentApi.findOne(id).then(response => {
       return response;
    });
}

const findAll = () => {
    return departmentApi.findAll().then(response => {
       return response;
    });
}

const update = (id, body) => {
    return departmentApi.update(id,body).then(response => {
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
    update
}