/**
 * Photo module
 */
angular.module( 'vtmphotoApp.photodetail', [
  'ui.state',
  'resources.photos'
])

/**
 * Define the route that this module relates to, and the page template and controller that is tied to that route
 */
.config(function config( $stateProvider ) {
  $stateProvider
    .state( '/photo/{record}', {
      url: '/photo/{record}',
      views: {
        "main": {
          controller: 'PhotoDetailCtrl',
          templateUrl: 'photodetail/photo.record.tpl.html'
        }
      },
      resolve:{
          photos:['Photos', function (Photos, $stateParams) {
           //var temp = Photos.query({collection_code : 'VTM', format: 'json', fields: 'record,geojson,county'});
            return Photos.getById ($stateParams.record);
          }]
        }
    });
})

/**
 * And of course we define a controller for our route.
 */

.controller('PhotoDetailCtrl', function PhotoDetailController ($scope, photos) {
    //$scope.photo = PhotoRes.query({'record': $stateParams.record});
    $scope.photo = photos;
    console.log($scope.photo);

})

/**
 * Add a resource to allow us to get at the server
 */
/*.factory( 'PhotoRes', function ( $resource )  {
  return $resource('http://ecoengine.berkeley.edu/api/photos/:record', {record: '@record'}, {
  query: {
    method:'GET', 
    params: {
      format:'json', 
      page_size:20, 
      collection_code:'VTM'
    },
    isArray:false
  }
  });
})*/

;