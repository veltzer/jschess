/**
	A single piece description.
	This includes: rectangle size (assumes piece is 0,0,rect,rect)
	and array of paths and attributes to draw the path
	@class A single piece description.
	@param rect rect size
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function SvgPiece(rect) {
	this.rect=rect;
	this.paas=[];
}
/**
	Adds a new path section to a piece description
	@param paa PathAndAttributes object to be added
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgPiece.prototype.add=function(paa) {
	this.paas.push(paa);
};
