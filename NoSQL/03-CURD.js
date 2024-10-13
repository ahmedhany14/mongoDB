const dotenv = require('dotenv')
const mongoose = require('mongoose')


dotenv.config({ path: './../.config.env' })

const database = process.env.DATABASE;
console.log(`database url connection : ${database}`)

// Create a connection
mongoose.connect(database, {}).then(connection => {
    console.log('DB connection successful');
})
bookstore = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        message: "book name is required"
    },
    price: {
        type: Number,
        min: 100,
        max: 1000,
        default: 500
    },
    auther: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        messege: 'auther name is required'
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: String,
        enum: ['fiction', 'non-fiction', 'comedy', 'drama'],
        lowercase: true,
        message: "Category isn't valid"
    },
    rataings: {
        type: Number,
        default: 0
    },
    rataingsAVG: {
        type: Number,
        default: 0
    }
});
const books = mongoose.model('books', bookstore);


const book = {
    name: `Mohamed's Book   `,
    price: 900,
    auther: `Ahmed hany`,
    category: 'comedy',
    rataings: 5,
    rataingsAVG: 4.6
}



// 1) To create or insert a new document, we use the following method:
/*
.1 create()
    this method is used to create a new document in the collection.

.3 insertMany()
    this method is used to insert multiple documents in the collection.
*/
const CreateSingle = async (book) => {
    book.name = "Create";
    try {
        await books.create(book);
    } catch (err) {
        console.log(err.message)
    }
}

//CreateSingle(book)

const Createmulti = async (book) => {

    collections = [
        {
            'name': `book4  `,
            'price': 900,
            'auther': `Ahmed hany`,
            'category': 'comedy',
            'rataings': 5,
            'rataingsAVG': 4.6
        },
        {
            'name': `book5   `,
            'price': 900,
            'auther': `Ahmed hany`,
            'category': 'comedy',
            'rataings': 5,
            'rataingsAVG': 4.6
        },
        {
            'name': `book6   `,
            'price': 900,
            'auther': `Ahmed hany`,
            'category': 'comedy',
            'rataings': 5,
            'rataingsAVG': 4.6
        }
    ]

    try {
        //await books.create(collections);
        await books.insertMany(collections);

        // or we can use insertMany() method
    } catch (err) {
        console.log(err.message)
    }
};

//Createmulti(book)


// 2) To Update a document, we use the following method:
/*
There are two methods to update a document in the collection:
.1 updateOne(), to update a single document.
.2 updateMany(), to update multiple documents.

each one take two parameters:
1) the first parameter is the filter condition.
2) the second parameter is the update condition.
*/


const UpdateSingle = async () => {
    try {
        const name = "Create";
        const filter = { name: name };
        const update = { price: 550 };
        await books.updateOne(filter, update);
    } catch (err) {
        console.log(err.message)
    }
};
//UpdateSingle()

const UpdateMulti = async () => {
    try {
        const filter = { category: 'comedy' };

        const update = {
            rataings: 3,
            rataingsAVG: 5.5
        };
        await books.updateMany(filter, update);
    } catch (err) {
        console.log(err.message)
    }
}
//UpdateMulti()


// 3) Read a document, we use the following method:

/*
you will read a document from the collection using the following methods:
.1 find(), to find all the documents in the collection.
.2 findOne(), to find a single document in the collection.
.3 findById(), to find a document by its ID.

But we can use find method with filter condition to get the specific document.
*/

const ReadAll = async () => {
    try {
        const res = await books.find();
        console.log(res)
    } catch (err) {
        console.log(err.message)
    }
}
//ReadAll()

const ReadOne = async () => {
    // this will done by using an identifier, which can be any unique field, in our case, we will use the name or the ID.
    try {
        const id = "670c53e1a69762bb2905c65b";
        const res = await books.findOne({ _id: id });
        console.log(res)

    } catch (err) {
        console.log(err.message)
    }

}
//ReadOne()

const ReadByFilter = async () => {
    try {
        const filter = {
            category: 'comedy',
            price: {
                $gte: 600
            }
        }
        const res = await books.find(filter);
        console.log(res)
    } catch (err) {
        console.log(err.message)
    }
}
//ReadByFilter()


// 4) Delete a document, we use the following method:
/*
.1 deleteOne(), to delete a single document.
.2 deleteMany(), to delete multiple documents.

each one take one parameter, which is the filter condition.

*/

const DeleteSingle = async () => {
    try {
        const filter = { _id: '670c53e1a69762bb2905c65b' };
        await books.deleteOne(filter);
    } catch (err) {
        console.log(err.message)
    }
}
//DeleteSingle()

const DeleteMulti = async () => {

    try {
        const filter = { price: { $lt: 600 } };
        await books.deleteMany(filter);
    } catch (err) {
        console.log(err.message)
    }
}
//DeleteMulti()