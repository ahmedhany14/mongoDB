const mongoose = require('mongoose');
const catchAsync = require('./../utils/catcherrors');
const contacts = require('../models/contacts');
exports.getContacts = catchAsync(async (req, res, next) => {


    //const explore = await contacts.find({"dob.age": {$gte: 60}}).explain();
    const explore = await contacts.find({ "dob.age": {$gte: 60}}).explain('executionStats');
    res.status(200).json({
        status: 'success',
        data: {
            explore: explore.executionStats
        }
    });
})

