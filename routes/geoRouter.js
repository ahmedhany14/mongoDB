const express = require('express');
const {getPlaces, createPlace, nearestPlace} = require('./../queries/GeoSpatial/GeoController');

const router = express.Router();


router.route('/')
    .post(createPlace)
    .get(getPlaces)

router.route('/nearest')
    .get(nearestPlace)
module.exports = router;