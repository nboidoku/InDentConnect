var app = require('../../express');
var newsModel = require('../models/news/news.model.server');

app.get('/api/connect/news', findAllNews);
app.post('/api/connect/news', createNews);
app.get('/api/connect/news/client/:userId', findNewsForClient);
app.get('/api/connect/news/contractor/:userId', findNewsForContractor);

function createNews(req, res) {
    var news = req.body;
    news._client = req.user._id;
    news.date = Date.now();
    newsModel
        .addNews(news)
        .then(function (news) {
            res.json(news)
        })
}

function findNewsForClient(req, res) {
    userId = req.params['userId'];
    newsModel
        .findNewsByClient(userId)
        .then(function (news) {
            res.json(news)
        })
}

function findNewsForContractor(req, res) {
    userId = req.params['userId'];
    newsModel
        .findNewsByContractor(userId)
        .then(function (news) {
            res.json(news)
        })
}

function findAllNews(req, res) {
    newsModel
        .findAllNews()
        .then(function (news) {
            res.json(news);
        })
}