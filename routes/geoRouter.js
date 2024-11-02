const express = require('express');
const {getPlaces, createPlace, nearestPlace, PlaceInPoly} = require('./../queries/GeoSpatial/GeoController');

const router = express.Router();


router.route('/')
    .post(createPlace)
    .get(getPlaces)

router.route('/nearest')
    .get(nearestPlace)

router.route('/in-poly')
    .get(PlaceInPoly)

module.exports = router;