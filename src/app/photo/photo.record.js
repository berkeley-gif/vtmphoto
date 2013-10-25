/**
 * Photo module
 */
angular.module( 'record', [
  'ui.state',
  'ngResource'
])

/**
 * Define the route that this module relates to, and the page template and controller that is tied to that route
 */
.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'photo/:record', {
      url: '/:record',
      views: {
        "main": {
          controller: 'PhotoDetailCtrl',
          templateUrl: 'photo/photo.record.tpl.html'
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
    
    $scope.photo = PhotoRes.get({format:'json'}, {'record': $stateParams.record});

})



;