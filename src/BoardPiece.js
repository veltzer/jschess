/*jsl:import PieceColor.js*/
/*jsl:import PieceType.js*/
/*jsl:import PiecePosition.js*/
/**
	@class represents a piece on the board: color, type and position
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function BoardPiece(color,type,x,y) {
	this.color=new PieceColor(color);
	this.type=new PieceType(type);
	this.position=new PiecePosition(x,y);
}
/**
	Debug method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
BoardPiece.prototype.toString=function() {
	return [this.color,this.type,this.position].join();
};
