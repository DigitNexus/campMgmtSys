const mongoose = require("mongoose")
const campaign = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startDateandTime: {
        type: String,
        required: true
    },
    endDateandTime: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deleteFlag: {
        type: Boolean,
        required: true,
        default: false
    },
    visitcount:{
        type: Number,
        required: true,
        default: 0
    },
    interestcount:{
        type: Number,
        required: true,
        default: 0
    },
})

module.exports = mongoose.model('Campaigns', campaign)