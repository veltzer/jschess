/*jsl:import SvgPieceData.js*/
/*jsl:import SvgCreator.js*/
/*jsl:import SvgPixelPosition.js*/
/*jsl:import PiecePosition.js*/
/*jsl:import Board.js*/
/*jsl:import RUtils.js*/
/**
	Creates a new Board
	@class a whole board to play with
	@constructor
	@param config configuration for this board
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function SvgBoard(board,config) {
	// lets get the configs out
	// must have values
	if(!'id' in config) {
		throw 'no id';
	}
	// values with defaults
	config['size']=config['size'] || 500;// size of the board
	config['black_color']=config['black_color'] || '000000';// color of the black squares
	config['white_color']=config['white_color'] || 'ffffff';// color of the white squares
	config['black_square_color']=config['black_square_color'] || '819faa';// color of the black squares
	config['white_square_color']=config['white_square_color'] || 'ffffff';// color of the white squares
	config['black_square_gradient']=config['black_square_gradient'] || '0-#91afba:0-819faa:50-819faa:100';// gradient for black squares
	config['white_square_gradient']=config['white_square_gradient'] || '0-#eee:0-#fff:50-#fff:100';// gradient for white squares
	config['flipview']=config['flipview'] || false;// is the board flipped
	config['ms']=config['ms'] || 350;// ms for moving animation
	config['pencolor']=config['pencolor'] || 'black';// pen color for drawing the shapes
	config['flipms']=config['flipms'] || 350;// how fast should flip work
	config['gradients']=config['gradients'] || true;// should we use gradients?
	config['select_color']=config['select_color'] || '00ff00';// color of selected squares
	config['rec_stroke_color']=config['rec_stroke_color'] || 'black';// rectangles stroke color
	config['rec_stroke_width']=config['rec_stroke_width'] || 0.1;// rectangles stroke width
	// store the config
	this.config=config;
	// get RW vars from the config
	this.flipview=this.config['flipview'];
	this.square=this.config['size']/8;
	// real code starts here
	this.board=board;
	this.raphaelPrep();
	this.drawBoard();
	// glow parameters
	this.glowOn=false;
	this.glowPiece=undefined;
	// hook the board to our graphics
	var that=this;
	this.board.addPiecePostAddCallback(function(boardPiece,piecePosition) {
		that.postAddPiece(boardPiece,piecePosition);
	});
	this.board.addPiecePostRemoveCallback(function(boardPiece,piecePosition) {
		that.postRemovePiece(boardPiece,piecePosition);
	});
	this.board.addPiecePostMoveCallback(function(boardPiece,fromPos,toPos) {
		that.postMovePiece(boardPiece,fromPos,toPos);
	});
}
SvgBoard.prototype.getBoard=function() {
	return this.board;
};
/**
	Prepare the raphael paper so we could do graphics
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.raphaelPrep=function() {
	// async way
	/*
	var widget=this
	Raphael(this.config['id'],this.config['size'],this.config['size'],function() {
		widget.paper=this
		widget.drawBoard()
	})
	*/
	// sync way
	this.paper=Raphael(this.config['id'],this.config['size'],this.config['size']);
};
SvgBoard.prototype.setRectFill=function(rec,piecePosition) {
	if((piecePosition.x+piecePosition.y)%2==1) {
		if(this.config['gradients']) {
			rec.attr('fill',this.config['black_square_gradient']);
		} else {
			rec.attr('fill',this.config['black_square_color']);
		}
	} else {
		if(this.config['gradients']) {
			rec.attr('fill',this.config['white_square_gradient']);
		} else {
			rec.attr('fill',this.config['white_square_color']);
		}
	}
};
/**
	Draw the board (which and black squares)
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.drawBoard=function() {
	var that=this;
	for(var x=0;x<8;x++) {
		for(var y=0;y<8;y++) {
			var rec=this.paper.rect(x*this.square,y*this.square,this.square,this.square);
			rec.attr('stroke',this.config['rec_stroke_color']);
			rec.attr('stroke-width',this.config['rec_stroke_width']);
			var piecePosition=new PiecePosition(x,7-y);
			this.setRectFill(rec,piecePosition);
			rec.click(function(tpos,trec) {
				return function() {
					that.squareSelect(tpos,trec);
				};
			}(piecePosition,rec));
			rec.mousedown(function(tpos,trec,type) {
				return function() {
					that.eventMouse(tpos,trec,type);
				};
			}(piecePosition,rec,"mousedown"));
			rec.mousemove(function(tpos,trec,type) {
				return function() {
					that.eventMouse(tpos,trec,type);
				};
			}(piecePosition,rec,"mousemove"));
			rec.mouseout(function(tpos,trec,type) {
				return function() {
					that.eventMouse(tpos,trec,type);
				};
			}(piecePosition,rec,"mouseout"));
			rec.mouseover(function(tpos,trec,type) {
				return function() {
					that.eventMouse(tpos,trec,type);
				};
			}(piecePosition,rec,"mouseover"));
			rec.mouseup(function(tpos,trec,type) {
				return function() {
					that.eventMouse(tpos,trec,type);
				};
			}(piecePosition,rec,"mouseup"));
		}
	}
};
/**
	Callback method to create graphics and place them when adding a piece.
	@param boardPiece the piece to add.
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.postAddPiece=function(boardPiece,piecePosition) {
	var svgPiece=SvgCreator.createPiece(this.config,boardPiece.color,boardPiece.type);
	// calculate transform (move and scale)
	var pixelPos=this.posToPixels(piecePosition);
	var m=Raphael.matrix();
	m.translate(pixelPos.x,pixelPos.y);
	m.scale(this.square/svgPiece.rect,this.square/svgPiece.rect);
	var transform=m.toTransformString();
	// now put it on the paper
	var set=svgPiece.toSet(this.paper,transform);
	// lets put our own data with the piece
	var svgPieceData=new SvgPieceData(set,pixelPos);
	boardPiece.setData(svgPieceData);
};
/**
	Callback method to create graphics and place them when adding a piece.
	@param boardPiece the piece to add.
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.postRemovePiece=function(boardPiece,piecePosition) {
	Utils.fakeUse(piecePosition);
	var svgPieceData=boardPiece.getData();
	svgPieceData.set.remove();
	boardPiece.unsetData();
};
/**
	Translates position (0..7,0..7) to pixels
	@param pos position (0..7,0..7) to translate
	@returns position in pixels
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.posToPixels=function(piecePosition) {
	if(this.flipview===true) {
		return new SvgPixelPosition(piecePosition.x*this.square,piecePosition.y*this.square);
	} else {
		return new SvgPixelPosition(piecePosition.x*this.square,(7-piecePosition.y)*this.square);
	}
};
/**
	Resize the board
	@param set Raphael set to resize
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.resize=function(set) {
	var m=Raphael.matrix();
	m.scale(1.7,1.7);
	var transformString=m.toTransformString();
	set.forEach(function(el) {
		//el.animate({transform: transformString},ms);
		el.transform(transformString);
		//el.scale(5,5);
	},this);
};
/**
	Shows or hides a given piece according to parameter
	@param piece of type Piece, the piece to show or hide
	@param hide boolean - show or hide the piece
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.showHidePiece=function(boardPiece,hide) {
	var data=boardPiece.getData();
	data.set.forEach(function(el) {
		if(hide) {
			el.hide();
		} else {
			el.show();
		}
	},this);
};
/**
	Quick method to show a piece
	@param piece of type Piece - the piece to show
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.showPiece=function(piece) {
	this.showHidePiece(piece,false);
};
/**
	Quick method to hide a piece
	@param piece of type Piece - the piece to hide
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.hidePiece=function(piece) {
	this.showHidePiece(piece,true);
};
/**
	Move a piece on the board (including animation if so configured)
	@param piece of type Piece - the piece to move
	@param posTo of type Position - the position to move the piece to
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.postMovePiece=function(boardPiece,posFrom,posTo) {
	Utils.fakeUse(posFrom);
	this.timeMovePiece(boardPiece,posFrom,posTo,this.config['ms']);
};
SvgBoard.prototype.positionPiece=function(piece,posTo) {
	this.timeMovePiece(piece,posTo,0);
};
SvgBoard.prototype.timeMovePiece=function(piece,posFrom,posTo,ms) {
	Utils.fakeUse(posFrom);
	var pixelPosFrom=piece.getData().pixelPos;
	var pixelPosTo=this.posToPixels(posTo);
	piece.getData().set.forEach(function(el) {
		var m=Raphael.matrix();
		m.translate(pixelPosTo.x-pixelPosFrom.x,pixelPosTo.y-pixelPosFrom.y);
		//m.scale(this.square/piece.rect,this.square/piece.rect);
		var transformString=m.toTransformString();
		el.animate({transform: transformString},ms);
	},this);
	//piece.getData().pixelPos=pixelPosTo;
};
/**
	Flips the board (see it from the other side)
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.flip=function() {
	if(this.flipview===true) {
		this.flipview=false;
	} else {
		this.flipview=true;
	}
	this.redraw();
};
/**
	Debug function
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.toString=function() {
	return 'no dump now';
};
/**
	Make a piece glow
	@param boardPiece the piece to make glow
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.glow=function(boardPiece,glow) {
	var svgPieceData=boardPiece.getData();
	if(glow) {
		svgPieceData.glow=RUtils.setGlow(this.paper,svgPieceData.set);
	} else {
		//svgPieceData.set.remove();
		svgPieceData.glow.remove();
		svgPieceData.glow=undefined;
	}
};
/**
	Redraw the entire board
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.redraw=function() {
	var that=this;
	this.board.forEachPiece(function(boardPiece,position) {
		that.timeMovePiece(boardPiece,position,position,that.config['flipms']);
	});
};
/**
	Square select callback. Called when the user selects a square.
	@param piecePosition position of the square
	@param rec Raphael.js rec object which was selected
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.squareSelect=function(piecePosition,rec) {
	Utils.fakeUse(piecePosition);
	Utils.fakeUse(rec);
	/*
	//console.log('select is called '+piecePosition.x+','+piecePosition.y);
	if(this.board.hasPieceAtPosition(piecePosition)) {
		if(this.glowOn) {
			this.glow(this.glowPiece,false);
			this.glowOn=false;
			this.glowPiece=undefined;
		}
		var boardPiece=this.board.getPieceAtPosition(piecePosition);
		this.glow(boardPiece,true);
		this.glowOn=true;
		this.glowPiece=boardPiece;
	} else {
		if(this.glowOn) {
			this.glow(this.glowPiece,false);
			this.glowOn=false;
			this.glowPiece=undefined;
		}
	}
	*/
};
SvgBoard.prototype.eventMouse=function(piecePosition,rec,type) {
	//Utils.fakeUse(rec);
	//Utils.fakeUse(piecePosition);
	// going into a rectangle - set the selected color
	if(type=='mouseover') {
		rec.attr('fill',this.config['select_color']);
	}
	// if we have a selected one, revert to old color
	if(type=='mouseout') {
		this.setRectFill(rec,piecePosition);
	}
};
