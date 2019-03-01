let validationResult = require('./validationResult');
let positionApi = require("../api/positionApi");

const positionValidator = (position) => {
    let errors = [];
    let isOpen = position.isOpen;
    let name = position.name;
    let description = position.description;
    
    

    if (isOpen != true && isOpen != false) {
        validationResult.addError(errors,"isOpen", "isOpen should be either true or flase.");
    }

    if (name == null || name.length == 0) {
        validationResult.addError(errors,"name", "name cannot be empty.");
    } /*else if (positionApi.findPositionsByPositionName(name).data.length != 0 && positionApi.findPositionsByPositionName(name).data[0].id != position.id {
        validationResult.addError("name", "name cannot be duplicated.");
    }*/

    if (description == null || description.length == 0) {
        validationResult.addError(errors,"description", "description cannot be empty.");
    }
   

    return errors;
}

module.exports = {
    positionValidator
}





