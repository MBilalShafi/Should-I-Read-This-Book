'use strict';

angular.
module('bookDetail').
component('bookDetail', {
  templateUrl: 'book-detail/book-detail.template.html',
  controller: function BookDetailController($http, $scope, $location, SharedProperties) {
    
    var self = this;
    $scope.book=SharedProperties.getBookArray();
    
    self.goBack = function goBack(){
      $location.path('/books');
    }

    if($scope.book.length<1){
      self.goBack();
    }

  } // BookDetailController() ends

});
