angular.module('resources.photos', ['holosResource']);
angular.module('resources.photos').factory('Photos', ['holosResource', function (holosResource) {

  var photoResource = holosResource('photos');
/*  userResource.prototype.getFullName = function () {
    return this.lastName + " " + this.firstName + " (" + this.email + ")";
  };*/

  return photoResource;
}]);