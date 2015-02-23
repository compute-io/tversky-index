'use strict';

var tversky = require( './../lib' ),
	shuffle = require( 'compute-shuffle' ),
	nanmean = require( 'compute-nanmean' );

// Adjustable variables...

// How big should the population be from which random samples will be drawn? (the larger the population, the more likely that the population will explore all possible random variates)
var numData = 20;

// How many random samples should be drawn from the population?
var numSeq = 100;

// How big should the random samples be? (the smaller the sequence, the more likely individual sequences will vary from one another; for a sample size equal to the population, variation between samples will be zero => index = 1)
var seqLen = 10;

// How much should the random variates be allowed to vary? (the larger the value, the less likely a value will be repeated in the population data set, and thus, the more likely that sequences will vary)
var max = 20;


// Other variables...
var data,
	seq,
	len,
	indices,
	opts,
	means,
	idx,
	i,
	j;

// Simulate some data...
data = new Array( numData );
for ( i = 0; i < numData; i++ ) {
	data[ i ] = Math.round( Math.random()*max );
}

// Generate random sequences...
seq = new Array( numSeq );
len = seqLen;
for ( j = 0; j < numSeq; j++ ) {
	// Randomly shuffle the data...
	shuffle( data );

	// Pick the first ten elements...
	seq[ j ] = data.slice( 0, len+1 );
}

// Compute the modified (symmetric) Tversky index for each sequence pair...
len = numSeq;
indices = new Array( len );
for ( i = 0; i < len; i++ ) {
	indices[ i ] = new Array( len );
	indices[ i ][ i ] = NaN;
}
opts = {
	'symmetric': true
};
for ( i = 0; i < len-1; i++ ) {
	for ( j = i+1; j < len; j++ ) {
		idx = tversky( seq[ i ], seq[ j ], opts );
		indices[ i ][ j ] = idx;
		indices[ j ][ i ] = idx;
	}
}

// Compute the mean index between all sequences...
means = new Array( len );
for ( i = 0; i < len; i++ ) {
	means[ i ] = nanmean( indices[ i ] );
}
console.log( nanmean( means ) );
