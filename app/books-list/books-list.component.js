'use strict';

angular.
module('booksList').
component('booksList', {
  templateUrl: 'books-list/books-list.template.html',
  controller: function BooksListController($http, $scope, $location, SharedProperties, DataService) {
    
    var self = this; // create an instance to the controller function
    
    // initializing variables
    self.books=[];
    self.booksArr=[];
    self.page=1;
    $scope.quer=SharedProperties.getQuery();
    $scope.currentNo=0;
    $scope.totalNo=0;
    self.inRecvMode=false; // used for MUTEX Lock
    self.pageOneRecvd=false; // only load new data is first page is recieved


    // fetching Page 1
    if ($scope.quer!=null){
      $scope.msg="Your Query: ";
      DataService.async($scope.quer).then(function(d) {
        $scope.data = JSON.parse(d);
        self.books = $scope.data.GoodreadsResponse.search.results.work;
        $scope.totalNo=$scope.data.GoodreadsResponse.search['total-results'];
        self.booksArr=self.books;
        $scope.currentNo+=self.books.length;
        self.pageOneRecvd=true;
        console.log(self.books);
        if($scope.currentNo>$scope.totalNo) $scope.currentNo=$scope.totalNo;
      });
    } else {
      $scope.msg="Can't Process Empty Query";
    }

    self.goBack = function goBack(){
      $location.path('/');
    }

    $scope.saveBookData = function saveBookData(book_id){ // controller method

      // When user clicks on a Book Title this function is called and `book_id` is sent as argument
      // This function stores JSON object of selected book in SharedProperties so that book-detail component may access it
      // It then routes to <book-detail/> component which fetches data from SharedProperties and displays details

      self.booksArr.forEach(function(element, index) {
        if(element.id.__text==book_id){
          // found id, get out of the loop
          SharedProperties.setBookArray(element);
          $location.path("/books/detail/");
        }
      }, this);

    } // function saveBookData(book_id) ends


    $scope.loadData = function loadData() { 
      
      // This function will be called on scroll down if page 1 is already loaded

      

      if($scope.currentNo<$scope.totalNo && self.pageOneRecvd && !self.inRecvMode){
       
        console.log("Page: "+ self.page);
        self.inRecvMode=true;
        DataService.async($scope.quer, self.page).then(function(d) {
          $scope.data = JSON.parse(d);
          self.books = $scope.data.GoodreadsResponse.search.results.work;
          if (self.books){
            self.booksArr=self.booksArr.concat(self.books);
            $scope.currentNo+=self.books.length;
          }
          self.inRecvMode=false;
        });

        self.page++;
      } // if($scope.currentNo<$scope.totalNo ... ends


      if($scope.currentNo>$scope.totalNo) $scope.currentNo=$scope.totalNo;
    } // $scope.loadData() ends
      
    
  } // BooksListController ends
});


