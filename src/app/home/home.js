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
  //controllers
  'map',
  'gallery',
  'sidebar',
  //services
 'services.geolocation'
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

.controller('HomeCtrl', ['$scope', '$timeout', '$rootScope', '$location', 'geolocation' , 'geolocation_msgs', function ($scope, $timeout, $rootScope, $location, geolocation, geolocation_msgs) {

  
    $scope.selectedMarker = [];

    $scope.address = "";

    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, lng:data.coords.longitude};
      console.log($scope.coords);
      $rootScope.$on('error', function(){
        alert('I am received');
      });
      
      
    });



    $scope.getCurrent = function (){
      return geolocation.getLocation().then(function(data){
        $scope.coords = {lat:data.coords.latitude, lng:data.coords.longitude};
      });
    };

    /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        console.log('tostate', toState.url);
        console.log('fromstate', fromState);
        if (toState.url == '/detail/:record' && fromState.url == '/') {
          //$location.path('/detail/'+record);
          event.preventDefault();
        }
        
    });*/

  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    if(fromState.name === 'home' && toState.name === 'detail'){
      event.preventDefault();
    }

/*    if(fromState.name === 'about' && toState.name === 'home'){
      event.preventDefault();
    }*/

  });





    



}]) //End: HomeCtrl

;

