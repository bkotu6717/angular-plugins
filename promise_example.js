function getData($timeout, $q) {
  return function() {
    // create a defer object and return a promise at the end of the function to the caller
    var defer = $q.defer()

    // simulated async function
     $timeout(function() {

     	// if the rounded number is not 0 we resolve promise, if 0 we reject promise
      if(Math.round(Math.random())) {
      	// the parameter of the resolve/reject will be sent as promise result
      	// the call back thereafter identifies to execute success/error callbacks
        
      	// executes success call back of the caller
        defer.resolve('promise resolved!!');
      } else {
        
      	// executes error call back of the caller
        defer.reject('promise rejected!!');

      }
    }, 2000)

    // return the promise to the caller before execution completion of called method
    // so that caller will continue without waiting for the response of the called function
    // when the caller recieves a promise response, it will be executing it's respective call back function(success/error)
    return defer.promise;
  }
}

app.factory('getData', getData)
.run(function(getData) {
  var promise = getData()
	.then(function(string) { // promise resolved callback
	  console.log("executed success callback as the promise gave resolved response:: ", string);
	}, function(string) { // promise rejected callback
		console.log("executed error callback as the promise gave rejected response:: ",string);
	}).finally(function() { // Finally block will be executed regardless of promise resolved or rejected
      console.log('Finished at:', new Date())
    });
})