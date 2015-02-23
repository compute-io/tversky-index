/**
*
*	COMPUTE: tversky-index
*
*
*	DESCRIPTION:
*   -	Computes the Tversky index between two sequences.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Philipp Burckhardt.
*
*
*	AUTHOR:
*		Philipp Burckhardt. pburckhardt@outlook.com. 2015.
*
*/

'use strict';

// MODULES //

var intersect = require( 'intersect' ),
	isArray = require( 'validate.io-array' ),
	isString = require( 'validate.io-string' ),
	isBoolean = require( 'validate.io-boolean' ),
	isObject = require( 'validate.io-object' ),
	isNonNegative = require( 'validate.io-nonnegative' );


// FUNCTIONS //

/**
* FUNCTION: unique( arr )
*	Computes the unique elements of an array.
*
* @private
* @param {Array} arr - input array
* @returns {Array} array of unique elements
*/
function unique( arr ) {
	var len = arr.length,
		hash = {},
		vals = [],
		val;

	for ( var i = 0; i < len; i++ ) {
		val = arr[ i ];
		if ( !hash.hasOwnProperty( val ) ) {
			hash[ val ] = true;
			vals.push( val );
		}
	}
	return vals;
} // end FUNCTION unique()


// TVERSKY INDEX //

/**
* FUNCTION: tversky( a, b[, options] )
*   Computes the Tversky index between two sequences. For alpha = beta = 0.5, the index is equal to Dice's coefficient. For alpha = beta = 1, the index is equal to the Tanimoto coefficient.
*
* @param {String|Array} a - array or string sequence
* @param {String|Array} b - array or string sequence
* @param {Object} [options] - method options
* @param {Number} [options.alpha=1] - weight of prototype
* @param {Number} [options.beta=1] - weight of variant
* @param {Boolean} [options.symmetric=false] - boolean specifying whether the index should be symmetric
* @returns {Number} Tversky index
*/
function tversky( a, b, options ) {
	var symmetric = false,
		alpha = 1,
		beta = 1,
		aType,
		bType,
		opts,
		anb,
		len,
		aCompl,
		bCompl,
		hash,
		min,
		max,
		i;

	aType = isString( a );
	if ( !isArray( a ) && !aType ) {
		throw new TypeError( 'tversky()::invalid input argument. Sequence must be either an array or a string. Value: `' + a + '`.' );
	}
	bType = isString( b );
	if ( !isArray( b )  && !bType ) {
		throw new TypeError( 'tversky()::invalid input argument. Sequence must be either an array or a string. Value: `' + b + '`.' );
	}
	if ( aType !== bType ) {
		throw new Error( 'tversky()::invalid input arguments. Sequences must be the same type; i.e., both strings or both arrays.' );
	}
	if ( arguments.length > 2 ) {
		opts = options;
		if ( !isObject( opts ) ) {
			throw new TypeError( 'tversky()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'alpha' ) ) {
			alpha = opts.alpha;
			if ( !isNonNegative( alpha ) ) {
				throw new TypeError( 'tversky()::invalid option. Alpha must be a nonnegative number. Value: `' + alpha + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'beta' ) ) {
			beta = opts.beta;
			if ( !isNonNegative( beta ) ) {
				throw new TypeError( 'tversky()::invalid option. Beta must be a nonnegative number. Value: `' + beta + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'symmetric' ) ) {
			symmetric = opts.symmetric;
			if ( !isBoolean( symmetric ) ) {
				throw new TypeError( 'tversky()::invalid option. Symmetric flag must be a boolean. Value: `' + symmetric + '`.' );
			}
		}
	}
	if ( aType ){
		a = a.split( '' );
		b = b.split( '' );
	}
	// Determine the unique elements for each array:
	a = unique( a );
	b = unique( b );

	// Compute the intersection between the unique sets:
	anb = intersect( a, b );
	len = anb.length;

	// Create a hash...
	hash = {};
	for ( i = 0; i < len; i++ ) {
		hash[ anb[i] ] = true;
	}
	// Compute the relative complements...
	aCompl = 0;
	for ( i = 0; i < a.length; i++ ) {
		if ( !hash.hasOwnProperty( a[i] ) ) {
			aCompl++;
		}
	}
	bCompl = 0;
	for ( i = 0; i < b.length; i++ ) {
		if ( !hash.hasOwnProperty( b[i] ) ) {
			bCompl++;
		}
	}
	if ( symmetric ) {
		if ( aCompl > bCompl ) {
			min = bCompl;
			max = aCompl;
		} else {
			min = aCompl;
			max = bCompl;
		}
		return len / ( len + beta*(alpha*min + max*(1-alpha))  );
	}
	return len / ( len + alpha*aCompl + beta*bCompl );
} // end FUNCTION tversky()


// EXPORTS //

module.exports = tversky;
