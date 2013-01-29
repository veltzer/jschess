/*jsl:import Utils.js*/
var PgnReader = Class.create(/** @lends PgnReader# */{
  /**
    @class A PGN reader. A class that knows how to read a PGN file and give
    instructions to a board.
    creates a new instance
    @return {PgnReader} the new instance.
    @constructor
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
  },
  /**
    toString method so that you can get a nice printout of instances of
    this type
    @return {string} string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    throw 'this is not implemented yet';
  },
  /**
    A method to read a pgn file via ajax.
    @param {string} url url to do the GET from (same server).
    @param {function} func a function to be called once the game is parsed.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  get: function(url, func) {
    Utils.fakeUse(url, func);
    // use prototype to do HTTP GET
  }
});
