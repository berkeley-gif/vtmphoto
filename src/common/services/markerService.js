angular.module( 'markerService', [
])

.factory('markerService', [function() {
     // private data vars
     //var jsonObjectArray = dataService.getData();
     var createMarker = function (jsonObject){
        return {
          record: jsonObject.record
        };
     };
     var markerArray = [];

      //public functions          
     return {
          getMarkerArray: function(jsonObjectArray) {

            
            jsonObjectArray.forEach(function(jsonObject){
              var marker = createMarker(jsonObject);
              markerArray.push(marker);
            });

            return markerArray;
          }
     };

}])

;