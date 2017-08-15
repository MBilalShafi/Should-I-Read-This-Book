'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('bookDetail').
  component('bookDetail', {
    templateUrl: 'book-detail/book-detail.template.html',
    controller: function BookDetailController($http, $scope, $location, SharedProperties) {
      var self = this;
      $scope.book=SharedProperties.getBookArray();
      self.detail="world!";
      
      self.goBack = function goBack(){
        $location.path('/');
      }

      if($scope.book.length<1){
        self.goBack();
      }

    }
  });
