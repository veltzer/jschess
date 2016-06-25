/* vim:set filetype=javascript:*/


/**
  @class represents a piece on the board: color, type The instance also has
  a data field that could be used for private data attached to the piece.
  @author ${tdefs.personal_jsdoc_author}
*/
var BoardPiece = Class.create(/** @lends {BoardPiece} */{
  /**
    constructs a new object.
    @this {BoardPiece}
    @param {string} color color of this piece (black/white).
    @param {string} type type of this piece
    (rook/knight/bishop/queen/king/pawn).
    @return {BoardPiece} the new object created.
    @author ${tdefs.personal_jsdoc_author}
  */
  initialize: function(color, type) {
    this.color = color;
    this.type = type;
    this.data = undefined;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {BoardPiece}
    @return {string} string representation of this object.
    @author ${tdefs.personal_jsdoc_author}
  */
  toString: function() {
    return 'BoardPiece: ' + [this.color, this.type, this.data].join();
  },
  /**
    Method to set secret data for this piece
    @this {BoardPiece}
    @param {anything} data the extra data to hold for this piece.
    @author ${tdefs.personal_jsdoc_author}
  */
  setData: function(data) {
    this.data = data;
  },
  /**
    Method to get secret data for this piece
    @this {BoardPiece}
    @return {anything} the secret data associated with this piece.
    @author ${tdefs.personal_jsdoc_author}
  */
  getData: function() {
    return this.data;
  },
  /**
    Method to unset secret data for this piece
    @this {BoardPiece}
    @author ${tdefs.personal_jsdoc_author}
  */
  unsetData: function() {
    this.data = undefined;
  }
});
