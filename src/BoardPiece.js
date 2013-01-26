var BoardPiece = Class.create(
	/** @lends BoardPiece# */
{
	/**
		@class represents a piece on the board: color, type The instance also has a data field that could be used for private data attached to the piece.
		constructs a new object
		@param color color of this piece (black/white).
		@param type type of this piece (rook/knight/bishop/queen/king/pawn).
		@return the new object created
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function(color,type) {
		this.color = color;
		this.type = type;
		this.data = undefined;
	},
	/**
		toString method that allows you to get a nice printout for this type
		@return string representation of this object
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	toString: function() {
		return 'BoardPiece: ' + [this.color, this.type, this.data].join();
	},
	/**
		Method to set secret data for this piece
		@param data the extra data to hold for this piece.
		@return nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	setData: function(data) {
		this.data = data;
	},
	/**
		Method to get secret data for this piece
		@return the secret data associated with this piece.
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	getData: function() {
		return this.data;
	},
	/**
		Method to unset secret data for this piece
		@return nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	unsetData: function() {
		this.data = undefined;
	}
});
