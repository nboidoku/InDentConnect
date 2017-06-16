var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: {type:String, require: true},
    lastName: {type:String, require:true},
    email: {type:String, require: true},
    dob: Date,
    username: {type: String, require:true },
    rating: Number,
    followers: [{type: mongoose.Schema.ObjectId, ref:"IUserModel"}]
}, {collection: "InDentUsers"});

model.exports = userSchema;