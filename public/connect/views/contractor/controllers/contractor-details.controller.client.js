(function () {

    angular
        .module('InDentConnect')
        .controller('contractorDetailController', contractorDetailController);

    function contractorDetailController($routeParams, userService, $location, taskService, newsService) {

        var model = this;

        model.userId = $routeParams['contractorId'];

        model.chooseContractor = chooseContractor;

        model.taskId = $routeParams['taskId'];

        function init() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    model.user = user
                })
        }

        init();

        function chooseContractor() {
            taskService
                .addContractor(model.taskId, model.userId)
                .then(function () {
                    $location.url('/user/task/'+ model.taskId);
                });
            var news = {
                _contractor : model.userId
            };
            newsService
                .createNews(news);
        }

    }

})
();