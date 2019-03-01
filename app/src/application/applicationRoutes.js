const express = require('express');
let router = express.Router();
const applicationService = require('../service/applicationService');
var multer = require('multer');
const applicationValidator = require('../validator/applicationValidator');
const admin = require('../auth/admin');
const canShortList = require('../auth/canShortList');
const notGeneral = require('../auth/notGeneral');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk');
var bodyParser = require('body-parser');

const path = require('path');
aws.config.update({
    region: 'us-east-1'
})

var s3 = new aws.S3();

router.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'devtest-cvmanager-bucket',
        key: function(req, file, cb){
            cb(null, file.originalname)
        }

    })
})







// let storage = multer.diskStorage({
//     destination: function (req, file, createDirectory) {
//         createDirectory(null, './cvs/')
//     },
//     filename: function (req, file, createDirectory) {
//         createDirectory(null,file.fieldname);
//         console.log(req.body);
//     }
// });


// let upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, cb) {

//         var filetypes = /pdf/;
//         var mimetype = filetypes.test(file.mimetype);
//         var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb("Error: File upload only supports the following filetypes - " + filetypes);
//     }
// });

router.get('/match', admin, (req, res) => {
    let params = req.query;
    return (
        applicationService.match(params.firstName, params.lastName, params.email, params.phone, params.nic, params.candidateId).then(function (response) {
            return res.status(response.status).send(response);
        }));
});

router.get('/state/:state', admin, (req, res) => {
    const state = req.params.state;
    return (
        applicationService.findSpecificApplications(state).then(function (response) {
            return res.status(response.status).send(response);
        }));
});

router.post('/', upload.single('cv'), function (req, res, next) {
    let newApplication = req.body;
    
    let errors = applicationValidator.applicationValidator(newApplication);
    if (errors.length == 0) {
        return (
            applicationService.save(newApplication).then((response) => {
                return res.status(response.status).send(response);
            })
        );
    }
    else return (res.status(400).send({ status: 400, message: "error", data: errors }));
});

router.get('/', admin, (req, res) => {
    return (
        applicationService.findAll().then(function (response) {
            return res.status(response.status).send(response);
        }));
});

router.get('/assignedTo/', canShortList, (req, res) => {
    let id = req.authUser.id;
    return (

        applicationService.getAssigned(id).then(function (response) {
            return res.status(response.status).send(response);
        }));
});

router.get('/:id', notGeneral, (req, res) => {
    const id = req.params.id;
    return (
        applicationService.findOne(id).then(function (response) {
            return res.status(response.status).send(response);
        }));
});


module.exports = router;