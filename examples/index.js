'use strict';

var tversky = require( './../lib' );

var a,
	b,
	idx;

// Compare two arrays:
a = [2, 5, 7, 9];
b = [3, 5, 7, 11];

idx = tversky( a, b );
console.log( idx );

// Compare two strings:
a = 'Harry';
b = 'Hans';

idx = tversky( a, b, {
	'alpha': 0.5,
	'beta': 0.5
});
console.log( idx );
