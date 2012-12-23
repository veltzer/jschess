/*jsl:import BoardPiece.js*/
/**
	@class represents a full board
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
	this.addCB=[];
	this.removeCB=[];
}
/**
	toString method that allows you to get a nice printout for this type
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
	Check that no piece is at a certain position.
	Will throw an exception if that is not the case.
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.checkNoPieceAt=function(position) {
	if(this.bd[position.x][position.y]!==undefined) {
		throw 'already have piece at position '+position.toString();
	}
};
/**
	Check that piece is at a certain position.
	Will throw an exception if that is not the case.
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.checkPieceAt=function(position) {
	if(this.bd[position.x][position.y]===undefined) {
		throw 'dont have piece at position '+position.toString();
	}
};
/**
	Add a piece to the position
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.addPiece=function(boardPiece) {
	var position=boardPiece.position;
	this.checkNoPieceAt(position);
	this.bd[position.x][position.y]=boardPiece;
	for(var f in this.addCB) {
		f(boardPiece);
	}
};
/**
	Add a piece to the position (seperate pieces of data).
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.addPieceVals=function(color,type,x,y) {
	var boardPiece=new BoardPiece(
		new PieceColor(color),
		new PieceType(type),
		new PiecePosition(x,y)
	);
	this.addPiece(boardPiece);
};
/**
	Run a function for each piece in this position
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.forEachPiece=function(f) {
	for(var i=0;i<8;i++) {
		for(var j=0;j<8;j++) {
			if(this.bd[i][j]!==undefined) {
				f(this.bd[i][j]);
			}
		}
	}
};
/**
	Get a piece at a specific position
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.getPieceAtPosition=function(position) {
	this.checkPieceAt(position);
	return this.bd[position.x][position.y];
};
/**
	Get a piece at a specific position (in parts)
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.getPieceAtPositionVals=function(x,y) {
	return this.getPieceAtPosition(new PiecePosition(x,y));
};
/**
	Do we have a piece in a specific position?
	@returns boolean that indicates whether there is a piece at position. 
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.hasPieceAtPosition=function(position) {
	return this.bd[position.x][position.y]!==undefined;
};
/**
	Do we have a piece in a specific position?
	@returns boolean that indicates whether there is a piece at position. 
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.hasPieceAtPositionVals=function(x,y) {
	return this.hasPieceAtPosition(new PiecePosition(x,y));
};
/**
	Add a callback for adding a piece
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.addPieceAddCallback=function(f) {
	this.addCB.push(f);
};
/**
	Add a callback for removing a piece
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Board.prototype.addPieceRemoveCallback=function(f) {
	this.removeCB.push(f);
};
