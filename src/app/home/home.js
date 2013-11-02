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
angular.module( 'vtmphotoApp.home', [
  'ui.state',
  'titleService',
  'plusOne',
  'PhotoRes',
  'leaflet-directive',
  'infinite-scroll',
  'Reddit'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', function HomeController( $scope, PhotoRes, Reddit, titleService, $http) {

  titleService.setTitle( 'Home' );

  //$scope.photos = PhotoRes.query();
  $scope.orderProp = 'begin_date';
  

    // Get the countries geojson data from a JSON
  $http.get("http://ecoengine.berkeley.edu/api/photos/?collection_code=VTM&format=geojson&georeferenced=true&fields=record,geojson,county&page_size=2000").success(function(data, status) {
        
        angular.extend($scope, {
            geojson: {
                data: data.features
            }
        });

  });

  var data2 = {"locations": [     
{   
    "latitude":37, 
    "longitude":-120
    }, 
{   
    "latitude":37, 
    "longitude":-120
    },
{   
    "latitude":37, 
    "longitude":-120
    }
]};



$scope.$on("leafletDirectiveMap.geojsonMouseover", function(ev, leafletEvent) {
                $scope.eventDetected = "i'm in mouseover";
            });

$scope.$on("leafletDirectiveMap.geojsonClick", function(ev, featureSelected, leafletEvent) {
                
                markerClick(featureSelected, leafletEvent);
});

function markerClick(item, event) {
                $scope.eventDetected = "Clicked on " + item.properties.record;
                console.log(item.properties.record);
}


  $scope.center = {
            lat: 37,
            lng: -120,
            zoom: 6
  };
  
  $scope.defaults = {
    tileLayer: 'http://{s}.tile.cloudmade.com/e74bf6d54e334b95af49cbb6b91a6d18/22677/256/{z}/{x}/{y}.png'
  };

  $scope.markers = $scope.geojson;
  $scope.layers = {
                    baselayers: {
                        osm: {
                            name: 'OpenStreetMap',
                            type: 'xyz',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            layerOptions: {
                                subdomains: ['a', 'b', 'c'],
                                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                continuousWorld: true
                            }
                        }
                    },
                    overlays: {
                        cars: {
                            name: $scope.markers,
                            type: 'markercluster',
                            visible: true
                        }
                    }

  };

  /*$scope.markers = {
                    m1: {
                        lat: 42.20133,
                        lng: 2.19110,
                        layer: 'cars',
                        message: "I'm a moving car"
                    },
                    m2: {
                        lat: 42.21133,
                        lng: 2.18110,
                        layer: 'cars',
                        message: "I'm a car"
                    },
                    m3: {
                        lat: 42.19133,
                        lng: 2.18110,
                        layer: 'cars',
                        message: 'A bike!!'
                    },
                    m4: {
                        lat: 42.3,
                        lng: 2.16110,
                        layer: 'cars'
                    },
                    m5: {
                        lat: 42.1,
                        lng: 2.16910,
                        layer: 'cars'
                    },
                    m6: {
                        lat: 42.15,
                        lng: 2.17110,
                        layer: 'cars'
                    }
  };*/

 $scope.reddit = new Reddit();


})


;

