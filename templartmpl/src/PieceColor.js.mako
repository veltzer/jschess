

/**
  @class represents a piece color (white,black)
  @author ${attr.personal_jsdoc_author}
*/
var PieceColor = Class.create(/** @lends PieceColor# */{
  /**
    creates a new instance
    @param {string} color string which represents
    the color of the piece. Must be one of 'white' or 'black'.
    @return {PieceColor} new instance of this class.
    @author ${attr.personal_jsdoc_author}
  */
  initialize: function(color) {
    if (!(color in PieceColor.colors)) {
      throw 'illegal piecetype ' + color;
    }
    this.color = color;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @return {string} string representation of this instance.
    @author ${attr.personal_jsdoc_author}
  */
  toString: function() {
    return this.color;
  },
  /**
    Return whether the piece is white
    @return {boolean} boolean indicating whether the piece is white.
    @author ${attr.personal_jsdoc_author}
  */
  isWhite: function() {
    return this.color == 'white';
  },
  /**
    Return whether the piece is black
    @return {boolean} boolean indicating whether the piece is black.
    @author ${attr.personal_jsdoc_author}
  */
  isBlack: function() {
    return this.color == 'black';
  }
});


/**
  Array of piece colors
  @author ${attr.personal_jsdoc_author}
*/
PieceColor.colors = {
  white: undefined,
  black: undefined
};
