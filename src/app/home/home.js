/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'home', [
  //angular modules
  'ui.router',
  'ui.bootstrap',
  'restangular',
  //controllers
  'map',
  'gallery',
  'sidebar',
  //services
 'services.geolocation',
 'services.geocoder'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config($stateProvider) {
  $stateProvider
    .state( 'home', {
      url: '/',
      templateUrl: 'home/home.tpl.html',
      controller: 'HomeCtrl',
      reloadOnSearch: false      
    })


    ;
})

.controller('HomeCtrl', ['$scope', '$timeout', 'Restangular','geolocation' , 'geolocation_msgs', 'geocoder', 
  function ($scope, $timeout, Restangular, geolocation, geolocation_msgs, geocoder) {

/*    //var photos = Restangular.one('photos');
    var params = {'bbox': '-118.36189270019531,34.116352469972746,-118.00071716308594,34.49580500560864'};
    // This will query /photos and return a promise.
    Restangular.all('photos').getList(params).then(function(photos) {
      $scope.allPhotos = photos;
      console.log($scope.allPhotos);
    });*/
    
/*  
    $scope.selectedMarker = [];

    $scope.session = {};

    // I toggle the value of isVisible.
                $scope.toggle = function() {
 
                    $scope.isVisible = ! $scope.isVisible;
 
                };
 
                // Default the blocks to be visible.
                $scope.isVisible = false;*/
    

    /////////////////////////////////
    //  USER GEOLOCATION HANDLING  //
    /////////////////////////////////

    $scope.user = {};

    geolocation.getLocation().then(function(data){
      $scope.user.location = {lat:data.coords.latitude, lng:data.coords.longitude};
      console.log($scope.user.location);       
    });

    $scope.getUserLocation = function (){
      return geolocation.getLocation().then(function(data){
        $scope.user.location = {lat:data.coords.latitude, lng:data.coords.longitude};
      });
    };

    $scope.searchAddress = function (){
      var address = $scope.user.address;
      return geocoder.codeAddress(address).then(function(data){
        console.log($scope.user.location);
        $scope.user.location = {lat:data.lat, lng:data.lng};
      });
    };

    /////////////////////////////////
    //  UI RELATED                 //
    /////////////////////////////////

    //Prevent state change when the detail modal window overlays the home window
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if(fromState.name === 'home' && toState.name === 'detail'){
      event.preventDefault();
    }


  });





    



}]) //End: HomeCtrl

;

