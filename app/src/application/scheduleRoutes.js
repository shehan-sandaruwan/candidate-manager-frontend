const express = require('express');
let router = express.Router();
const scheduleService = require('../service/scheduleService');
const admin = require('../auth/admin');
const canInterview = require('../auth/canInterView');
const notGeneral = require('../auth/notGeneral');
router.post('/', notGeneral, admin, (req, res) => {
    let newSchedule = req.body;
    scheduleService.save(newSchedule).then(function (response) {
        return res.status(response.status).send(response);
    })

});

router.get('/assignedTo/:id', canInterview, (req, res) => {
    const loggedUserId = req.params.id;
    return (
        scheduleService.findScheduledInterviews(loggedUserId).then(function (response) {
            return res.status(response.status).send(response);
        }));
});


/* used to get information about currently active schedule for a certain application*/
router.get('/application/:id', canInterview, (req, res) => {
    const applicationId = req.params.id;
    return (
        scheduleService.findScheduleByApplicationId(applicationId).then(function (response) {
            return res.status(response.status).send(response);
        }));
});

/* this post method is used to proceed a candidate to a final state directly after an interview 
(or proceed to "interviewed" state until feedback profile sub system is implemented) */
router.post('/:id', notGeneral, (req, res) => {
    let newScheduleFeedback = req.body;
    let scheduleId = req.params.id;
    let userId = req.authUser.id;
    scheduleService.proceedToFinal(newScheduleFeedback, scheduleId, userId).then(function (response) {
        return res.status(response.status).send(response);
    })

});


module.exports = router;