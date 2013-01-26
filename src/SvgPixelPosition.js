var SvgPixelPosition = Class.create(/** @lends SvgPixelPosition# */{
  /**
    @class represents a position on the screen (in pixels)
    creates a new instance
    @param {number} x x co-ordinate.
    @param {number} y y co-ordinate.
    @return {SvgPixelPosition} the new instance.
    @constructor
    @author mark.veltzer@gmail.com (Mark Veltzer)
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
    @return {string} string representation of this object.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return '(' + this.x + ',' + this.y + ')';
  }
});
