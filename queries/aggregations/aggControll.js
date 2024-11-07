const contacts = require('./../../models/contacts');
const catchAsync = require('../../utils/catcherrors');
const mongoose = require('mongoose');

/*
there are aggregation stages that we can use to manipulate the data in the database
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
4) $project: selects the figields that we want to show in the response and hides the other fields
5) $limit: limits the number of documents in the response
6) $unwind: deconstructs the array field from the documents and returns the documents with the array field as a single element

7) $bucket: groups the documents into buckets based on the specified boundaries, more formally it divides the documents into range of boundaries
    - groupBy: the field that we want to group the documents based on
    - boundaries: an array of values that specifies the boundaries of the buckets [1, 2, 3, 4] will be 3 buckets, [1: 2], [2: 3], [3: 4]
    - output: the fields that we want to show in the response
8) $bucketAuto: automatically creates the boundaries for the buckets
9) $skip: skips the specified number of documents in the response
10) $out: writes the output of the aggregation to a collection

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

    const pipline5 = [
        {
            // $bucket: {
            //     groupBy: '$dob.age',
            //     boundaries: [0, 18, 30, 50, 70, 100],
            //     output: {
            //         totalPeople: {
            //             $sum: 1
            //         },
            //         averageAge: {
            //             $avg: '$dob.age'
            //         }
            //     }
            // }
            // we can use $bucketAuto instead of $bucket to automatically create the boundaries

            $bucketAuto: {
                groupBy: '$dob.age',
                buckets: 8,
                output: {
                    totalPeople: {
                        $sum: 1
                    },
                    averageAge: {
                        $avg: '$dob.age'
                    }
                }
            }

        }
    ];
    // challenge
    /*
        we want to get the oldest 10 people in the database
     */

    const pipline6 = [
        {
            $project: {
                _id: 0,
                date: '$dob.date',
                name: {
                    $concat: ["$name.title", " ", "$name.first", " ", "$name.last"]
                }
            }
        },
        {
            $sort: {
                date: 1
            }
        },
        {
            $limit: 10
        }
    ]

    const people = await contacts.aggregate(pipline6);

    response.status(200).json({
        status: 'success', length: people.length, data: people
    });
})
;
