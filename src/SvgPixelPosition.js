/**
	A position on the screen (in pixels)
	@class represents a position on the screen
	@param x x co-ordinate
	@param y y co-ordinate
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function SvgPixelPosition(x,y) {
	if(x<0) {
		throw 'bad value for x '+x+','+typeof(x);
	}
	if(y<0) {
		throw 'bad value for y '+y+','+typeof(y);
	}
	this.x=x;
	this.y=y;
}
/**
	Debug method so that you can get a nice printout of instances of this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgPixelPosition.prototype.toString=function() {
	return '('+this.x+','+this.y+')';
};
