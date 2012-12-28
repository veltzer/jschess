/**
	@class a path + attributes two tuple object
	@description creates a new instance
	@param path string representing SVG path
	@param attr object with attributes for said path
	@constructs
	@returns the new instance
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function SvgPathAndAttributes(path,attr) {
	this.path=path;
	this.attr=attr;
}
/**
	@description toString method that allows you to get a nice printout for this type
	@returns string representation of this instance
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgPathAndAttributes.prototype.toString=function() {
	return [this.path,this.attr].join();
};
