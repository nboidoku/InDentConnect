(function () {
    angular
        .module('InDentConnect')
        .controller('registerController', registerController);


    function registerController($location, userService) {
        var model = this;

        model.register = function (username, password, verify, email, dob) {

            userService
                .findUserByUsername(username)
                .then(function (found) {
                    if (found) {
                        handleError('username')
                    }
                    else verifyPassword();
                });

            function verifyPassword() {
                if (password !== verify) {
                    handleError('password');
                }
                else verifyEmail();
            }

            function verifyEmail() {
                if (email) {
                    verifyDob();
                }
                else {
                    handleError('email')
                }
            }

            function verifyDob() {
                registerUser();
            }

            function handleError(error) {
                switch(error) {
                    case 'username':
                        model.message = "Username "+ error + " already exists";
                        break;
                    case 'password:':
                        model.message = "Passwords do not match";
                        break;
                    case 'email':
                        model.message = "Invalid email";
                        break;
                    default:
                        model.message = "Error, please try again";
                }
            }

            function registerUser() {
                var user = {
                    username: username,
                    password: password,
                    email: email,
                    dob: dob
                };
                userService
                    .createUser(user)
                    .then(function (user) {
                        $location.url('/user/'+user._id);
                    })
            }
        }
    }
})
();
