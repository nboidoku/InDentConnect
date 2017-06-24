(function () {
   angular
       .module('InDentConnect')
       .controller('taskEditController', taskEditController);

   function taskEditController($routeParams, taskService, currentUser, $location) {
       var model = this;

       model.taskId = $routeParams['taskId'];

       model.updateTask = updateTask;

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
                   console.log(task)
               })
       }
       init();

       function updateTask(task) {
           taskService
               .updateTask(taskId, task)
               .then(function () {
                   $location.url('/user/task/'+taskId);
               })
       }


   }
})
();