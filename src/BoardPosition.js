/*jsl:import BoardPiece.js*/
/*jsl:import PieceColor.js*/
/*jsl:import PieceType.js*/
/*jsl:import PiecePosition.js*/
var BoardPosition = Class.create(
	/** @lends BoardPosition# */
	{
	/**
		@class represents a full position of the board
		@description constructs a new object
		@return a new object of this type
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function() {
		this.pieces = [];
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@return a string representation of this object
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	toString: function() {
		return this.pieces.join();
	},
	/**
		@description Add a piece to the position
		@param color the color of the piece (black/white).
		@param type the type of the piece (rook/knight/bishop/queen/king/pawn).
		@param x the x position of the piece [0..8).
		@param y the y position of the piece [0..8).
		@return nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	addPiece: function(color,type,x,y) {
		var boardPiece = new BoardPiece(new PieceColor(color), new PieceType(type));
		var piecePosition = new PiecePosition(x, y);
		this.pieces.push([boardPiece, piecePosition]);
	},
	/**
		@description Run a function for each piece in this position
		@return nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	forEachPiece: function(f) {
		this.pieces.forEach(function(pieceAndPos) {
			var boardPiece = pieceAndPos[0];
			var position = pieceAndPos[1];
			f(boardPiece, position);
		});
	}
});
/**
	@description Static method that returns a starting position in standard chess.
	@return A standard chess starting position.
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
BoardPosition.startPos = function() {
	/*
	var newPos=new BoardPosition();
	newPos.addPiece('white','rook',0,0);
	newPos.addPiece('white','knight',1,0);
	newPos.addPiece('white','bishop',2,0);
	newPos.addPiece('white','queen',3,0);
	newPos.addPiece('white','king',4,0);
	newPos.addPiece('white','bishop',5,0);
	newPos.addPiece('white','knight',6,0);
	newPos.addPiece('white','rook',7,0);
	newPos.addPiece('white','pawn',0,1);
	newPos.addPiece('white','pawn',1,1);
	newPos.addPiece('white','pawn',2,1);
	newPos.addPiece('white','pawn',3,1);
	newPos.addPiece('white','pawn',4,1);
	newPos.addPiece('white','pawn',5,1);
	newPos.addPiece('white','pawn',6,1);
	newPos.addPiece('white','pawn',7,1);

	newPos.addPiece('black','rook',0,7);
	newPos.addPiece('black','knight',1,7);
	newPos.addPiece('black','bishop',2,7);
	newPos.addPiece('black','queen',3,7);
	newPos.addPiece('black','king',4,7);
	newPos.addPiece('black','bishop',5,7);
	newPos.addPiece('black','knight',6,7);
	newPos.addPiece('black','rook',7,7);
	newPos.addPiece('black','pawn',0,6);
	newPos.addPiece('black','pawn',1,6);
	newPos.addPiece('black','pawn',2,6);
	newPos.addPiece('black','pawn',3,6);
	newPos.addPiece('black','pawn',4,6);
	newPos.addPiece('black','pawn',5,6);
	newPos.addPiece('black','pawn',6,6);
	newPos.addPiece('black','pawn',7,6);
	return newPos;
	*/
	return BoardPosition.setupFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
};
/**
	@description Setup a position according to FEN notation.
	See <a href="http://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation">Forsyth–Edwards Notation</a> for more details.
	Example of start position is:
	"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	@param fen a string describing a chess board position in FEN notation.
	@return A position object corresponding to the FEN notation given.
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	@todo add more sanity tests (regexp) for the whole input
	@todo parse the 5 other blocks after the position itself (what do I do with that ?!?)
*/
BoardPosition.setupFEN = function(fen) {
	var blocks = fen.split(' ');
	if (blocks.length != 6) {
		throw 'parse error - number of blocks is not 6';
	}
	var ranks = blocks[0].split('/');
	if (ranks.length != 8) {
		throw 'parse error - number of ranks is not 8';
	}
	var newPos = new BoardPosition();
	for (var irank = 7; irank >= 0; irank--) {
		var rank = ranks[7 - irank];
		for (var iletter = 0; iletter < rank.length; iletter++) {
			var letter = rank[iletter];
			switch (letter) {
				case 'r':
					newPos.addPiece('black', 'rook', iletter, irank);
					break;
				case 'R':
					newPos.addPiece('white', 'rook', iletter, irank);
					break;
				case 'n':
					newPos.addPiece('black', 'knight', iletter, irank);
					break;
				case 'N':
					newPos.addPiece('white', 'knight', iletter, irank);
					break;
				case 'b':
					newPos.addPiece('black', 'bishop', iletter, irank);
					break;
				case 'B':
					newPos.addPiece('white', 'bishop', iletter, irank);
					break;
				case 'q':
					newPos.addPiece('black', 'queen', iletter, irank);
					break;
				case 'Q':
					newPos.addPiece('white', 'queen', iletter, irank);
					break;
				case 'k':
					newPos.addPiece('black', 'king', iletter, irank);
					break;
				case 'K':
					newPos.addPiece('white', 'king', iletter, irank);
					break;
				case 'p':
					newPos.addPiece('black', 'pawn', iletter, irank);
					break;
				case 'P':
					newPos.addPiece('white', 'pawn', iletter, irank);
					break;
				default:
					iletter += Number(letter) - 1;
					break;
			}
		}
	}
	return newPos;
};
