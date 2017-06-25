(function () {
   angular
       .module('InDentConnect')
       .controller('taskEditController', taskEditController);

   function taskEditController($routeParams, taskService, currentUser, $location) {
       var model = this;

       model.taskId = $routeParams['taskId'];

       model.updateTask = updateTask;
       model.deleteTask = deleteTask;

       function init() {
           taskService
               .findAllTasksForUser(currentUser._id)
               .then(function (tasks) {
                   model.tasks = tasks;
               });
           taskService
               .findTaskById(model.taskId)
               .then(function (task) {
                   model.task = task;
               })
       }
       init();

       function updateTask(task) {
           taskService
               .updateTask(model.taskId, task)
               .then(function () {
                   $location.url('/user/task/'+model.taskId);
               })
       }

       function deleteTask() {
           taskService
               .deleteTask(model.taskId)
               .then(function () {
                   $location.url('/user/task')
               })
       }


   }
})
();