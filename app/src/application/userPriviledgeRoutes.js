const express = require('express');
let router = express.Router();
const userPriviledgeService = require('../service/userPriviledgeService');
const superAdmin = require('../auth/superAdmin')

router.post('/', superAdmin, (req, res) => {
    let newPriviledge = req.body;
    return (
        userPriviledgeService.save(newPriviledge).then(function (response) {
            return res.status(response.status).send(response.data);
        })
    );
});

router.get('/', superAdmin, (req, res) => {
    return (
        userPriviledgeService.findAll().then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});

router.get('/:id', superAdmin, (req, res) => {
    const priviledgeId = req.params.id;
    return (
        userPriviledgeService.findOne(priviledgeId).then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});

router.get('/user/:id', superAdmin, (req, res) => {
    const userId = req.params.id;
    return (
        userPriviledgeService.findAllByUserId(userId).then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});

router.put('/:id', superAdmin, (req, res) => {
    const priviledgeId = req.params.id;
    const updatedPriviledge = req.body;
    return (
        userPriviledgeService.update(priviledgeId, updatedPriviledge).then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});


module.exports = router;