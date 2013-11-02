angular.module( 'PhotoRes', [
  'ngResource'
])

/**
 * Add a resource to allow us to get at the server
 */
.factory( 'PhotoRes', function ( $resource )  {
  return $resource('http://ecoengine.berkeley.edu/api/photos/:record', {record: '@record'}, {
  query: {
    method:'GET', 
    params: {
      format:'json', 
      page_size:20, 
      collection_code:'VTM'
    },
    isArray:false
  }
  });
})



;