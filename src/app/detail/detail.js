/**
 * Photo module
 */
angular.module( 'detail', [
  //angular modules
  'ui.router',
  'ui.bootstrap',
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
          detailRecord:['Photos', '$stateParams', function (Photos, $stateParams) {
            return Photos.getById ($stateParams.record);
          }],
          recordList: function() { return []; },
          '$modalInstance': function() { 
            return function() { 
              if (modalInstance) {return modalInstance; }
              
            }; 
          }
      }
    });
})




.controller('DetailCtrl', ['$scope', '$modalInstance', 'detailRecord', 'recordList' ,function ($scope, $modalInstance, detailRecord, recordList) {

  // if (detailRecord.data) {
    $scope.record = detailRecord.data;
  // } else {
  //   $scope.record = detailRecord;
  // }
  
  //console.log('from parent', $scope.record);
  $scope.slides = recordList;

  $scope.setActive = function(idx) {
    $scope.slides[idx].active=true;
  };

  if ($scope.slides.length === 0) {
    $scope.slides.push($scope.record);
  } else {
    var detailIdx;
    for (var i=0; i < $scope.slides.length; i++) {
      if ($scope.slides[i].record === $scope.record.record) {
        console.log($scope.slides[i].record);
        console.log($scope.record);
        detailIdx = i;
        console.log(i);
        break;
      }
    }
    $scope.setActive(detailIdx);
    //arraymove($scope.slides, detailIdx, 0); 

  }
  //console.log(recordList);

 

  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex]; 
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }

  
  //////////////////////////////////////////////////////////////////
  //  EVENT HANDLERS FOR DETAIL STATE WHEN IT IS OPENED AS MODAL  //
  /////////////////////////////////////////////////////////////////
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };








}]) //End: DetailCtrl

;

