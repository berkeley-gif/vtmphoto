angular.module( 'services.geocoder', [])
// to get the current latitude and longitude from browser
// credits https://github.com/arunisrael/angularjs-geolocation


.factory('geocoder', ['$q', function($q) {

  //Private variables
  var geocoder = new google.maps.Geocoder();
  var deferred = $q.defer();

  // Public functions
  return { 
    codeAddress: function(address) {
      geocoder.geocode( {'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
                      console.log(results);
          return deferred.resolve({
            latitude: results[0].geometry.location.lat(),
            longitude: results[0].geometry.location.lng()
          });
        }
        return deferred.reject();
      });
      return deferred.promise;
    },
    codeLatLng: function(coords) {
      var lat = parseFloat(coords.lat);
      var lng = parseFloat(coords.lng);
      var latlng = new google.maps.LatLng(lat, lng);
      geocoder.geocode( {'latlng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          return deferred.resolve(results[0].formatted_address);
        }
        return deferred.reject();
      });
      return deferred.promise;
    }

  };
}]);