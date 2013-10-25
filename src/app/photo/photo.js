/**
 * Photo module
 */
angular.module( 'vtmphotoApp.photo', [
  'ui.state',
  'ngResource',
  'photo.record'
])

/**
 * Define the route that this module relates to, and the page template and controller that is tied to that route
 */
.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'photo', {
      url: '/photo',
      views: {
        "main": {
          controller: 'PhotoCtrl',
          templateUrl: 'photo/photo.tpl.html'
        }
      },
      data:{ pageTitle: 'Photo' }
    }) ;
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'PhotoCtrl', function PhotoController( $scope, PhotoRes ) {

  $scope.photos = PhotoRes.query();
  $scope.orderProp = 'begin_date';

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