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
            createTask: createTask
        };

        function findAllTasksForUser() {
            var url = "/api/connect/task";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
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
            var url = '/api/connect/task' + taskId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data
                })
        }

        function updateTask(taskId, task) {
            var url = '/api/connect/task' + taskId;
            return $http
                .put(url, task)
                .then(function (response) {
                    return response.data
                })
        }
    }

})
();
