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
  'ui.router',
  'leaflet-directive',
  'resources.photos',
  'map',
  'gallery',
  'sidebar'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config($stateProvider) {
  $stateProvider.state( 'home', {
    url: '/home',
    templateUrl: 'home/home.tpl.html',
    controller: 'HomeCtrl',
    resolve:{
          photos:['Photos', function (Photos) {
            return Photos.query ({
              collection_code : 'VTM',
              format: 'json',
              bbox: '-119,36,-118,37'
            });
          }]
        }
  });
})

.controller('HomeCtrl', ['$scope', 'leafletData', 'photos', function ($scope, leafletData, photos) {

  //Set default map center and zoom
  //TODO: Get location from user IP address
  $scope.center = {
                    lat: 36.23,
                    lng: -118.8,
                    zoom: 10
                };

  //Get data from http response
  //TODO: Handle http error
  //TODO: Update data when map bounds are changed during pan, zoom in, zoom out
  $scope.data = photos.data;
  console.log($scope.data);


  //Initialize variables used by child scopes
  $scope.markers = {};
  $scope.filteredMarkers = {};
  
  $scope.layers = {
                    baselayers: {
                        cloudmade: {
                            name: 'OpenStreetMap',
                            type: 'xyz',
                            url: 'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                attribution: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.',
                                continuousWorld: true
                            }
                        }
                    },
                    overlays: {
                        locations: {
                            name: 'Locations',
                            type: 'markercluster',
                            visible: true,
                            layerOptions: {
                              spiderfyOnMaxZoom: false,
                              showCoverageOnHover: false,
                              iconCreateFunction: function (cluster) {

      
                                  var childCount = cluster.getChildCount();
                                  var c = ' marker-cluster-';
                                  var ptSize = 20;
                                  if (childCount < 10) {
                                    c += 'small';
                                  } else if (childCount < 100) {
                                    c += 'medium';
                                    ptSize = 30;
                                  } else {
                                    c += 'large';
                                    ptSize = 40;
                                  }
                                  return L.divIcon({ html: childCount, className: 'marker-cluster' + c, iconSize: new L.Point(ptSize, ptSize) });
                              },
                              maxClusterRadius: 50,
                              zoomToBoundsOnClick: false,
                              getChildrenOnClick: true
                            }
                        }
                    }

  };

 $scope.countyList = [];

  //Temp function to get map bounds
  //TODO: Figure out how to get map bounds from service
  $scope.showLeaflet = function() {
    leafletData.getMap().then(function(map) {
        console.log(map.getBounds());
    });
  };








}]) //End: HomeCtrl

;

