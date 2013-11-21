angular.module('resources.photos', ['resources.holos']);
angular.module('resources.photos').factory('Photos', ['resources.holos', function (holosResource) {

  var photoResource = holosResource('photos');
/*  userResource.prototype.getFullName = function () {
    return this.lastName + " " + this.firstName + " (" + this.email + ")";
  };*/

  return photoResource;
}]);
