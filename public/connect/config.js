(function () {
    angular
        .module('InDentConnect')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'homeController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('user/:userId/task', {
                templateUrl: 'views/task/templates/task-home.view.client.html',
                controller: 'taskHomeController',
                controllerAs: 'model'
            })
            .when('user/:userId/task/new', {
                templatesUrl: 'views/task/templates/task-new.view.client.html',
                controller: 'taskNewController',
                controllerAs: 'model'
            })
            .when('user/:userId/task/:taskId', {
                templateUrl: 'views/task/templates/task-info.view.client.html',
                controller: 'taskInfoController',
                controllerAs: 'model'
            })
            .when('/news', {
                templateUrl: 'views/news/templates/news-list.view.client.html',
                controller: 'newsListController',
                controllerAs: 'model'
            })
    }
})
();
