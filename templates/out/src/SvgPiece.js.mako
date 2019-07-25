<%!
	import config.personal
%>/* vim:set filetype=javascript:*/
/*global Class, Raphael */


/**
  @class A single piece description.
  This includes: square size (assumes piece is 0,0,size,size)
  and array of paths and attributes to draw the path
  @author ${config.personal.personal_jsdoc_author}
*/
var SvgPiece = Class.create(/** @lends SvgPiece.prototype */{
  /**
    creates a new instance
    @this {SvgPiece}
    @param {number} size of the square of the piece.
    @return {SvgPiece} a new object of this type.
    @author ${config.personal.personal_jsdoc_author}
  */
  initialize: function(size) {
    this.size = size;
    this.paas = [];
  },
  /**
    Adds a new path section to a piece description
    @this {SvgPiece}
    @param {PathAndAttributes} paa object to be added.
    @author ${config.personal.personal_jsdoc_author}
  */
  add: function(paa) {
    this.paas.push(paa);
  },
  /**
    Create a Raphael.js set from this object
    @this {SvgPiece}
    @param {paper} paper Raphael.js paper to work on.
    @param {transform} transform Raphael.js transformating for this object.
    @return {set} the set after the transformation.
    @author ${config.personal.personal_jsdoc_author}
  */
  toSet: function(paper, transform) {
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
