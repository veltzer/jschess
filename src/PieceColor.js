/**
	@class represents a piece color (white,black) 
	@description creates a new instance
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
	@description toString method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceColor.prototype.toString=function() {
	return this.color;
};
/**
	@description Array of piece colors
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceColor.colors={
	white:undefined,
	black:undefined
};
/**
	@description Return whether the piece is white
	@returns boolean indicating whether the piece is white
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceColor.prototype.isWhite=function() {
	return this.color=='white';
};
/**
	@description Return whether the piece is black
	@returns boolean indicating whether the piece is black
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PieceColor.prototype.isBlack=function() {
	return this.color=='black';
};
