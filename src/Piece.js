/**
	@class represents a position + graphics
	@constructor
	@param gr graphics (raphael) for the piece
	@param pos position for the piece
	@param pixelPos position for the pieces origin. This is important to be able to move it to other places 
	pixelPos is not the translation of pos to pixels!!!
*/
function Piece(gr,pos,pixelPos) {
	this.gr=gr
	this.pos=pos
	this.pixelPos=pixelPos
}
Piece.prototype.toString=function() {
	throw 'the toString method still has to be written'
}
