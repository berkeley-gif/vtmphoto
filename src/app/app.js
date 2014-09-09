angular.module( 'vtmphotoApp', [
  'ui.router',
  'templates-app',
  'templates-common',
  'services.httpRequestTracker',
  'home',
  'about',
  'upload',
  'restangular'
])

.constant('HOLOS_CONFIG', {
  baseUrl: 'https://dev-ecoengine.berkeley.edu/api/'
  //apiKey: ''
})

.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
}])

.config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider', 'HOLOS_CONFIG',
  function ($stateProvider, $urlRouterProvider, RestangularProvider, HOLOS_CONFIG) {
    
    /////////////////////////////
    // Redirects and Otherwise //
    /////////////////////////////

    // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
    $urlRouterProvider
      .otherwise('/');


    ///////////////////////////////
    // Restangular Configuration //
    ///////////////////////////////
    RestangularProvider.setBaseUrl(HOLOS_CONFIG.baseUrl);
    RestangularProvider.setDefaultRequestParams({
      //apiKey: HOLOS_CONFIG.apiKey,
      format: 'json'
      //bbox: 
    });
    //Add a Response Interceptor
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      // .. to look for getList operations
      if (operation === "getList") {
        // .. and handle the data and meta data
        extractedData = data.results;
        extractedData.count = data.count;
        extractedData.next = data.next;
        extractedData.prev = data.prev;
      } else {
        extractedData = data;
      }
      return extractedData;
    });
    //On error
    RestangularProvider.setErrorInterceptor(
      function(resp) {
        //displayError();
        console.log('error getting data');
        return false; // stop the promise chain
    });
    //Cache requests
    RestangularProvider.setDefaultHttpFields({cache: true});



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