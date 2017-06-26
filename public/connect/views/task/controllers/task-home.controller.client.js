(function () {
   angular
       .module('InDentConnect')
       .controller('taskHomeController', taskHomeController);

    function taskHomeController(currentUser, taskService) {

        var model = this;

        model.isContractor = currentUser.roles.indexOf('CONTRACTOR') > -1;

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
