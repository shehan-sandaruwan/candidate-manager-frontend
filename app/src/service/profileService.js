const profileApi = require('../api/profileApi');

const save = (newProfile) => {
    // let modifiedNewProfile = new Object();
    // modifiedNewProfile.name = newProfile.name;
    //modifiedNewProfile.description = newProfile.description;
    //modifiedNewProfile.
    return profileApi.save(newProfile).then(response => {
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

const findAll = () => {
    return profileApi.findAll().then(response => {
        if (response.status == 200) {
            let modifiedProfiles = [];
            response.data.map(profile => {
                let modifiedProfile = new Object();
                modifiedProfile.id = profile.id;
                modifiedProfile.name = profile.name;
                modifiedProfile.description = profile.description;
                modifiedProfile.profileFields = profile.profileFieldsById;
                modifiedProfiles.push(modifiedProfile);
            });
            console.log(modifiedProfiles[0].profileFields);
            let responseObject = new Object();
            responseObject.message = response.message;
            responseObject.status = response.status;
            responseObject.data = modifiedProfiles;
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
    findAll
}
