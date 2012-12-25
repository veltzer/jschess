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
	config['flipview']=config['flipview'] || false;// is the board flipped
	config['ms']=config['ms'] || 350;// ms for moving animation
	config['pencolor']=config['pencolor'] || 'black';
	config['flipms']=config['flipms'] || 0;
	config['gradients']=config['gradients'] || true;
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
/**
	Draw the board (which and black squares)
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.drawBoard=function() {
	var that=this;
	for(var x=0;x<8;x++) {
		for(var y=0;y<8;y++) {
			// Creates circle at x = 50, y = 40, with radius 10
			var rec =this.paper.rect(x*this.square,y*this.square,this.square,this.square);
			rec.attr('stroke','black');
			rec.attr('stroke-width',0.1);
			if((x+y)%2==1) {
				if(this.config['gradients']) {
					rec.attr('fill','0-#91afba:0-819faa:50-819faa:100');
				} else {
					rec.attr('fill', this.config['black_square_color']);
				}
			} else {
				if(this.config['gradients']) {
					rec.attr('fill','0-#eee:0-#fff:50-#fff:100');
				} else {
					rec.attr('fill', this.config['white_square_color']);
				}
			}
			var inner_func=(function(tx,ty) {
				return function() {
					that.select(new PiecePosition(tx,7-ty));
				};
			})(x,y);
			rec.click(inner_func);
		}
	}
};
/**
	Callback method to create graphics and place them when adding a piece.
	@param boardPiece the piece to add.
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.postAddPiece=function(boardPiece,position) {
	var svgPiece=SvgCreator.createPiece(this.config,boardPiece.color,boardPiece.type);
	// calculate transform (move and scale)
	var pixelPos=this.posToPixels(position);
	var m=Raphael.matrix();
	m.translate(pixelPos.x,pixelPos.y);
	m.scale(this.square/svgPiece.rect,this.square/svgPiece.rect);
	var transform=m.toTransformString();
	// now put it on the paper
	var set=this.paper.set();
	for(var x in svgPiece.paas) {
		var paa=svgPiece.paas[x];
		var orig_path=paa.path;
		var new_path=Raphael.transformPath(orig_path,transform);
		var el=this.paper.path(new_path);
		el.attr(paa.attr);
		//el.hide();
		set.push(el);
	}
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
SvgBoard.prototype.postRemovePiece=function(boardPiece,position) {
	Utils.fakeUse(position);
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
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.resize=function(gr) {
	var m=Raphael.matrix();
	m.scale(1.7,1.7);
	var transformString=m.toTransformString();
	gr.forEach(function(el) {
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
	Select callback. Called when the user selects a square.
	@returns nothing
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
SvgBoard.prototype.select=function(piecePosition) {
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
};
