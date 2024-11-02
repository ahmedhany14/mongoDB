const mongoose = require('mongoose');
const places = require('./../../models/places');
const catchAsync = require('./../../utils/catcherrors');

exports.getPlaces = catchAsync(async (request, response, next) => {
    const place = await places.find();

    response.status(200).json({
        status: 'success', data: place
    })
})

exports.createPlace = catchAsync(async (request, response, next) => {
    const place = await places.create(request.body);
    response.status(200).json({
        status: 'success', data: place
    })
});