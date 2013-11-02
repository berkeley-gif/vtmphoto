/**
 * Photo module
 */
angular.module( 'vtmphotoApp.photodetail', [
  'ui.state',
  'PhotoRes'
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
      data:{ pageTitle: 'Photo Detail' }
    })



    ;
})

/**
 * And of course we define a controller for our route.
 */

.controller('PhotoDetailCtrl', function PhotoDetailController ($scope, $stateParams, PhotoRes ) {
    $scope.photo = PhotoRes.query({'record': $stateParams.record});

})

/**
 * Add a resource to allow us to get at the server
 */
.factory( 'PhotoRes', function ( $resource )  {
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
})

;