var RUtils=Class.create(
	/** @lends RUtils# */
{
	/**
		@class a class to have static utility functions for Raphael.js
		@description creates a new instance
		@returns a new instance of this class
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function() {
	}
});
/**
	@description Get glow set for a set
	@param paper paper to work on
	@param set set to work on
	@returns the set of glow objects
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
RUtils.setGlow=function(paper,set,glow_obj) {
	var nset=paper.set();
	set.forEach(function(e) {
		nset.push(e.glow(glow_obj));
	},undefined);
	return nset;
};
/**
	@description setup a click callback for a set
	@param set set to work on
	@param f callback. Callback should receive the type of the event
	@param names of events to register. supported are: click, mouseover, mouseout
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
RUtils.eventRegister=function(set,f,names) {
	//console.log(typeof(Raphael));
	//console.log(Raphael);
	//console.log(set);
	names.forEach(function(eventName) {
		set.forEach(function(e) {
			switch(eventName) {
				case 'click':
					e.click(function() {
						f(eventName);
					});
					break;
				case 'mouseover':
					e.mouseover(function() {
						f(eventName);
					});
					break;
				case 'mouseout':
					e.mouseout(function() {
						f(eventName);
					});
					break;
				case 'mousemove':
					e.mousemove(function() {
						f(eventName);
					});
					break;
				default:
					throw 'unknown event name '+eventName;
			}
		});
	});
};
/**
	@lends Set#
*/
/*
Set.prototype.eventRegister=function(f,names) {
	RUtils.eventRegister(this,f,names);
};
*/
