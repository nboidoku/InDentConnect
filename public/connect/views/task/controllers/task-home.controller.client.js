(function () {
   angular
       .module('InDentConnect')
       .controller('taskHomeController', taskHomeController);

    function taskHomeController(currentUser, taskService) {

        var model = this;

        function init() {
            taskService
                .findAllTasksForUser(currentUser._id)
                .then(function (tasks) {
                    model.tasks = tasks
                })
        }

        init();
    }
})
();
