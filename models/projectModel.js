const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    projectName: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "registered"
    }
})

module.exports = mongoose.model('Project', projectSchema)