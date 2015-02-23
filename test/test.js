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

	it( 'should throw an error if not provided two strings or two arrays', function test() {
		var values = [
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ], 'a' ) ).to.throw( Error );
			expect( badValue( 'a', values[ i ] ) ).to.throw( Error );
		}
		values = [
			5,
			'abc',
			true,
			undefined,
			null,
			NaN,
			function(){},
			{},
		];

		for ( var j = 0; j < values.length; j++ ) {
			expect( badValue( values[ i ], [1, 2] ) ).to.throw( TypeError );
			expect( badValue( [1, 2], values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( val1, val2 ) {
			return function() {
				tversky( val1, val2 );
			};
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
		function badValue( val ) {
			return function() {
				tversky( 'abc', 'cde', val );
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
		function badValue( val ) {
			return function() {
				tversky( 'abc', 'cde', {
					'alpha': val,
					'beta': 0.5
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
		function badValue( val ) {
			return function() {
				tversky( 'abc', 'cde', {
					'alpha': 0.5,
					'beta': val
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
		function badValue( val ) {
			return function() {
				tversky( 'abc', 'cde', {
					'symmetric': val
				} );
			};
		}
	});

	it( 'should compute the Tversky index between two arrays', function test() {
		var set1, set2, expected;

		set1 = [2, 5, 7, 9];
		set2 = [3, 5, 7, 11];

		expected = 2 / 6;

		assert.strictEqual( tversky( set1, set2 ), expected );
	});

	it( 'should compute the Tversky index between two strings', function test() {
		var val1, val2, expected;

		val1 = 'Harry';
		val2 = 'Hans';

		expected = 2 / 6;

		assert.strictEqual( tversky( val1, val2 ), expected );
	});

	it( 'should compute the Tversky index between two arrays using custom weights', function test() {
		var set1, set2, expected, options;

		set1 = [2, 5, 7, 9];
		set2 = [3, 5, 7, 11];

		expected = 2 / 4;

		options = {
			'alpha' : 0.5,
			'beta'  : 0.5
		};
		assert.strictEqual( tversky( set1, set2, options ), expected );
	});

	it( 'should compute the Tversky index between two strings using custom weights', function test() {
		var val1, val2, expected, options;

		val1 = 'Harry';
		val2 = 'Hans';

		expected = 2 / 4;

		options = {
			'alpha' : 0.5,
			'beta'  : 0.5
		};
		assert.strictEqual( tversky( val1, val2, options ), expected );
	});

	it( 'should compute a modified symmetric Tversky index', function test(){
		var set1, set2, expected, options;

		set1 = [2, 3, 5, 7, 9];
		set2 = [2, 3, 5, 7, 11, 4];

		expected = 4 / ( 4 + 0.5 * (0.5*1 + 0.5*2) );

		options = {
			'alpha' : 0.5,
			'beta'  : 0.5,
			'symmetric': true
		};

		assert.strictEqual( tversky( set1, set2, options ), expected );

		set1 = [2, 5, 8];
		set2 = [2, 5];

		expected = 2 / ( 2 + 0.5 * (0.5*1 + 0.5*0) );

		options = {
			'alpha' : 0.5,
			'beta'  : 0.5,
			'symmetric': true
		};
		assert.strictEqual( tversky( set1, set2, options ), expected );
	});

});
