/**
	@class represents a position + graphics
	@constructor
	@param gr graphics (raphael) for the piece
	@param pos position for the piece
	@param rect size of rectange for the piece (assumes rect is (0,0,rect,rect)
*/
function Piece(gr,pos,rect) {
	this.gr=gr
	this.pos=pos
	this.rect=rect
}
Piece.prototype.toString=function() {
	throw 'the toString method still has to be written'
}
