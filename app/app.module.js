angular.module('bookSuggestor', [

    'booksList', // show the complete list of books against a query (deepSearch)
    'ngRoute',   // perform routing
    'bookDetail',// show details of a particular book
    'booksSearch' // perform a simple search of books against a realtime query
]);