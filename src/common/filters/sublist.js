

angular.module( 'filters.sublist', [])

.filter('sublist', [function() {

  return function(input, range, start){
    return input.slice(start, start+range);
  };

}])

;