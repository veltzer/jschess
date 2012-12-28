var PieceColor=Class.create(
	/** @lends PieceColor# */
{
	/**
		@class represents a piece color (white,black) 
		@description creates a new instance
		@param string - the color of the piece
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function(color) {
		if(!(color in PieceColor.colors)) {
			throw 'illegal piecetype '+color;
		}
		this.color=color;
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	toString: function() {
		return this.color;
	},
	/**
		@description Return whether the piece is white
		@returns boolean indicating whether the piece is white
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	isWhite: function() {
		return this.color=='white';
	},
	/**
		@description Return whether the piece is black
		@returns boolean indicating whether the piece is black
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	isBlack: function() {
		return this.color=='black';
	}
});
/**
	@description Array of piece colors
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceColor.colors={
	white:undefined,
	black:undefined
};
