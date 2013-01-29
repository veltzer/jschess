var BoardPiece = Class.create(/** @lends BoardPiece# */{
  /**
    @class represents a piece on the board: color, type The instance also has
    a data field that could be used for private data attached to the piece.
    constructs a new object
    @param {string} color color of this piece (black/white).
    @param {string} type type of this piece
    (rook/knight/bishop/queen/king/pawn).
    @return {BoardPiece} the new object created.
    @constructor
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(color, type) {
    this.color = color;
    this.type = type;
    this.data = undefined;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @return {string} string representation of this object.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return 'BoardPiece: ' + [this.color, this.type, this.data].join();
  },
  /**
    Method to set secret data for this piece
    @param {anything} data the extra data to hold for this piece.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  setData: function(data) {
    this.data = data;
  },
  /**
    Method to get secret data for this piece
    @return {anything} the secret data associated with this piece.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getData: function() {
    return this.data;
  },
  /**
    Method to unset secret data for this piece
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  unsetData: function() {
    this.data = undefined;
  }
});
