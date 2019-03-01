const positionApi = require('../api/positionApi');

/*method to create a new position
  modify the fetched data according to the backend requirements*/
const save = (newPosition) => {
    let modifiedNewPosition = new Object();
    modifiedNewPosition.name = newPosition.name;
    modifiedNewPosition.description = newPosition.description;
    modifiedNewPosition.department = newPosition.department;
    modifiedNewPosition.isOpenstate = newPosition.isOpenstate;

    if (newPosition.isOpen == true) {
        if (newPosition.isOpenstate ==0){
            modifiedNewPosition.isOpen = 1;
        }
        else{
            modifiedNewPosition.isOpen = newPosition.isOpenstate;
        }
    } else {
        modifiedNewPosition.isOpen = 0;
    }
    return positionApi.save(modifiedNewPosition).then(response => {
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
    return positionApi.findOne(id).then(response => {
        if (response.status == 200) {
            const position = response.data;
            let modifiedPosition = new Object();
            modifiedPosition.id = position.id;
                modifiedPosition.name = position.name;
                modifiedPosition.description = position.description;
                modifiedPosition.created_time = position.created_time.slice(0,10);
                modifiedPosition.department = position.department;

                if (position.isOpen !== 0) {
                    modifiedPosition.isOpen = true;
                    modifiedPosition.isOpenstate = position.isOpen;
                } else {
                    modifiedPosition.isOpen = false;
                    modifiedPosition.isOpenstate = 0;
                }
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = modifiedPosition;
            return responseObject;
        } else {
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = null;
            return responseObject;
        }
    });
}

/*method to get existing positions
 modify the fetched data according to the frontend requirements*/
const findAll = () => {
    return positionApi.findAll().then(response => {
        if (response.status == 200) {
            let modifiedPositions = [];
            response.data.map(position => {
                let modifiedPosition = new Object();
                modifiedPosition.id = position.id;
                modifiedPosition.name = position.name;
                modifiedPosition.description = position.description;
                modifiedPosition.created_time = position.created_time.slice(0,10);
                modifiedPosition.department = position.department;

                if (position.isOpen !== 0) {
                    modifiedPosition.isOpen = true;
                    modifiedPosition.isOpenstate = position.isOpen;
                } else {
                    modifiedPosition.isOpen = false;
                    modifiedPosition.isOpenstate = 0;
                }
                modifiedPositions.push(modifiedPosition);
            });
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = modifiedPositions;
            return responseObject;
        } else {
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = null;
            return responseObject;
        }
    });
}

/*method to update a existing position
 modify the fetched data according to the backend requirements*/
const update = (id, body) => {
    let modifiedPosition = new Object();
    modifiedPosition.name = body.name;
    modifiedPosition.description = body.description;
    modifiedPosition.created_time =body.created_time;
    modifiedPosition.isOpenstate =body.isOpenstate;
    modifiedPosition.department =body.department;
    modifiedPosition.isOpenstate =body.isOpenstate;
   
    if (body.isOpen == true) {
        if (body.isOpenstate == 0){
            modifiedPosition.isOpen = 1;
        }
        else{
            modifiedPosition.isOpen = body.isOpenstate;
        }
    } else {
        modifiedPosition.isOpen = 0;
    }
    return positionApi.update(id, modifiedPosition).then(response => {
        let responseObject = new Object();
        responseObject.message = response.message;
        responseObject.status = response.status;
        return responseObject;
    });
}

const findPositionsByPositionName = (positionName) => {
    return positionApi.findPositionsByPositionName(positionName).then(response => {
        if (response.status == 200) {
            let modifiedPositions = [];
            response.data.map(position => {
                let modifiedPosition = new Object();
                modifiedPosition.id = position.id;
                modifiedPosition.name = position.name;
                modifiedPosition.description = position.description;
                
                if (position.isOpen !== 0) {
                    modifiedPosition.isOpen = true;
                    modifiedPosition.isOpenstate = position.isOpen;
                } else {
                    modifiedPosition.isOpen = false;
                    modifiedPosition.isOpenstate = 0;
                }
                modifiedPositions.push(modifiedPosition);
            });
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = modifiedPositions;
            return responseObject;
        } else {
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = null;
            return responseObject;
        }
    });
}

module.exports = {
    save,
    findOne,
    findAll,
    update,
    findPositionsByPositionName
}