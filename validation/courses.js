const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateCourseInput(data) {
    let errors = {};
    errors.participants = [];
    for (let i = 0; i < data.participants.length; i++) {
        if (data.participants[i].name === '') {
            errors.participants.push({name: 'Participant name must not be empty'});
        }
        else {
            errors.participants.push(null);
        }
    }
    let isNull = true
    for (let i = 0; i < errors.participants.length; i++) {
        if (errors.participants[i] !== null) {
            isNull = false;
            break;
        }
    }
    if(isNull) {
        errors = {};
    }

    if (!validator.isLength(data.name, { min: 1 })) {
        errors.name = 'Name must not be empty';
    }
    if (!validator.isLength(data.date, { min: 1 })) {
        errors.date = 'Date must not be empty';
    }
    if (!validator.isLength(data.companyName, { min: 1 })) {
        errors.companyName = 'Company name must not be empty';
    }
    if (!validator.isLength(data.companyPhone, { min: 1 })) {
        errors.companyPhone = 'Company phone must not be empty';
    }
    if (!validator.isLength(data.companyEmail, { min: 1 })) {
        errors.companyEmail = 'Company email must not be empty';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};