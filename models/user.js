const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    naam: {
        type: String,
        required: true,
        maxlength:50
    },
    email: {
        type: String,
        required: true,
        maxlength:250,
        unique: true
    },
    wachtwoord: {
        type: String,
        required: true,
        minlength: 8,
        maxlength:250
    }
}));


exports.User = User;