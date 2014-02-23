angular.module( 'services.markerData', [])

.factory('markerData', ['$filter', function($filter) {

     // private data vars
     var markerArray = [];
     var markerCount;
     var filteredArray = [];
     var selectedMarker = [];
     var local_icons = {
        defaultIcon: {
          type: 'div',
          iconSize: [12, 12],
          iconAnchor: [0, 0],
          className: 'default-marker-icon'
        }
      };


     //private functions 
     var createMarker = function (jsonObject, index){
        var marker = {};
        for (var k in jsonObject) {
          if (jsonObject.hasOwnProperty(k)){
            if (k === 'geojson') {
              marker.lat = jsonObject.geojson.coordinates[1];
              marker.lng = jsonObject.geojson.coordinates[0];
            } else {
              marker[k] = jsonObject[k];
              marker['icon'] = local_icons.defaultIcon;
              marker['title'] = index;
              var url = jsonObject['media_url'];
              var thumbnailUrl = url.replace(/imgs\/(.*?)(\/)/, "imgs/128x192/");
              var content = '<img src="' + thumbnailUrl + '" alt="" class="img-responsive">';
              //marker['message'] = content;
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
            var idx = 0;
            data.forEach(function(jsonObject){
              var marker = createMarker(jsonObject, idx);
              markerArray.push(marker);
              idx++;
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
          },
          resetFilteredMarkers: function(){
            angular.copy(markerArray, filteredArray);
          },
          selectMarker: function(marker){
            selectedMarker.length = 0;
            for (var i = 0; i < filteredArray.length; i++) {
              if (filteredArray[i].record === marker.record) {
                selectedMarker.push(filteredArray[i]);
                //console.log(selectedMarker[0]);
              }
            }
          },
          unselectMarker: function(){
            selectedMarker.length = 0;
          },
          getSelectedMarker: function(){
             return selectedMarker;
          }




     };

}])

;