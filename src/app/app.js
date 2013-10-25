angular.module( 'vtmphotoApp', [
  'templates-app',
  'templates-common',
  'vtmphotoApp.home',
  'vtmphotoApp.photo',
  'vtmphotoApp.about',
  'ui.state',
  'ui.route'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ( titleService ) {
  titleService.setSuffix( ' | VTM Photos' );
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
})

;

