var SvgPieceData=Class.create(
	/** @lends SvgPieceData# */
{
	/**
		@class represents a position + graphics
		@description creates a new instance
		@param set raphael set for the piece
		@param pixelPos position for the pieces origin. This is important to be able to move it to other places 
		pixelPos is not the translation of pos to pixels!!!
		@param boardSvgPieceData details of the board piece (color, type, position)
		@constructs
		@returns the new instance
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function(set,pixelPos) {
		this.set=set;
		this.pixelPos=pixelPos;
		this.extra=undefined;
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@returns a string representation of this instance
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	toString: function() {
		return [this.set,this.pixelPos,this.extra].join();
	},
	/**
		@description ForEach method on all presentation elements
		@param f function to activate on each element
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	forEach: function(f) {
		//var that=this;
		this.set.forEach(function(el) {
			f(el);
		});
		if(this.extra!==undefined) {
			this.extra.forEach(function(el) {
				f(el);
			});
		}
	}
});
