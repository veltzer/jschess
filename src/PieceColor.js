var PieceColor = Class.create(
	/** @lends PieceColor# */
{
	/**
		@class represents a piece color (white,black)
		creates a new instance
		@param string - the color of the piece.
		@constructor
		@author mark.veltzer@gmail.com (Mark Veltzer)
	*/
	initialize: function(color) {
		if (!(color in PieceColor.colors)) {
			throw 'illegal piecetype ' + color;
		}
		this.color = color;
	},
	/**
		toString method that allows you to get a nice printout for this type
		@author mark.veltzer@gmail.com (Mark Veltzer)
	*/
	toString: function() {
		return this.color;
	},
	/**
		Return whether the piece is white
		@return boolean indicating whether the piece is white
		@author mark.veltzer@gmail.com (Mark Veltzer)
	*/
	isWhite: function() {
		return this.color == 'white';
	},
	/**
		Return whether the piece is black
		@return boolean indicating whether the piece is black
		@author mark.veltzer@gmail.com (Mark Veltzer)
	*/
	isBlack: function() {
		return this.color == 'black';
	}
});
/**
	Array of piece colors
	@author mark.veltzer@gmail.com (Mark Veltzer)
*/
PieceColor.colors = {
	white: undefined,
	black: undefined
};
