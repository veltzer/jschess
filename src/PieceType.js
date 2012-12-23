/**
	@class represents a piece type (rook,knight,bishop,queen,king,pawn) 
	@param string - the type of the piece
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function PieceType(type) {
	if(!(type in PieceType.types)) {
		throw 'illegal piecetype '+type;
	}
	this.type=type;
}
/**
	Debug method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.toString=function() {
	return this.type;
};
/**
	Array of piece types
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
	Return whether the piece is a rook
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.isRook=function() {
	return this.type=='rook';
};
/**
	Return whether the piece is a knight
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.isKnight=function() {
	return this.type=='knight';
};
/**
	Return whether the piece is a bishop
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.isBishop=function() {
	return this.type=='bishop';
};
/**
	Return whether the piece is a queen
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.isQueen=function() {
	return this.type=='queen';
};
/**
	Return whether the piece is a king
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.isKing=function() {
	return this.type=='king';
};
/**
	Return whether the piece is a pawn
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.isPawn=function() {
	return this.type=='pawn';
};
