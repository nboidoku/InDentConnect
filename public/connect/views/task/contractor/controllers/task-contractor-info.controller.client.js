(function () {
    angular
        .module('InDentConnect')
        .controller('taskContractorInfoController', taskContractorInfoController);


    function taskContractorInfoController(taskService, $routeParams, $location) {

        var model = this;

        model.taskId = $routeParams['taskId'];

        model.applyForTask = applyForTask;

        function init() {
            taskService
                .findAllTasksForUser()
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

        function applyForTask() {
            taskService
                .applyForTask(model.taskId)
                .then(function () {
                    $location.url('/user/task/list')
                })
        }

    }
})
();
