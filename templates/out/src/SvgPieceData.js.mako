<%!
	import user.personal
%>/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class represents a position + graphics
  @author ${user.personal.personal_jsdoc_author}
*/
var SvgPieceData = Class.create(/** @lends SvgPieceData.prototype */{
  /**
    creates a new instance
    @this {SvgPieceData}
    @param {set} set raphael set for the piece.
    @param {SvgPixelPosition} pixelPos position for the pieces origin.
    This is important to be able to move it to other places
    pixelPos is not the translation of pos to pixels!!!
    @return {SvgPieceData} the new instance.
    @author ${user.personal.personal_jsdoc_author}
  */
  initialize: function(set, pixelPos) {
    this.set = set;
    this.pixelPos = pixelPos;
    this.extra = undefined;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {SvgPieceData}
    @return {string} a string representation of this instance.
    @author ${user.personal.personal_jsdoc_author}
  */
  toString: function() {
    return [this.set, this.pixelPos, this.extra].join();
  },
  /**
    ForEach method on all presentation elements
    @this {SvgPieceData}
    @param {function()} f function to activate on each element.
    @author ${user.personal.personal_jsdoc_author}
  */
  forEach: function(f) {
    //var that=this;
    this.set.forEach(function(el) {
      f(el);
    });
    if (this.extra !== undefined) {
      this.extra.forEach(function(el) {
        f(el);
      });
    }
  }
});
