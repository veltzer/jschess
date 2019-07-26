<%!
	import user.personal
%>/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class represents a piece color (white,black)
  @author ${user.personal.personal_jsdoc_author}
*/
var PieceColor = Class.create(/** @lends PieceColor.prototype */{
  /**
    creates a new instance
    @this {PieceColor}
    @param {string} color string which represents
    the color of the piece. Must be one of 'white' or 'black'.
    @return {PieceColor} new instance of this class.
    @author ${user.personal.personal_jsdoc_author}
  */
  initialize: function(color) {
    if (!(PieceColor.colors.hasOwnProperty(color))) {
      throw 'illegal piecetype ' + color;
    }
    this.color = color;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {PieceColor}
    @return {string} string representation of this instance.
    @author ${user.personal.personal_jsdoc_author}
  */
  toString: function() {
    return this.color;
  },
  /**
    Return whether the piece is white
    @this {PieceColor}
    @return {boolean} boolean indicating whether the piece is white.
    @author ${user.personal.personal_jsdoc_author}
  */
  isWhite: function() {
    return this.color === 'white';
  },
  /**
    Return whether the piece is black
    @this {PieceColor}
    @return {boolean} boolean indicating whether the piece is black.
    @author ${user.personal.personal_jsdoc_author}
  */
  isBlack: function() {
    return this.color === 'black';
  }
});


/**
  Array of piece colors
  @author ${user.personal.personal_jsdoc_author}
*/
PieceColor.colors = {
  white: undefined,
  black: undefined
};
