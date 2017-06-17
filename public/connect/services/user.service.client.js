(function (){
    angular
        .module('InDentConnect')
        .factory('userService', userService);


    function userService($http) {
        return {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            createUser: createUser
        };

        function createUser(user) {
            var url = '/api/connect/user';
            return $http
                .post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }
        function findUserByCredentials(username, password){
            var url = '/api/connect/user?username='+username+'&password='+password;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByUsername(username) {
            var url = '/api/connect/user?username='+username;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserById(userId) {
            var url = '/api/connect/user/'+userId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteUser(userId) {
            var url = '/api/connect/user/'+userId;
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUser(userId, user) {
            var url = '/api/connect/user/'+userId;
            return $http
                .put(url, user)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})
();