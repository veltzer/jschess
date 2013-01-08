/*jsl:import SvgPieceData.js*/
/*jsl:import SvgCreator.js*/
/*jsl:import SvgPixelPosition.js*/
/*jsl:import PiecePosition.js*/
/*jsl:import Board.js*/
/*jsl:import RUtils.js*/
/*jsl:import WRaphael.js*/
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
		config['do_select_click']=config['do_select_click'] || false;// should we select clicks
		config['do_select_square']=config['do_select_square'] || false;// should we select squares
		config['do_select_piece']=config['do_select_piece'] || false;// should we select pieces
		config['do_select_global']=config['do_select_global'] || false;// should we select pieces
		config['rec_stroke_color']=config['rec_stroke_color'] || 'black';// rectangles stroke color
		config['rec_stroke_width']=config['rec_stroke_width'] || 0.1;// rectangles stroke width
		// store the config
		this.config=config;
		// get RW vars from the config
		this.flipview=this.config['flipview'];
		this.size=this.config['size'];
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
		this.overlay();
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
		this.paper=new WRaphael(this.config['id'],this.config['size'],this.config['size']);
		//this.paper=Raphael(this.config['id'],this.config['size'],this.config['size']);
		this.elem=$(this.config['id']);
		var offset=this.elem.cumulativeOffset();
		this.startX=offset.left;
		this.startY=offset.top;
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
		//var that=this;
		this.recs=[];
		for(var x=0;x<8;x++) {
			var rec_line=[];
			for(var y=0;y<8;y++) {
				var rec=this.paper.rect(x*this.square,y*this.square,this.square,this.square);
				rec.attr({
					stroke:this.config['rec_stroke_color'],
					"stroke-width":this.config['rec_stroke_width']
				});
				rec_line.push(rec);
				var piecePosition=new PiecePosition(x,(7-y));
				this.setRectFill(rec,piecePosition);
				/*
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
				rec.mousemove(function(tpos,trec,type) {
					return function() {
						that.eventSquare(tpos,trec,type);
					};
				}(piecePosition,rec,"mousemove"));
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
				*/
			}
			rec_line.reverse();
			this.recs.push(rec_line);
		}
	},
	/**
		@description Create an overlay rectange for the entire board
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	overlay: function() {
		var that=this;
		var rec=this.paper.rect(0,0,this.size,this.size);
		rec.attr({fill:Raphael.getColor()});
		rec.attr({opacity:0.0});
		rec.mousemove(function(evt,x,y) {
			that.eventGlobal(evt,x,y,'mousemove');
		});
		rec.mouseover(function(evt,x,y) {
			that.eventGlobal(evt,x,y,'mouseover');
		});
		rec.mouseout(function(evt,x,y) {
			that.eventGlobal(evt,x,y,'mouseout');
		});
		rec.toFront();
		this.fullRec=rec;
	},
	postGraphics: function() {
		this.fullRec.toFront();
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
		this.postGraphics();
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
		@param piecePosition PiecePosition (0..7,0..7) to translate
		@returns position in pixels
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	posToPixels: function(piecePosition) {
		if(this.flipview===true) {
			return new SvgPixelPosition(
				(7-piecePosition.x)*this.square,
				piecePosition.y*this.square
			);
		} else {
			return new SvgPixelPosition(
				piecePosition.x*this.square,
				(7-piecePosition.y)*this.square
			);
		}
	},
	/**
		@description Translates pixel position (x,y) to board position (0..7,0..7)
		@param svgPixelPosition SvgPixelPosition object to translate
		@returns position (0..7,0..7)
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	pixelsToPos: function(svgPixelPosition) {
		var x=Math.floor((svgPixelPosition.x-this.startX)/this.square);
		var y=Math.floor((svgPixelPosition.y-this.startY)/this.square);
		if(this.flipview===true) {
			return new PiecePosition(7-x,y);
		} else {
			return new PiecePosition(x,7-y);
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
		Utils.fakeUse(boardPiece);
		Utils.fakeUse(type);
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
		// selecting a rectangle - fill with select_color
		if(type=='click') {
			if(this.config['do_select_click']) {
				if(SvgBoard.selected) {
					if(SvgBoard.selected==rec) {
						this.setRectFill(SvgBoard.selected,SvgBoard.selectedPos);
						SvgBoard.selected=undefined;
						SvgBoard.selectedPos=undefined;
					} else {
						this.setRectFill(SvgBoard.selected,SvgBoard.selectedPos);
						rec.attr('fill',this.config['select_color']);
						SvgBoard.selected=rec;
						SvgBoard.selectedPos=piecePosition;
					}
				} else {
					rec.attr('fill',this.config['select_color']);
					SvgBoard.selected=rec;
					SvgBoard.selectedPos=piecePosition;
				}
			}
		}
	},
	eventGlobal: function(eventtype,x,y,type) {
		//console.dir(arguments);
		Utils.fakeUse(eventtype);
		if(type=='mouseover' || type=='mousemove') {
			var piecePosition=this.pixelsToPos(new SvgPixelPosition(x,y));
			if(SvgBoard.currentPos==undefined) {
				SvgBoard.lastPos=undefined;
				SvgBoard.currentPos=piecePosition;
				this.newPosition();
			} else {
				if(piecePosition.notEqual(SvgBoard.currentPos)) {
					SvgBoard.lastPos=SvgBoard.currentPos;
					SvgBoard.currentPos=piecePosition;
					this.newPosition();
				}
			}
		}
		if(type=='mouseout') {
			SvgBoard.lastPos=SvgBoard.currentPos;
			SvgBoard.currentPos=undefined;
			this.newPosition();
		}
	},
	newPosition: function() {
		//console.log(SvgBoard.currentPos,SvgBoard.lastPos);
		if(SvgBoard.currentPos==undefined) {
			if(SvgBoard.selectedPiece!=undefined) {
				if(this.config['do_select_piece']) {
					this.glow(SvgBoard.selectedPiece,false);
					SvgBoard.selectedPiece=undefined;
				}
			}
			if(SvgBoard.selectedRec!=undefined) {
				if(this.config['do_select_square']) {
					this.setRectFill(SvgBoard.selectedRec,SvgBoard.lastPos);
					SvgBoard.selectedRec=undefined;
				}
			}
		} else {
			if(this.board.hasPieceAtPosition(SvgBoard.currentPos)) {
				var boardPiece=this.board.getPieceAtPosition(SvgBoard.currentPos);
				//this.eventPiece(boardPiece,'square'+type);
				if(this.config['do_select_piece']) {
					if(SvgBoard.selectedPiece==undefined) {
						SvgBoard.selectedPiece=boardPiece;
						this.glow(SvgBoard.selectedPiece,true);
					} else {
						this.glow(SvgBoard.selectedPiece,false);
						SvgBoard.selectedPiece=boardPiece;
						this.glow(SvgBoard.selectedPiece,true);
					}
				}
			} else {
				if(SvgBoard.selectedPiece!=undefined) {
					if(this.config['do_select_piece']) {
						this.glow(SvgBoard.selectedPiece,false);
						SvgBoard.selectedPiece=undefined;
					}
				}
			}
			if(this.config['do_select_square']) {
				var rec=this.getRec(SvgBoard.currentPos);
				if(SvgBoard.selectedRec==undefined) {
					SvgBoard.selectedRec=rec;
					SvgBoard.selectedRec.attr('fill',this.config['over_color']);
				} else {
					this.setRectFill(SvgBoard.selectedRec,SvgBoard.lastPos);
					SvgBoard.selectedRec=rec;
					SvgBoard.selectedRec.attr('fill',this.config['over_color']);
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
		if(this.flipview===true) {
			return this.recs[7-piecePosition.x][7-piecePosition.y];
		} else {
			return this.recs[piecePosition.x][piecePosition.y];
		}
	}
});
// static data
// last board position
SvgBoard.lastPos=undefined;
// current board position
SvgBoard.currentPos=undefined;
// selected piece
SvgBoard.selectedPiece=undefined;
// selected rec
SvgBoard.selectedRec=undefined;
