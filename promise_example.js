function getData($timeout, $q) {
  return function() {
    // create a defer object and return a promise at the end of the function to the caller
    var defer = $q.defer()

    // simulated async function
    $timeout(function() {
    	defer.resolve("This is async!!");
    }, 2000);

    // return the promise to the caller before execution completion of current method
    return defer.promise
  }
}

app.factory('getData', getData)
.run(function(getData) {
  var promise = getData()
	.then(function(string) {
	  console.log(string)
	});
})