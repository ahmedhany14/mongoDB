const mongoose = require('mongoose');
const catchAsync = require('./../../utils/catcherrors');
const sessions = require('../../models/sessions');

exports.createSession = catchAsync(async (req, res, next) => {

    const data = req.body;
    data.createdAt = new Date().toISOString();


    const session = new sessions(
        {
            content: data.content,
            createdAt: data.createdAt,
        }
    );
    await session.save();
    res.status(201).json({
        status: 'success',
        data: {
            session
        }
    });
})

exports.getSessions = catchAsync(async (req, res, next) => {
    const session = await sessions.find();
    res.status(200).json({
        status: 'success',
        data: {
            session
        }
    });
})
