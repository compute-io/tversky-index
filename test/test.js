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
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i], 'a' ) ).to.throw( TypeError );
			expect( badValue( 'a', values[i] ) ).to.throw( TypeError );
		}
		function badValue( val1, val2 ) {
			return function() {
				tversky( val1, val2 );
			};
		}

	});

	it( 'should throw an error if supplied tuning parameters are < 0', function test() {
		expect( badValue( -0.3, 0.3 ) ).to.throw( RangeError );
		expect( badValue(0.3, -0.3) ).to.throw( RangeError );
		function badValue(val1, val2) {
			return function() {
				tversky( 'abc', 'cde', val1, val2 );
			};
		}
	});

	it( 'should throw an error if supplied tuning parameters are non-numeric', function test() {

		var values = [
			true,
			[],
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i], 0.5 ) ).to.throw( TypeError );
			expect( badValue( 0.5, values[i] ) ).to.throw( TypeError );
		}
		function badValue(val1, val2) {
			return function() {
				tversky( 'abc', 'cde', val1, val2 );
			};
		}

	});

	it( 'should compute the Tversky similarity for default tuning params', function test() {
		var set1, set2, expected;

		set1 = [2, 5, 7, 9];
		set2 = [3, 5, 7, 11];

		expected = 2 / 6;

		assert.strictEqual( tversky( set1, set2 ), expected );

	});

	it( 'should compute the Tversky similarity for custom tuning params', function test() {
		var set1, set2, expected;

		set1 = [2, 5, 7, 9];
		set2 = [3, 5, 7, 11];

		expected = 2 / 4;

		assert.strictEqual( tversky( set1, set2, 0.5, 0.5 ), expected );

	});


});
