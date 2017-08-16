'use strict';

angular.module('core.books').

// this service will fetch books data from server and pass on to XML2Json
// module and get JSON response and return back to the requesting component

factory('DataService', function($http) {
  var DataService = {
    async: function(quer,page=1) {
      // $http returns a promise, which has a then function, which also returns a promise
      var reqUrl='https://www.goodreads.com/search/index.xml?key=sw4i4NbVrGCWSoulnijJQ&q='+quer+'&page='+page;
      var promise = $http.get(reqUrl).then(function (response) {
        // The then function here is an opportunity to modify the response
        
        // The return value gets picked up by the then in the controller.
        var x2js = new X2JS();
        var jsonData=JSON.stringify(x2js.xml_str2json(response.data));
        //console.log(jsonData);
        return jsonData;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return DataService;
});