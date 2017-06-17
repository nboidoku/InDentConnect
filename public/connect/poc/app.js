(function () {
    angular
        .module('pocApp', [])
        .controller('pocController', pocController);

    function pocController() {

        var model = this;


        model.findInfo = findInfo;

        model.changeModelMessage = changeModelMessage;


        function findInfo(origin, destination) {

            var origin1 = origin;
            var destinationA = destination;

            var service = new google.maps.DistanceMatrixService;

            service.getDistanceMatrix({
                origins: [origin1],
                destinations: [destinationA],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, function(response, status) {
                if (status !== 'OK') {
                    alert('Error was: ' + status);
                } else {
                    var result = response.rows[0].elements[0].distance.text;
                    changeModelMessage(result);
                }

            })
        }

        function changeModelMessage(result) {
            model.message = "The distance is " + result
        }

    }


})
();