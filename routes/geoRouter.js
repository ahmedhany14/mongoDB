const express = require('express');
const {getPlaces, createPlace} = require('./../queries/GeoSpatial/GeoController');

const router = express.Router();


router.route('/')
    .post(createPlace)
    .get(getPlaces)

module.exports = router;