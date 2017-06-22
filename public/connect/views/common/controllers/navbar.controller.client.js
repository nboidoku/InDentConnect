( function () {
   angular
       .module('InDentConnect')
       .controller('navbarController', navbarController);

    function navbarController(userService, $location) {

        var model = this;

        model.logout = logout;

        function init() {
            return userService
                .checkLoggedIn()
                .then(function (currentUser) {
                    model.loggedIn = currentUser._id;
                })

        }

        init();


        function logout() {
            userService
                .logout()
                .then(init)
                .then(function () {
                    $location.url('/')
                });

        }



    }
})
();