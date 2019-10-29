const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create course template schema
const TemplateSchema = new Schema({
    name: {type: String, required: true},
    dates: {type: [{ type: String }]}
})

module.exports = Template = mongoose.model('templates', TemplateSchema);