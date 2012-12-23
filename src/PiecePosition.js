/**
	Create a position object
	@class represents a position on the board
	@param x x co-ordinate
	@param y y co-ordinate
	The method checks if the values given to it are in the 0..7 range.
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function PiecePosition(x,y) {
	if(x<0 || x>7) {
		throw 'bad value for x '+x+','+typeof(x);
	}
	if(y<0 || y>7) {
		throw 'bad value for y '+y+','+typeof(y);
	}
	this.x=x;
	this.y=y;
}
/**
	Debug method so that you can get a nice printout of instances of this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PiecePosition.prototype.toString=function() {
	return 'PiecePosition: ('+this.x+','+this.y+')';
};