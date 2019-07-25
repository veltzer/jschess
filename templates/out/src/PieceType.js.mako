<%!
	import config.personal
%>/* vim:set filetype=javascript:*/
/*global Class*/


/**
  @class represents a piece type (rook,knight,bishop,queen,king,pawn)
  @author ${config.personal.personal_jsdoc_author}
*/
var PieceType = Class.create(/** @lends PieceType.prototype */{
  /**
    creates a new instance
    @this {PieceType}
    @param {string} type the type of the piece.
    @return {PieceType} the new instance.
    @author ${config.personal.personal_jsdoc_author}
  */
  initialize: function(type) {
    if (!(PieceType.types.hasOwnProperty(type))) {
      throw 'illegal piecetype ' + type;
    }
    this.type = type;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {PieceType}
    @return {string} string representation of this instance.
    @author ${config.personal.personal_jsdoc_author}
  */
  toString: function() {
    return this.type;
  },
  /**
    Return whether the piece is a rook
    @this {PieceType}
    @return {boolean} is this piece a rook.
    @author ${config.personal.personal_jsdoc_author}
  */
  isRook: function() {
    return this.type === 'rook';
  },
  /**
    Return whether the piece is a knight
    @this {PieceType}
    @return {boolean} is this piece a knight.
    @author ${config.personal.personal_jsdoc_author}
  */
  isKnight: function() {
    return this.type === 'knight';
  },
  /**
    Return whether the piece is a bishop
    @this {PieceType}
    @return {boolean} is this piece a bishop.
    @author ${config.personal.personal_jsdoc_author}
  */
  isBishop: function() {
    return this.type === 'bishop';
  },
  /**
    Return whether the piece is a queen
    @this {PieceType}
    @return {boolean} is this piece a queen.
    @author ${config.personal.personal_jsdoc_author}
  */
  isQueen: function() {
    return this.type === 'queen';
  },
  /**
    Return whether the piece is a king
    @this {PieceType}
    @return {boolean} is this piece a king.
    @author ${config.personal.personal_jsdoc_author}
  */
  isKing: function() {
    return this.type === 'king';
  },
  /**
    Return whether the piece is a pawn
    @this {PieceType}
    @return {boolean} is this piece a pawn.
    @author ${config.personal.personal_jsdoc_author}
  */
  isPawn: function() {
    return this.type === 'pawn';
  }
});


/**
  Array of piece types
  @author ${config.personal.personal_jsdoc_author}
*/
PieceType.types = {
  rook: undefined,
  knight: undefined,
  bishop: undefined,
  queen: undefined,
  king: undefined,
  pawn: undefined
};
