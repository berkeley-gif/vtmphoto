/**
 * Photo module
 */
angular.module( 'detail', [
  //angular modules
  'ui.router',
  'ui.bootstrap',
   //services
  'resources.photos',
  'filters.thumbnail',
  'directives.imageonload'
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


  $scope.isCollapsed = true;
  
  $scope.slides = recordList;

  $scope.currentIndex = 0;



/*  $scope.setActive = function (idx) {
    $scope.slides[idx].active = true;
  };

  $scope.getActiveSlide = function () {
    return $scope.slides.filter(function (s) { return s.active; })[0];
  };

  $scope.activeIdx = $scope.getActiveSlide();*/

  for (var i=0; i < $scope.slides.length; i++) {
    if ($scope.slides[i].record === detailRecord) {
      console.log('slideposition',i);
      //$scope.setActive(i);
      $scope.currentIndex = i;
      $scope.active = $scope.slides[i];
      break;
    }
  }

  $scope.direction = 'left';


        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };

/*   $scope.$watch('activeIdx', function(newValue, oldValue){

    // Ignore initial setup
    if ( newValue === oldValue) {
      return;
    }

    // Load data from service
    if ( newValue ) {
      var active = $scope.getActiveSlide();
      console.log('active', active);
  }


  });*/










  
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

