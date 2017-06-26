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
                templateUrl: 'views/admin/templates/admin.view.client.html',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/users', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/user/task', {
                templateUrl: 'views/task/templates/task-home.view.client.html',
                controller: 'taskHomeController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/task/list', {
                templateUrl:'views/task/contractor/templates/task-list.view.client.html',
                controller: 'taskListController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkContractor
                }
            })
            .when('/user/contractor/task/:taskId', {
                templateUrl: 'views/task/contractor/templates/task-contractor-info.view.client.html',
                controller: 'taskContractorInfoController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkContractor
                }
            })
            .when('/user/task/new', {
                templateUrl: 'views/task/client/templates/task-new.view.client.html',
                controller: 'taskNewController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/task/:taskId', {
                templateUrl: 'views/task/templates/task-info.view.client.html',
                controller: 'taskInfoController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/task/edit/:taskId', {
                templateUrl: 'views/task/client/templates/task-edit.view.client.html',
                controller: 'taskEditController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/contractor/:contractorId', {
                templateUrl: 'views/contractor/templates/contractor-details.view.client.html',
                controller: 'contractorDetailController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            /*
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

    function checkAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                    $location.url('/');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkContractor($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkContractor()
            .then(function (currentUser) {
                if(currentUser === '0') {
                    deferred.resolve({});
                    $location.url('/user/task');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})
();
