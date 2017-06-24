( function () {
    angular
        .module('InDentConnect')
        .controller('taskNewController', taskNewController);

    function taskNewController(taskService, currentUser, $location) {

        var model = this;
        model.createTask = createTask;

        function init() {
            taskService
                .findAllTasksForUser(currentUser._id)
                .then(function (tasks) {
                    model.tasks = tasks
                })
        }

        init();

        function createTask(task) {
            taskService
                .createTask(task)
                .then(function () {
                    $location.url('/user/task')
                })
        }

    }

})
();