(function () {
    angular
        .module('InDentConnect')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        // event handlers
        model.register = register;

        // implementation
        function register(username, password, password2, email, dob) {


            model.emptyUsername = "";
            model.emptyPassword = "";
            model.emptyPassword2 = "";


            if (!username) {
                model.emptyUsername = "enter a username";
                return
            }

            if (!password) {
                model.emptyPassword = "enter a password";
                return
            }

            if (!password2) {
                model.emptyPassword2 = "retype password";
                return
            }

            if (!email) {
                model.emptyEmail = "Please enter email"
            }

            if (!dob) {
                model.emptyDob = "Please enter a date of birth"
            }


            userService
                .findUserByUsername(username)
                .then(function (found) {
                    console.log(found);
                    if (found) {
                        handleError('username')
                    }
                    else {
                        registerUser();
                    }
                })
                .findUserByEmail(email)
                .then(function (found) {
                    if (found) {
                        handleError('email')
                    }
                    else {
                        registerUser();
                    }
                });

            function registerUser() {

                if (password !== password2) {
                    handleError('password')
                }
                else {
                    var user = {
                        username:username,
                        password:password,
                        email: email,
                        dob: dob
                    };
                    userService
                        .register(user)
                        .then(function (user) {
                            $location.url('/profile');
                        })
                }

            }

            function handleError(error) {
                switch(error) {
                    case 'username':
                        model.error = "Username " + username+ " is not" +
                            " available";
                        break;
                    case 'password':
                        model.error = "passwords must match";
                        break;
                    default:
                        model.error = "error, please try again";
                }
            }

        }
    }
})();