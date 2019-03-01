const express = require('express');
let router = express.Router();
const positionService = require('../service/positionService');
const positionValidator = require('../validator/positionValidator');
const admin = require('../auth/admin');

router.post('/', admin, (req, res) => {
    let newPosition = req.body;
    let errors = positionValidator.positionValidator(newPosition);
    if (errors.length == 0) {
        return (
            positionService.save(newPosition).then(function (response) {
                return res.status(response.status).send(response);
            })
        );
    } else return (res.status(400).send({ status: 400, message: "error", data: errors }));

});

router.get('/', (req, res) => {
    return (
        positionService.findAll().then(function (response) {
            return res.status(response.status).send(response);
        }));
});

router.get('/:id', (req, res) => {
    const positionId = req.params.id;
    return (
        positionService.findOne(positionId).then(function (response) {
            return res.status(response.status).send(response);
        }));
});

router.put('/:id', admin, (req, res) => {
    const positionId = req.params.id;
    const updatePosition = req.body;
    let errors = positionValidator.positionValidator(updatePosition);
    if (errors.length == 0) {
        return (
            positionService.update(positionId, updatePosition).then(function (response) {
                return res.status(response.status).send(response);
            }));
    } else return (res.status(400).send({ status: 400, message: "error", data: errors }));
});

router.get('/name/:name', admin, (req, res) => {
    const positionName = req.params.name;
    return (
        positionService.findOne(positionName).then(function (response) {
            return res.status(response.status).send(response);
        }));
});

module.exports = router;