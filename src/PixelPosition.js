/**
	A position on the screen (in pixels)
	@class represents a position on the screen
	@param x x co-ordinate
	@param y y co-ordinate
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function PixelPosition(x,y) {
	this.x=x;
	this.y=y;
}
/**
	Debug method so that you can get a nice printout of instances of this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PixelPosition.prototype.toString=function() {
	return '('+this.x+','+this.y+')';
};
