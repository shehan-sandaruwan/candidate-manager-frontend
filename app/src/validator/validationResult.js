const addError = (errors,field, error) => {
    let errorObject = new Object();
    errorObject.field = field;
    errorObject.error = error;
    errors.push(errorObject);
}

module.exports = {
    addError
}




