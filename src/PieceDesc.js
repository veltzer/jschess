/**
	A single piece description.
	This includes: rectangle size (assumes piece is 0,0,rect,rect)
	paths and attributes to draw the path
	@class A single piece description.
	@constructor
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	@param rect rect size
*/
function PieceDesc(rect) {
	this.rect=rect
	this.paas=[]
}
PieceDesc.prototype.add=function(paa) {
	this.paas.push(paa)
}
