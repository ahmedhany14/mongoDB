const contacts = require('./../../models/contacts');
const catchAsync = require('../../utils/catcherrors');
const mongoose = require('mongoose');

/*
there are aggragation stages that we can use to manipulate the data in the database
1) $match: filters the documents based on the specified condition
2) $group: groups the documents based on a fields value, it makes them unique
    there are some operators that we can use with $group:
    - $sum: sums the values of the field
    - $avg: calculates the average of the values of the field
    - $min: gets the minimum value of the field
    - $max: gets the maximum value of the field
    - $count: counts the number of documents in the group
    - $push: adds the value of the field to an array
3) $sort: sorts the documents based on the specified field
    $sort: {field: 1} // ascending order
    $sort: {field: -1} // descending order
4) $project: selects the fields that we want to show in the response and hides the other fields
5) $limit: limits the number of documents in the response
6) $unwind: deconstructs the array field from the documents and returns the documents with the array field as a single element

 */
exports.aggregateContacts = catchAsync(async (request, response, next) => {
    const pipline = [
        {
            $match:
                {
                    gender: 'female'
                }
        },
        {
            $group: {
                _id: "$location.state",
                totalPeople: {
                    $sum: 3
                },
                averageAge: {
                    $avg: "$dob.age"
                },
                Count: {
                    $count: {} // counts the number of documents in the group, same as $sum: 1, but in the case of sum we can use any number not only 1
                }
            }
        },
        {
            $sort: {
                // this stage sorts the response based on the totalPeople field in descending order.
                // and if there are two documents with the same totalPeople value, it sorts them based on the averageAge field in ascending order.
                totalPeople: -1,
                averageAge: 1
            }
        }
    ];

    const pipeline2 = [
        {
            $project: {
                _id: 0,
                gender: 1,
                fullname: {
                    $concat: ["$name.first", " ", "$name.last"]
                },
                phoneNumber: {
                    $concat: ["(", {$substr: ["$phone", 0, 3]}, ") ", {$substr: ["$phone", 3, 3]}, "-", {$substr: ["$phone", 6, 4]}]
                },
                Location: {
                    $concat: [
                        "$location.city", ", ", "$location.state", ", at ", "$location.street", " street with postcode ", {$toString: "$location.postcode"}
                    ]
                },
                age: {
                    $cond: {
                        if: {
                            $lte: ['$dob.age', 35]
                        },
                        then: {
                            $concat: ['young']
                        },
                        else: {
                            $concat: ['old']
                        }
                    }
                }
            },
        },
        {
            $group: {
                _id: "$age",
                totalPeople: {
                    $sum: 1
                }
            }
        }
    ]

    const pipline3 = [
        {
            $project: {
                _id: 0,
                location: {
                    type: 'Point',
                    coordinates: [
                        {$toDouble: "$location.coordinates.longitude"},
                        {$toDouble: "$location.coordinates.latitude"},
                    ]
                },
                fullname: {
                    $concat: ["$name.first", " ", "$name.last"]
                },
                email: 1,
                birthday: {$toDate: '$dob.date'},
                // birthday: {$convert: {input: '$dob.date', to: 'date'}},
                age: "$dob.age",
            }
        },
        {
            $group: {
                _id: {
                    year: {
                        $year: "$birthday"
                    },
                    // month: {
                    //     $month: "$birthday"
                    // },
                    // day: {
                    //     $dayOfMonth: "$birthday"
                    // }
                },
                totalPeople: {
                    $sum: 1
                },
            }
        },
        {
            $sort: {
                'totalPeople': -1
            }
        },
        {
            $limit: 10
        }
    ]

    const pipline4 = [
        {
            $group: {
                _id: "$location.state",
                allCities: {
                    // push may have a duplicate values, we can use addToSet instead of push to avoid duplicates
                    //$push: "$location.city"
                    $addToSet: "$location.city" // after this step the number of documents becomes 4603 instead of 5000
                }
            }
        },
        {$unwind: "$allCities"}, // after this stage, the response will have a document for each city in each state, instead of having an array of cities in each state

    ]
    const people = await contacts.aggregate(pipline4);

    response.status(200).json({
        status: 'success', length: people.length, data: people
    });
})
    ;
