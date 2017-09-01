const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blobSchema = new Schema({
    name: String,
    lastName: String
});

module.exports = mongoose.model('blobs', blobSchema);
