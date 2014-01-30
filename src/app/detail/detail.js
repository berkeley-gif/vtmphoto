/**
 * Photo module
 */
angular.module( 'detail', [
  //angular modules
  'ui.router',
  'ui.bootstrap',
  'record',
  'sidebar',
   //services
  'resources.photos'
])

/**
 * Define the route that this module relates to, and the page template and controller that is tied to that route
 */
.config(function config( $stateProvider ) {
  $stateProvider
    .state( '/detail/:record', {
      url: '/detail/:record',
      controller: 'DetailCtrl',
      templateUrl: 'detail/detail.tpl.html',
      resolve:{
          photos:['Photos', '$stateParams', function (Photos, $stateParams) {
           
            console.log($stateParams.record);
            return Photos.getById ($stateParams.record);
          }]
      }
    });
})

.controller('DetailCtrl', ['$scope', 'photos', function ($scope, photos) {

       $scope.record = photos.data;
       console.log('from parent', $scope.record);





}]) //End: DetailCtrl

;

