'use strict';

angular.module('core.books').

factory('DataService', function($http, SharedProperties) {
  var DataService = {
    async: function(quer) {
      // $http returns a promise, which has a then function, which also returns a promise
      var reqUrl='https://www.goodreads.com/search/index.xml?key=sw4i4NbVrGCWSoulnijJQ&q='+quer;
      var promise = $http.get(reqUrl).then(function (response) {
        // The then function here is an opportunity to modify the response
        console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return DataService;
});