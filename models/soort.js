const mongoose = require('mongoose');

const soortSchema = new mongoose.Schema({
    naam: {
        type: String,
        required: true,
        maxlength:50
    }
});

const Soort = mongoose.model('Soort', soortSchema);


exports.soortSchema = soortSchema;
exports.Soort = Soort;