/*jsl:import SvgPieceData.js*/
/*jsl:import SvgCreator.js*/
/*jsl:import SvgPixelPosition.js*/
/*jsl:import PiecePosition.js*/
/*jsl:import Board.js*/
/*jsl:import RUtils.js*/
/*jsl:import RPaper.js*/
/*jsl:import Utils.js*/
var SvgBoard=Class.create(
	/** @lends SvgBoard# */
{
	/**
		@class a whole board to play with
		@description creates a new instance
		@constructor
		@param config configuration for this board
		@returns the new instance
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function(board,config) {
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
		config['move_ms']=config['move_ms'] || 350;// ms for moving animation
		config['flip_ms']=config['flip_ms'] || 350;// how fast should flip work
		config['pencolor']=config['pencolor'] || 'black';// pen color for drawing the shapes
		config['gradients']=config['gradients'] || true;// should we use gradients?
		config['select_color']=config['select_color'] || 'ffff00';// color of selected squares
		config['over_color']=config['over_color'] || '00ff00';// color of selected squares
		config['do_select_square']=config['do_select_square'] || false;// should we select squares
		config['do_select_piece']=config['do_select_piece'] || false;// should we select pieces
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
	},
	getBoard: function() {
		return this.board;
	},
	/**
		@description Prepare the raphael paper so we could do graphics
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	raphaelPrep: function() {
		// async way
		/*
		var widget=this
		Raphael(this.config['id'],this.config['size'],this.config['size'],function() {
			widget.paper=this
			widget.drawBoard()
		})
		*/
		// sync way
		//this.paper=new RPaper(this.config['id'],this.config['size'],this.config['size']);
		this.paper=Raphael(this.config['id'],this.config['size'],this.config['size']);
	},
	/**
		@description Fill a rectangle using the default color
		@param rec Raphael.js rectangle object to fill
		@param piecePosition PiecePosition object that describes the position of the rectangle
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	setRectFill: function(rec,piecePosition) {
		if((piecePosition.x+piecePosition.y)%2==1) {
			if(this.config['gradients']) {
				rec.attr('fill',this.config['white_square_gradient']);
			} else {
				rec.attr('fill',this.config['white_square_color']);
			}
		} else {
			if(this.config['gradients']) {
				rec.attr('fill',this.config['black_square_gradient']);
			} else {
				rec.attr('fill',this.config['black_square_color']);
			}
		}
	},
	/**
		@description Draw the board (which and black squares)
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	drawBoard: function() {
		var that=this;
		this.recs=[];
		for(var x=0;x<8;x++) {
			var rec_line=[];
			for(var y=0;y<8;y++) {
				var rec=this.paper.rect(x*this.square,y*this.square,this.square,this.square);
				rec.attr('stroke',this.config['rec_stroke_color']);
				rec.attr('stroke-width',this.config['rec_stroke_width']);
				rec_line.push(rec);
				var piecePosition=new PiecePosition(x,(7-y));
				this.setRectFill(rec,piecePosition);
				rec.click(function(tpos,trec,type) {
					return function() {
						that.eventSquare(tpos,trec,type);
					};
				}(piecePosition,rec,"click"));
				rec.mousedown(function(tpos,trec,type) {
					return function() {
						that.eventSquare(tpos,trec,type);
					};
				}(piecePosition,rec,"mousedown"));
				/*
				rec.mousemove(function(tpos,trec,type) {
					return function() {
						that.eventSquare(tpos,trec,type);
					};
				}(piecePosition,rec,"mousemove"));
				*/
				rec.mouseout(function(tpos,trec,type) {
					return function() {
						that.eventSquare(tpos,trec,type);
					};
				}(piecePosition,rec,"mouseout"));
				rec.mouseover(function(tpos,trec,type) {
					return function() {
						that.eventSquare(tpos,trec,type);
					};
				}(piecePosition,rec,"mouseover"));
				rec.mouseup(function(tpos,trec,type) {
					return function() {
						that.eventSquare(tpos,trec,type);
					};
				}(piecePosition,rec,"mouseup"));
			}
			rec_line.reverse();
			this.recs.push(rec_line);
		}
	},
	/**
		@description Callback method to create graphics and place them when adding a piece.
		@param boardPiece the piece to add.
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	postAddPiece: function(boardPiece,piecePosition) {
		var that=this;
		var svgPiece=SvgCreator.createPiece(this.config,boardPiece.color,boardPiece.type);
		// calculate transform (move and scale)
		var pixelPos=this.posToPixels(piecePosition);
		var m=Raphael.matrix();
		m.translate(pixelPos.x,pixelPos.y);
		m.scale(this.square/svgPiece.rect,this.square/svgPiece.rect);
		var transform=m.toTransformString();
		// now put it on the paper
		var set=svgPiece.toSet(this.paper,transform);
		RUtils.eventRegister(set,function(iboardPiece) {
		//set.eventRegister(function(iboardPiece) {
			return function(eventName) {
				that.eventPiece(iboardPiece,eventName);
			};
		}(boardPiece),['click','mouseover','mouseout']);
		// lets put our own data with the piece
		var svgPieceData=new SvgPieceData(set,pixelPos);
		boardPiece.setData(svgPieceData);
	},
	/**
		@description Callback method to create graphics and place them when adding a piece.
		@param boardPiece the piece to add.
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	postRemovePiece: function(boardPiece,piecePosition) {
		Utils.fakeUse(piecePosition);
		var svgPieceData=boardPiece.getData();
		svgPieceData.set.remove();
		boardPiece.unsetData();
	},
	/**
		@description Translates position (0..7,0..7) to pixels
		@param pos position (0..7,0..7) to translate
		@returns position in pixels
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	posToPixels: function(piecePosition) {
		if(this.flipview===true) {
			return new SvgPixelPosition((7-piecePosition.x)*this.square,piecePosition.y*this.square);
		} else {
			return new SvgPixelPosition(piecePosition.x*this.square,(7-piecePosition.y)*this.square);
		}
	},
	/**
		@description Resize the board
		@param set Raphael set to resize
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	resize: function(set) {
		var m=Raphael.matrix();
		m.scale(1.7,1.7);
		var transformString=m.toTransformString();
		set.forEach(function(el) {
			//el.animate({transform: transformString},ms);
			el.transform(transformString);
			//el.scale(5,5);
		},this);
	},
	/**
		@description Shows or hides a given piece according to parameter
		@param piece of type Piece, the piece to show or hide
		@param hide boolean - show or hide the piece
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	showHidePiece: function(boardPiece,hide) {
		var data=boardPiece.getData();
		data.forEach(function(el) {
			if(hide) {
				el.hide();
			} else {
				el.show();
			}
		});
	},
	/**
		@description Quick method to show a piece
		@param piece of type Piece - the piece to show
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	showPiece: function(piece) {
		this.showHidePiece(piece,false);
	},
	/**
		@description Quick method to hide a piece
		@param piece of type Piece - the piece to hide
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	hidePiece: function(piece) {
		this.showHidePiece(piece,true);
	},
	/**
		@description Move a piece on the board (including animation if so configured)
		@param piece of type Piece - the piece to move
		@param posTo of type Position - the position to move the piece to
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	postMovePiece: function(boardPiece,posFrom,posTo) {
		Utils.fakeUse(posFrom);
		this.timeMovePiece(boardPiece,posFrom,posTo,this.config['move_ms']);
	},
	positionPiece: function(piece,posTo) {
		this.timeMovePiece(piece,posTo,0);
	},
	timeMovePiece: function(piece,posFrom,posTo,ms) {
		Utils.fakeUse(posFrom);
		var pixelPosFrom=piece.getData().pixelPos;
		var pixelPosTo=this.posToPixels(posTo);
		piece.getData().forEach(function(el) {
			var m=Raphael.matrix();
			m.translate(pixelPosTo.x-pixelPosFrom.x,pixelPosTo.y-pixelPosFrom.y);
			//m.scale(this.square/piece.rect,this.square/piece.rect);
			var transformString=m.toTransformString();
			el.animate({transform: transformString},ms);
		});
		//piece.getData().pixelPos=pixelPosTo;
	},
	/**
		@description Flips the board (see it from the other side)
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	flip: function() {
		if(this.flipview===true) {
			this.flipview=false;
		} else {
			this.flipview=true;
		}
		this.redraw();
	},
	/**
		@description toString function
		@returns a string representation of this object
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	toString: function() {
		return 'no dump now';
	},
	/**
		@description Make a piece glow
		@param boardPiece the piece to make glow
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	glow: function(boardPiece,glow) {
		var svgPieceData=boardPiece.getData();
		if(glow) {
			svgPieceData.extra=RUtils.setGlow(this.paper,svgPieceData.set);
		} else {
			svgPieceData.extra.remove();
			svgPieceData.extra=undefined;
		}
	},
	/**
		@description Redraw the entire board
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	redraw: function() {
		var that=this;
		this.board.forEachPiece(function(boardPiece,position) {
			that.timeMovePiece(boardPiece,position,position,that.config['flip_ms']);
		});
	},
	/**
		@description Event handler for events happening on the pieces.
		Types of events: click, mouseover and more...
		@param boardPiece the BoardPiece instance the event happened on
		@param type the type of event that happened
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	eventPiece: function(boardPiece,type) {
		//console.log('eventPiece '+boardPiece+','+type);
		if(type=='mouseover' || type=='mouseout') {
			//Utils.pass();
			var piecePosition=this.board.getPiecePosition(boardPiece);
			var rec=this.getRec(piecePosition);
			this.eventSquare(piecePosition,rec,'piece'+type);
		}
		//if(type=='mouseover' || type=='squaremouseover') {
		if(type=='mouseover') {
		//if(type=='squaremouseover') {
			if(this.config['do_select_piece']) {
				if(SvgBoard.spiece) {
					if(SvgBoard.spiece!=boardPiece) {
						this.glow(SvgBoard.spiece,false);
						SvgBoard.spiece=boardPiece;
						this.glow(SvgBoard.spiece,true);
					}
				} else {
					SvgBoard.spiece=boardPiece;
					this.glow(SvgBoard.spiece,true);
				}
			}
		}
		//if(type=='mouseout' || type=='squaremouseout') {
		if(type=='mouseout') {
		//if(type=='squaremouseout') {
			if(this.config['do_select_piece']) {
				if(SvgBoard.spiece) {
					this.glow(SvgBoard.spiece,false);
					SvgBoard.spiece=undefined;
				}
			}
		}
	},
	/**
		@description Return the square at a position.
		@param piecePosition the position for which to return the square.
		@returns the Raphael.js rec in question
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	getRec: function(piecePosition) {
		return this.recs[piecePosition.x][piecePosition.y];
	},
	/**
		@description Events for squares.
		Types of events: mouseover, mouseout, click and more.
		@param piecePosition the position of the event
		@param rec the Raphael.js rectangle where the event happened
		@param type string which is the name of the event that happened
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	eventSquare: function(piecePosition,rec,type) {
		//console.log('eventSquare '+piecePosition+','+rec+','+type);
		//Utils.fakeUse(rec);
		//Utils.fakeUse(piecePosition);
		// going into a rectangle - set the selected color
		if(type=='mouseover' || type=='mouseout') {
			if(this.board.hasPieceAtPosition(piecePosition)) {
				var boardPiece=this.board.getPieceAtPosition(piecePosition);
				this.eventPiece(boardPiece,'square'+type);
			}
		}
		if(type=='mouseover' || type=='piecemouseover') {
			if(this.config['do_select_square']) {
				if(SvgBoard.colored) {
					if(SvgBoard.colored!=rec) {
						this.setRectFill(SvgBoard.colored,SvgBoard.coloredPos);
						SvgBoard.colored=rec;
						SvgBoard.coloredPos=piecePosition;
						SvgBoard.colored.attr('fill',this.config['over_color']);
					}
				} else {
					SvgBoard.colored=rec;
					SvgBoard.coloredPos=piecePosition;
					SvgBoard.colored.attr('fill',this.config['over_color']);
				}
			}
		}
		// going out from a rectangle - set the original color
		if(type=='mouseout' || type=='piecemouseout') {
			if(this.config['do_select_square']) {
				if(SvgBoard.colored) {
					this.setRectFill(SvgBoard.colored,SvgBoard.coloredPos);
					SvgBoard.colored=undefined;
					SvgBoard.coloredPos=undefined;
				}
			}
		}
		/*
		// selecting a rectangle - fill with select_color
		if(type=='click') {
			if(selected) {
				if(selected==rec) {
					this.setRectFill(selected,selectedPos);
					selected=undefined;
					selectedPos=undefined;
				} else {
					this.setRectFill(selected,selectedPos);
					rec.attr('fill',this.config['select_color']);
					selected=rec;
					selectedPos=piecePosition;
				}
			} else {
				rec.attr('fill',this.config['select_color']);
				selected=rec;
				selectedPos=piecePosition;
			}
		}
		*/
	}
});
SvgBoard.spiece=undefined;
//SvgBoard.selected=undefined;
//SvgBoard.selectedPos=undefined;
SvgBoard.colored=undefined;
SvgBoard.coloredPos=undefined;
