/**
	@class represents a position on the board
	@description creates a new instance
	@param x x co-ordinate
	@param y y co-ordinate
	@returns the new instance of this class
	The method checks if the values given to it are in the 0..7 range.
	@constructs
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
	@descrition toString method so that you can get a nice printout of instances of this type
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PiecePosition.prototype.toString=function() {
	return 'PiecePosition: ('+this.x+','+this.y+')';
};
