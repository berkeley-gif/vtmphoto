angular.module( 'vtmphotoApp', [
  'templates-app',
  'templates-common',
  'vtmphotoApp.home',
  'vtmphotoApp.about',
  'ui.state',
  'ui.route'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ( titleService ) {
  titleService.setSuffix( ' | vtmphotoApp' );
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
})

;

