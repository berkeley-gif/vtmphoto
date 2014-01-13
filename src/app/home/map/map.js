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
  //directives
  'leaflet-directive'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */


.controller('MapCtrl', ['$scope', '$timeout', 'leafletData','markerData', 'holosData', function ($scope, $timeout, leafletData, markerData, holosData) {

  //Set default map center and zoom
  //TODO: Get location from user IP address
  console.log('reached map control');

  angular.extend($scope, {
    center : {
      lat: 36.23,
      lng: -118.8,
      zoom: 9
    }
  });
/*  $scope.mapData.center = {
            lat: 36.23,
            lng: -118.8,
            zoom: 9
  };
*/
  $scope.bbox = null;

  

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
  //Set default icon for marker
  var local_icons = {
    div_icon: L.divIcon({
            iconSize: [8, 8],
            iconAnchor: [0, 0],
            className: 'custom-marker-icon'

    })

  };
  $scope.icons = local_icons;

 
  

  //Get map bounds and set bbox initialized on parent controller
  //TODO: Figure out how to watch when bounds change
/*  $timeout( function() {
      console.log ("Resolving promise");
      leafletData.getMap().then(function(map) {
          var latlngBounds = map.getBounds();
          var west = Math.round(latlngBounds.getWest());
          var south = Math.round(latlngBounds.getSouth());
          var east = Math.round(latlngBounds.getEast());
          var north = Math.round(latlngBounds.getNorth());
          $scope.mapData.bbox = west + ',' + south + ',' + east + ',' + north;
      });
  }  , 1000);*/


  //Watch for leaflet map event, update bbox, update markers
  //var mapEvents = leafletEvents.getAvailableMapEvents();
  $scope.$on('leafletDirectiveMap.moveend', function(event, args) {
        console.log ("Updating map bounds on move event");
        leafletData.getMap().then(function(map) {
            var latlngBounds = map.getBounds();
            var west = latlngBounds.getWest();
            var south = latlngBounds.getSouth();
            var east = latlngBounds.getEast();
            var north = latlngBounds.getNorth();
            $scope.bbox = west + ',' + south + ',' + east + ',' + north;
            console.log($scope.bbox);
            //$scope.mapData.update();
            //console.log('markers', $scope.mapData.markers.length);
        });
  }); 

  //Watch for leaflet map event, update bbox, update markers
/*  $scope.$on('bbox', function(event, args) {
      //$timeout( function() {
        console.log ("Resolving map promise on move event");
        leafletData.getMap().then(function(map) {
            var latlngBounds = map.getBounds();
            var west = latlngBounds.getWest();
            var south = latlngBounds.getSouth();
            var east = latlngBounds.getEast();
            var north = latlngBounds.getNorth();
            $scope.mapData.bbox = west + ',' + south + ',' + east + ',' + north;
            $scope.mapData.update();
            console.log('markers', $scope.mapData.markers.length);
        });
      //}  , 1000);

  });*/

  $scope.$watch('bbox', updateData);

   $scope.updateData = function() {
       if(!holosData.isDataLoaded()) {                                        
            console.log('Data hasn\'t been loaded, invoking holosData.loadData()');
            holosData.loadData('http://ecoengine.berkeley.edu/api/photos/?format=json&georeferenced=True&collection_code=VTM&bbox=' + $scope.mapData.bbox)
                 .then(function() {
                      console.log('loadData.then(), here the holosData should have loaded the values from the storageService.');
                      var data = holosData.getData();
                      markerData.updateMarkers(data);
                      markerData.resetFilteredMarkers();
                 });
                 
       } else {
            console.log('Data has already been loaded from storageService, getting cached data instead.');            
            $scope[results] = holosData.getData();
       }
  };




}])

;

