angular.module( 'services.holosData', [])

.factory('holosData', ['$q', '$http', function($q, $http ) {
     // private data vars
     var aggregateData = { isLoaded: false, value: [] };
      
    //public functions          
     return {
          loadData: function(url) {
            var deferred = $q.defer();
  
            function loadAll() {
              $http.get(url)
                 .then(function(d) {
                      //debugger;
                      console.log('public http.get(' + url + ').then()');
                      console.log(d);
                      aggregateData.value = aggregateData.value.concat(d.data.results);
                      //aggregateData.value.push(d.data.results);
                      if(d.data.next) {
                         url=d.data.next;
                         loadAll();
                      }
                      else {
                         deferred.resolve(aggregateData.value);
                      }
                 });
            }
            loadAll();
            return deferred.promise;

          },
          getData: function() {
               return aggregateData.value;
          },
          isDataLoaded: function() {
               return aggregateData.isLoaded;
          }
     };
}])


;

