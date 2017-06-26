(function () {
   angular
       .module('InDentConnect')
       .controller('taskInfoController', taskInfoController);


    function taskInfoController($routeParams, taskService, currentUser) {

        var model = this;

        model.taskId = $routeParams['taskId'];


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
                    console.log(model.task);

                });
            taskService
                .findAllApplicantsForTask(model.taskId)
                .then(function (contractors) {
                    model.contractors = contractors;
                })
        }
        init();


    }
})
();
