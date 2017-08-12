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
      
      self.books=[];
      self.booksArr=[];
      self.page=1;
      $scope.quer=SharedProperties.getQuery();
      $scope.currentNo=0;
      $scope.totalNo=0;
      self.inRecvMode=false;
      self.pageOneRecvd=false;
      if ($scope.quer!=null){
        $scope.msg="Your Query: ";
        DataService.async($scope.quer).then(function(d) {
          $scope.data = JSON.parse(d);
          self.books = $scope.data.GoodreadsResponse.search.results.work;
          $scope.totalNo=$scope.data.GoodreadsResponse.search['total-results'];
          self.booksArr=self.books.slice(0,10);
          $scope.currentNo=10;
          self.pageOneRecvd=true;
          if($scope.currentNo>$scope.totalNo) $scope.currentNo=$scope.totalNo;
        });
      } else {
        console.log("Null Query Requested!");
        $scope.msg="Can't Process Empty Query";
      }
      $scope.loadData = function loadData(){ // this function will be called on scroll down
        if($scope.currentNo>$scope.totalNo) $scope.currentNo=$scope.totalNo;
        if($scope.currentNo<$scope.totalNo && self.pageOneRecvd && !self.inRecvMode){
          //alert("Scroll to Bottom detected");
          
          console.log(self.page);
          if(self.page++%2==0 /* pick data if page is even number (bacuse data is picked 20 per page means 2 pages are picked once) */)
          {
            self.inRecvMode=true;
            DataService.async($scope.quer, self.page).then(function(d) {
              $scope.data = JSON.parse(d);
              self.books = $scope.data.GoodreadsResponse.search.results.work;
              console.log('Result Start: '+$scope.data.GoodreadsResponse.search['results-start']);
              console.log('Result End: '+$scope.data.GoodreadsResponse.search['results-end']);
              if (self.books.length>10){
                self.booksArr=self.booksArr.concat(self.books.slice(0,10));
                $scope.currentNo+=20;
              } else {
                self.booksArr=self.booksArr.concat(self.books.slice(0,self.books.length));
                $scope.currentNo+=self.books.length;
              }
              self.inRecvMode=false;
            });
          } else { // load data from previous array
            if (self.books.length==20){
              console.log('In here');
              
              self.booksArr=self.booksArr.concat(self.books.slice(10,20));
              $scope.currentNo+=20;
            } else {
              self.booksArr=self.booksArr.concat(self.books.slice(10,self.books.length));
              $scope.currentNo+=self.books.length-10;
            }
          }
          
          console.log(self.booksArr);
        }
      }
      

    }
  })
  
  .directive('onScrollToBottom', function ($document) {
    //This function will fire an event when the container/document is scrolled to the bottom of the page
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var doc = angular.element($document)[0].body;

            $document.bind("scroll", function () {

                //console.log('in scroll');
                //console.log("scrollTop + offsetHeight:" + (doc.scrollTop + doc.offsetHeight));
                //console.log("scrollHeight: " + doc.scrollHeight);

                if (doc.scrollTop + doc.offsetHeight >= doc.scrollHeight) {
                    //run the event that was passed through
                    scope.$apply(attrs.onScrollToBottom);
                }
            });
        }
    };
  });
