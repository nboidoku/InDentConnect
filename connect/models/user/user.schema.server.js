var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true},
    tasks: [{type: mongoose.Schema.ObjectId, ref:'TaskModel'}],
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
    followers: [{type: mongoose.Schema.ObjectId, ref: "UserModel"}]
}, {collection: "users"});

module.exports = userSchema;