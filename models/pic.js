const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const picSchema = new Schema({
    imgurObject: Schema.Types.Mixed,
    tags: [String],
    queryTimes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('pic', picSchema);
