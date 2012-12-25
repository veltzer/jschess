/*jsl:import Utils.js*/
/**
	@class a class to have static utility functions for Raphael.js
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function RUtils() {
}
/**
	Get glow set for a set
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
RUtils.click=function(set,f) {
	set.forEach(function(e) {
		Utils.fakeUse(e);
		f();
	});
};
