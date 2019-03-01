const express = require('express');
let router = express.Router();
const profileService = require('../service/profileService');
const admin = require('../auth/admin');

router.post('/', admin, (req, res) => {
    let newProfile = req.body;
    return (
        profileService.save(newProfile).then(function (response) {
            return res.status(response.status).send(response);
        })
    );
});

router.get('/', admin, (req, res) => {
    console.log(" i am in the BFF");
    return (
        profileService.findAll().then(function (response) {
            return res.status(response.status).send(response);
        }));
});

module.exports = router;