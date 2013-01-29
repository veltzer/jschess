var SvgPieceData = Class.create(/** @lends SvgPieceData# */{
  /**
    @class represents a position + graphics
    creates a new instance
    @param {set} set raphael set for the piece.
    @param {SvgPixelPosition} pixelPos position for the pieces origin.
    This is important to be able to move it to other places
    pixelPos is not the translation of pos to pixels!!!
    @constructor
    @return {SvgPieceData} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(set, pixelPos) {
    this.set = set;
    this.pixelPos = pixelPos;
    this.extra = undefined;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @return {string} a string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return [this.set, this.pixelPos, this.extra].join();
  },
  /**
    ForEach method on all presentation elements
    @param {function} f function to activate on each element.
    @author mark.veltzer@gmail.com (Mark Veltzer)
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
