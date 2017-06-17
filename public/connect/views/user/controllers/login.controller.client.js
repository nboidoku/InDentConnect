(function () {
    angular
        .module('InDentConnect')
        .controller('loginController', loginController)

    function loginController(userService, $location) {

        var model = this;

        model.login = function (){

            userService
                .findUserBbyCredentials(username, password)
                .then(login, handleError);


            function handleError(error) {
                model.message = "Username " + username + " does not exist with that password";
            }

            function login(found) {
                if (found !== null) {
                    $location.url('/user/'+ found.id);
                }
                else {
                    model.message = "Username " + username + " does not exist with that password"
                }
            }
        }
    }
})
();
