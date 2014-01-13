angular.module( 'vtmphotoApp', [
  'ui.router',
  'templates-app',
  'templates-common',
  'services.httpRequestTracker',
  'home',
  'about',
  'detail'
])

.constant('HOLOS_CONFIG', {
  baseUrl: 'http://ecoengine.berkeley.edu'
})

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider ) {
    
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/home");

}])

.controller('AppCtrl', ['$scope', function ($scope) {

}])

.controller('HeaderCtrl', ['$scope', 'httpRequestTracker',
  function ($scope, httpRequestTracker) {


    $scope.hasPendingRequests = function () {
      return httpRequestTracker.hasPendingRequests();
    };
}])

;