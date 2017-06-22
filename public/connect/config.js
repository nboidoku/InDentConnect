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
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html'/*,
                resolve: {
                    currentUser: checkAdmin
                }*/
            })
            .when('/admin/users', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model'/*,
                resolve: {
                    currentUser: checkAdmin
                }*/
            })
            /*.when('user/:userId/task', {
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
            })*/
    }

    function checkLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})
();
