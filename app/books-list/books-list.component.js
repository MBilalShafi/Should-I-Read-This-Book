'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('booksList').
  component('booksList', {
    templateUrl: 'books-list/books-list.template.html',
    controller: function BooksListController($http) {
      var self = this;
      //this.books= Books.query();
      //this.books=this.books.GoodreadsResponse.search.results.work;
      $http.get('books/books-list.json').then(function(response) {
        self.books = response.data.GoodreadsResponse.search.results.work;

      });
    }
  });
