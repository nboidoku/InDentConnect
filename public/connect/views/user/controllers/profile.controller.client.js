(function () {
    angular
        .module('InDentConnect')
        .controller('profileController', profileController);


    function profileController(currentUser, $location, $routeParams, userService) {

        var model = this;
        //var userId = currentUser._id;
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.user = currentUser;
        model.logout = logout;
        model.fullProfile = fullProfile;


        function fullProfile() {
            return currentUser.firstName && currentUser.lastName;
        }


        function unregister() {
            userService
                .unregister()
                .then(function () {
                    userService.logout()
                })
                .then(function () {
                    $location.url('/login')
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                })
        }

    }
})

();