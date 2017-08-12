'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('booksList').
  component('booksList', {
    templateUrl: 'books-list/books-list.template.html',
    controller: function BooksListController($http, $scope, SharedProperties, DataService) {
      var self = this;
      //this.books= Books.query();
      //this.books=this.books.GoodreadsResponse.search.results.work;
      //$http.get('books/books-list.json').then(function(response) {
        //self.books = response.data.GoodreadsResponse.search.results.work;

      //});
      self.booksArr=[];

      $scope.quer=SharedProperties.getQuery();
      $scope.currentNo=0;
      $scope.totalNo=0;
      if ($scope.quer!=null){
        $scope.msg="Your Query: ";
        DataService.async($scope.quer).then(function(d) {
          $scope.data = JSON.parse(d);
          self.books = $scope.data.GoodreadsResponse.search.results.work;
          $scope.totalNo=$scope.data.GoodreadsResponse.search['total-results'];
          self.bookArr=self.books.slice(0,10);
          $scope.currentNo=10;
        });
      } else {
        console.log("Null Query Requested!");
        $scope.msg="Can't Process Empty Query";
      }
    }
  });
