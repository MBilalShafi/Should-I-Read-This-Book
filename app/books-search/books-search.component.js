'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('booksSearch').
  component('booksSearch' /* core.books service to share query data */, {
    templateUrl: 'books-search/books-search.template.html',
    controller: function BooksSearchController($scope, $http, $location, SharedProperties, DataService) {
      var self = this;
      //this.books= Books.query();
      //this.books=this.books.GoodreadsResponse.search.results.work;
      //$http.get('books/books-list.json').then(function(response) {
        //self.books = response.data.GoodreadsResponse.search.results.work;

      //});
      self.book=[];
      self.totalResults=0;
      self.deepSearch = function deepSearch(){
        //var x=angular.element(document.getElementById("Text1"));
         var   x=angular.element(document.getElementById("qs"));      
          $scope.query = x.val();
        //alert($scope.query);
          if($scope.query!=null){
            SharedProperties.setQuery($scope.query);
            $location.path("/books");
          }

      }


      $scope.saveBookData = function saveBookData(book_id){
        console.log("book_id: " + book_id);
        // find data in $books array
        var tempArr=self.books;
        tempArr.forEach(function(element, index) {
          console.log(element.id.__text +" != "+ book_id);
          if(element.id.__text==book_id){
            // found id, get out of the loop
            SharedProperties.setBookArray(element);
            console.log(element.id.__text +" == "+ book_id);

            $location.path("/books/detail/");
          }
        }, this);


      }
      self.updateList = function updateList(){
        var   x=angular.element(document.getElementById("qs"));      
        $scope.query = x.val();
        //alert($scope.query);
        if($scope.query!=null){
          //SharedProperties.setQuery($scope.query);
            // get data against query and store in self.books
          DataService.async($scope.query).then(function(d) {
            $scope.data = JSON.parse(d);
            //console.log($scope.data.GoodreadsResponse.search['total-results']);
            self.totalResults= parseInt($scope.data.GoodreadsResponse.search['total-results']);
            self.books = $scope.data.GoodreadsResponse.search.results.work;
            self.books=self.books.slice(0, 5);
            
            //self.books.forEach(function(element) {
              //self.formattedBooks.push(element.best_book.title + ' ('+element.best_book.author.name + ')')
            //}, this);
            //$scope.formattedBooks.push(totalResults+' more results...');
            //console.log(self.totalResults);
            self.totalResults-=5;
            //console.log(self.totalResults);
          });
        }
      }
    }
  });
