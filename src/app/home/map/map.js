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
 
.controller('MapCtrl', ['$scope', '$timeout', '$location', '$debounce', 'markerData', 'holosData', 'leafletData', 'leafletBoundsHelpers', 'leafletMarkersHelpers', function ($scope, $timeout, $location, $debounce, markerData, holosData, leafletData, leafletBoundsHelpers, leafletMarkersHelpers) {

  ////////////////////////////
  //    INITIALIZE MAP     //
  ///////////////////////////
  console.log('reached map control');

  var center = {
      lat: 34.306,
      lng: -118.181,
      zoom: 9
    };

  var bounds = leafletBoundsHelpers.createBoundsFromArray([
        [ center.lat-0.1, center.lng-0.1 ],
        [ center.lat+0.1, center.lng+0.1 ]
    ]);

  angular.extend($scope, {
    center : center,
    bounds: bounds,
    maxBounds: {
      southWest: {
        lat: 32.1,
        lng: -114.5
      },
      northEast: {
        lat: 42.55,
        lng: -125.0
      }
    },
    controls: {
        custom: []
      },
    layers: {
      baselayers: {
          streets: {
              name: 'Mapquest Streets',
              type: 'xyz',
              url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png',
              layerOptions: {
                  subdomains: ['1', '2', '3', '4'],
                  attribution: 'Map tiles by MapQuest. Data by OpenStreetMap',
                  continuousWorld: true
              }
          },
          aerial: {
              name: 'Mapquest Aerial',
              type: 'xyz',
              url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png',
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
              top: true,
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
                zoomToBoundsOnClick: true
              }
          } 
      }
    },
    defaults : {
    }

  });


  $scope.markers = markerData.getFilteredMarkers();

  /////////////////////////////////////////////////////
  //    GET REFERENCE TO NATIVE LEAFLET OBJECTS      //
  /////////////////////////////////////////////////////

  $timeout(function(){

    leafletData.getLayers().then(function(layers) {
      $scope.markerClusterGrp = layers.overlays.locations;
      $scope.markerClusterGrp.on('clustermouseover', function(a){
        console.log('cluster ', a.layer.getAllChildMarkers());
    });
    });

    leafletData.getMap().then(function(map) {
      $scope.map = map;
    });


/*    $scope.markerClusterGrp.on('clustermouseover', function(a){
        console.log('cluster ', a.layer.getAllChildMarkers());
    });*/

/*    $scope.map.controls.custom.push(L.control.locate({
      follow: true
    }));*/

  },1000);


/*  var MyControl = L.control();
    MyControl.setPosition('bottomleft');
    MyControl.onAdd = function () {
        var className = 'leaflet-control-my-location', 
             container = L.DomUtil.create('div', className + ' leaflet-bar');
        return container;
  };*/

/*  $scope.controls.custom.push(MyControl);*/

/*$scope.controls.custom.push(L.control.locate({
    follow: true
}));
*/
  $scope.$watch('user', function(newValue, oldValue){

    // Ignore initial setup
    if ( newValue === oldValue) {
      return;
    }

    // Load data from service
    if ( newValue ) {
      console.log($scope.user);
      $scope.center.lat = $scope.user.location.lat;
      $scope.center.lng = $scope.user.location.lng;
      $scope.center.zoom = 12;
    }

  }, true);


  //Watch for leaflet map event, update bounds
  //var mapEvents = leafletEvents.getAvailableMapEvents();
/*  $scope.$on('leafletDirectiveMap.moveend', function(event, args) {

        console.log ("Updating map bounds on move event");
        leafletData.getMap().then(function(map) {
            var latlngBounds = map.getBounds();
            var west = latlngBounds.getWest();
            var south = latlngBounds.getSouth();
            var east = latlngBounds.getEast();
            var north = latlngBounds.getNorth();
            console.log(latlngBounds);
            $scope.bbox = west + ',' + south + ',' + east + ',' + north;
            console.log('bounds', $scope.bbox);
        });
  });*/ 

  $scope.$watch('bounds', function( newValue, oldValue ) {
    //console.log('bounds', $scope.bounds);
    // Ignore initial setup
    if ( newValue === oldValue ) {
      return;
    }

    // Load data from service
    if ( newValue ) {
      console.log('call update data');
      $debounce($scope.updateData, 1000);
    }

  }, true);

  $scope.updateData = function() {
       //if(!holosData.isDataLoaded()) {                                        
            console.log('Data hasn\'t been loaded, invoking holosData.loadData()');
            var southWest = $scope.bounds.southWest;
            var northEast = $scope.bounds.northEast;
            var boundsStr = southWest.lng + ',' + southWest.lat + ',' + northEast.lng + ',' + northEast.lat;
            console.log('boundsStr', boundsStr);
            holosData.loadData('http://dev-ecoengine.berkeley.edu/api/photos/?format=json&georeferenced=True&collection_code=VTM&bbox=' + boundsStr)
                 .then(function() {
                      console.log('loadData.then(), here the holosData should have loaded the values from the storageService.');
                      var data = holosData.getData();
                      markerData.updateMarkers(data);
                      markerData.resetFilteredMarkers();
                  });
  };

////////////////////////////////////////////
  //    OPEN POPUP ON MAP MARKER CLICK     //
  ///////////////////////////////////////////

  $scope.$on('leafletDirectiveMarker.click', function(event, args) {

    var temp_marker = $scope.markers[args.markerName];
    var latLng = [temp_marker.lat, temp_marker.lng];
    var url = temp_marker.media_url;
    var thumbnailUrl = url.replace(/imgs\/(.*?)(\/)/, "imgs/128x192/");
    var popupContent =  '<a target="_blank" class="popup" href="#/detail/' + temp_marker.record + '">' +
                            '<img src="' + thumbnailUrl + '" class="img-responsive">' +
                        '   <p>' + temp_marker.authors + '</h2>' +
                        '</a>';
    var popup =  L.popup({'autoPan': false, 'minWidth': 200});
    popup.setContent(popupContent);
    popup.setLatLng(latLng);


    $scope.map.openPopup(popup);

  }); 






  ////////////////////////////////////////////////////////////
  //    HANDLERS FOR HGHLIGHT MAP MARKER ON IMAGE GALLERY MOUSEOVER     //
  ///////////////////////////////////////////////////////////

  $scope.selectedMarker = markerData.getSelectedMarker();

  $scope.$watch('selectedMarker.length', function( newValue, oldValue ) {
      // Ignore initial setup
      if ( newValue === oldValue || newValue === 0) {
        $scope.removeHighlightMarker();
        return;
      }
      // Find visible parent of marker and highlight
      if ( newValue ) {
        $scope.addHighlightMarker();
      }

  });

  var highlightMarker;

  $scope.removeHighlightMarker = function (){
    if ($scope.map) {
      $scope.map.removeLayer(highlightMarker);
    }

  };

/*  $scope.addHighlightMarker = function (){

    var highlightIcon = L.icon({
      iconUrl: 'assets/img/cluster-icon-select.svg',
      iconSize: [15, 15],
      iconAnchor: [0, 0],
      className: 'highlight-icon'
    });

    console.log('selected marker in map', $scope.selectedMarker[0].title );

    var pos = {
        lat: $scope.selectedMarker[0].lat,
        lng: $scope.selectedMarker[0].lng
    };

    highlightMarker = L.marker([pos.lat, pos.lng], {icon:highlightIcon});
    $scope.map.addLayer(highlightMarker);

  };*/

  $scope.addHighlightMarker = function (){

    //console.log('title of selected marker in map controller', $scope.selectedMarker[0].title );
  //Iterate through all leaflet marker objects
    var clusters = $scope.markerClusterGrp.getLayers();

    var highlightIcon = L.icon({
      iconUrl: 'assets/img/cluster-icon-select.svg',
      iconSize: [15, 15],
      iconAnchor: [0, 0],
      className: 'highlight-icon'
    });

    var childMarker;

/*    //List title attribute from $scope.markers
    function debugMarkers(){
      var markerTitles = [];
      for (var k in $scope.markers) {
          markerTitles.push($scope.markers[k].lat);
      }
      console.log('marker.lat in $scope.markers', markerTitles);   
    }
     
    //List title attribute from clusters
    function debugClusters() {
      var clusterTitles = [];
      for (var j in clusters){
          clusterTitles.push(clusters[j]._latlng.lat);
      }
      console.log('_latlng.lat in cluster obj', clusterTitles );
    }
    debugMarkers();
    debugClusters();*/


    //Iterate through all the markers
    for (var i in clusters){
      if (($scope.selectedMarker[0].lat == clusters[i]._latlng.lat) &&
        ($scope.selectedMarker[0].lng == clusters[i]._latlng.lng)) {
        childMarker = clusters[i];
        break;
      } else {
        childMarker = null;
      }
    }




    //Get parent of childMarker, returns marker if childMarker is not in a cluster
    var visibleParent = $scope.markerClusterGrp.getVisibleParent(childMarker);

    var pos = {
        lat: visibleParent._latlng.lat,
        lng: visibleParent._latlng.lng
    };

    var childCount = 1; //default value when no children

    if (visibleParent._childCount){
      childCount = visibleParent.getChildCount();
    }
    
    //change highlightIcon size depending on size of cluster 
    if (childCount == 1) {
      highlightIcon.options.iconSize = [15,15];
      highlightIcon.options.iconAnchor = [0,0];
    } else if (childCount < 10) {
      highlightIcon.options.iconSize = [25,25];
      highlightIcon.options.iconAnchor = [13,13];
    } else if (childCount < 100) {
      highlightIcon.options.iconSize = [35,35];
      highlightIcon.options.iconAnchor = [17,17];
    } else {
      highlightIcon.options.iconSize = [45,45];
      highlightIcon.options.iconAnchor = [22,22];
    }


    highlightMarker = L.marker([pos.lat, pos.lng], {icon:highlightIcon});
    $scope.map.addLayer(highlightMarker);



  };




}])

;

