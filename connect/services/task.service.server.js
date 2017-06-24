var app = require('../../express');
var taskModel = require('../models/task/task.model.server');

app.get('/api/connect/task', findAllTasksForUser);
app.get('/api/connect/task/:taskId', findTaskForUser);
app.put('/api/connect/task/:taskId', updateTask);
app.delete('/api/connect/task/:taskId', deleteTask);
app.post('/api/connect/task', createTask);

function findAllTasksForUser(req, res) {
    userId = req.user._id;
    taskModel
        .findAllTasksForUser(userId)
        .then(function (tasks) {
            res.json(tasks)
        })
}

function findTaskForUser(req, res) {
    var taskId = req.params['taskId'];
    taskModel
        .findTaskById(taskId)
        .then(function (task) {
            res.json(task)
        });
}

function updateTask(req, res) {
    var taskId = req.params['taskId']
    taskModel
        .updateTask(taskId)
        .then(function (response) {
            res.send(response)
        })
}

function deleteTask(req, res) {
    var taskId = req.params['taskId'];
    taskModel
        .deleteTask(taskId)
        .then(function (response) {
            res.send(response);
        })
}


function createTask(req, res) {
    var task = req.body;
    task._user = req.user._id;
    taskModel
        .createTask(task)
        .then(function (task) {
            res.json(task);
        })
}

