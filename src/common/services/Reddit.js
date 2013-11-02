angular.module( 'Reddit', [

])

/**
 * Add a resource to allow us to get at the server
 */
.factory( 'Reddit', function ( $http)  {
  
  var Reddit = function(){
    this.items = [];
    this.busy = false;
    this.after = 1;
    this.totalItems = 0;
  };

  Reddit.prototype.nextPage = function() {
    if (this.busy) {
      return;
    }
    this.busy = true;

    var url = "http://ecoengine.berkeley.edu/api/photos/?collection_code=VTM&page_size=10&format=json&page=" + this.after;
    $http({method: 'GET', url: url}).
        success(function(data) {
          var items = data.results;
          this.totalItems = data.count;
          console.log(items);
          for (var i = 0; i < items.length; i++) {
            this.items.push(items[i]);
          }
          this.after = this.after+1;

          this.busy = false;
        }.bind(this));
  };

  return Reddit;






})



;