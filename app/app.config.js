'use strict';

angular.
module('bookSuggestor').
config(['$locationProvider' ,'$routeProvider', '$httpProvider',
  function config($locationProvider, $routeProvider, $httpProvider) {
    
    $locationProvider.hashPrefix('!');
    $httpProvider.defaults.useXDomain = true;

    $routeProvider.
      when('/', {
        template: '<books-search></books-search>'
      }).
      when('/books', {
        template: '<books-list></books-list>'
      }).
      when('/books/:bookId', {
        template: '<book-detail></book-detail>'
      }).
      otherwise('/');
  }
]);
