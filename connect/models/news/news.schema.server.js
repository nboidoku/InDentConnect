var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    _client: {type: mongoose.Schema.ObjectId, ref:'UserModel'},
    _contractor: {type: mongoose.Schema.ObjectId, ref:'UserModel'},
    time: {type: Date, default: Date.now()}
},
    {collection: 'news'});


module.exports = newsSchema;
