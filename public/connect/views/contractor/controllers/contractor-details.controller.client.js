(function () {

    angular
        .module('InDentConnect')
        .controller('contractorDetailController', contractorDetailController);

    function contractorDetailController($routeParams, userService) {

        var model = this;

        model.userId = $routeParams['contractorId'];



        function init() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    model.user = user
                })
        }

        init();


    }

})
();