const express = require('express');
let router = express.Router();
const adminPriviledgeService = require('../service/adminPrivilegeService');
const superAdmin = require('../auth/superAdmin')

router.post('/', superAdmin, (req, res) => {
    let newAdmin = req.body;
    return (
        adminPriviledgeService.save(newAdmin).then(function (response) {
            return res.status(response.status).send(response.data);
        })
    );
});

router.get('/', superAdmin, (req, res) => {
    return (
        adminPriviledgeService.findAll().then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});

router.get('/:id', superAdmin, (req, res) => {
    const adminId = req.params.id;
    return (
        adminPriviledgeService.findOne(adminId).then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});

//not implemented
router.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    return (
        adminPriviledgeService.findAllByUserId(userId).then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});

router.put('/:id', superAdmin, (req, res) => {
    const adminId = req.params.id;
    const updatedAdmin = req.body;
    return (
        adminPriviledgeService.update(adminId, updatedAdmin).then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});


module.exports = router;