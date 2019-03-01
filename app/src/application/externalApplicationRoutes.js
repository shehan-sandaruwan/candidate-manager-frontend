const express = require('express');
let router = express.Router();
const applicationService = require('../service/applicationService');
var multer = require('multer');
const applicationValidator = require('../validator/applicationValidator');

let storage = multer.diskStorage({
    destination: function (req, file, createDirectory) {
        createDirectory(null, 'cvs/')
    },
    filename: function (req, file, createDirectory) {
        createDirectory(null, file.fieldname + '-' + Date.now())
    }
});

const path = require('path');
let upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {

        var filetypes = /pdf/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    }
});

router.post('/', upload.single('cv'), function (req, res, next) {
    let newApplication = req.body;
    console.log(newApplication);
    
    let errors = applicationValidator.applicationValidator(newApplication);
    console.log(errors);
    if (errors.length == 0) {
        return (
            applicationService.save(newApplication).then((response) => {
                return res.status(response.status).send(response);
            })
        );
    }
    else return (res.status(400).send({ status: 400, message: "error", data: errors }));
});

router.get('/', (req, res) => {

    return res.send("pass");
       
});


module.exports = router;