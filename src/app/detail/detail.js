/**
 * Photo module
 */
angular.module( 'detail', [
  //angular modules
  'ui.router',
  'ui.bootstrap.collapse',
   //services
  'resources.photos',
  'filters.thumbnail',
  'filters.sublist',
  'directives.imageonload',
  'services.markerData',
  'directives.scroll'
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
          //TODO: Get nearby photos to populate recordList after detailRecord is resolved (for non-modal view)
          recordList: function() { return []; },
          '$modalInstance': function() { 
            return function() { 
              if (modalInstance) {return modalInstance; }
              
            }; 
          }
      }
    });
})




.controller('DetailCtrl', ['$scope', '$location','$modalInstance', 'detailRecord', 'markerData' ,function ($scope, $location, $modalInstance, detailRecord, markerData) {

  //////////////////////////////////////////////////////////////////
  //  HANDLE SHOW AND HIDE EVENTS FOR FILTERS TAB  //
  /////////////////////////////////////////////////////////////////
  $scope.isCollapsed = true;


  //////////////////////////////////////////////////////////////////
  //  SLIDESHOW SETUP                                            //
  /////////////////////////////////////////////////////////////////
  
  $scope.slides = markerData.getFilteredMarkers();

  $scope.currentIndex = 0; //Default value

  $scope.setCurrentSlideIndex = function (index) {
      $scope.currentIndex = index;
  };

  $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
  };

  $scope.prevSlide = function () {
    $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
  };

  $scope.nextSlide = function () {
    $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
  };

  //Set active slide to record id passed through modal/detail view 
  if (detailRecord.data) {
    var record = {};
    for (var k in detailRecord.data) {
      if (detailRecord.data.hasOwnProperty(k)){
        if (k === 'geojson') {
          record.lat = detailRecord.data.geojson.coordinates[1];
          record.lng = detailRecord.data.geojson.coordinates[0];
        } else {
          record[k] = detailRecord.data[k];
        }
      } 
    }
    $scope.slides.push(record);
  } else {
      for (var i=0; i < $scope.slides.length; i++) {
        if ($scope.slides[i].record === detailRecord) {
          $scope.setCurrentSlideIndex(i);
          break;
        }
      }
  }


  //Watches $scope.currentIdex to update active slide
  $scope.$watch('currentIndex', function(){
      $scope.active = $scope.slides[$scope.currentIndex];
      //$scope.updateLocation($scope.active.record);

  });

  ////////////////////////
  // THUMBNAIL SETUP    //
  ////////////////////////
  $scope.counter = 6;
  $scope.thumbStartIndex = 0;

  $scope.loadMore = function() {
    $scope.counter += 2;
  };




  //TODO: Fix digest errors when updating history
  $scope.updateLocation = function(record){
    $location.path('/detail/'+record);
    history.replaceState({}, '#/detail/'+ record, '#/detail/'+ record);
    console.log($location.path());
    
  };


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

