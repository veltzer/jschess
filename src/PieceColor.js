/**
	@class represents a piece color (white,black) 
	@param string - the color of the piece
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function PieceColor(color) {
	if(!(color in PieceColor.colors)) {
		throw 'illegal piecetype '+color;
	}
	this.color=color;
}
/**
	Debug method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceColor.prototype.toString=function() {
	return this.color;
};
/**
	Array of piece colors
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceColor.colors={
	white:undefined,
	black:undefined
};
