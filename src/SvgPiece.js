var SvgPiece = Class.create(/** @lends SvgPiece# */{
  /**
    @class A single piece description.
    This includes: square size (assumes piece is 0,0,size,size)
    and array of paths and attributes to draw the path
    creates a new instance
    @param {number} size of the square of the piece.
    @return {SvgPiece} a new object of this type.
    @constructor
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(size) {
    this.size = size;
    this.paas = [];
  },
  /**
    Adds a new path section to a piece description
    @param {PathAndAttributes} paa object to be added.
    @return {nothing} nothing.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  add: function(paa) {
    this.paas.push(paa);
  },
  /**
    Create a Raphael.js set from this object
    @param {paper} paper Raphael.js paper to work on.
    @param {transform} transform Raphael.js transformating for this object.
    @return {set} the set after the transformation.
    @author mark.veltzer@gmail.com (Mark Veltzer)
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
