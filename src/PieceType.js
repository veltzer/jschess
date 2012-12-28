/**
	@class represents a piece type (rook,knight,bishop,queen,king,pawn) 
	@description creates a new instance
	@param string - the type of the piece
	@constructs
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function PieceType(type) {
	if(!(type in PieceType.types)) {
		throw 'illegal piecetype '+type;
	}
	this.type=type;
}
/**
	@description toString method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.toString=function() {
	return this.type;
};
/**
	@description Array of piece types
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.types={
	rook:undefined,
	knight:undefined,
	bishop:undefined,
	queen:undefined,
	king:undefined,
	pawn:undefined
};
/**
	@description Return whether the piece is a rook
	@returns is this piece a rook
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.isRook=function() {
	return this.type=='rook';
};
/**
	@description Return whether the piece is a knight
	@returns is this piece a knight
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.isKnight=function() {
	return this.type=='knight';
};
/**
	@description Return whether the piece is a bishop
	@returns is this piece a bishop
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.isBishop=function() {
	return this.type=='bishop';
};
/**
	@description Return whether the piece is a queen
	@returns is this piece a queen
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.isQueen=function() {
	return this.type=='queen';
};
/**
	@description Return whether the piece is a king
	@returns is this piece a king
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.isKing=function() {
	return this.type=='king';
};
/**
	@description Return whether the piece is a pawn
	@returns is this piece a pawn
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.isPawn=function() {
	return this.type=='pawn';
};
