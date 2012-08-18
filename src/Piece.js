/**
	@class represents a position + graphics
	@constructor
	@param gr graphics (raphael) for the piece
	@param pos position for the piece
	@param pixelPos position for the piece in pixels
*/
function Piece(gr,pos,pixelPos) {
	this.gr=gr
	this.pos=pos
	this.pixelPos=pixelPos
}
Piece.prototype.toString=function() {
	throw 'the toString method still has to be written'
}
