'use strict';

angular.
  module('core.books').
  service("SharedProperties", function () {
    var _query = null;
    var _book =[];

    return {
        getQuery: function () {
            return _query
        },

        setQuery: function(q) {
            _query = q;
        },
        
        setBookArray: function(bookArray){
          _book=bookArray;
        },

        getBookArray: function(bookArray){
          return _book;
        }
    }
});
