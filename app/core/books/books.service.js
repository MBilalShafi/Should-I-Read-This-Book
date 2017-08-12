'use strict';

angular.
  module('core.books').
  service("SharedProperties", function () {
    var _query = null;

    return {
        getQuery: function () {
            return _query
        },

        setQuery: function(q) {
            _query = q;
        }
    }
});
