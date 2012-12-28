var BoardPiece=Class.create(
	/** @lends BoardPiece# */
{
	/**
		@class represents a piece on the board: color, type The instance also has a data field that could be used for private data attached to the piece.
		@description constructs a new object
		@param color color of this piece (black/white)
		@param type type of this piece (rook/knight/bishop/queen/king/pawn)
		@returns the new object created
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function(color,type) {
		this.color=color;
		this.type=type;
		this.data=undefined;
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@returns string representation of this object
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	toString: function() {
		return 'BoardPiece: '+[this.color,this.type,this.data].join();
	},
	/**
		@description Method to set secret data for this piece
		@param data the extra data to hold for this piece
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	setData: function(data) {
		this.data=data;
	},
	/**
		@description Method to get secret data for this piece
		@returns the secret data associated with this piece.
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	getData: function() {
		return this.data;
	},
	/**
		@description Method to unset secret data for this piece
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	unsetData: function() {
		this.data=undefined;
	}
});
