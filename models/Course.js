const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create participant schema
const ParticipantSchema = new Schema({
    name: {type: String, required: true},
    phone: {type: String},
    email: {type: String},
})
// Create course schema
const CourseSchema = new Schema({
    name: {type: String, required: true},
    date: {type: String, required: true},
    companyName: {type: String, required: true},
    companyPhone: {type: String, required: true},
    companyEmail: {type: String, required: true},
    participants: {type: [{ type: ParticipantSchema }]}
})

module.exports = Course = mongoose.model('courses', CourseSchema);