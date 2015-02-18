'use strict';

var tversky = require( './../lib' );

var set1 = [2, 5, 7, 9];
var set2 = [3, 5, 7, 11];

tversky( set1, set2 );
// returns 1 / 3

var string1 = 'Harry';
var string2 =  'Hans';

tversky( string1, string2, 0.5, 0.5 );
// 0.2857142857142857
