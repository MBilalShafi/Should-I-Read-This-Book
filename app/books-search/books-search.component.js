'use strict';

angular.
module('booksSearch').
component('booksSearch' /* Component for Fast Searching Books */, {
  
  templateUrl: 'books-search/books-search.template.html',
  controller: function BooksSearchController($http, $scope, $location, SharedProperties, DataService) {

    var self = this; // create an instance to the controller function
    
    // initializing variables
    self.books=[];
    self.totalResults=0;


    self.deepSearch = function deepSearch(){ // controller method

      // This function will be called when user clicks on search button
      // It will store the user Query in SharedProperties and than refer to <books-list/> component

      //$scope.query = angular.element(document.getElementById("qs")).val();
      
      if(self.query!=null){
        SharedProperties.setQuery(self.query);
        $location.path("/books");
      }

    } // self.deepSearch() ends


    $scope.saveBookData = function saveBookData(book_id){ // controller method

      // When user clicks on a Book Title this function is called and `book_id` is sent as argument
      // This function stores JSON object of selected book in SharedProperties so that book-detail component may access it
      // It then routes to <book-detail/> component which fetches data from SharedProperties and displays details

      self.books.forEach(function(element, index) {
        if(element.id.__text==book_id){
          // found id, get out of the loop
          SharedProperties.setBookArray(element);
          $location.path("/books/detail/");
        }
      }, this);

    } // function saveBookData(book_id) ends



    self.updateList = function updateList(){ // controller method

      // When data in Search Input field is changed, this will be called
      // This will call DataService to fetch data from API

      //$scope.query=angular.element(document.getElementById("qs")).val();

      if(self.query!=null){
        
          // get data against query and store in self.books
        DataService.async(self.query).then(function(data) {
          $scope.data = JSON.parse(data); // parse String data into JSON Object

          self.totalResults= (parseInt($scope.data.GoodreadsResponse.search['total-results']))-5;
          // 5 results are shown to user, so calculating remaining results number

          self.books = ($scope.data.GoodreadsResponse.search.results.work).slice(0,5);
          // 20 books are returned by the API as a page, so slicing the first 5 to be displayed to user

        }); // DataService async call ended

      } // if ends

    } // function updateList() ends


  } // BooksSearchController() for module `booksSearch` ends

  
}); // component ends
