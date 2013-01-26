var SvgPixelPosition = Class.create(
	/** @lends SvgPixelPosition# */
{
	/**
		@class represents a position on the screen (in pixels)
		@description creates a new instance
		@param x x co-ordinate.
		@param y y co-ordinate.
		@return the new instance
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function(x,y) {
		/*
		if(x<0) {
			throw 'bad value for x '+x+','+typeof(x);
		}
		if(y<0) {
			throw 'bad value for y '+y+','+typeof(y);
		}
		*/
		this.x = x;
		this.y = y;
	},
	/**
		@description toString method so that you can get a nice printout of instances of this type
		@return string representation of this object
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	toString: function() {
		return '(' + this.x + ',' + this.y + ')';
	}
});
