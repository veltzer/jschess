/*jsl:import SvgPieceData.js*/
/*jsl:import SvgCreator.js*/
/*jsl:import SvgPixelPosition.js*/
/*jsl:import PiecePosition.js*/
/*jsl:import Board.js*/
/*jsl:import WRaphael.js*/
/*jsl:import Utils.js*/
/*jsl:import Config.js*/
/*jsl:import SvgConfigTemplate.js*/
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
	initialize: function(board,dict) {
		// lets create a config connected to our template
		this.config=new Config(SvgConfigTemplate.getInstance());
		// lets override with user preferences
		this.config.override(dict);
		// lets check the config
		this.config.check();
		// now we are ready to go...
		// get RW vars from the config
		this.flipview=this.getValue('flipview');
		this.size=this.getValue('size');
		if(this.getValue('do_letters')) {
			var partial=this.getValue('partial');
			this.square=this.getValue('size')/(8+partial);
			this.offX=this.square*(partial/2);
			this.offY=this.square*(partial/2);
		} else {
			this.square=this.getValue('size')/8.0;
			this.offX=0;
			this.offY=0;
		}
		// real code starts here
		this.board=board;
		this.raphaelPrep();
		this.drawBoard();
		if(this.getValue('do_letters')) {
			this.drawBorder();
		}
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
		// build the glow object
		this.glow_obj={};
		this.glow_obj.width=this.getValue('glow_width');
		this.glow_obj.fill=this.getValue('glow_fill');
		this.glow_obj.opacity=this.getValue('glow_opacity');
		this.glow_obj.offsetx=this.getValue('glow_offsetx');
		this.glow_obj.offsety=this.getValue('glow_offsety');
		this.glow_obj.color=this.getValue('glow_color');
		// selection variables
		// last board position
		this.lastPos=undefined;
		// current board position
		this.currentPos=undefined;
		// selected piece
		this.selectedPiece=undefined;
		// selected rec
		this.selectedRec=undefined;
	},
	getBoard: function() {
		return this.board;
	},
	getValue: function(key) {
		return this.config.getValue(key);
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
		Raphael(this.getValue('id'),this.getValue('size'),this.getValue('size'),function() {
			widget.paper=this
			widget.drawBoard()
		})
		*/
		// sync way
		this.paper=new WRaphael(
			this.getValue('id'),
			this.getValue('size'),
			this.getValue('size')
		);
		/*
		this.paper=Raphael(
			this.getValue('id'),
			this.getValue('size'),
			this.getValue('size')
		);
		*/
		this.elem=$(this.getValue('id'));
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
			if(this.getValue('gradients')) {
				rec.attr('fill',this.getValue('white_square_gradient'));
			} else {
				rec.attr('fill',this.getValue('white_square_color'));
			}
		} else {
			if(this.getValue('gradients')) {
				rec.attr('fill',this.getValue('black_square_gradient'));
			} else {
				rec.attr('fill',this.getValue('black_square_color'));
			}
		}
	},
	/**
		@description Draw the boarder
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	drawBorder: function() {
		this.texts=[];
		var part=0.5;
		var partial=this.getValue('partial');
		for(var y=0;y<8;y++) {
			var txt1=this.paper.text(
				this.square*(partial/2)*part,
				(y+0.5)*this.square+this.offY,
				8-y
			);
			this.texts.push(txt1);
			var txt2=this.paper.text(
				this.offX+this.square*8.0+this.square*(partial/2)*part,
				(y+0.5)*this.square+this.offY,
				8-y
			);
			this.texts.push(txt2);
		}
		for(var x=0;x<8;x++) {
			var txt3=this.paper.text(
				(x+0.5)*this.square+this.offX,
				this.square*(partial/2)*part,
				String.fromCharCode(x+'A'.charCodeAt(0))
			);
			this.texts.push(txt3);
			var txt4=this.paper.text(
				(x+0.5)*this.square+this.offX,
				this.offY+this.square*8.0+this.square*(partial/2)*part,
				String.fromCharCode(x+'A'.charCodeAt(0))
			);
			this.texts.push(txt4);
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
				var rec=this.paper.rect(
					x*this.square+this.offX,
					y*this.square+this.offY,
					this.square,
					this.square
				);
				rec.attr({
					stroke:this.getValue('rec_stroke_color'),
					"stroke-width":this.getValue('rec_stroke_width')
				});
				rec_line.push(rec);
				var piecePosition=new PiecePosition(x,7-y);
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
		if(this.getValue('do_select_global')) {
			var that=this;
			var delta=0;
			var rec=this.paper.rect(this.offX+delta,this.offY+delta,this.square*8.0-delta,this.square*8.0-delta);
			rec.attr({fill:Raphael.getColor()});
			rec.attr({opacity:0.0});
			rec.mousemove(function(evt,x,y) {
				that.eventGlobal(evt,x-that.startX-that.offX,y-that.startY-that.offY,'mousemove');
			});
			rec.mouseover(function(evt,x,y) {
				that.eventGlobal(evt,x-that.startX-that.offX,y-that.startY-that.offY,'mouseover');
			});
			rec.mouseout(function(evt,x,y) {
				that.eventGlobal(evt,x-that.startX-that.offX,y-that.startY-that.offY,'mouseout');
			});
			rec.toFront();
			this.fullRec=rec;
		}
		/*
		if(this.getValue('do_select_piecerec')) {
			var rec_out=this.paper.rect(this.offX+delta,this.offY+delta,this.square*8.0-delta,this.square*8.0-delta);
			rec_out.attr({opacity:0.0});
			rec_out.mouseout(function(evt,x,y) {
				that.eventGlobal(evt,x-that.startX-that.offX,y-that.startY-that.offY,'mouseout');
			});
			rec_out.toFront();
		}
		*/
	},
	postGraphics: function() {
		if(this.getValue('do_select_global')) {
			this.fullRec.toFront();
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
		m.translate(pixelPos.x+this.offX,pixelPos.y+this.offY);
		m.scale(this.square/svgPiece.rect,this.square/svgPiece.rect);
		var transform=m.toTransformString();
		// now put it on the paper
		var set=svgPiece.toSet(this.paper,transform);
		set.eventRegister(function(iboardPiece) {
			return function(eventName) {
				that.eventPiece(iboardPiece,eventName);
			};
		}(boardPiece),['click','mouseover','mouseout','mousemove','mouseup','mousedown']);
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
		var x=Math.floor((svgPixelPosition.x)/this.square);
		var y=Math.floor((svgPixelPosition.y)/this.square);
		if(this.flipview===true) {
			return new PiecePosition(7-x,y);
		} else {
			return new PiecePosition(x,7-y);
		}
	},
	pixelsToPosForgiving: function(svgPixelPosition) {
		var x=Math.floor((svgPixelPosition.x)/this.square);
		var y=Math.floor((svgPixelPosition.y)/this.square);
		if(x>7 || x<0 || y>7 || y<0) {
			return undefined;
		}
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
		@param boardPiece [BoardPiece] the piece to move
		@param fromPiecePosition [PiecePosition] position from which to move
		@param toPiecePosition [PiecePosition] position to which to move
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	postMovePiece: function(boardPiece,fromPiecePosition,toPiecePosition) {
		this.timeMovePiece(boardPiece,fromPiecePosition,toPiecePosition,this.getValue('move_ms'));
	},
	positionPiece: function(boardPiece,toPiecePosition) {
		this.timeMovePiece(boardPiece,toPiecePosition,0);
	},
	timeMovePiece: function(boardPiece,fromPiecePosition,toPiecePosition,ms) {
		Utils.fakeUse(fromPiecePosition);
		var pixelPosFrom=boardPiece.getData().pixelPos;
		var pixelPosTo=this.posToPixels(toPiecePosition);
		boardPiece.getData().forEach(function(el) {
			var m=Raphael.matrix();
			m.translate(pixelPosTo.x-pixelPosFrom.x,pixelPosTo.y-pixelPosFrom.y);
			var transformString=m.toTransformString();
			el.animate({transform: transformString},ms);
		});
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
		@param boardPiece [BoardPiece] the piece to make glow
		@param glow [object] properties to pass to the glow function as per Raphael.js
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	glow: function(boardPiece,glow) {
		var svgPieceData=boardPiece.getData();
		if(glow) {
			svgPieceData.extra=svgPieceData.set.glow(this.glow_obj);
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
			that.timeMovePiece(boardPiece,position,position,that.config.getValue('flip_ms'));
		});
	},
	/**
		@description Event handler for events happening on the pieces.
		Types of events: click, mouseover and more...
		@param boardPiece [BoardPiece] instance the event happened on
		@param type the type of event that happened
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	eventPiece: function(boardPiece,type) {
		//Utils.fakeUse(boardPiece);
		//Utils.fakeUse(type);
		if(this.getValue('do_select_piecerec')) {
			if(type=='mouseover') {
				var piecePosition=this.board.getPiecePosition(boardPiece);
				if(this.currentPos==undefined || piecePosition.notEqual(this.currentPos)) {
					this.lastPos=this.currentPos;
					this.currentPos=piecePosition;
					this.newPosition();
				}
			}
		}
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
		/*
		if(this.flipview===true) {
			piecePosition.x=7-piecePosition.x;
			piecePosition.y=7-piecePosition.y;
		}
		*/
		if(this.getValue('do_select_piecerec')) {
			if(type=='mouseover') {
				this.lastPos=this.currentPos;
				this.currentPos=piecePosition;
				this.newPosition();
			}
			/*
			if(type=='mouseout') {
				// this is done with a timeout just for getting out of the board...
				var pos=this.currentPos;
				var that=this;
				window.setTimeout(function() {
					if(pos!=undefined && pos.equal(that.currentPos)) {
						that.lastPos=that.currentPos;
						that.currentPos=undefined;
						that.newPosition();
					}
				},100);
			}
			*/
		}
		if(this.getValue('do_select_click')) {
			if(type=='click') {
				if(this.selected) {
					if(this.selected==rec) {
						this.setRectFill(this.selected,this.selectedPos);
						this.selected=undefined;
						this.selectedPos=undefined;
					} else {
						this.setRectFill(this.selected,this.selectedPos);
						rec.attr('fill',this.getValue('select_color'));
						this.selected=rec;
						this.selectedPos=piecePosition;
					}
				} else {
					rec.attr('fill',this.getValue('select_color'));
					this.selected=rec;
					this.selectedPos=piecePosition;
				}
			}
		}
	},
	eventGlobal: function(eventtype,x,y,type) {
		Utils.fakeUse(eventtype);
		if(this.getValue('do_select_global')) {
			if(type=='mouseover' || type=='mousemove') {
				var piecePosition=this.pixelsToPosForgiving(new SvgPixelPosition(x,y));
				if(piecePosition!=undefined) {
					if(this.currentPos==undefined) {
						this.lastPos=undefined;
						this.currentPos=piecePosition;
						this.newPosition();
					} else {
						if(piecePosition.notEqual(this.currentPos)) {
							this.lastPos=this.currentPos;
							this.currentPos=piecePosition;
							this.newPosition();
						}
					}
				} else {
					// forget about this event?!?
					Utils.pass();
				}
			}
			if(type=='mouseout') {
				this.lastPos=this.currentPos;
				this.currentPos=undefined;
				this.newPosition();
			}
		}
		if(this.getValue('do_select_piecerec')) {
			if(type=='mouseout') {
				this.lastPos=this.currentPos;
				this.currentPos=undefined;
				this.newPosition();
			}
		}
	},
	/**
		@description Internal method. This method is called whenever
		the cursor changes position over the board and ONLY when
		it changes position.
		No parameters are passed because This method uses:
		this.selectedPiece, this.selectedRec, this.lastPos, this.currentPos
		to do it's work.
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	newPosition: function() {
		if(this.currentPos==undefined) {
			if(this.selectedPiece!=undefined) {
				if(this.getValue('do_select_piece')) {
					this.glow(this.selectedPiece,false);
					this.selectedPiece=undefined;
				}
			}
			if(this.selectedRec!=undefined) {
				if(this.getValue('do_select_square')) {
					this.setRectFill(this.selectedRec,this.lastPos);
					this.selectedRec=undefined;
				}
			}
		} else {
			if(this.board.hasPieceAtPosition(this.currentPos)) {
				var boardPiece=this.board.getPieceAtPosition(this.currentPos);
				//this.eventPiece(boardPiece,'square'+type);
				if(this.getValue('do_select_piece')) {
					if(this.selectedPiece==undefined) {
						this.selectedPiece=boardPiece;
						this.glow(this.selectedPiece,true);
					} else {
						this.glow(this.selectedPiece,false);
						this.selectedPiece=boardPiece;
						this.glow(this.selectedPiece,true);
					}
				}
			} else {
				if(this.selectedPiece!=undefined) {
					if(this.getValue('do_select_piece')) {
						this.glow(this.selectedPiece,false);
						this.selectedPiece=undefined;
					}
				}
			}
			if(this.getValue('do_select_square')) {
				var rec=this.getRec(this.currentPos);
				if(this.selectedRec==undefined) {
					this.selectedRec=rec;
					this.selectedRec.attr('fill',this.getValue('over_color'));
				} else {
					this.setRectFill(this.selectedRec,this.lastPos);
					this.selectedRec=rec;
					this.selectedRec.attr('fill',this.getValue('over_color'));
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
