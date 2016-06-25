/* vim:set filetype=javascript:*/
/*jsl:import BoardPiece.js*/
/*jsl:import BoardPosition.js*/
/*jsl:import PieceColor.js*/
/*jsl:import PieceType.js*/
/*jsl:import PiecePosition.js*/


/**
  @class Represents a full board This is the main class to interact with.
  Using this class you can: 1. Use pieces: put, remove and move them.
  2. Do something with all pieces.
  @author ${tdefs.personal_jsdoc_author}
*/
var Board = Class.create(/** @lends {Board} */{
  /**
    creates a new instance
    @this {Board}
    @return {Board} the new object created.
    @author ${tdefs.personal_jsdoc_author}
  */
  initialize: function() {
    // create 8x8 undefined squares
    this.bd = [];
    for (var i = 0; i < 8; i++) {
      var ar = [];
      for (var j = 0; j < 8; j++) {
        ar.push(undefined);
      }
      this.bd.push(ar);
    }
    this.pieces = [];
    // callbacks
    this.preAddCB = [];
    this.postAddCB = [];
    this.preRemoveCB = [];
    this.postRemoveCB = [];
    this.preMoveCB = [];
    this.postMoveCB = [];
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {Board}
    @return {string} string representation of this object.
    @author ${tdefs.personal_jsdoc_author}
  */
  toString: function() {
    var str = '';
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        str += this.bd[i][j];
      }
      str += '\n';
    }
    return str;
  },
  /**
    Check that no piece is at a certain position.
    Will throw an exception if that is not the case.
    @this {Board}
    @param {PiecePosition} piecePosition position to check that no piece is at.
    @author ${tdefs.personal_jsdoc_author}
  */
  checkNoPieceAt: function(piecePosition) {
    if (this.bd[piecePosition.x][piecePosition.y] !== undefined) {
      throw 'already have piece at position ' + piecePosition.toString();
    }
  },
  /**
    Check that piece is at a certain position.
    Will throw an exception if that is not the case.
    @this {Board}
    @param {PiecePosition} piecePosition position to check that a piece is at.
    @author ${tdefs.personal_jsdoc_author}
  */
  checkPieceAt: function(piecePosition) {
    if (this.bd[piecePosition.x][piecePosition.y] === undefined) {
      throw 'dont have piece at position ' + piecePosition.toString();
    }
  },
  /**
    Check that a certain piece is at a certain position.
    Will throw an exception if that is not the case.
    @this {Board}
    @param {BoardPiece} boardPiece the piece in question.
    @param {PiecePosition} piecePosition position to check that a piece is at.
    @author ${tdefs.personal_jsdoc_author}
  */
  checkBoardPieceAt: function(boardPiece, piecePosition) {
    if (this.bd[piecePosition.x][piecePosition.y] !== boardPiece) {
      throw 'wrong piece at position ' + piecePosition.toString();
    }
  },
  /**
    Add a piece to the position
    @this {Board}
    @param {BoardPiece} boardPiece piece to add.
    @param {PiecePosition} piecePosition where to add the piece.
    @author ${tdefs.personal_jsdoc_author}
  */
  addPiece: function(boardPiece, piecePosition) {
    this.preAddCB.forEach(function(f) {
      f(boardPiece, piecePosition);
    });
    this.checkNoPieceAt(piecePosition);
    this.bd[piecePosition.x][piecePosition.y] = boardPiece;
    this.postAddCB.forEach(function(f) {
      f(boardPiece, piecePosition);
    });
  },
  /**
    Remove a piece
    @this {Board}
    @param {BoardPiece} boardPiece piece to remove.
    @param {PiecePosition} piecePosition the position to remove it from.
    @author ${tdefs.personal_jsdoc_author}
  */
  removePiece: function(boardPiece, piecePosition) {
    this.checkBoardPieceAt(boardPiece, piecePosition);
    this.preRemoveCB.forEach(function(f) {
      f(boardPiece, piecePosition);
    });
    this.bd[piecePosition.x][piecePosition.y] = undefined;
    this.postRemoveCB.forEach(function(f) {
      f(boardPiece, piecePosition);
    });
  },
  /**
    Move a piece
    @this {Board}
    @param {BoardPiece} boardPiece piece to move.
    @param {PiecePosition} fromPiecePosition from where to move the piece.
    @param {PiecePosition} toPiecePosition to where to move the piece.
    @author ${tdefs.personal_jsdoc_author}
  */
  movePiece: function(boardPiece, fromPiecePosition, toPiecePosition) {
    this.checkPieceAt(fromPiecePosition);
    this.checkNoPieceAt(toPiecePosition);
    this.preMoveCB.forEach(function(f) {
      f(boardPiece, fromPiecePosition, toPiecePosition);
    });
    this.bd[fromPiecePosition.x][fromPiecePosition.y] = undefined;
    this.bd[toPiecePosition.x][toPiecePosition.y] = boardPiece;
    this.postMoveCB.forEach(function(f) {
      f(boardPiece, fromPiecePosition, toPiecePosition);
    });
  },
  /**
    Clear the board
    @this {Board}
    @author ${tdefs.personal_jsdoc_author}
  */
  clearPieces: function() {
    var that = this;
    this.forEachPiece(function(boardPiece, piecePosition) {
      that.removePiece(boardPiece, piecePosition); });
  },
  /**
    Add a piece to the position (seperate pieces of data).
    @this {Board}
    @param {string} color color of the piece (black/white).
    @param {string} type type of the piece (rook/knight/bishop/queen/king/pawn).
    @param {number} x x location of the piece [0..8).
    @param {number} y y location of the piece [0..8).
    @author ${tdefs.personal_jsdoc_author}
  */
  addPieceVals: function(color, type , x, y) {
    var boardPiece = new BoardPiece(
        new PieceColor(color),
        new PieceType(type));
    this.addPiece(boardPiece, new PiecePosition(x, y));
  },
  /**
    Run a function for each piece in this position
    @this {Board}
    @param {function()} f function to be called back for each piece.
    This function should receive the piece to work on.
    @author ${tdefs.personal_jsdoc_author}
  */
  forEachPiece: function(f) {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (this.bd[i][j] !== undefined) {
          f(this.bd[i][j], new PiecePosition(i, j));
        }
      }
    }
  },
  /**
    Get a piece at a specific position
    @this {Board}
    @param {PiecePosition} piecePosition position to get the piece at.
    @return {BoardPiece} the piece at the specified position.
    @author ${tdefs.personal_jsdoc_author}
  */
  getPieceAtPosition: function(piecePosition) {
    this.checkPieceAt(piecePosition);
    return this.bd[piecePosition.x][piecePosition.y];
  },
  /**
    Get a piece at a specific position (in parts)
    @this {Board}
    @param {number} x x position to get piece at [0..8).
    @param {number} y y position to get piece at [0..8).
    @return {BoardPiece} the piece at the specified position.
    @author ${tdefs.personal_jsdoc_author}
  */
  getPieceAtPositionVals: function(x, y) {
    return this.getPieceAtPosition(new PiecePosition(x, y));
  },
  /**
    Do we have a piece in a specific position?
    @this {Board}
    @param {PiecePosition} piecePosition position to check for a piece at.
    @return {boolean} whether there is a piece at the position.
    @author ${tdefs.personal_jsdoc_author}
  */
  hasPieceAtPosition: function(piecePosition) {
    return this.bd[piecePosition.x][piecePosition.y] !== undefined;
  },
  /**
    Do we have a piece in a specific position?
    @this {Board}
    @param {number} x x position to check for piece at [0..8).
    @param {number} y y position to check for piece at [0..8).
    @return {boolean} is there a piece at position.
    @author ${tdefs.personal_jsdoc_author}
  */
  hasPieceAtPositionVals: function(x, y) {
    return this.hasPieceAtPosition(new PiecePosition(x, y));
  },
  /**
    Add a callback for adding a piece
    @this {Board}
    @param {function()} f callback function.
    @author ${tdefs.personal_jsdoc_author}
  */
  addPiecePostAddCallback: function(f) {
    this.postAddCB.push(f);
  },
  /**
    Add a callback for removing a piece
    @this {Board}
    @param {function()} f callback function.
    @author ${tdefs.personal_jsdoc_author}
  */
  addPiecePostRemoveCallback: function(f) {
    this.postRemoveCB.push(f);
  },
  /**
    Add a callback for moving a piece
    @this {Board}
    @param {function()} f callback function.
    @author ${tdefs.personal_jsdoc_author}
  */
  addPiecePostMoveCallback: function(f) {
    this.postMoveCB.push(f);
  },
  /**
    Clear the board and add a position to the current board
    @this {Board}
    @param {BoardPosition} boardPosition position to set.
    @author ${tdefs.personal_jsdoc_author}
  */
  setPosition: function(boardPosition) {
    this.clearPieces();
    var that = this;
    boardPosition.forEachPiece(function(boardPiece, piecePosition) {
      that.addPiece(boardPiece, piecePosition); });
  },
  /**
    Put the board in starting position of standard chess.
    @this {Board}
    @author ${tdefs.personal_jsdoc_author}
  */
  startPosition: function() {
    this.setPosition(BoardPosition.startPos());
  },
  /**
    Move a piece according to positions.
    @this {Board}
    @param {PiecePosition} fromPiecePosition from where to move.
    @param {PiecePosition} toPiecePosition to where to move.
    @author ${tdefs.personal_jsdoc_author}
  */
  movePieceByPos: function(fromPiecePosition, toPiecePosition) {
    var boardPiece = this.getPieceAtPosition(fromPiecePosition);
    this.movePiece(boardPiece, fromPiecePosition, toPiecePosition);
  },
  /**
    Get the position of a piece
    @this {Board}
    @param {BoardPiece} boardPiece piece to get the position for.
    @return {PiecePosition} the position of the piece in question.
    @author ${tdefs.personal_jsdoc_author}
  */
  getPiecePosition: function(boardPiece) {
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (this.bd[i][j] == boardPiece) {
          return new PiecePosition(i, j);
        }
      }
    }
    throw 'piece not on board ' + boardPiece;
  }
});
