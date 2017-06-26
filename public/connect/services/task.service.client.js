(function () {
    angular
        .module('InDentConnect')
        .factory('taskService', taskService);


    function taskService($http) {

        return {
            findAllTasksForUser: findAllTasksForUser,
            findTaskById: findTaskById,
            updateTask: updateTask,
            deleteTask: deleteTask,
            createTask: createTask,
            findAllTasks: findAllTasks,
            applyForTask: applyForTask,
            findAllApplicantsForTask: findAllApplicantsForTask
        };

        function findAllTasksForUser() {
            var url = "/api/connect/task";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllApplicantsForTask(taskId) {
            var url = "/api/connect/task/" + taskId + "/followers";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function applyForTask(taskId) {
            var url = "/api/connect/task/" + taskId + "/apply";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllTasks() {
            var url = "/api/connect/task-list";
            return $http.get(url)
                .then(function (response) {
                    return response.data
                })
        }

        function findTaskById(taskId) {
            var url = '/api/connect/task/' + taskId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createTask(task) {
            var url = '/api/connect/task';
            return $http
                .post(url, task)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteTask(taskId) {
            var url = '/api/connect/task/' + taskId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data
                })
        }

        function updateTask(taskId, task) {
            var url = '/api/connect/task/' + taskId;
            return $http
                .put(url, task)
                .then(function (response) {
                    return response.data
                })
        }
    }

})
();
