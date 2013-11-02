/**
 * Photo module
 */
angular.module( 'vtmphotoApp.photo', [
  'ui.state',
  'PhotoRes'
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



;