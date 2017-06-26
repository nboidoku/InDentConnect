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
                });
            taskService
                .findAllApplicantsForTask(model.taskId)
                .then(function (contractors) {
                    model.contractors = contractors;
                })
                .then(function () {
                    for (var u in model.contractors) {
                        if (model.contractors[u]._id === model.task._contractor) {
                            model.contractor = model.contractors[u];
                            model.contractor.name = model.contractor.firstName + " " + model.contractor.lastName
                        }
                    }
                })

        }

        init();


    }
})
();
