angular.module( 'services.markerData', [])

.factory('markerData', ['$filter', function($filter) {

     // private data vars
     var markerArray = [];
     var markerCount;
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


      //public functions          
     return {
          updateMarkers: function(data) {  
            //empyt array of any previous markers
            markerArray.length = 0;
            data.forEach(function(jsonObject){
              var marker = createMarker(jsonObject);
              markerArray.push(marker);
            });
            markerCount = markerArray.length;

          },
          getMarkers: function() {
            return markerArray;
          },
          getFilteredMarkers: function(){
             return filteredArray;
          },
          updateFilteredMarkers: function(newArray){
             angular.copy(newArray, filteredArray);
             console.log('from service');
             console.log(filteredArray);
          },
          resetFilteredMarkers: function(){
            angular.copy(markerArray, filteredArray);
          }
     };

}])

;