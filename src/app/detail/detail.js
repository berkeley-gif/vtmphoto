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
    .state( 'detail', {
      url: '/detail/:record',
      controller: 'DetailCtrl',
      templateUrl: 'detail/detail.tpl.html',
      resolve:{
          photos:['Photos', '$stateParams', function (Photos, $stateParams) {
            return Photos.getById ($stateParams.record);
          }]
      }
    });
})

/*.controller('DetailCtrl', ['$scope', '$rootScope', 'Photos', '$modalInstance',  'recordID', 'locationParamsAndHash',
  function ($scope, $rootScope, Photos, $modalInstance, recordID, locationParamsAndHash) {

    $rootScope.viewingOverlay = true;
    console.log(recordID);
    console.log(locationParamsAndHash);

    $scope.closeOverlay = function(){
    //this can only pass in a single param
      $modalInstance.close(locationParamsAndHash);
    };

    //and load in the appropriate data
    $scope.record = {};

    Photos.getById(
      recordID,
      function(response){
        console.log(response);
        $scope.record = response.data;
      },
      function(response){
        console.log(response.data);
      }
    );*/


.controller('DetailCtrl', ['$scope', 'photos', function ($scope, photos) {

       $scope.record = photos.data;
       console.log('from parent', $scope.record);







}]) //End: DetailCtrl

;

