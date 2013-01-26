var PieceColor = Class.create(
	/** @lends PieceColor# */
{
	/**
		@class represents a piece color (white,black)
		creates a new instance
		@param string - the color of the piece.
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function(color) {
		if (!(color in PieceColor.colors)) {
			throw 'illegal piecetype ' + color;
		}
		this.color = color;
	},
	/**
		toString method that allows you to get a nice printout for this type
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	toString: function() {
		return this.color;
	},
	/**
		Return whether the piece is white
		@return boolean indicating whether the piece is white
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	isWhite: function() {
		return this.color == 'white';
	},
	/**
		Return whether the piece is black
		@return boolean indicating whether the piece is black
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	isBlack: function() {
		return this.color == 'black';
	}
});
/**
	Array of piece colors
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceColor.colors = {
	white: undefined,
	black: undefined
};
