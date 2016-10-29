function getData($timeout, $q) {
  return function() {
    // create a defer object and return a promise at the end of the function to the caller
    var defer = $q.defer()

    // simulated async function
     $timeout(function() {

     	// if the rounded number is not 0 we resolve promise, if 0 we reject promise
      if(Math.round(Math.random())) {
        defer.resolve('promise resolved!!')
      } else {
        defer.reject('promise rejected!!')
      }
    }, 2000)

    // return the promise to the caller before execution completion of current method
    return defer.promise
  }
}

app.factory('getData', getData)
.run(function(getData) {
  var promise = getData()
	.then(function(string) { // promise resolved callback
	  console.log(string);
	}, function(string) { // promise rejected callback
		console.log(string);
	});
})