

/**
  @class a path + attributes two tuple object
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var SvgPathAndAttributes = Class.create(/** @lends SvgPathAndAttributes# */{
  /**
    creates a new instance
    @param {string} path string representing SVG path.
    @param {object} attr object with attributes for said path.
    @return {SvgPathAndAttributes} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(path, attr) {
    this.path = path;
    this.attr = attr;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @return {string} string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return [this.path, this.attr].join();
  }
});
