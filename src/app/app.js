angular.module( 'vtmphotoApp', [
  'ui.router',
  'templates-app',
  'templates-common',
  'services.httpRequestTracker',
  'home',
  'about'
])

.constant('HOLOS_CONFIG', {
  baseUrl: 'http://ecoengine.berkeley.edu'
})

.run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
}])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider ) {
    
    /////////////////////////////
    // Redirects and Otherwise //
    /////////////////////////////

    // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
    $urlRouterProvider

      // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
      // Here we are just setting up some convenience urls.
      //.when('/c?id', '/contacts/:id')
      //.when('/user/:id', '/contacts/:id')

      // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
      .otherwise('/');

}])

.controller('AppCtrl', ['$scope', function ($scope) {

}])

/*.controller('HeaderCtrl', ['$scope', 'httpRequestTracker',
  function ($scope, httpRequestTracker) {


    $scope.hasPendingRequests = function () {
      return httpRequestTracker.hasPendingRequests();
    };
}])*/

;