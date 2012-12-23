/*jsl:import PieceColor.js*/
/*jsl:import PieceType.js*/
/*jsl:import PiecePosition.js*/
/**
	@class represents a piece on the board: color, type and position
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function BoardPiece(color,type,position) {
	this.color=color;
	this.type=type;
	this.position=position;
}
/**
	Debug method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
BoardPiece.prototype.toString=function() {
	return [this.color,this.type,this.position].join();
};
