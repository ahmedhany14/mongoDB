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

exports.nearestPlace = catchAsync(async (request, response, next) => {
    const {coordinates, minDist, maxDist} = request.body;
    console.log(coordinates, minDist, maxDist);
    const nearest_place = await places.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point', coordinates: coordinates
                }, $minDistance: minDist, $maxDistance: maxDist
            }
        }
    }).explain("executionStats");
    response.status(200).json({
        status: 'success', data: nearest_place
    })
})

exports.PlaceInPoly = catchAsync(async (request, response, next) => {
    const coordinates = request.body.coordinates;

    // add the first element to the end of the array to close the polygon
    coordinates.push(coordinates[0]);
    const nearest_place = await places.find({
        location: {
            $geoWithin: {
                $geometry: {
                    type: 'Polygon', coordinates: [coordinates]
                },
            }
        }
    })
    response.status(200).json({
        status: 'success', data: nearest_place
    })
})

/*
Summary:
1) how to store geospatial data in mongodb:
    - create a schema with location field that has type: {type: String, default: 'Point'} and coordinates: {type: [Number], required: true}
    - create an index on the location field with type '2dsphere'

2) how to query geospatial data in mongodb:

    - near:
        - find all places near a certain point with a minimum distance and a maximum distance
        - db.places.find({location: {$near: {$geometry: {type: 'Point', coordinates: [longitude, latitude]}, $minDistance: minDist, $maxDistance: maxDist}}})

    - geoWithin:
        - find all places within a polygon
        - db.places.find({location: {$geoWithin: {$geometry: {type: 'Polygon', coordinates: [[long1, lat1], [long2, lat2], [long3, lat3], [long1, lat1]]}}}})

    - geoIntersects:
        - find all places that intersect with a certain geometry, it can be a point, a line, or a polygon
        - db.places.find({location: {$geoIntersects: {$geometry: {type: 'Point', coordinates: [longitude, latitude]}}}})
        - db.places.find({location: {$geoIntersects: {$geometry: {type: 'LineString', coordinates: [[long1, lat1], [long2, lat2]]}}}})
        - db.places.find({location: {$geoIntersects: {$geometry: {type: 'Polygon', coordinates: [[long1, lat1], [long2, lat2], [long3, lat3], [long1, lat1]]}}}})
 */