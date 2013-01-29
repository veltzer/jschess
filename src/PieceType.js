var PieceType = Class.create(/** @lends PieceType# */{
  /**
    @class represents a piece type (rook,knight,bishop,queen,king,pawn)
    creates a new instance
    @param {string} type the type of the piece.
    @return {PieceType} the new instance.
    @constructor
    @author mark.veltzer@gmail.com (Mark Veltzer)
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
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return this.type;
  },
  /**
    Return whether the piece is a rook
    @return {boolean} is this piece a rook.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isRook: function() {
    return this.type == 'rook';
  },
  /**
    Return whether the piece is a knight
    @return {boolean} is this piece a knight.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isKnight: function() {
    return this.type == 'knight';
  },
  /**
    Return whether the piece is a bishop
    @return {boolean} is this piece a bishop.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isBishop: function() {
    return this.type == 'bishop';
  },
  /**
    Return whether the piece is a queen
    @return {boolean} is this piece a queen.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isQueen: function() {
    return this.type == 'queen';
  },
  /**
    Return whether the piece is a king
    @return {boolean} is this piece a king.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isKing: function() {
    return this.type == 'king';
  },
  /**
    Return whether the piece is a pawn
    @return {boolean} is this piece a pawn.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isPawn: function() {
    return this.type == 'pawn';
  }
});


/**
  Array of piece types
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
PieceType.types = {
  rook: undefined,
  knight: undefined,
  bishop: undefined,
  queen: undefined,
  king: undefined,
  pawn: undefined
};
