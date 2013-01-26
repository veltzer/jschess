/*jsl:import BoardPiece.js*/
/*jsl:import BoardPosition.js*/
/*jsl:import PieceColor.js*/
/*jsl:import PieceType.js*/
/*jsl:import PiecePosition.js*/
var Board = Class.create(/** @lends Board# */{
  /**
    @class Represents a full board This is the main class to interact with. Using this class you can: 1. Use pieces: put, remove and move them. 2. Do something with all pieces.
    creates a new instance
    @return the new object created
    @constructor
    @author mark.veltzer@gmail.com (Mark Veltzer)
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
    @return string representation of this object
    @author mark.veltzer@gmail.com (Mark Veltzer)
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
    Check that no piece is at a certain position. Will throw an exception if that is not the case.
    @param piecePosition [PiecePosition] position to check that no piece is at.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  checkNoPieceAt: function(piecePosition) {
    if (this.bd[piecePosition.x][piecePosition.y] !== undefined) {
      throw 'already have piece at position ' + piecePosition.toString();
    }
  },
  /**
    Check that piece is at a certain position. Will throw an exception if that is not the case.
    @param piecePosition [PiecePosition] position to check that a piece is at.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  checkPieceAt: function(piecePosition) {
    if (this.bd[piecePosition.x][piecePosition.y] === undefined) {
      throw 'dont have piece at position ' + piecePosition.toString();
    }
  },
  /**
    Check that a certain piece is at a certain position. Will throw an exception if that is not the case.
    @param boardPiece [BoardPiece] the piece in question.
    @param piecePosition [PiecePosition] position to check that a piece is at.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  checkBoardPieceAt: function(boardPiece,piecePosition) {
    if (this.bd[piecePosition.x][piecePosition.y] !== boardPiece) {
      throw 'wrong piece at position ' + piecePosition.toString();
    }
  },
  /**
    Add a piece to the position
    @param boardPiece [BoardPiece] piece to add.
    @param piecePosition [PiecePosition] where to add the piece.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  addPiece: function(boardPiece,piecePosition) {
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
    @param boardPiece [BoardPiece] piece to remove.
    @param piecePosition [PiecePosition] the position to remove it from.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  removePiece: function(boardPiece,piecePosition) {
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
    @param boardPiece [BoardPiece] piece to move.
    @param fromPiecePosition [PiecePosition] from where to move the piece.
    @param toPiecePosition [PiecePosition] to where to move the piece.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  movePiece: function(boardPiece,fromPiecePosition,toPiecePosition) {
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
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  clearPieces: function() {
    var that = this;
    this.forEachPiece(function(boardPiece,piecePosition) { that.removePiece(boardPiece, piecePosition); });
  },
  /**
    Add a piece to the position (seperate pieces of data).
    @param color color of the piece (black/white).
    @param type type of the piece (rook/knight/bishop/queen/king/pawn).
    @param x x location of the piece [0..8).
    @param y y location of the piece [0..8).
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  addPieceVals: function(color,type,x,y) {
    var boardPiece = new BoardPiece(
      new PieceColor(color),
      new PieceType(type)
    );
    this.addPiece(boardPiece, new PiecePosition(x, y));
  },
  /**
    Run a function for each piece in this position
    @param f function to be called back for each piece.This function should receive the piece to work on.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
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
    @param piecePositon [PiecePosition] position to get the piece at.
    @return [BoardPiece] the piece at the specified position
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getPieceAtPosition: function(piecePosition) {
    this.checkPieceAt(piecePosition);
    return this.bd[piecePosition.x][piecePosition.y];
  },
  /**
    Get a piece at a specific position (in parts)
    @param x x position to get piece at [0..8).
    @param y y position to get piece at [0..8).
    @return the piece at the specified position
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getPieceAtPositionVals: function(x,y) {
    return this.getPieceAtPosition(new PiecePosition(x, y));
  },
  /**
    Do we have a piece in a specific position?
    @param position position to check for a piece at.
    @return boolean that indicates whether there is a piece at position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  hasPieceAtPosition: function(piecePosition) {
    return this.bd[piecePosition.x][piecePosition.y] !== undefined;
  },
  /**
    Do we have a piece in a specific position?
    @param x x position to check for piece at [0..8).
    @param y y position to check for piece at [0..8).
    @return boolean that indicates whether there is a piece at position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  hasPieceAtPositionVals: function(x,y) {
    return this.hasPieceAtPosition(new PiecePosition(x, y));
  },
  /**
    Add a callback for adding a piece
    @param f callback function.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  addPiecePostAddCallback: function(f) {
    this.postAddCB.push(f);
  },
  /**
    Add a callback for removing a piece
    @param f callback function.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  addPiecePostRemoveCallback: function(f) {
    this.postRemoveCB.push(f);
  },
  /**
    Add a callback for moving a piece
    @param f callback function.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  addPiecePostMoveCallback: function(f) {
    this.postMoveCB.push(f);
  },
  /**
    Clear the board and add a position to the current board
    @param boardPosition [BoardPosition] position to set.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  setPosition: function(boardPosition) {
    this.clearPieces();
    var that = this;
    boardPosition.forEachPiece(function(boardPiece,piecePosition) { that.addPiece(boardPiece, piecePosition); });
  },
  /**
    Put the board in starting position of standard chess.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  startPosition: function() {
    this.setPosition(BoardPosition.startPos());
  },
  /**
    Move a piece according to positions.
    @return nothing
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  movePieceByPos: function(fromPiecePosition,toPiecePosition) {
    var boardPiece = this.getPieceAtPosition(fromPiecePosition);
    this.movePiece(boardPiece, fromPiecePosition, toPiecePosition);
  },
  /**
    Get the position of a piece
    @param boardPiece [BoardPiece] piece to get the position for.
    @return [PiecePosition] the position of the piece in question
    @author mark.veltzer@gmail.com (Mark Veltzer)
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
