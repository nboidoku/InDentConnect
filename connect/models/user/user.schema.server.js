var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true},
    _tasks: [{type: mongoose.Schema.ObjectId, ref:'TaskModel'}],
    skill: String,
    location: {
        lat: String,
        lng: String
    },
    dob: Date,
    google: {
        id: String,
        token: String
    },
    facebook: {
        id: String,
        token: String
    },
    roles: [{type: String, default: 'CLIENT', enum: ['CLIENT', 'CONTRACTOR', 'ADMIN']}],
    username: {type: String, require: true},
    password: {type: String},
    rating: Number,
    _following: [{type: mongoose.Schema.ObjectId, ref: "UserModel"}]
}, {collection: "users"});

module.exports = userSchema;