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
angular.module( 'map', [
  //services
  'services.markerData',
  'services.holosData',
  'services.debounce',
  //directives
  'leaflet-directive'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
 .config(function config($stateProvider) {
  $stateProvider
    .state( 'home.map', {
      url: '',
      parent: 'home',
/*      templateUrl: 'home/map/home.tpl.html',
      controller: 'MapCtrl'*/
      views: {
        'map': {
          templateUrl: 'home/map/map.tpl.html',
          controller: 'MapCtrl'
        }
      }
      
    })


    ;
})


.controller('MapCtrl', ['$scope', '$timeout', '$debounce','leafletData', 'markerData', 'holosData', function ($scope, $timeout, $debounce, leafletData, markerData, holosData) {

  //Set default map center and zoom
  //TODO: Get location from user IP address
  console.log('reached map control');

  angular.extend($scope, {
    center : {
      lat: 36.23,
      lng: -118.8,
      zoom: 9
    },
    defaults : {
      icon: {
        type: 'div',
        iconSize: [8, 8],
        iconAnchor: [0, 0],
        className: 'custom-marker-icon'
      }
    },
    bounds: null
  });

  $scope.$watch('coords', function(newValue, oldValue){

    // Ignore initial setup
    if ( newValue === oldValue ) {
      return;
    }

    // Load data from service
    if ( newValue ) {
      $scope.center.lat = $scope.coords.lat;
      $scope.center.lng = $scope.coords.lng;
      $scope.center.zoom = 12;
    }

  });

 /* $scope.center.lat = $scope.map.search.lat;
  $scope.center.lng = $scope.map.search.lng;
  $scope.center.zoom = $scope.map.search.zoom;*/



  $scope.markers = markerData.getFilteredMarkers();


  
  //Set default layers
  //TODO: Add satellite basemap
  $scope.layers = {
                    baselayers: {
                        streets: {
                            name: 'Streets',
                            type: 'xyz',
                            url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['1', '2', '3', '4'],
                                attribution: 'Map tiles by MapQuest. Data by OpenStreetMap',
                                continuousWorld: true
                            }
                        },
                        terrain: {
                            name: 'Terrain',
                            type: 'xyz',
                            url: 'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                attribution: 'Map tiles by Stamen Design. Data by OpenStreetMap',
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
                              showCoverageOnHover: true,
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
                              zoomToBoundsOnClick: true,
                              getChildrenOnClick: true
                            }
                        }
                    }

  };
 

  //Watch for leaflet map event, update bbox
  //var mapEvents = leafletEvents.getAvailableMapEvents();
  $scope.$on('leafletDirectiveMap.moveend', function(event, args) {
        console.log ("Updating map bounds on move event");
        leafletData.getMap().then(function(map) {
/*            var latlngBounds = map.getBounds();
            var west = latlngBounds.getWest();
            var south = latlngBounds.getSouth();
            var east = latlngBounds.getEast();
            var north = latlngBounds.getNorth();
            $scope.bbox = west + ',' + south + ',' + east + ',' + north;
            console.log('bbox', $scope.bbox);*/
            //$scope.mapData.update();
            //console.log('markers', $scope.mapData.markers.length);
            bounds = map.getBounds();
            console.log('bounds', bounds);
        });
  }); 


  /*$scope.$watch('bounds', function( newValue, oldValue ) {
    //console.log('bounds', $scope.bounds);
    // Ignore initial setup
    if ( newValue === oldValue ) {
      return;
    }

    // Load data from service
    if ( newValue ) {
      $debounce($scope.updateData, 1000);
    }

  });*/

  $scope.updateData = function() {
       //if(!holosData.isDataLoaded()) {                                        
            console.log('Data hasn\'t been loaded, invoking holosData.loadData()');
            holosData.loadData('http://ecoengine.berkeley.edu/api/photos/?format=json&georeferenced=True&collection_code=VTM&bbox=' + $scope.bbox)
                 .then(function() {
                      console.log('loadData.then(), here the holosData should have loaded the values from the storageService.');
                      var data = holosData.getData();
                      markerData.updateMarkers(data);
                      markerData.resetFilteredMarkers();
                  });
  };



  $scope.$on('leafletDirectiveMarker.click', function(event, args) {
        console.log ("Inside click event");
        console.log('args', args);
        console.log('event', event);
        var temp_marker = $scope.markers[args.markerName];
        $scope.selectedMarker.length = 0;
        $scope.selectedMarker.push(temp_marker);
        console.log($scope.selectedMarker[0]);

  }); 




}])

;

