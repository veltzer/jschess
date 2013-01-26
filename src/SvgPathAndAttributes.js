var SvgPathAndAttributes = Class.create(
	/** @lends SvgPathAndAttributes# */
{
	/**
		@class a path + attributes two tuple object
		creates a new instance
		@param path string representing SVG path.
		@param attr object with attributes for said path.
		@constructor
		@return the new instance
		@author mark.veltzer@gmail.com (Mark Veltzer)
	*/
	initialize: function(path,attr) {
		this.path = path;
		this.attr = attr;
	},
	/**
		toString method that allows you to get a nice printout for this type
		@return string representation of this instance
		@author mark.veltzer@gmail.com (Mark Veltzer)
	*/
	toString: function() {
		return [this.path, this.attr].join();
	}
});
