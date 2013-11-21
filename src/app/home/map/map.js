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
angular.module( 'map', [
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */


.controller('MapCtrl', ['$scope', 'leafletData', function ($scope, leafletData) {

  var local_icons = {
    div_icon: L.divIcon({
            iconSize: [8, 8],
            iconAnchor: [0, 0],
            className: 'custom-marker-icon'

    })

  };
    
  $scope.icons = local_icons;

  if ($scope.data.results.length > 0){

             for (var i = 0, len = $scope.data.results.length; i < len; i++) {
                  var result = $scope.data.results[i];
                  $scope.filteredMarkers[i] = {
                    record: result.record,
                    title: i,
                    lat: result.geojson.coordinates[1],
                    lng: result.geojson.coordinates[0],
                    county: result.county,
                    authors: result.authors,
                    media_url: result.media_url,
                    year: result.begin_date,
                    layer: 'locations',
                    icon: local_icons.div_icon
                };

            }  
  }







  

}])

;

