/**
	@class represents a position + graphics
	@constructor
	@param gr graphics (raphael) for the piece
	@param pos position for the piece
*/
function Piece(gr,pos) {
	this.gr=gr
	this.pos=pos
}
Piece.prototype.toString=function() {
	return 'the toString method still has to be written'
}
