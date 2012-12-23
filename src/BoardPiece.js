/*jsl:import PieceColor.js*/
/*jsl:import PieceType.js*/
/*jsl:import PiecePosition.js*/
/**
	@class represents a piece on the board: color, type and position
	The instance also has a data field that could be used for private
	data attached to the piece.
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function BoardPiece(color,type,position) {
	this.color=color;
	this.type=type;
	this.position=position;
	this.data=undefined;
}
/**
	toString method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
BoardPiece.prototype.toString=function() {
	return [this.color,this.type,this.position,this.data].join();
};
/**
	Method to set secret data for this piece
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
BoardPiece.prototype.setData=function(data) {
	this.data=data;
};
/**
	Method to unset secret data for this piece
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
BoardPiece.prototype.unsetData=function() {
	this.data=undefined;
};
