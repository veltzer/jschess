<%!
	import config.personal
%>/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class a path + attributes two tuple object
  @author ${config.personal.jsdoc_author}
*/
var SvgPathAndAttributes = Class.create(/** @lends SvgPathAndAttributes.prototype */{
  /**
    creates a new instance
    @this {SvgPathAndAttributes}
    @param {string} path string representing SVG path.
    @param {object} attr object with attributes for said path.
    @return {SvgPathAndAttributes} the new instance.
    @author ${config.personal.jsdoc_author}
  */
  initialize: function(path, attr) {
    this.path = path;
    this.attr = attr;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {SvgPathAndAttributes}
    @return {string} string representation of this instance.
    @author ${config.personal.jsdoc_author}
  */
  toString: function() {
    return [this.path, this.attr].join();
  }
});
