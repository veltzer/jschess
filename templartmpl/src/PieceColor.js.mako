/* vim:set filetype=javascript:*/


/**
  @class represents a piece color (white,black)
  @author ${tdefs.personal_jsdoc_author}
*/
var PieceColor = Class.create(/** @lends PieceColor.prototype */{
  /**
    creates a new instance
    @this {PieceColor}
    @param {string} color string which represents
    the color of the piece. Must be one of 'white' or 'black'.
    @return {PieceColor} new instance of this class.
    @author ${tdefs.personal_jsdoc_author}
  */
  initialize: function(color) {
    if (!(color in PieceColor.colors)) {
      throw 'illegal piecetype ' + color;
    }
    this.color = color;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {PieceColor}
    @return {string} string representation of this instance.
    @author ${tdefs.personal_jsdoc_author}
  */
  toString: function() {
    return this.color;
  },
  /**
    Return whether the piece is white
    @this {PieceColor}
    @return {boolean} boolean indicating whether the piece is white.
    @author ${tdefs.personal_jsdoc_author}
  */
  isWhite: function() {
    return this.color == 'white';
  },
  /**
    Return whether the piece is black
    @this {PieceColor}
    @return {boolean} boolean indicating whether the piece is black.
    @author ${tdefs.personal_jsdoc_author}
  */
  isBlack: function() {
    return this.color == 'black';
  }
});


/**
  Array of piece colors
  @author ${tdefs.personal_jsdoc_author}
*/
PieceColor.colors = {
  white: undefined,
  black: undefined
};
