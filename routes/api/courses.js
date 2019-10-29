const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load input validation
const validateCourseInput = require('../../validation/courses');

// Load Course model
const Course = require('../../models/Course');

router.get('/', (req, res) => {
    Course.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(404).json(err));
})

router.post('/', (req, res) => {
    const { errors, isValid } = validateCourseInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newCourse = new Course({
        name: req.body.name,
        date: req.body.date,
        companyName: req.body.companyName,
        companyPhone: req.body.companyPhone,
        companyEmail: req.body.companyEmail,
        participants: req.body.participants,
    });

    newCourse.save().then(course => res.json(course));
})

module.exports = router;