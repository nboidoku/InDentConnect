var mongoose = require('mongoose');
var taskSchema = require('./task.schema.server');
var taskModel = mongoose.model('TaskModel', taskSchema);


taskModel.findAllTasksForUser = findAllTasksForUser;
taskModel.findTaskById = findTaskById;
taskModel.createTask = createTask;
taskModel.updateTask = updateTask;
taskModel.deleteTask = deleteTask;

module.exports = taskModel;


function findAllTasksForUser(userId) {
    return taskModel
        .find({_user: userId});
}

function findTaskById(taskId) {
    return taskModel
        .findById(taskId)
}

function createTask(task) {
    return taskModel.create(task)
}

function updateTask(taskId, task) {
    return taskModel.update({_id: taskId}, {
        $set: {
            name: task.name,
            description: task.description,
            dateUpdated: date.now()
        }
    })
}

function deleteTask(taskId) {
    return taskModel
        .remove({_id: taskId})
}