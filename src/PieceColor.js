/**
	@class represents a piece color (white,black) 
	@param string - the color of the piece
	@constructs
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
/**
	Return whether the piece is white
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceColor.prototype.isWhite=function() {
	return this.color=='white';
};
/**
	Return whether the piece is black
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceColor.prototype.isBlack=function() {
	return this.color=='black';
};
