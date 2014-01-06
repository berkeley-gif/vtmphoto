angular.module('resources.holos', []).factory('resources.holos', ['HOLOS_CONFIG', '$http', '$q', function (HOLOS_CONFIG, $http, $q) {

  function HolosResourceFactory(resourceName) {

    var url = HOLOS_CONFIG.baseUrl + '/api/' + resourceName;
    var defaultParams = {format: 'json'};
    if (HOLOS_CONFIG.apiKey) {
      defaultParams.apiKey = HOLOS_CONFIG.apiKey;
    }
    
    var thenFactoryMethod = function (httpPromise, successcb, errorcb, isArray) {
      var scb = successcb || angular.noop;
      var ecb = errorcb || angular.noop;

      return httpPromise.then(function (response) {
        var result;
        if (isArray) {

          result = [];
          for (var i = 0; i < response.length; i++) {
            result.push(new Resource(response[i]));
          }
        } else {
          //MongoLab has rather peculiar way of reporting not-found items, I would expect 404 HTTP response status...
          if (response.data === "404"){
            return $q.reject({
              code:'resource.notfound',
              collection:resourceName
            });
          } else {
            result = new Resource(response);
          }
        }
        scb(result, response.status, response.headers, response.config);
        return result;
      }, function (response) {
        ecb(undefined, response.status, response.headers, response.config);
        return undefined;
      });
    };

    var Resource = function (data) {
      angular.extend(this, data);
    };

    Resource.all = function (cb, errorcb) {
      return Resource.query({}, cb, errorcb);
    };

    Resource.query = function (queryJson, successcb, errorcb) {
      //var params = angular.isObject(queryJson) ? {q:JSON.stringify(queryJson)} : {};
      var params = queryJson;
      var httpPromise = $http.get(url, {params:angular.extend({}, defaultParams, params)});
      return thenFactoryMethod(httpPromise, successcb, errorcb, false);
    };

    Resource.getById = function (id, successcb, errorcb) {
      var httpPromise = $http.get(url + '/' + id, {params:defaultParams});
      return thenFactoryMethod(httpPromise, successcb, errorcb);
    };

    Resource.getByIds = function (ids, successcb, errorcb) {
      var qin = [];
      angular.forEach(ids, function (id) {
         qin.push({$oid: id});
      });
      return Resource.query({_id:{$in:qin}}, successcb, errorcb);
    };

    //instance methods

    Resource.prototype.$id = function () {
      if (this._id && this._id.$oid) {
        return this._id.$oid;
      }
    };


    return Resource;
  }
  return HolosResourceFactory;
}]);
