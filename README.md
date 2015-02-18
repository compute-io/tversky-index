tversky-index
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> calculate the Tversky similarity measure between two sets or two strings

## Installation

``` bash
$ npm install compute-tversky-index
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).

## Usage

To use the module,

``` javascript
var tversky = require( 'compute-tversky-index' );
```

#### tversky( elem1, elem2, [alpha, beta] )

This function calculates the [Tversky index](http://en.wikipedia.org/wiki/Tversky_index)
between the two sets `elem1` and `elem2`.
The Tversky index is an asymmetric similarity measure, which for tuning parameters
`alpha` = `beta` = 1 produces the Tanimoto coefficient and for `alpha` = `beta` = 0.5
is equal to Dice's coefficient. The `alpha` and `beta` parameters default to the value
one if not supplied when calling the function.
When `elem1` and `elem2` are strings, the Tversky coefficient is calculated using bigrams.

## Examples

``` javascript
var tversky = require( 'compute-tversky-index' );

var set1 = [2, 5, 7, 9];
var set2 = [3, 5, 7, 11];

tversky( set1, set2 );
// returns 1 / 3

var string1 = 'Harry';
var string2 =  'Hans';

tversky( string1, string2, 0.5, 0.5 );
// 0.2857142857142857

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


## License

[MIT license](http://opensource.org/licenses/MIT).


---
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
