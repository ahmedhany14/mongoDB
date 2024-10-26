const movies = require('./../../models/movie')
const catchError = require('./../../utils/catcherrors')
let data = null
class moviesFilter {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        let filter = { ...this.queryString };

        const notAllowedFields = ['page', 'sort', 'limit', 'fields'];

        notAllowedFields.forEach(field => delete filter[field]);

        // add $ to query operators
        filter = JSON.stringify(filter)
            .replace(/\b(gt|gte|lt|lte|ne|eq)\b/g, match => `$${match}`);
        console.log(JSON.parse(filter))

        filter = JSON.parse(filter);

        // convert string number to number for all query operators
        // as this { name: 'Berserk', runtime: { '$ne': '25' } }

        const operators = ['$gt', '$gte', '$lt', '$lte', '$ne', '$eq'];
        for (const key in filter) {
            if (typeof filter[key] === 'object') {
                filter[key] = { ...filter[key] };
                for (const key2 in filter[key]) {
                    if (operators.includes(key2))
                        filter[key][key2] = parseInt(filter[key][key2]);
                }
            }
        }
        console.log(filter)
        this.query = this.query.find(filter);

        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortFields = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortFields);
        }
        return this;
    }



    pagination() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

exports.getMovies = catchError(async (req, res, next) => {
    const filter = { ...req.query };

    const query = new moviesFilter(movies.find(), filter).filter().limitFields().sort();
    const result = await query.query;

    res.status(200).json({
        success: true,
        results: result.length,
        data: result
    })
})

exports.useExpr = catchError(async (req, res, next) => {

    const result = await movies.find({
        // will get all users with  runtime greater than weight
        $expr: {
            $gt: ['$runtime', '$weight']
        }
    });

    // using of conditions with $expr
    // if there is any runtime greater than 80 decrease its by 10
    const result2 = await movies.find({
        $expr: {
            $gt: [
                {
                    $cond: {
                        if: { $gte: ['$runtime', 30] },
                        then: { $subtract: ['$runtime', 26] },
                        else: '$runtime'

                    }
                }
                , '$weight'
            ]
        }
    })


    res.status(200).json({
        result: result.length,
        data: {
            result2
        }
    })
})

/*
Array operators

1) $size
    will get the array with size that is equal to the $size value
    ex: movies.find({ genres: { $size: 2 } })   will get all movies with genres array size equal to 2
2) $all
    will get the instance that has all the values in the array
    ex: movies.find({ genres: { $all: ['action', 'adventure'] } }) will get all movies with genres array containing action and adventure
    NOTE: 
        if you write the query like this { genres: ['action', 'adventure'] } it will get all movies with genres array equal to ['action', 'adventure']

3) $elemMatch
    will get the instance that has at least one element that matches the query
    ex: movies.find({ genres: { $elemMatch: { $eq: 'action' } } }) will get all movies with genres array containing action
        users.find({ $elemMatch: { age: { $gt: 20, $lt: 50 } } }) will get all users with at least one age between 20 and 50
*/

const get_all = async function () {
    data = await movies.find();
}

exports.WorkingWithCorsors = catchError(async (req, res, next) => {
    /*
    when we have a large number of documents we can't send all of them at once
    instead we can send them in pages or batches to avoid overloading the server and wasting bandwidth and resources
    */

    /*
    lets assume we have a collection of movies with 240 documents
    we will send 10 documents per page
    */

    const query = new moviesFilter(movies.find(), req.query).pagination();
    const result = await query.query;
    /*
    we can also use the slice method to get the documents of the page
    if (!data) await get_all();
    const result = await data.slice((req.params.page - 1) * 10, req.params.page * 10);
    */

    res.status(200).json({
        success: true,
        results: result.length,
        data: result
    })
})