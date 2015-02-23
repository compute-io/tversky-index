/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	tversky = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-tversky-index', function tests() {

	it( 'should export a function', function test() {
		expect( tversky ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither an array or a string', function test() {
		var values = [
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				tversky( value, 'a' );
			};
		}
	});

	it( 'should throw an error if the second argument is neither an array or a string', function test() {
		var values = [
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				tversky( 'a', value );
			};
		}
	});

	it( 'should throw an error if the input sequences are not of the same type', function test() {
		expect( diffType1 ).to.throw( Error );
		expect( diffType2 ).to.throw( Error );
		function diffType1() {
			tversky( [], 'a' );
		}
		function diffType2() {
			tversky( 'a', [] );
		}
	});

	it( 'should throw an error if `options` is not an object', function test(){
		var values = [
			'',
			5,
			null,
			undefined,
			NaN,
			true,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				tversky( '', '', value );
			};
		}
	});

	it( 'should throw an error if `alpha` option is not a nonnegative number', function test() {
		var values = [
			-1,
			'',
			true,
			null,
			undefined,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				tversky( 'abc', 'cde', {
					'alpha': value
				} );
			};
		}
	});

	it( 'should throw an error if `beta` option is a nonnegative number', function test() {
		var values = [
			-1,
			'',
			true,
			null,
			undefined,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				tversky( 'abc', 'cde', {
					'beta': value
				} );
			};
		}
	});

	it( 'should throw an error if `symmetric` option is not a boolean', function test() {
		var values = [
			5,
			'',
			undefined,
			null,
			NaN,
			function(){},
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				tversky( 'abc', 'cde', {
					'symmetric': value
				} );
			};
		}
	});

	it( 'should compute the Tversky index between two arrays', function test() {
		var arr1, arr2, expected;

		arr1 = [2, 5, 7, 9];
		arr2 = [3, 5, 7, 11];

		expected = 2 / ( 2 + 1*2 + 1*2 );

		assert.strictEqual( tversky( arr1, arr2 ), expected );
	});

	it( 'should compute the Tversky index between two strings', function test() {
		var str1, str2, expected;

		str1 = 'Harry';
		str2 = 'Hans';

		expected = 2 / ( 2 + 1*2 + 1*2 );

		assert.strictEqual( tversky( str1, str2 ), expected );
	});

	it( 'should compute the Tversky index between two arrays using custom weights', function test() {
		var alpha = 0.5,
			beta = 0.5,
			arr1,
			arr2,
			expected,
			options;

		arr1 = [2, 5, 7, 9];
		arr2 = [3, 5, 7, 11];

		expected = 2 / ( 2 + alpha*2 + beta*2 );

		options = {
			'alpha' : alpha,
			'beta'  : beta
		};
		assert.strictEqual( tversky( arr1, arr2, options ), expected );
	});

	it( 'should compute the Tversky index between two strings using custom weights', function test() {
		var alpha = 0.5,
			beta = 0.5,
			str1,
			str2,
			expected,
			options;

		str1 = 'Harry';
		str2 = 'Hans';

		expected = 2 / ( 2 + alpha*2 + beta*2 );

		options = {
			'alpha' : alpha,
			'beta'  : beta
		};
		assert.strictEqual( tversky( str1, str2, options ), expected );
	});

	it( 'should return unity if both weights are set to 0', function test() {
		var arr1, arr2, expected, options;

		arr1 = [2, 5, 7, 9];
		arr2 = [3, 5, 7, 11];

		expected = 1;

		options = {
			'alpha' : 0,
			'beta'  : 0
		};
		assert.strictEqual( tversky( arr1, arr2, options ), expected );
	});

	it( 'should return zero in the limit that one or both weights goes to infinity', function test() {
		var arr1, arr2, expected, options;

		arr1 = [2, 5, 7, 9];
		arr2 = [3, 5, 7, 11];

		expected = 0;

		options = {
			'alpha' : Number.POSITIVE_INFINITY,
			'beta'  : 0
		};
		assert.strictEqual( tversky( arr1, arr2, options ), expected );

		options = {
			'alpha' : 0,
			'beta'  : Number.POSITIVE_INFINITY
		};
		assert.strictEqual( tversky( arr1, arr2, options ), expected );

		options = {
			'alpha' : Number.POSITIVE_INFINITY,
			'beta'  : Number.POSITIVE_INFINITY
		};
		assert.strictEqual( tversky( arr1, arr2, options ), expected );
	});

	it( 'should compute a modified symmetric Tversky index', function test(){
		var arr1, arr2, expected, options;

		arr1 = [2, 3, 5, 7, 9];
		arr2 = [2, 3, 5, 7, 11, 4];

		expected = 4 / ( 4 + 1*(1*1 + (1-1)*2) );

		options = {
			'symmetric': true
		};
		assert.strictEqual( tversky( arr1, arr2, options ), expected );

		// Should be symmetric...
		assert.strictEqual( tversky( arr2, arr1, options ), expected );
	});

});
