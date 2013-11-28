angular.module( 'markerService', [
])

.factory('markerService', [function() {
     // private data vars
     //var jsonObjectArray = dataService.getData();
     var markerArray = [];

     var createMarker = function (jsonObject){
        var marker = {};
        for (var k in jsonObject) {
          if (jsonObject.hasOwnProperty(k)){
            if (k === 'geojson') {
              marker.lat = jsonObject.geojson.coordinates[1];
              marker.lng = jsonObject.geojson.coordinates[0];
            } else {
              marker[k] = jsonObject[k];
            }
          } 
        }
        marker.layer = 'locations';
        return marker;      
     };
     

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
          }
     };

}])

;