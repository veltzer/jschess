/**
	@class represents a position + graphics
	@param set raphael set for the piece
	@param pixelPos position for the pieces origin. This is important to be able to move it to other places 
	pixelPos is not the translation of pos to pixels!!!
	@param boardSvgPieceData details of the board piece (color, type, position)
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function SvgPieceData(set,pixelPos) {
	this.set=set;
	this.pixelPos=pixelPos;
	this.extra=undefined;
}
/**
	Debug method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgPieceData.prototype.toString=function() {
	return [this.set,this.pixelPos,this.extra].join();
};
/**
	ForEach method on all presentation elements
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgPieceData.prototype.forEach=function(f) {
	//var that=this;
	this.set.forEach(function(el) {
		f(el);
	});
	if(this.extra!==undefined) {
		this.extra.forEach(function(el) {
			f(el);
		});
	}
};
