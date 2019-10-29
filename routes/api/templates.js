const express = require('express');
const router = express.Router();

// Load Course model
const Template = require('../../models/CourseTemplate');

router.get('/', (req, res) => {
    Template.find()
        .then(templates => res.json(templates))
        .catch(err => res.status(404).json(err));
})

router.post('/', (req, res) => {
    const newTemplate = new Template({
        name: req.body.name,
        dates: req.body.dates
    });

    newTemplate.save().then(template => res.json(template));
})

module.exports = router;