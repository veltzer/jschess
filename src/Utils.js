var Utils=Class.create(
	/** @lends Utils# */
{
	/**
		@class a class to have static utility functions
		@description creates a new instance
		@returns the new instance 
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function() {
	}
});
/**
 	@description Unite two javascript objects into a third one.
	Second trumps the first.
	@param o1 first object
	@param o2 first object
	@returns object which is the unification of the two objects
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Utils.unite=function(o1,o2) {
	var ret={};
	for(var x in o1) {
		ret[x]=o1[x];
	}
	for(var y in o2) {
		ret[y]=o2[y];
	}
	return ret;
};
/**
	@description Clone a javascript object
	@param o the object to shalow clone
	@returns object which is a clone of the original one
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Utils.clone=function(o) {
	var ret={};
	for(var x in o) {
		ret[x]=o[x];
	}
	return ret;
};
/**
	@description Fake using a parameter.
	This is mainly used to avoid lint warnings.
	@param o the object to use
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Utils.fakeUse=function(o) {
	if(Utils.nottrue) {
		console.log(o);
	}
};
/**
	@description Fake doing something
	This is mainly used to avoid lint warnings.
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Utils.pass=function() {
};
