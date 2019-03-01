const express = require('express');
let router = express.Router();
const departmentService = require('../service/departmentService');
const admin = require('../auth/admin');

router.post('/', admin, (req, res) => {
    let newDepartment = req.body;
    return (
        departmentService.save(newDepartment).then(function (response) {
            return res.status(response.status).send(response);
        })
    );
});

router.get('/', admin, (req, res) => {
    return (
        departmentService.findAll().then(function (response) {
            return res.status(response.status).send(response);
        }));
});

router.get('/:id', admin, (req, res) => {
    const departmentId = req.params.id;
    return (
        departmentService.findOne(departmentId).then(function (response) {
            return res.status(response.status).send(response);
        }));
});

router.put('/:id', admin, (req, res) => {
    const departmentId = req.params.id;
    const updateDepartment = req.body;
    return (
        departmentService.update(departmentId, updateDepartment).then(function (response) {
            return res.status(response.status).send(response);
        }));

});

module.exports = router;