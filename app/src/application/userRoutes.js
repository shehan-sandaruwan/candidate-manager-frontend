const express = require('express');
let router = express.Router();
const userService = require('../service/userService');
const superAdmin = require('../auth/superAdmin');
const admin = require('../auth/admin');

router.post('/', superAdmin, (req, res) => {
    let newUser = req.body;
    return (
        userService.save(newUser).then(function (response) {
            return res.status(response.status).send(response.data);
        })
    );
});

router.get('/', superAdmin, (req, res) => {
    return (
        userService.findAll().then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});

router.get('/nav/', (req, res) => {
    let nav = {
        "links": [
            {
                "label": "Candidate Manager",
                "href": "/candidatemanager",
                "links": [

                ]
            }
        ]
    }

    let navGen = {
        "links": [
            {
                "label": "Candidate Manager",
                "href": "/candidatemanager/submitpage",
                "links": [
                    {
                        "label": "Submit",
                        "href": "/candidatemanager/submitpage"
                    }
                ]
            }
        ]
    }

    let application = {
        "label": "Applications",
        "href": "/candidatemanager/applicationpage"
    }
    let submit = {
        "label": "Submit",
        "href": "/candidatemanager/submitpage"
    }
    let job = {
        "label": "Job Management",
        "href": "/candidatemanager/jobpage"
    }
    let department = {
        "label": "Departments",
        "href": "/candidatemanager/departmentpage"
    }
    let lineshortlist = {
        "label": "Line Short List",
        "href": "/candidatemanager/lineshortlist"
    }
    let scheduledinterviews = {
        "label": "Interviews",
        "href": "/candidatemanager/scheduledinterviews"
    }
    let profiles = {
        "label": "Feedback Forum",
        "href": "/candidatemanager/profile"
    }

    let usermanager = {
        "label": "User Manager",
        "href": "/candidatemanager/userpage",
        "links": [
            {
                "label": "User Management",
                "href": "/candidatemanager/userpage"
            }
        ]
    }

    let reportPage = {
        "label": "Generate Reports",
        "href": "/candidatemanager/reportPage"
    }


    let authUser = req.authUser;
    let isGeneral = authUser.isGeneral;
    if (isGeneral) {
        nav = navGen;
    }
    else if (!isGeneral) {
        let canInterview = authUser.canInterview;
        let canShortList = authUser.canShortList;
        let isAdmin = authUser.isAdmin;
        let isSuperAdmin = authUser.isSuperAdmin;

        nav["links"][0]["links"][7] = submit;

        if (canShortList) {
            nav["links"][0]["links"][1] = lineshortlist;
        }
        if (canInterview) {
            nav["links"][0]["links"][2] = scheduledinterviews;
        }
        if (isAdmin) {
            nav["links"][0]["links"][0] = application;
            nav["links"][0]["links"][4] = job;
            nav["links"][0]["links"][5] = department;
            nav["links"][0]["links"][6] = profiles;
            nav["links"][0]["links"][8] = reportPage;

        }

        if (isSuperAdmin) {
            nav["links"][1] = usermanager;
        }


    }

    return (res.json(nav));


});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    return (
        userService.findOne(userId).then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});

router.get('/email/:email', superAdmin, (req, res) => {
    const userEmail = req.params.email;
    return (
        positionService.findOne(userEmail).then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});

router.put('/:id', superAdmin, (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    return (
        userService.update(userId, updatedUser).then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});

router.get('/privilege/:positionId/:action', admin, (req, res) => {
    const positionId = req.params.positionId;
    const action = req.params.action;
    return (
        userService.findPrivilegedUsers(positionId, action).then(function (response) {
            return res.status(response.status).send(response.data);
        }));
});

module.exports = router;