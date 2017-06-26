(function () {
    angular
        .module('InDentConnect')
        .factory('newsService', newsService);

    function newsService($http) {

        return {
            createNews: createNews,
            findNewsByClient: findNewsByClient,
            findNewsNByContractor: findNewsByContractor,
            findAllNews: findAllNews
        };

        function createNews(news) {
            var url = '/api/connect/news';
            return $http
                .post(url, news)
                .then(function (response) {
                    return response.data
                })
        }

        function findNewsByClient(userId) {
            var url = '/api/connect/news/client/' + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data
                })
        }

        function findNewsByContractor(userId) {
            var url = '/api/connect/news/contractor/' + userId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data
                })
        }

        function findAllNews() {
            var url = '/api/connect/news';
            return $http.get(url)
                .then(function (response) {
                    return response.data
                })
        }
    }
})
();