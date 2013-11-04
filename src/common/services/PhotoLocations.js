angular.module( 'PhotoLocations', [
  
])



.factory('PhotoLocations', function($http) {
  var myService = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get('http://ecoengine.berkeley.edu/api/photos/?collection_code=VTM&format=json&fields=record,geojson').then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return myService;
})


;