app.controller('MainController', ['$scope', function($scope) {
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        departure_time: Date.now() * 0.001,
        key: 'AIzaSyC_mKIcx77JQtl1n6n-3uOumB-d0eZrDRM'
    };

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var trafficLayer = new google.maps.TrafficLayer();

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setPanel(document.getElementById('right-panel'));
    directionsDisplay.setMap($scope.map);
    trafficLayer.setMap($scope.map);

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: '1626 haight st, san francisco, ca, 94117',
          destination: 'oakland, ca',
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            var point = response.routes[ 0 ].legs[ 0 ];
            console.log(point.duration.text);
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    }

    $scope.clicky = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
        console.log($scope.map, 'hello')
    }
}]);
