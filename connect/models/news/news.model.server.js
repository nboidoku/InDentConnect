var mongoose = require('mongoose');
var newsSchema = require('./news.schema.server');
var newsModel = mongoose.model('NewsModel', newsSchema);

newsModel.addNews = addNews;
newsModel.findNewsByClient = findNewsByClient;
newsModel.findNewsByContractor = findNewsByContractor;
newsModel.findAllNews = findAllNews;

module.exports = newsModel;


function addNews(news) {
    return newsModel.create(news)
}

function findNewsByClient(userId) {
    return newsModel.find({_user:userId});
}

function findNewsByContractor(userId) {
    return newsModel.find({_contractor:userId});
}

function findAllNews() {
    return newsModel
        .find()
        .populate('_client')
        .populate('_contractor');
}

