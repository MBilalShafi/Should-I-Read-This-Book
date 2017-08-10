'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('bookDetail').
  component('bookDetail', {
    template: 'Hello, {{$ctrl.detail}}!',
    controller: function BookDetailController($http) {
      var self = this;

      self.detail="world!";
    }
  });
