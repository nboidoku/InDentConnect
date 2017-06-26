(function () {
   angular
       .module('InDentConnect')
       .controller('taskListController', taskListController);

   function taskListController(taskService) {

       var model = this;


       function init() {
           taskService
               .findAllTasks()
               .then(function (tasks) {
                   model.tasks = tasks;
               })
       }
       init();
   }
})
();