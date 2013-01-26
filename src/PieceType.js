var PieceType = Class.create(
	/** @lends PieceType# */
{
	/**
		@class represents a piece type (rook,knight,bishop,queen,king,pawn)
		creates a new instance
		@param string - the type of the piece.
		@constructor
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function(type) {
		if (!(type in PieceType.types)) {
			throw 'illegal piecetype ' + type;
		}
		this.type = type;
	},
	/**
		toString method that allows you to get a nice printout for this type
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	toString: function() {
		return this.type;
	},
	/**
		Return whether the piece is a rook
		@return is this piece a rook
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	isRook: function() {
		return this.type == 'rook';
	},
	/**
		Return whether the piece is a knight
		@return is this piece a knight
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	isKnight: function() {
		return this.type == 'knight';
	},
	/**
		Return whether the piece is a bishop
		@return is this piece a bishop
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	isBishop: function() {
		return this.type == 'bishop';
	},
	/**
		Return whether the piece is a queen
		@return is this piece a queen
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	isQueen: function() {
		return this.type == 'queen';
	},
	/**
		Return whether the piece is a king
		@return is this piece a king
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	isKing: function() {
		return this.type == 'king';
	},
	/**
		Return whether the piece is a pawn
		@return is this piece a pawn
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	isPawn: function() {
		return this.type == 'pawn';
	}
});
/**
	Array of piece types
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.types = {
	rook: undefined,
	knight: undefined,
	bishop: undefined,
	queen: undefined,
	king: undefined,
	pawn: undefined
};
