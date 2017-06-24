var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    name: {type: String, require:true},
    description: {type:String, require:true},
    _user: {type: mongoose.Schema.ObjectId, ref:'UserModel'},
    _followers: [{type: mongoose.Schema.ObjectId, ref:'UserModel'}],
    accepted: {type:String, default: 'NO', enum: ['NO', 'YES', 'PENDING']},
    dateCreated: {type: Date, default:Date.now()},
    dateUpdated: {type: Date, default:Date.now()}
},
    {collection: 'tasks'});

module.exports = taskSchema;