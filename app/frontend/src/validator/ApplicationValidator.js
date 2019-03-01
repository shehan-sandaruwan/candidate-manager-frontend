let emailValidator = require("email-validator");

const validate = (application) => {
       let $hasError = false;

       let firstName = application.firstName;
       let lastName = application.lastName;
       let nic = application.nic;
       let gender = application.gender;
       let email = application.email;
       let contactNumber = application.contactNumber;

       if (firstName == null || firstName.length == 0) {
          $hasError = true;
       }
       if (lastName == null || lastName.length == 0) {
           $hasError = true;
       }

    //    if (nic == null || nic.length == 0) {
    //        $hasError = true;
    //    }
       if (gender == null || gender.length == 0) {
           $hasError = true;
       }
    //    if (email == null || email.length == 0) {
    //        $hasError = true;
    //    }
       if (contactNumber == null || contactNumber.length == 0) {
           $hasError = true;
       }

       return $hasError;

}

module.exports = {
   validate
}