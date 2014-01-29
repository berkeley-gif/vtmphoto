angular.module( 'about', [
  //angular modules
  'ui.router'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config($stateProvider) {
  $stateProvider
	.state( 'about', {
		url: '/about',
		templateUrl: 'about/about.tpl.html',
		controller: 'AboutCtrl'
	});
})

.controller('AboutCtrl', ['$scope', function ($scope) {

  

}]) //End: AboutCtrl

;

