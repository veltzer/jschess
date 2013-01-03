var RPaper=Class.create(
	/** @lends RPaper# */
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
	initialize: function(id,sizex,sizey) {
		this.r=Raphael(id,sizex,sizey);
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	rect: function(arguments) {
		return this.r.rect(arguments);
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	set: function() {
		return this.r.set(arguments);
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	path: function() {
		return this.r.path(arguments);
	}
});
