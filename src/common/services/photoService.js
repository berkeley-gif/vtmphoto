angular.module( 'dataService', [
])

.factory('dataService', ['$http', function ($http) {
  var data = {};
  var server_queried = false;
  var promise;
  return {
    data_async: function() {
      if(!promise || !server_queried) {
        promise = $http.get('http://ecoengine.berkeley.edu/api/photos/?bbox=-119,36,-118,37&collection_code=VTM&format=json').then(
        function(response) {
          server_queried = true;
          data = response;
          return data;
        });
      }
      return promise;
    }
  };

}]) //End: HomeCtrl


;

