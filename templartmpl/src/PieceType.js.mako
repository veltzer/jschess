/* vim:set filetype=javascript:*/


/**
  @class represents a piece type (rook,knight,bishop,queen,king,pawn)
  @author ${tdefs.personal_jsdoc_author}
*/
var PieceType = Class.create(/** @lends PieceType# */{
  /**
    creates a new instance
    @param {string} type the type of the piece.
    @return {PieceType} the new instance.
    @author ${tdefs.personal_jsdoc_author}
  */
  initialize: function(type) {
    if (!(type in PieceType.types)) {
      throw 'illegal piecetype ' + type;
    }
    this.type = type;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @return {string} string representation of this instance.
    @author ${tdefs.personal_jsdoc_author}
  */
  toString: function() {
    return this.type;
  },
  /**
    Return whether the piece is a rook
    @return {boolean} is this piece a rook.
    @author ${tdefs.personal_jsdoc_author}
  */
  isRook: function() {
    return this.type == 'rook';
  },
  /**
    Return whether the piece is a knight
    @return {boolean} is this piece a knight.
    @author ${tdefs.personal_jsdoc_author}
  */
  isKnight: function() {
    return this.type == 'knight';
  },
  /**
    Return whether the piece is a bishop
    @return {boolean} is this piece a bishop.
    @author ${tdefs.personal_jsdoc_author}
  */
  isBishop: function() {
    return this.type == 'bishop';
  },
  /**
    Return whether the piece is a queen
    @return {boolean} is this piece a queen.
    @author ${tdefs.personal_jsdoc_author}
  */
  isQueen: function() {
    return this.type == 'queen';
  },
  /**
    Return whether the piece is a king
    @return {boolean} is this piece a king.
    @author ${tdefs.personal_jsdoc_author}
  */
  isKing: function() {
    return this.type == 'king';
  },
  /**
    Return whether the piece is a pawn
    @return {boolean} is this piece a pawn.
    @author ${tdefs.personal_jsdoc_author}
  */
  isPawn: function() {
    return this.type == 'pawn';
  }
});


/**
  Array of piece types
  @author ${tdefs.personal_jsdoc_author}
*/
PieceType.types = {
  rook: undefined,
  knight: undefined,
  bishop: undefined,
  queen: undefined,
  king: undefined,
  pawn: undefined
};
