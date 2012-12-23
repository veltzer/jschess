/*jsl:import BoardPiece.js*/
/**
	@class represents a full position of the board
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function BoardPosition() {
	this.pieces=[];
}
/**
	Debug method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
BoardPosition.prototype.toString=function() {
	return this.pieces.join();
};
/**
	Add a piece to the position
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
BoardPosition.prototype.addPiece=function(color,type,x,y) {
	this.pieces.push(new BoardPiece(
		new PieceColor(color),
		new PieceType(type),
		new PiecePosition(x,y)
	));
};
/**
	Run a function for each piece in this position
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
BoardPosition.prototype.forEachPiece=function(f) {
	for(var ipiece in this.pieces) {
		var piece=this.pieces[ipiece];
		f(piece);
	}
};
/**
	Static method that returns a starting position in standard chess.
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
BoardPosition.startPos=function() {
	var newPos=new BoardPosition();
	newPos.addPiece('white','rook',0,0);
	newPos.addPiece('white','knight',1,0);
	newPos.addPiece('white','bishop',2,0);
	newPos.addPiece('white','queen',3,0);
	newPos.addPiece('white','king',4,0);
	newPos.addPiece('white','bishop',5,0);
	newPos.addPiece('white','knight',6,0);
	newPos.addPiece('white','rook',7,0);
	newPos.addPiece('white','pawn',0,1);
	newPos.addPiece('white','pawn',1,1);
	newPos.addPiece('white','pawn',2,1);
	newPos.addPiece('white','pawn',3,1);
	newPos.addPiece('white','pawn',4,1);
	newPos.addPiece('white','pawn',5,1);
	newPos.addPiece('white','pawn',6,1);
	newPos.addPiece('white','pawn',7,1);

	newPos.addPiece('black','rook',0,7);
	newPos.addPiece('black','knight',1,7);
	newPos.addPiece('black','bishop',2,7);
	newPos.addPiece('black','queen',3,7);
	newPos.addPiece('black','king',4,7);
	newPos.addPiece('black','bishop',5,7);
	newPos.addPiece('black','knight',6,7);
	newPos.addPiece('black','rook',7,7);
	newPos.addPiece('black','pawn',0,6);
	newPos.addPiece('black','pawn',1,6);
	newPos.addPiece('black','pawn',2,6);
	newPos.addPiece('black','pawn',3,6);
	newPos.addPiece('black','pawn',4,6);
	newPos.addPiece('black','pawn',5,6);
	newPos.addPiece('black','pawn',6,6);
	newPos.addPiece('black','pawn',7,6);
	return newPos;
};
