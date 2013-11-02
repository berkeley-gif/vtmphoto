angular.module( 'vtmphotoApp', [
  'templates-app',
  'templates-common',
  /*'vtmphotoApp.home',
  'vtmphotoApp.photo',
  'vtmphotoApp.photodetail',
  'vtmphotoApp.about',*/
  'vtmphotoApp.explore',
  'ui.state',
  'ui.route'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/explore' );
})

.run( function run ( titleService ) {
  titleService.setSuffix( ' | VTM Photos' );
})

.constant('HOLOS_CONFIG', {
  baseUrl: 'http:/ecoengine.berkeley.edu'
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
})

;

