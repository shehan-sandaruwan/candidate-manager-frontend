let validationResult = require('./validationResult');
// let emailValidator = require("email-validator");
// let positionApi = require("../api/positionApi");

const applicationValidator = (application) => {
    let errors = [];
    let firstName = application.firstName;
    let lastName = application.lastName;
    // let nic = application.nic;
    let institute = application.institute;
    let gender = application.gender;
    // let email = application.email;
    let contactNumber = application.contactNumber;
    let positionByPositionId = new Object();
    positionByPositionId.id = application.positionId;

    if (firstName == null || firstName.length == 0) {
        validationResult.addError(errors,"firstName", "firstName cannot be empty.");
    }
    if (lastName == null || lastName.length == 0) {
        validationResult.addError(errors,"lastName", "lastName cannot be empty.");
    }
    // if (nic == null || nic.length == 0) {
    //     validationResult.addError(errors,"nic", "nic cannot be empty.");
    // } else if ((!nic.charAt(nic.length - 1) == "v") && (!nic.charAt(nic.length - 1) == "V")) {
    //     validationResult.addError(errors,"nic", "invalid nic.");
    // } else if (nic.length != 10 || Number.isNaN(nic.substring(0, 9))) {
    //     validationResult.addError(errors,"nic", "invalid nic.");
    // }
    if (institute == null || institute.length == 0) {
        validationResult.addError(errors,"institute", "institute cannot be empty.");
    }
    if (gender == null || gender.length == 0) {
        validationResult.addError(errors,"gender", "gender cannot be empty.");
    } else if ((!gender == "male") && (!gender == "female")) {
        validationResult.addError(errors,"gender", "invalid gender.");
    }
    // if (email == null || email.length == 0) {
    //     validationResult.addError(errors,"email", "email cannot be empty.");
    // } else if (!emailValidator.validate(email)) {
    //     validationResult.addError(errors,"email", "invalid email.");
    // }
    if (contactNumber == null || contactNumber.length == 0) {
        validationResult.addError(errors,"contactNumber", "contactNumber cannot be empty.");
    } else if ((!contactNumber.charAt(0) == "+")
        && (!contactNumber.charAt(0) == "0")) {
        validationResult.addError(errors,"contactNumber", "invalid contact number.1");
    } else if ((contactNumber.charAt(0) == "+")
        && (Number.isNaN(contactNumber.substring(1)))) {
        validationResult.addError(errors,"contactNumber", "invalid contact number.2");
    } else if ((!contactNumber.charAt(0) == "+") && (Number.isNaN(contactNumber))) {
        validationResult.addError(errors,"contactNumber", "invalid contact number.3");
    }
    /*if (positionByPositionId.id == null) {
        validationResult.addError("positionByPositionId", " positionByPositionId cannot be empty.");
    } else if ( positionApi.findOne(positionByPositionId.id).data == null) {
        validationResult.addError("positionByPositionId", "Invalid positionByPositionId");
    }*/
    return errors;
}

module.exports = {
    applicationValidator
}












