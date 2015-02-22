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

		function badValue( val1, val2 ) {
			return function() {
				tversky( val1, val2 );
			};
		}

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
			expect( badValue( values[i], 'a' ) ).to.throw( Error );
			expect( badValue( 'a', values[i] ) ).to.throw( Error );
		}

		values = [
			'abc',
			true,
			undefined,
			null,
			NaN,
			function(){},
			{},
		];

		for ( var j = 0; j < values.length; j++ ) {
			expect( badValue( values[i], [1, 2] ) ).to.throw( TypeError );
			expect( badValue( [1, 2], values[i] ) ).to.throw( TypeError );
		}

	});

	it( 'should throw an error if options parameter is not an object', function test(){
		var values = [
			true,
			0.2,
			'symmetric',
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue(val) {
			return function() {
				tversky( 'abc', 'cde', val );
			};
		}
	});

	it( 'should throw an error if supplied tuning parameters are < 0', function test() {
		expect( badValue( -0.3, 0.3 ) ).to.throw( RangeError );
		expect( badValue(0.3, -0.3) ).to.throw( RangeError );
		function badValue(val1, val2) {
			return function() {
				tversky( 'abc', 'cde', {
					alpha: val1,
					beta: val2
				} );
			};
		}
	});

	it( 'should throw an error if supplied tuning parameter alpha is non-numeric', function test() {

		var values = [
			true,
			[],
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue(val) {
			return function() {
				tversky( 'abc', 'cde', {
					alpha: val,
					beta: 0.5
				} );
			};
		}

	});

	it( 'should throw an error if supplied tuning parameter beta is non-numeric', function test() {

		var values = [
			true,
			[],
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue(val) {
			return function() {
				tversky( 'abc', 'cde', {
					alpha: 0.5,
					beta: val
				} );
			};
		}

	});

	it( 'should throw an error if symmetric key of options object is non-Boolean', function test() {

		var values = [
			5,
			'yes',
			undefined,
			null,
			NaN,
			function(){},
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue(val) {
			return function() {
				tversky( 'abc', 'cde', {
					'symmetric': val
				} );
			};
		}

	});

	it( 'should compute the Tversky similarity of arrays for default tuning params', function test() {
		var set1, set2, expected;

		set1 = [2, 5, 7, 9];
		set2 = [3, 5, 7, 11];

		expected = 2 / 6;

		assert.strictEqual( tversky( set1, set2 ), expected );

	});

	it( 'should compute the Tversky similarity for custom tuning params', function test() {
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

	it( 'should compute the symmetric Tversky similarity', function test(){
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

	it( 'should compute the Tversky similarity of strings for default tuning params', function test() {

		var string1, string2, expected;

		string1 = 'Harry';
		string2 =  'Hans';

		expected = 1 / 3;

		assert.strictEqual( tversky( string1, string2 ), expected );

	});

	it( 'should compute the Tversky similarity for custom tuning params', function test() {

		var string1, string2, expected, options;

		string1 = 'Harry';
		string2 =  'Hans';

		expected = 1 / 2;

		options =  {
			'alpha' : 0.5,
			'beta'  : 0.5
		};

		assert.strictEqual( tversky( string1, string2, options ), expected );

	});

});
