/*jsl:import Utils.js*/


/**
  @class represents a position on the board
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var PiecePosition = Class.create(/** @lends PiecePosition# */{
  /**
    creates a new instance
    @param {number} x x co-ordinate.
    @param {number} y y co-ordinate.
    @return {PiecePosition} the new instance of this class.
    The method checks if the values given to it are in the 0..7 range.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(x, y) {
    Utils.checkType(x, 'number');
    Utils.checkType(y, 'number');
    if (x < 0 || x > 7) {
      throw 'bad value for x ' + x + ',' + typeof(x);
    }
    if (y < 0 || y > 7) {
      throw 'bad value for y ' + y + ',' + typeof(y);
    }
    this.x = x;
    this.y = y;
  },
  /**
    toString method so that you can get a nice printout of
    instances of this type
    @return {string} the string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return 'PiecePosition: (' + this.x + ',' + this.y + ')';
  },
  /**
    compare one position to another
    @return {boolean} is this position to some other position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  notEqual: function(otherPos) {
    if (!(otherPos instanceof PiecePosition)) {
      throw 'bad type passed';
    }
    return otherPos.x != this.x || otherPos.y != this.y;
  },
  /**
    compare one position to another
    @return {boolean} is this position to some other position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  equal: function(otherPos) {
    if (!(otherPos instanceof PiecePosition)) {
      throw 'bad type passed';
    }
    return otherPos.x == this.x && otherPos.y == this.y;
  }
});
