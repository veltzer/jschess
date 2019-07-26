<%!
	import user.personal
%>/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class represents a position on the screen (in pixels)
  @author ${user.personal.personal_jsdoc_author}
*/
var SvgPixelPosition = Class.create(/** @lends SvgPixelPosition.prototype */{
  /**
    creates a new instance
    @this {SvgPixelPosition}
    @param {number} x x co-ordinate.
    @param {number} y y co-ordinate.
    @return {SvgPixelPosition} the new instance.
    @author ${user.personal.personal_jsdoc_author}
  */
  initialize: function(x, y) {
    /*
    if(x<0) {
      throw 'bad value for x '+x+','+typeof(x);
    }
    if(y<0) {
      throw 'bad value for y '+y+','+typeof(y);
    }
    */
    this.x = x;
    this.y = y;
  },
  /**
    toString method so that you can get a nice printout of instances
    of this type
    @this {SvgPixelPosition}
    @return {string} string representation of this object.
    @author ${user.personal.personal_jsdoc_author}
  */
  toString: function() {
    return '(' + this.x + ',' + this.y + ')';
  }
});
