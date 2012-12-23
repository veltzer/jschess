/**
	@class represents a piece type (rook,knight,bishop,queen,king,pawn) 
	@param string - the type of the piece
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function PieceType(name) {
	if(!(name in PieceType.names)) {
		throw 'illegal piecetype '+name;
	}
	this.name=name;
}
/**
	Debug method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.prototype.toString=function() {
	return this.name;
};
/**
	Array of piece types
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceType.names={
	rook:undefined,
	knight:undefined,
	bishop:undefined,
	queen:undefined,
	king:undefined,
	pawn:undefined
};
