const movies = require('./../../models/movie')
const catchError = require('./../../utils/catcherrors')

class moviesFilter {

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        let filter = {...this.queryString};

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
                filter[key] = {...filter[key]};
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


    skip() {

    }

}

exports.getMovies = catchError(async (req, res, next) => {
    const filter = {...req.query};

    const query = new moviesFilter(movies.find(), filter).filter().limitFields().sort();
    const result = await query.query;

    res.status(200).json({
        success: true,
        results: result.length,
        data: result
    })
})
