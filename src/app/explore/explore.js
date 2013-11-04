/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'vtmphotoApp.explore', [
  'ui.state',
  'titleService',
  'leaflet-directive',
  'resources.photos'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'explore', {
    url: '/explore',
    views: {
      "main": {
        controller: 'ExploreCtrl',
        templateUrl: 'explore/explore.tpl.html',
        resolve:{
          photos:['Photos', function (Photos) {
            console.log('reached here');
            return Photos.query({collection_code : 'VTM'});
          }]
        }
      }
    }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'ExploreCtrl', ['$scope', 'photos', function HomeController( $scope,  titleService, photos) {

  titleService.setTitle( 'Explore' );

  $scope.center = {
            lat: 37,
            lng: -120,
            zoom: 6
  };
  
  $scope.defaults = {
    tileLayer: 'http://{s}.tile.cloudmade.com/e74bf6d54e334b95af49cbb6b91a6d18/22677/256/{z}/{x}/{y}.png'
  };

  $scope.markers = {};
  $scope.results = [];
  $scope.photos = photos;
  console.log($scope.photos);

/*   PhotoLocations.async().then(function(data){
      $scope.results = data.results;

   });

 console.log($scope.results);
 if ($scope.results.length > 0){

         for (var i = 0, len = $scope.results.length; i < len; i++) {
            $scope.markers[i] = {
              name: $scope.results[i].record,
              lat: $scope.results[i].geojson.coordinates[1],
              lng: $scope.results[i].geojson.coordinates[0]
            };
        }  
 }*/
   
 







 
}])


;

