const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please provide content']
    },

    // make it iso date
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// use index to auto delete expired sessions after 10 seconds from creation
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 });

const sessions = mongoose.model('sessions', sessionSchema);


module.exports = sessions;