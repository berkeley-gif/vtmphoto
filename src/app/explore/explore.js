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
angular.module( 'vtmphotoApp.explore', [
  'ui.state',
  'titleService',
  'leaflet-directive',
  'resources.photos',
  'custom-directive'
  //'ngModelOnBlur-directive'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'explore', {
    url: '/explore',
    views: {
      "main": {
        controller: 'ExploreCtrl',
        templateUrl: 'explore/explore.tpl.html',
        resolve:{
          photos:['Photos', function (Photos) {
           //var temp = Photos.query({collection_code : 'VTM', format: 'json', fields: 'record,geojson,county'});
            return Photos.query ({
              collection_code : 'VTM',
              format: 'json',
              fields: 'record,geojson,county,authors,media_url,begin_date',
              page_size: 100
            });
          }]
        }
      }
    }
  });
})



/**
 * And of course we define a controller for our route.
 */
.controller( 'ExploreCtrl', function ExploreController( $scope,  leafletData, titleService, photos) {

  $scope.custom = false;

$scope.showLeaflet = function() {
                leafletData.getMap().fitBounds([ [40.712, -74.227], [40.774, -74.125] ]);
            };


  titleService.setTitle( 'Explore' );

  $scope.center = {
            lat: 37,
            lng: -120,
            zoom: 7
  };
  
  $scope.defaults = {
    tileLayer: 'http://{s}.tile.cloudmade.com/e74bf6d54e334b95af49cbb6b91a6d18/22677/256/{z}/{x}/{y}.png'
  };

  $scope.data = photos.data;

  $scope.results = $scope.data.results;

  $scope.markers = {};

    var local_icons = {
      div_icon: L.divIcon({
              iconSize: [8, 8],
              iconAnchor: [0, 0],
              className: 'custom-marker-icon'

      })

    };

    $scope.icons = local_icons;
   

  if ($scope.results.length > 0){

           for (var i = 0, len = $scope.results.length; i < len; i++) {
              $scope.markers[i] = {
                name: $scope.results[i].record,
                title: i,
                lat: $scope.results[i].geojson.coordinates[1],
                lng: $scope.results[i].geojson.coordinates[0],
                county: $scope.results[i].county,
                authors: $scope.results[i].authors,
                media_url: $scope.results[i].media_url,
                begin_date: $scope.results[i].begin_date,
                layer: 'locations',
                message: '<img style="width:150px" src="' + $scope.results[i].media_url + '">',
                icon: local_icons.div_icon
              };
          }  
  }

  $scope.filteredMarkers =  $scope.markers;

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
                              //showCoverageOnHover: false,
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
                              maxClusterRadius: 20,
                              zoomToBoundsOnClick: false,
                              getChildrenOnClick: true
                            }
                        }
                    }

  };


$scope.$on('leafletDirectiveMarker.mouseover', function(e, args) {
            console.log('im in the mouse over event');
            console.log(args);
            temp_marker = $scope.filteredMarkers[args.markerName];
            $scope.media_url = temp_marker.media_url;
            $scope.record = temp_marker.name;

});

$scope.$on('leafletDirectiveMarker.mouseout', function(e, args) {
            console.log('im in the mouse out event');
            $scope.media_url = null;
});


$scope.selectedMarkers = '1,2';


 $scope.filters = {
      county: '',
      authors: ''
  };

  $scope.filterMarkers = function (){
    $scope.filteredMarkers = {};
    var i = 0;

    angular.forEach($scope.markers, function(marker){

      //Filter county name
      var filterCounty = $scope.filters.county.toLowerCase();
      var nameCounty = marker.county.toLowerCase();
      var isSubstringCounty = ( nameCounty.indexOf( filterCounty ) !== -1 );

      //Filter author name
      var filterAuthors = $scope.filters.authors.toLowerCase();
      var nameAuthors = marker.authors.toLowerCase();
      var isSubstringAuthors = ( nameAuthors.indexOf( filterAuthors ) !== -1 );

      if (isSubstringCounty && isSubstringAuthors){
        $scope.filteredMarkers[i] = marker;
        i++;
      //console.log(marker.county + " false");
      }

    });

  };

  $scope.$watch('markers', function() {
      $scope.filterMarkers();
  });


    

 
})


;

