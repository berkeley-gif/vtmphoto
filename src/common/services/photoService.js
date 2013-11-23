angular.module( 'photoService', [
])

.factory('photoService', ['$http', function ($http, $q) {
  var mapBounds = '-119,36,-118,37';
  var queryParams = '&format=json';
  var returnedData;
  var doRequest = function(path) {
      return $http({
        url: 'http://ecoengine.berkeley.edu/api/photos/?collection_code=VTM&bbox=' + mapBounds + queryParams
      });
  };
  return {
    getData: function() { return doRequest(); },
    setMapBounds: function(newMapBounds) { mapBounds = newMapBounds; }
  };



}]) //End: Data service


;

