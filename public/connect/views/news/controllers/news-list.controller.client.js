(function () {
    angular
        .module('InDentConnect')
        .controller('newsListController', newsListController);


    function newsListController(newsService) {

        var model = this;

        function init() {
            newsService
                .findAllNews()
                .then(function (news) {
                    model.newsList = news;
                })
        }

        init();

    }
})
();