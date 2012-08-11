/**
	Create a position object
	@constructor
*/
function Position(x,y) {
	this.x=x
	this.y=y
}


/**
	Creates a new Board
	@constructor 
*/ 
function ChessBoard(config) {
	// lets get the configs out
	// must have values
	if(!'id' in config) {
		throw 'no id'
	}
	// values with defaults
	config['size']=config['size'] || 600
	config['black_color']=config['black_color'] || '819faa'
	config['white_color']=config['white_color'] || 'ffffff'
	// store the config
	this.config=config
	// real code starts here
	this.drawFull()
}

ChessBoard.prototype.drawFull=function() {
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
	this.drawBoard()
}

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

ChessBoard.prototype.createRook=function() {
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
	var piece=this.paper.set()
	piece.push(el1,el2,el3,el4,el5,el6,el7)
	return piece;
}

/**
	Translates position (0..7,0..7) to pixels
*/
ChessBoard.prototype.posToPixels=function(pos) {
	return new Position(pos.x*this.square,(7-pos.y)*this.square)
}
ChessBoard.prototype.placePiece=function(piece,pos) {
	this.movePiece(piece,pos,0)
}

ChessBoard.prototype.movePiece=function(piece,pos,ms) {
	var pixelPos=this.posToPixels(pos)
	piece.forEach(function(el) {
		var m=Raphael.matrix()
		m.translate(pixelPos.x,pixelPos.y)
		el.animate({transform: m.toTransformString()},ms)
	},this)
}
// testing code starts here
ChessBoard.prototype.doSomething1=function() {
	rook1=this.createRook()
	rook2=this.createRook()
	this.placePiece(rook1,new Position(0,0))
	this.placePiece(rook2,new Position(7,0))
}
ChessBoard.prototype.doSomething2=function() {
	this.movePiece(rook1,new Position(0,4),350)
	this.movePiece(rook2,new Position(7,4),350)
}
