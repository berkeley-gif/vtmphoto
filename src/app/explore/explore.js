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
  'ui.slider',
  'ui.unique'
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
            return Photos.query ({
              collection_code : 'VTM',
              format: 'json',
              fields: 'record,geojson,county,authors,media_url,begin_date',
              page_size: 200,
              georeferenced: 'True',
              county: 'Tulare'
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
.controller( 'ExploreCtrl', function ExploreController( $scope, titleService, photos) {

  $scope.custom = false;



  titleService.setTitle( 'Explore' );

  $scope.center = {
            lat: 36.23,
            lng: -118.8,
            zoom: 9
  };
  
/*  $scope.defaults = {
    tileLayer: 'http://{s}.tile.cloudmade.com/e74bf6d54e334b95af49cbb6b91a6d18/22677/256/{z}/{x}/{y}.png'
  };*/

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
                record: $scope.results[i].record,
                title: i,
                lat: $scope.results[i].geojson.coordinates[1],
                lng: $scope.results[i].geojson.coordinates[0],
                county: $scope.results[i].county,
                authors: $scope.results[i].authors,
                media_url: $scope.results[i].media_url,
                year: new Date($scope.results[i].begin_date).getFullYear(),
                layer: 'locations',
                //message: '<img style="width:150px" src="' + $scope.results[i].media_url + '">',
                icon: local_icons.div_icon
              };

/*              console.log(new Date($scope.results[i].begin_date).getFullYear());
              console.log($scope.results[i].begin_date);*/


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


$scope.$on('leafletDirectiveMarker.click', function(e, args) {
            console.log('im in the marker click');
            temp_marker = $scope.filteredMarkers[args.markerName];
            $scope.selectedMarkers = [];
            $scope.selectedMarkers.push(args.markerName);


});





$scope.selectedMarkers = [12,13];

$scope.updatePhotoMarkers = function (){
  $scope.photoMarkers = {};


  angular.forEach($scope.filteredMarkers, function(marker){
    var i = 0;
    for (var j=0; j< $scope.selectedMarkers.length; j++){
      var markerName = $scope.selectedMarkers[j];
      var temp_marker = $scope.filteredMarkers[markerName];
      $scope.photoMarkers[i] = temp_marker;
      i++;
    }
    
  });

};

 $scope.$watch('selectedMarkers', function() {
      $scope.updatePhotoMarkers();
  });


 $scope.filters = {
      county: 'Tulare',
      authors: '',
      year: '1927'
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



      //Filter date
      var filterYear = $scope.filters.year;
      var nameYear = marker.year;
      var isYear = ( nameYear >= filterYear );


      if (isSubstringCounty && isSubstringAuthors && isYear){
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

