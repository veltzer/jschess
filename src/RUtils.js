/**
	@class a class to have static utility functions for Raphael.js
	@description creates a new instance
	@returns a new instance of this class
	@constructs
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function RUtils() {
}
/**
	@description Get glow set for a set
	@param paper paper to work on
	@param set set to work on
	@returns object which is the unification of the two objects
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
RUtils.setGlow=function(paper,set) {
	var nset=paper.set();
	set.forEach(function(e) {
		nset.push(e.glow());
	},undefined);
	return nset;
};
/**
	@description setup a click callback for a set
	@param set set to work on
	@param f callback
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
RUtils.click=function(set,f) {
	set.forEach(function(e) {
		e.click(f);
	});
};
/**
	@description setup a mouseover callback for a set
	@param set set to work on
	@param f callback
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
RUtils.mouseover=function(set,f) {
	set.forEach(function(e) {
		e.mouseover(f);
	});
};
/**
	@description setup a mouseout callback for a set
	@param set set to work on
	@param f callback
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
RUtils.mouseout=function(set,f) {
	set.forEach(function(e) {
		e.mouseout(f);
	});
};
