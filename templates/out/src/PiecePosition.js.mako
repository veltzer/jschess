<%!
	import user.personal
%>/* vim:set filetype=javascript:*/
/*jsl:import Utils.js*/
/*global Class, Utils */


/**
  @class represents a position on the board
  @author ${user.personal.jsdoc_author}
*/
var PiecePosition = Class.create(/** @lends PiecePosition.prototype */{
  /**
    creates a new instance
    @this {PiecePosition}
    @param {number} x x co-ordinate.
    @param {number} y y co-ordinate.
    @return {PiecePosition} the new instance of this class.
    The method checks if the values given to it are in the 0..7 range.
    @author ${user.personal.jsdoc_author}
  */
  initialize: function(x, y) {
    Utils.checkType(x, 'number');
    Utils.checkType(y, 'number');
    if (x < 0 || x > 7) {
      throw 'bad value for x ' + x + ',' + typeof x;
    }
    if (y < 0 || y > 7) {
      throw 'bad value for y ' + y + ',' + typeof y;
    }
    this.x = x;
    this.y = y;
  },
  /**
    toString method so that you can get a nice printout of
    instances of this type
    @this {PiecePosition}
    @return {string} the string representation of this instance.
    @author ${user.personal.jsdoc_author}
  */
  toString: function() {
    return 'PiecePosition: (' + this.x + ',' + this.y + ')';
  },
  /**
    compare one position to another
    @this {PiecePosition}
    @param {PiecePosition} otherPos the position to compare to
    @return {boolean} is this position to some other position.
    @author ${user.personal.jsdoc_author}
  */
  notEqual: function(otherPos) {
    if (!(otherPos instanceof PiecePosition)) {
      throw 'bad type passed';
    }
    return otherPos.x !== this.x || otherPos.y !== this.y;
  },
  /**
    compare one position to another
    @this {PiecePosition}
    @param {PiecePosition} otherPos the position to compare to
    @return {boolean} is this position to some other position.
    @author ${user.personal.jsdoc_author}
  */
  equal: function(otherPos) {
    if (!(otherPos instanceof PiecePosition)) {
      throw 'bad type passed';
    }
    return otherPos.x === this.x && otherPos.y === this.y;
  }
});
