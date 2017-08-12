'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('booksSearch').
  component('booksSearch' /* core.books service to share query data */, {
    templateUrl: 'books-search/books-search.template.html',
    controller: function BooksSearchController($scope, $http, $location, SharedProperties) {
      var self = this;
      //this.books= Books.query();
      //this.books=this.books.GoodreadsResponse.search.results.work;
      $http.get('books/books-list.json').then(function(response) {
        self.books = response.data.GoodreadsResponse.search.results.work;

      });
      self.deepSearch = function deepSearch(){
        //var x=angular.element(document.getElementById("Text1"));
         var   x=angular.element(document.getElementById("qs"));      
          $scope.query = x.val();
        //alert($scope.query);
          SharedProperties.setQuery($scope.query);
          $location.path("/books");

      }
    }
  });
