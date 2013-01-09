var WRaphael=Class.create(
	/** @lends WRaphael# */
{
	/**
		@class Paper wrapper for Raphael.js
		@description creates a new instance
		@param id id to be used as constructing paper
		@param sizex size in x
		@param sizey size in y
		@returns a new instance of this class
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function() {
		this.r=Raphael.apply(undefined,arguments);
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	rect: function() {
		var m=this.r.rect;
		var r=m.apply(this.r,arguments);
		return r;
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	set: function() {
		var m=this.r.set;
		var r=m.apply(this.r,arguments);
		return r;
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	path: function() {
		var m=this.r.path;
		var r=m.apply(this.r,arguments);
		return r;
	},
	text: function() {
		var m=this.r.text;
		var r=m.apply(this.r,arguments);
		return r;
	}
});
