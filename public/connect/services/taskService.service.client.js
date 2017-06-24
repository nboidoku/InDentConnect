(function () {
    angular
        .module('InDentConnect')
        .factory('taskService', taskService);

    return {
        findAllTasksForUser: findAllTasksForUser
    };

    function findAllTasksForUser(userId) {
        var url = '/api/connect'
    }
})
();
