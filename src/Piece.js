/**
	@class represents a position + graphics
	@param gr graphics (raphael) for the piece
	@param pixelPos position for the pieces origin. This is important to be able to move it to other places 
	pixelPos is not the translation of pos to pixels!!!
	@param boardPiece details of the board piece (color, type, position)
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function Piece(gr,pixelPos,boardPiece) {
	this.gr=gr;
	this.pixelPos=pixelPos;
	this.boardPiece=boardPiece;
}
/**
	Debug method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Piece.prototype.toString=function() {
	return [this.gr,this.pixelPos,this.boardPiece].join();
};
