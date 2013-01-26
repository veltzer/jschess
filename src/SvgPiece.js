var SvgPiece = Class.create(
	/** @lends SvgPiece# */
{
	/**
		@class A single piece description.
		This includes: rectangle size (assumes piece is 0,0,rect,rect)
		and array of paths and attributes to draw the path
		@description creates a new instance
		@param rect rect size.
		@return a new object of this type
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function(rect) {
		this.rect = rect;
		this.paas = [];
	},
	/**
		@description Adds a new path section to a piece description
		@param paa PathAndAttributes object to be added.
		@return nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	add: function(paa) {
		this.paas.push(paa);
	},
	/**
		@description Create a Raphael.js set from this object
		@param paper Raphael.js paper to work on.
		@param transform Raphael.js transformating for this object.
		@return the set after the transformation
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	toSet: function(paper,transform) {
		var set = paper.set();
		this.paas.forEach(function(paa) {
			var orig_path = paa.path;
			var new_path = Raphael.transformPath(orig_path, transform);
			var el = paper.path(new_path);
			el.attr(paa.attr);
			//el.hide();
			set.push(el);
		});
		return set;
	}
});
