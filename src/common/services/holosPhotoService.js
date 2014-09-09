angular.module( 'services.holosPhotoService', ['restangular'])

.factory('holosPhotoService', ['$q', '$timeout', 'Restangular', 
  function($q, $timeout, Restangular ) {
/*     // private data vars
     var aggregateData = { isLoaded: false, value: [] };
      
    //public functions          
     return {
          loadData: function(url) {
            var deferred = $q.defer();
            //empyt array of any previous results
            aggregateData.value.length = 0;
  
            function loadAll() {
              $http.get(url)
                 .then(function(d) {
                      //debugger;
                      //console.log('public http.get(' + url + ').then()');
                      //console.log(d);
                      aggregateData.value = aggregateData.value.concat(d.data.results);
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
     };*/


    var photos = Restangular.all('photos');
    var allPhotos = [];
    var queryParams = {
      'georeferenced': true,
      'collection_code': 'VTM',
      'bbox': '-118.36189270019531,34.09872793958119,-118.00071716308594,34.5167410839333'
    };
      
    //public functions          
    return {
          loadData: function() {

            var deferred = $q.defer();
            var promise = deferred.promise;

            // resolve it after a second
            $timeout(function() {
              deferred.resolve('foo');
            }, 1000);

            Restangular.all('photos').getList(queryParams)
              .then(function(list) {
                console.log('Promise one resolved with ', list);
                console.log('Promise one ', list.next);

                var anotherDeferred = $q.defer();

                // resolve after another second

                $timeout(function() {
                  anotherDeferred.resolve(Restangular.allUrl('photos', list.next).getList());
                }, 1000);

                return anotherDeferred.promise;
              })
              .then(function(two) {
                console.log('Promise two resolved with ', two);
              });

          },
          getData: function() {
               return allPhotos;
          }
        };

}])


;