/**
*
*	COMPUTE: tversky-index
*
*
*	DESCRIPTION:
*   - calculate the Tversky similarity measure between two sets. The
*     default tuning parameters are alpha = beta = 1, which equals Dice's
*     coefficient.
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

// var module_alias = require( 'module_name' );

var intersect = require( 'intersect' );

// FUNCTIONS //

/**
* FUNCTION: tversky( X, Y, alpha, beta )
*   computes the Tversky similarity between sets X and Y.
*   For alpha = beta = 0.5, equal to Dice's coefficient and for alpha = beta = 1
*   equal to Tanimoto coefficient
* @param {String|Array} X - array or string sequence
* @param {String|Array} Y - array or string sequence
* @param {Number} alpha - tuning parameter
* @param {Number} beta - tuning parameter
* @returns {Number} Tversky similarity
*/
function tversky(X, Y, alpha, beta) {
  var xType = typeof X, yType = typeof Y, similarity = 0,
  xy_intersection, x_minus_y, y_minus_x;

  if ( !Array.isArray( X ) && xType !== 'string' ) {
    throw new TypeError( 'tversky()::invalid input argument. Sequence must be either an array or string' );
  }
  if ( !Array.isArray( Y )  && yType !== 'string' ) {
    throw new TypeError( 'tversky()::invalid input argument. Sequence must be either an array or string' );
  }

  alpha = alpha || 1;
  beta = beta || 1;

  if ( typeof alpha !== 'number' || alpha !== alpha ) {
    throw new TypeError( 'tversky()::invalid input argument. Alpha must be numeric.' );
  } else {
    if ( alpha <  0) {
      throw new RangeError( 'tversky()::invalid input argument. Alpha must be >= 0 .' );
    }
  }

  if ( typeof beta !== 'number' || beta !== beta ) {
    throw new TypeError( 'tversky()::invalid input argument. Beta must be numeric.' );
  } else {
    if ( beta <  0) {
      throw new RangeError( 'tversky()::invalid input argument. Beta must be >= 0 .' );
    }
  }

  xy_intersection = intersect( X, Y ).length;
  x_minus_y = [].filter.call(X, function(i) {return Y.indexOf(i) < 0; } ).length;
  y_minus_x = [].filter.call(Y, function(i) {return X.indexOf(i) < 0; } ).length;

  similarity = ( xy_intersection ) /
  ( xy_intersection + alpha * x_minus_y + beta * y_minus_x);

  return similarity;
} // end FUNCTION foo()


// EXPORTS //

module.exports = tversky;
