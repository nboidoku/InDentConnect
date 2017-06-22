(function () {
    angular
        .module('InDentConnect')
        .controller('loginController', loginController);


    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {

            model.emptyUsername = "";
            model.emptyPassword = "";

            if (!username) {
                model.emptyUsername = "enter a username";
                return
            }

            if (!password) {
                model.emptyPassword = "enter a password";
                return
            }

            userService
                .login(username, password)
                .then(login, handleError);

            function handleError(error) {
                model.message = "Username " + username + " not found with" +
                    " that password, please try again";
            }

            function login(found) {
                if (found !== null) {
                    $location.url('/profile');
                } else {
                    model.message = "Username " + username + " not found" +
                        " with that password, please try again";
                }
            }
        }
    }
})
();