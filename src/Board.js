/*jsl:import BoardPiece.js*/
/*jsl:import BoardPosition.js*/
/*jsl:import PieceColor.js*/
/*jsl:import PieceType.js*/
/*jsl:import PiecePosition.js*/
/**
	@class Represents a full board This is the main class to interact with. Using this class you can: 1. Use pieces: put, remove and move them. 2. Do something with all pieces.
	@description creates a new instance
	@returns the new object created
	@constructs
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function Board() {
	// create 8x8 undefined squares
	this.bd=[];
	for(var i=0;i<8;i++) {
		var ar=[];
		for(var j=0;j<8;j++) {
			ar.push(undefined);
		}
		this.bd.push(ar);
	}
	this.pieces=[];
	// callbacks
	this.preAddCB=[];
	this.postAddCB=[];
	this.preRemoveCB=[];
	this.postRemoveCB=[];
	this.preMoveCB=[];
	this.postMoveCB=[];
}
/**
	@description toString method that allows you to get a nice printout for this type
	@returns string representation of this object
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.toString=function() {
	var str='';
	for(var i=0;i<8;i++) {
		for(var j=0;j<8;j++) {
			str+=this.bd[i][j];
		}
		str+='\n';
	}
	return str;
};
/**
	@description Check that no piece is at a certain position. Will throw an exception if that is not the case.
	@param position position to check that no piece is at
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.checkNoPieceAt=function(position) {
	if(this.bd[position.x][position.y]!==undefined) {
		throw 'already have piece at position '+position.toString();
	}
};
/**
	@description Check that piece is at a certain position. Will throw an exception if that is not the case.
	@param position position to check that a piece is at
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.checkPieceAt=function(position) {
	if(this.bd[position.x][position.y]===undefined) {
		throw 'dont have piece at position '+position.toString();
	}
};
/**
	@description Check that a certain piece is at a certain position. Will throw an exception if that is not the case.
	@param boardPiece the piece in question
	@param position position to check that a piece is at
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.checkBoardPieceAt=function(boardPiece,piecePosition) {
	if(this.bd[piecePosition.x][piecePosition.y]!==boardPiece) {
		throw 'wrong piece at position '+piecePosition.toString();
	}
};
/**
	@description Add a piece to the position
	@param boardPiece piece to add
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.addPiece=function(boardPiece,position) {
	for(var i in this.preAddCB) {
		var f=this.preAddCB[i];
		f(boardPiece,position);
	}
	this.checkNoPieceAt(position);
	this.bd[position.x][position.y]=boardPiece;
	for(i in this.postAddCB) {
		f=this.postAddCB[i];
		f(boardPiece,position);
	}
};
/**
	@description Remove a piece
	@param boardPiece piece to remove
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.removePiece=function(boardPiece,piecePosition) {
	this.checkBoardPieceAt(boardPiece,piecePosition);
	for(var i in this.preRemoveCB) {
		var f=this.preRemoveCB[i];
		f(boardPiece,piecePosition);
	}
	this.bd[piecePosition.x][piecePosition.y]=undefined;
	for(i in this.postRemoveCB) {
		f=this.postRemoveCB[i];
		f(boardPiece,piecePosition);
	}
};
/**
	@description Move a piece
	@param boardPiece piece to move
	@param piecePosition where to move it to
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.movePiece=function(boardPiece,fromPosition,toPosition) {
	this.checkPieceAt(fromPosition);
	this.checkNoPieceAt(toPosition);
	for(var i in this.preMoveCB) {
		var f=this.preMoveCB[i];
		f(boardPiece,fromPosition,toPosition);
	}
	this.bd[fromPosition.x][fromPosition.y]=undefined;
	this.bd[toPosition.x][toPosition.y]=boardPiece;
	for(i in this.postMoveCB) {
		f=this.postMoveCB[i];
		f(boardPiece,fromPosition,toPosition);
	}
};
/**
	@description Clear the board
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.clearPieces=function() {
	var that=this;
	this.forEachPiece(function(boardPiece,piecePosition) { that.removePiece(boardPiece,piecePosition); });
};
/**
	@description Add a piece to the position (seperate pieces of data).
	@param color color of the piece (black/white)
	@param type type of the piece (rook/knight/bishop/queen/king/pawn)
	@param x x location of the piece [0..8)
	@param y y location of the piece [0..8)
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.addPieceVals=function(color,type,x,y) {
	var boardPiece=new BoardPiece(
		new PieceColor(color),
		new PieceType(type)
	);
	this.addPiece(boardPiece,new PiecePosition(x,y));
};
/**
	@description Run a function for each piece in this position
	@param f function to be called back for each piece.This function should receive the piece to work on.
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.forEachPiece=function(f) {
	for(var i=0;i<8;i++) {
		for(var j=0;j<8;j++) {
			if(this.bd[i][j]!==undefined) {
				f(this.bd[i][j],new PiecePosition(i,j));
			}
		}
	}
};
/**
	@description Get a piece at a specific position
	@param position position to get the piece at
	@returns the piece at the specified position
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.getPieceAtPosition=function(position) {
	this.checkPieceAt(position);
	return this.bd[position.x][position.y];
};
/**
	@description Get a piece at a specific position (in parts)
	@param x x position to get piece at [0..8)
	@param y y position to get piece at [0..8)
	@returns the piece at the specified position
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.getPieceAtPositionVals=function(x,y) {
	return this.getPieceAtPosition(new PiecePosition(x,y));
};
/**
	@description Do we have a piece in a specific position?
	@param position position to check for a piece at
	@returns boolean that indicates whether there is a piece at position. 
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.hasPieceAtPosition=function(position) {
	return this.bd[position.x][position.y]!==undefined;
};
/**
	@description Do we have a piece in a specific position?
	@param x x position to check for piece at [0..8)
	@param y y position to check for piece at [0..8)
	@returns boolean that indicates whether there is a piece at position. 
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.hasPieceAtPositionVals=function(x,y) {
	return this.hasPieceAtPosition(new PiecePosition(x,y));
};
/**
	@description Add a callback for adding a piece
	@param f callback function
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.addPiecePostAddCallback=function(f) {
	this.postAddCB.push(f);
};
/**
	@description Add a callback for removing a piece
	@param f callback function
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.addPiecePostRemoveCallback=function(f) {
	this.postRemoveCB.push(f);
};
/**
	@description Add a callback for moving a piece
	@param f callback function
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.addPiecePostMoveCallback=function(f) {
	this.postMoveCB.push(f);
};
/**
	@description Clear the board and add a position to the current board
	@param boardPosition position to set
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.setPosition=function(boardPosition) {
	this.clearPieces();
	var that=this;
	boardPosition.forEachPiece(function(boardPiece,piecePosition) { that.addPiece(boardPiece,piecePosition); });
};
/**
	@description Put the board in starting position
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.startPosition=function() {
	this.setPosition(BoardPosition.startPos());
};
/**
	@description Move a piece according to positions.
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.movePieceByPos=function(fromPos,toPos) {
	var boardPiece=this.getPieceAtPosition(fromPos);
	this.movePiece(boardPiece,fromPos,toPos);
};
/**
	@description Get the position of a piece
	@returns piecePosition which is the position of the piece
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.getPiecePosition=function(boardPiece) {
	for(var i=0;i<8;i++) {
		for(var j=0;j<8;j++) {
			if(this.bd[i][j]==boardPiece) {
				return new PiecePosition(i,j);
			}
		}
	}
	throw 'piece not on board '+boardPiece;
};
