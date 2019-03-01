const express = require('express');
let router = express.Router();
const feedbackService = require('../service/feedbackService');

router.post('/', (req, res) => {
    let feedbacks = req.body;
    
    return (
        feedbackService.save(feedbacks).then(function (response) {
            return res.status(response.status).send(response);
        })
    );
});

router.get('/:id', (req, res) => {
    let scheduleId = req.params.id;    
    return (
        feedbackService.getAllBySchedduleId(scheduleId).then(function (response) {
            return res.status(response.status).send(response);
        })
    );
});

module.exports = router;