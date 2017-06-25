(function (){
    angular
        .module('InDentConnect')
        .factory('userService', userService);


    function userService($http) {
        return {
            findUserById: findUserById,
            login : login,
            findUserByUsername: findUserByUsername,
            logout:logout,
            checkLoggedIn: checkLoggedIn,
            checkAdmin: checkAdmin,
            checkContractor: checkContractor,
            findAllUsers: findAllUsers,
            register: register,
            createUser: createUser,
            deleteUser: deleteUser,
            unregister: unregister,
            updateUser: updateUser,
            findUserByEmail: findUserByEmail
        };

        function createUser(user) {
            var url = "/api/connect/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function login(username, password) {
            var url = "/api/connect/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http
                .post(url, credentials)
                .then(function (response) {
                    return response.data;
                })
        }

        function logout() {
            var url = '/api/connect/logout';
            return $http
                .post(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function checkLoggedIn() {
            var url = "/api/connect/checkLoggedIn";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data
                });

        }

        function findUserByUsername(username) {
            var url = "/api/connect/user?username="+ username;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByEmail(email) {
            var url = "/api/connect/user?email="+ email;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data
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

        function register(user) {
            var url = "/api/connect/register";
            return $http
                .post(url, user)
                .then(function (response) {
                    return response.data
                })
        }

        function unregister() {
            var url = "/api/connect/unregister";
            return $http.delete(url)
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

        function findAllUsers() {
            var url = "/api/connect/users";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function checkAdmin() {
            var url = "/api/connect/checkAdmin";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data
                });

        }

        function checkContractor() {
            var url = "/api/connect/checkContractor";
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                })
        }


    }
})
();