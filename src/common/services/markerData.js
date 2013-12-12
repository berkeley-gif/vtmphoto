angular.module( 'services.markerData', [])

.factory('markerData', ['$filter', function($filter) {

     // private data vars
     var markerArray = [];
     var filteredArray = [];
     var local_icons = {
        div_icon: L.divIcon({
                iconSize: [8, 8],
                iconAnchor: [0, 0],
                className: 'custom-marker-icon'

        })

      };


     //private functions 
     var createMarker = function (jsonObject){
        var marker = {};
        for (var k in jsonObject) {
          if (jsonObject.hasOwnProperty(k)){
            if (k === 'geojson') {
              marker.lat = jsonObject.geojson.coordinates[1];
              marker.lng = jsonObject.geojson.coordinates[0];
            } else {
              marker[k] = jsonObject[k];
              marker['icon'] = local_icons.div_icon;
            }
          } 
        }
        marker.layer = 'locations';
        return marker;      
     };

     //filter variables
    
     //var authorsFilter = $filter('filter.authors');
     

      //public functions          
     return {
          updateMarkers: function(jsonObjectArray) {          
            jsonObjectArray.forEach(function(jsonObject){
              var marker = createMarker(jsonObject);
              markerArray.push(marker);
            });

          },
          getMarkers: function(){
            return markerArray;
          },
          getFilteredMarkers: function(){
             return filteredArray;
          },
          setFilteredMarkers: function(newArray){
             filteredArray = newArray;
          }
     };

}])

;