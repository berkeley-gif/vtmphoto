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
  //directives
  'leaflet-directive'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */


.controller('MapCtrl', ['$scope', '$timeout', 'leafletData','markerData', function ($scope, $timeout, leafletData, markerData) {

  //Set default map center and zoom
  //TODO: Get location from user IP address
  console.log('reached map control');
  $scope.mapData.center = {
            lat: 36.23,
            lng: -118.8,
            zoom: 9
  };

  $scope.mapData.markers = markerData.getMarkers();
  //Set default layers
  //TODO: Add satellite basemap
  $scope.mapData.layers = {
                    baselayers: {
                        terrain: {
                            name: 'Terrain',
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
  //Set default icon for marker
  //TODO: 
  var local_icons = {
    div_icon: L.divIcon({
            iconSize: [8, 8],
            iconAnchor: [0, 0],
            className: 'custom-marker-icon'

    })

  };
  $scope.mapData.icons = local_icons;
  

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
      $timeout( function() {
        console.log ("Resolving map promise on move event");
        leafletData.getMap().then(function(map) {
            var latlngBounds = map.getBounds();
            var west = Math.round(latlngBounds.getWest());
            var south = Math.round(latlngBounds.getSouth());
            var east = Math.round(latlngBounds.getEast());
            var north = Math.round(latlngBounds.getNorth());
            $scope.mapData.bbox = west + ',' + south + ',' + east + ',' + north;
            $scope.mapData.update();
        });
      }  , 1000);

  }); 

}])

;

