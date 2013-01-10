/*jsl:import Utils.js*/
var PiecePosition=Class.create(
	/** @lends PiecePosition# */
{
	/**
		@class represents a position on the board
		@description creates a new instance
		@param x x co-ordinate
		@param y y co-ordinate
		@returns the new instance of this class
		The method checks if the values given to it are in the 0..7 range.
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function(x,y) {
		Utils.checkType(x,"number");
		Utils.checkType(y,"number");
		if(x<0 || x>7) {
			throw 'bad value for x '+x+','+typeof(x);
		}
		if(y<0 || y>7) {
			throw 'bad value for y '+y+','+typeof(y);
		}
		this.x=x;
		this.y=y;
	},
	/**
		@description toString method so that you can get a nice printout of instances of this type
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	toString: function() {
		return 'PiecePosition: ('+this.x+','+this.y+')';
	},
	/**
		@description compare one position to another
		@return true or false
	*/
	notEqual: function(otherPos) {
		if(!(otherPos instanceof PiecePosition)) {
			return true;
		}
		return otherPos.x!=this.x || otherPos.y!=this.y;
	}
});
