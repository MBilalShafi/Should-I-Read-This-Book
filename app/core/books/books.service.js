'use strict';

angular.
  module('core.books').
  factory('Books', ['$resource',
    function($resource) {
      return $resource('books/:bookId.json', {}, {
        query: {
          method: 'GET',
          params: {bookId: 'books-list'},
          isArray: true
        }
      });
    }
  ]);
