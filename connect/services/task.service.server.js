var app = require('../../express');
var taskModel = require('../models/task/task.model.server');

app.get('/api/connect/task', findAllTasksForUser);
app.get('/api/connect/task/:taskId', findTaskForUser);
app.put('/api/connect/task/:taskId', updateTask);
app.delete('/api/connect/task/:taskId', deleteTask);
app.post('/api/connect/task', createTask);
app.get('/api/connect/task-list', findAllTasks);
app.get('/api/connect/task/:taskId/apply', applyForTask);
app.get('/api/connect/task/:taskId/followers', findAllApplicantsForTask);
app.get('/api/connect/task/:taskId/:userId/add', addContractor);

function findAllTasksForUser(req, res) {
    userId = req.user._id;
    taskModel
        .findAllTasksForUser(userId)
        .then(function (tasks) {
            res.json(tasks)
        })
}

function addContractor(req, res) {
    taskId = req.params['taskId'];
    userId = req.params['userId'];
    taskModel
        .addContractor(taskId, userId)
        .then(function () {
            res.sendStatus(200);
        })

}

function findAllApplicantsForTask(req, res) {
    taskId = req.params['taskId'];
    taskModel
        .findAllApplicantsForTask(taskId)
        .then(function (task) {
            res.json(task._followers)
        })
}

function findAllTasks(req, res) {
    taskModel
        .findAllTasks()
        .then(function (tasks) {
            res.json(tasks);
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

function applyForTask(req, res) {
    var taskId = req.params['taskId'];
    var userId = req.user._id;
    taskModel
        .findTaskById(taskId)
        .then(function (task) {
            task._followers.push(userId);
            res.sendStatus(200);
            return task.save();
        })
}

function updateTask(req, res) {
    var taskId = req.params['taskId'];
    var task = req.body;
    taskModel
        .updateTask(taskId, task)
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

