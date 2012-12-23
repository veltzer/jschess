/**
	This is a path (string) + attributes two tuple object
	@class represents a path + attributes
	@param path string representing SVG path
	@param attr object with attributes for said path
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function SvgPathAndAttributes(path,attr) {
	this.path=path;
	this.attr=attr;
}
/**
	Debug method that allows you to get a nice printout for this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgPathAndAttributes.prototype.toString=function() {
	return [this.path,this.attr].join();
};
