const express = require('express');
let router = express.Router();
const stateService = require('../service/stateService');
const notGeneral = require('../auth/notGeneral');
const admin = require('../auth/admin');

router.post('/', notGeneral, function (req, res, next) {
    const newState = req.body;
    const loggedUserId = req.authUser.id;
    return (
        stateService.save(newState, loggedUserId).then((response) => {
            return res.status(response.status).send(response);
        })
    );
});

router.get('/', notGeneral, (req, res) => {
    return (
        stateService.findAll().then(function (response) {
            return res.status(response.status).send(response);
        }));
});

router.get('/:id', notGeneral, (req, res) => {
    const id = req.params.id;
    return (
        stateService.findOne(id).then(function (response) {
            return res.status(response.status).send(response);
        }));
});

router.get('/application/:id', admin, (req, res) => {
    const id = req.params.id;
    return (
        stateService.findAllByAppId(id).then(function (response) {
            return res.status(response.status).send(response);
        }));
});

router.put('/:id', notGeneral, (req, res) => {
    const stateId = req.params.id;
    const updatedState = req.body;
    const loggedUserId = req.authUser.id;
    return (
        stateService.update(stateId, updatedState, loggedUserId).then(function (response) {
            return res.status(response.status).send(response);
        })
    );

});

module.exports = router;