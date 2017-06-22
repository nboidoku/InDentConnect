(function () {
    angular
        .module('InDentConnect')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController(userService) {
        var model = this;

        model.createUser = createUser;

        model.deleteUser = deleteUser;

        function init() {
            findAllUsers()
        }

        init();


        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers());

        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                })
        }

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            userService
                .createUser(user)
                .then(findAllUsers());
        }
    }
})
();