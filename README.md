Tversky Index
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [Tversky index](http://en.wikipedia.org/wiki/Tversky_index) between two sequences.

The [Tversky index](http://en.wikipedia.org/wiki/Tversky_index) is an asymmetric similarity measure between two sets, one defined the *prototype* and the other the *variant*. The measure has two parameters: `alpha` and `beta`, which correspond to weights associated with the prototype and variant, respectively. For `alpha = beta = 1`, the index is equal to the [Tanimoto coefficient](http://en.wikipedia.org/wiki/Jaccard_index#Tanimoto_coefficient_.28extended_Jaccard_coefficient.29). For `alpha = beta = 0.5`, the index is equal to [Dice's coefficient](http://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient).


## Installation

``` bash
$ npm install compute-tversky-index
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).

## Usage

``` javascript
var tversky = require( 'compute-tversky-index' );
```

#### tversky( a, b[, opts] )

Computes the [Tversky index](http://en.wikipedia.org/wiki/Tversky_index)
between two sequences `a` and `b`. `a` and `b` must be either both `arrays` or both `strings`.

``` javascript
var a, b, idx;

// Arrays:
a = [ 2, 5, 7, 9 ];
b = [ 3, 5, 7, 11 ];

idx = tversky( a, b );
// returns 0.333...

// Strings:
a = 'Harry';
b = 'Hans';

idx = tversky( a, b );
// returns 0.5
```

The method accepts the following options:

*	`alpha`: weight of the prototype sequence. Must be greater than or equal to `0`. Default: `1`.
*	`beta`: weight of the variant sequence. Must be greater than or equal to `0`. Default: `1`.
*	`symmetric`: `boolean` flag indicating whether to compute a symmetric variant of the Tversky index. Default: `false`.

To specify options, provide an options `object`:

``` javascript
var a, b, idx;

a = 'Harry';
b = 'hans';

idx = tversky( a, b, {
	'alpha': 0.8,
	'beta': 2,
	'symmetric': true
});
// returns 0.142857...
```


## Notes

The module defines `a` and `b` as sequences, rather than sets, to facilitate more general application. Internally, unique sets are extracted from the sequences, and, from these sets, the index is computed.


## Examples

``` javascript
var tversky = require( 'compute-tversky-index' ),
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

	// Pick the first X elements...
	seq[ j ] = data.slice( 0, len+1 );
}

// Compute the modified (symmetric) Tversky index for each sequence pair...
len = numSeq;
indices = new Array( len );
for ( i = 0; i < len; i++ ) {
	indices[ i ] = new Array( len );
	// Exclude indices between each sequence and itself...
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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Philipp Burckhardt.


[npm-image]: http://img.shields.io/npm/v/compute-tversky-index.svg
[npm-url]: https://npmjs.org/package/compute-tversky-index

[travis-image]: http://img.shields.io/travis/compute-io/tversky-index/master.svg
[travis-url]: https://travis-ci.org/compute-io/tversky-index

[coveralls-image]: https://img.shields.io/coveralls/compute-io/tversky-index/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/tversky-index?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/tversky-index.svg
[dependencies-url]: https://david-dm.org/compute-io/tversky-index

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/tversky-index.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/tversky-index

[github-issues-image]: http://img.shields.io/github/issues/compute-io/tversky-index.svg
[github-issues-url]: https://github.com/compute-io/tversky-index/issues
