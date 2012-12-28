/**
	A single piece description.
	This includes: rectangle size (assumes piece is 0,0,rect,rect)
	and array of paths and attributes to draw the path
	@class A single piece description.
	@param rect rect size
	@returns a new object of this type
	@constructs
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function SvgPiece(rect) {
	this.rect=rect;
	this.paas=[];
}
/**
	Adds a new path section to a piece description
	@param paa PathAndAttributes object to be added
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgPiece.prototype.add=function(paa) {
	this.paas.push(paa);
};
/**
	Create a Raphael.js set from this object
	@param paper Raphael.js paper to work on
	@param transform Raphael.js transformating for this object
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgPiece.prototype.toSet=function(paper,transform) {
	var set=paper.set();
	for(var x in this.paas) {
		var paa=this.paas[x];
		var orig_path=paa.path;
		var new_path=Raphael.transformPath(orig_path,transform);
		var el=paper.path(new_path);
		el.attr(paa.attr);
		//el.hide();
		set.push(el);
	}
	return set;
};
