/**
	@class represents a position + graphics
	@param gr graphics (raphael) for the piece
	@param pos position for the piece
	@param pixelPos position for the pieces origin. This is important to be able to move it to other places 
	pixelPos is not the translation of pos to pixels!!!
	@param pieceColor the color of the piece ('white','black')
	@param pieceType the type of the piece ('rook','knight','bishop','queen','king','pawn')
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function Piece(gr,pos,pixelPos,pieceColor,pieceType) {
	this.gr=gr;
	this.pos=pos;
	this.pixelPos=pixelPos;
	this.pieceColor=pieceColor;
	this.pieceType=pieceType;
}
/**
	Debug method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Piece.prototype.toString=function() {
	throw 'the toString method still has to be written';
};
