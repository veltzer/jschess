/**
	Create a position object
	@class represents a position on the board
	@constructor
	@param x x co-ordinate
	@param y y co-ordinate
*/
function Position(x,y) {
	this.x=x
	this.y=y
}

/**
	@class represents a position + graphics
	@constructor
	@param gr graphics (raphael) for the piece
	@param pos position for the piece
*/
function Piece(gr,pos) {
	this.gr=gr
	this.pos=pos
}
Piece.prototype.toString=function() {
	return 'the toString method still has to be written'
}

/**
	Creates a new Board
	@class a whole board to play with
	@constructor 
	@param config configuration for this board
*/ 
function ChessBoard(config) {
	// lets get the configs out
	// must have values
	if(!'id' in config) {
		throw 'no id'
	}
	// values with defaults
	config['size']=config['size'] || 600 // size of the board
	config['black_color']=config['black_color'] || '819faa' // color of the black squares
	config['white_color']=config['white_color'] || 'ffffff' // color of the white squares
	config['flipview']=config['flipview'] || false // is the board flipped
	config['ms']=config['ms'] || 350 // ms for moving animation
	// store the config
	this.config=config
	// get RW vars from the config
	this.flipview=this.config['flipview']
	// real code starts here
	this.raphaelPrep()
	this.drawBoard()
	this.piecesInit()
}

// methods to handle pieces start here
ChessBoard.prototype.piecesInit=function() {
	this.pieces=[]
}
ChessBoard.prototype.piecesAdd=function(gr,pos) {
	this.pieces.push(new Piece(gr,pos))
}
ChessBoard.prototype.piecesGetAtPos=function(pos) {
	for(i in this.pieces) {
		var piece=this.pieces[i]
		var p=piece.pos
		if(p.x==pos.x && p.y==pos.y) {
			return piece
		}
	}
	throw 'no piece at pos '+pos
}
/**
	Debug function
*/
ChessBoard.prototype.piecesDump=function() {
	for(i in this.pieces) {
		console.log(this.pieces[i])
	}
}

/**
	Prepare the raphael paper so we could do graphics
*/
ChessBoard.prototype.raphaelPrep=function() {
	// async way
	/*
	var widget=this
	Raphael(this.config['id'],this.config['size'],this.config['size'],function() {
		widget.paper=this
		widget.drawBoard()
	})
	*/
	// sync way
	this.paper=Raphael(this.config['id'],this.config['size'],this.config['size'])
}

/**
	Draw the board (which and black squares)
*/
ChessBoard.prototype.drawBoard=function() {
	this.square=this.config['size']/8
	for(var x=0;x<8;x++) {
		for(var y=0;y<8;y++) {
			// Creates circle at x = 50, y = 40, with radius 10
			var rec =this.paper.rect(x*this.square,y*this.square,this.square,this.square)
			if((x+y)%2==1) {
				// Sets the fill attribute of the circle to red (#f00)
				rec.attr('fill', this.config['black_color'])
				rec.attr('stroke', 'none')
			} else {
				rec.attr('fill', this.config['white_color'])
				rec.attr('stroke', 'none')
			}
		}
	}
}

/**
	Creates graphics for a rook
	@param pos at which position to create
*/
ChessBoard.prototype.createRook=function(pos) {
	var el1=this.paper.path('M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z')
	el1.attr({'stroke-linecap':'butt'})
	var el2=this.paper.path('M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z')
	el2.attr({'stroke-linecap':'butt'})
	var el3=this.paper.path('M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14')
	el3.attr({'stroke-linecap':'butt'})
	var el4=this.paper.path('M 34,14 L 31,17 L 14,17 L 11,14')
	el4.attr({})
	var el5=this.paper.path('M 31,17 L 31,29.5 L 14,29.5 L 14,17')
	el5.attr({'stroke-linecap':'butt','stroke-linejoin':'miter'})
	var el6=this.paper.path('M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5')
	el6.attr({})
	var el7=this.paper.path('M 11,14 L 34,14')
	el7.attr({'fill':'none','stroke':'#000000','stroke-linejoin':'miter'})
	// lets add them all to the set
	var gr=this.paper.set()
	gr.push(el1,el2,el3,el4,el5,el6,el7)
	// lets add the piece
	this.piecesAdd(gr,pos)
	this.moveGrToPos(gr,pos,0)
}

/**
	Translates position (0..7,0..7) to pixels
*/
ChessBoard.prototype.posToPixels=function(pos) {
	if(this.flipview==true) {
		return new Position((7-pos.x)*this.square,pos.y*this.square)
	} else {
		return new Position(pos.x*this.square,(7-pos.y)*this.square)
	}
}

ChessBoard.prototype.moveGrToPos=function(gr,pos,ms) {
	var pixelPos=this.posToPixels(pos)
	gr.forEach(function(el) {
		var m=Raphael.matrix()
		m.translate(pixelPos.x,pixelPos.y)
		el.animate({transform: m.toTransformString()},ms)
	},this)
}
ChessBoard.prototype.movePiece=function(posFrom,posTo) {
	var piece=this.piecesGetAtPos(posFrom)
	this.moveGrToPos(piece.gr,posTo,this.config['ms'])
	piece.pos=posTo
}
/**
	Flips the board (see it from the other side)
*/
ChessBoard.prototype.flip=function() {
	if(this.flipview==true) {
		this.flipview=false
	} else {
		this.flipview=true
	}
	this.redraw()
}
/**
	Debug function
*/
ChessBoard.prototype.dump=function() {
	this.piecesDump()
}
/**
	Redraw the entire board
*/
ChessBoard.prototype.redraw=function() {
	for(i in this.pieces) {
		var piece=this.pieces[i]
		this.moveGrToPos(piece.gr,piece.pos,0)
	}
}

// testing code starts here
ChessBoard.prototype.putrooks=function() {
	this.createRook(new Position(0,0))
	this.createRook(new Position(7,0))
}
ChessBoard.prototype.moverooks=function() {
	this.movePiece(new Position(0,0),new Position(0,4))
	this.movePiece(new Position(7,0),new Position(7,4))
}
