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
	config['size']=config['size'] || 500 // size of the board
	config['black_color']=config['black_color'] || '819faa' // color of the black squares
	config['white_color']=config['white_color'] || 'ffffff' // color of the white squares
	config['flipview']=config['flipview'] || false // is the board flipped
	config['ms']=config['ms'] || 350 // ms for moving animation
	config['pencolor']=config['pencolor'] || 'black'
	// store the config
	this.config=config
	// get RW vars from the config
	this.flipview=this.config['flipview']
	this.square=this.config['size']/8
	// real code starts here
	this.raphaelPrep()
	this.drawBoard()
	this.piecesInit()
}

// methods to handle pieces start here
ChessBoard.prototype.piecesInit=function() {
	this.pieces=[]
}
ChessBoard.prototype.piecesAdd=function(gr,pos,pixelPos) {
	var piece=new Piece(gr,pos,pixelPos)
	this.pieces.push(piece)
	return piece
}
ChessBoard.prototype.piecesGetAtPos=function(pos) {
	for(var i in this.pieces) {
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
	for(var i in this.pieces) {
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
unite=function(h1,h2) {
	var ret={}
	for(var x in h1) {
		ret[x]=h1[x]
	}
	for(var x in h2) {
		ret[x]=h2[x]
	}
	return ret
}
ChessBoard.prototype.createPiece=function(pieceType) {
	if(pieceType=='rook') {
		var pieceDesc=new PieceDesc(45)
		pieceDesc.add(new PathAndAttributes('M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z',{'stroke-linecap':'butt'}))
		pieceDesc.add(new PathAndAttributes('M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z',{'stroke-linecap':'butt'}))
		pieceDesc.add(new PathAndAttributes('M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14',{'stroke-linecap':'butt'}))
		pieceDesc.add(new PathAndAttributes('M 34,14 L 31,17 L 14,17 L 11,14',{}))
		pieceDesc.add(new PathAndAttributes('M 31,17 L 31,29.5 L 14,29.5 L 14,17',{'stroke-linecap':'butt','stroke-linejoin':'miter'}))
		pieceDesc.add(new PathAndAttributes('M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5',{}))
		pieceDesc.add(new PathAndAttributes('M 11,14 L 34,14',{'stroke-linejoin':'miter'}))
		return pieceDesc 
	}
	if(pieceType=='knight') {
		var pieceDesc=new PieceDesc(45)
		//pieceDesc.add(new PathAndAttributes('M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18',{}))
		//pieceDesc.add(new PathAndAttributes('M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10',{}))
		pieceDesc.add(new PathAndAttributes('M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10',{}))
		pieceDesc.add(new PathAndAttributes('M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z',{}))
		pieceDesc.add(new PathAndAttributes('M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z',{}))
		return pieceDesc 
	}
	throw 'unknown piece '+pieceType
}
ChessBoard.prototype.putPiece=function(pieceType,pos) {
	var pieceDesc=this.createPiece(pieceType)
	// calculate transform (move and scale)
	var pixelPos=this.posToPixels(pos)
	var m=Raphael.matrix()
	m.translate(pixelPos.x,pixelPos.y)
	m.scale(this.square/pieceDesc.rect,this.square/pieceDesc.rect)
	var transform=m.toTransformString()
	// now put it on the paper
	var width=this.config['size']/240.0
	var stdatt={
		'stroke-width': width,
		'stroke':this.config['pencolor'],
		// the first 0 is the direction of the gradient in degrees (0 is horizontal)
		//'fill': '0-#fff:0-#ccc:100',
		'fill': '0-#fff:0-#fff:50-#999:100',
		// this is not the right way to make it hidden
		//'opacity':0,
	}
	var gr=this.paper.set()
	for(var x in pieceDesc.paas) {
		var paa=pieceDesc.paas[x]
		var orig_path=paa.path
		var new_path=Raphael.transformPath(orig_path,transform)
		var el=this.paper.path(new_path)
		el.attr(unite(stdatt,paa.attr))
		//el.hide()
		gr.push(el)
	}
	// lets add the piece
	var piece=this.piecesAdd(gr,pos,pixelPos)
	return piece;
}

/**
	Translates position (0..7,0..7) to pixels
*/
ChessBoard.prototype.posToPixels=function(pos) {
	if(this.flipview==true) {
		return new Position(pos.x*this.square,pos.y*this.square)
	} else {
		return new Position(pos.x*this.square,(7-pos.y)*this.square)
	}
}
/*
ChessBoard.prototype.resize=function(gr) {
	var m=Raphael.matrix()
	m.scale(1.7,1.7)
	var transformString=m.toTransformString()
	gr.forEach(function(el) {
		//el.animate({transform: transformString},ms)
		el.transform(transformString)
		//el.scale(5,5)
	},this)
}
*/

ChessBoard.prototype.showHidePiece=function(piece,hide) {
	piece.gr.forEach(function(el) {
		if(hide) {
			el.hide()
		} else {
			el.show()
		}
	},this)
}
ChessBoard.prototype.showPiece=function(piece) {
	this.showHidePiece(piece,false)
}
ChessBoard.prototype.hidePiece=function(piece) {
	this.showHidePiece(piece,true)
}
ChessBoard.prototype.movePiece=function(piece,posTo) {
	this.timeMovePiece(piece,posTo,this.config['ms'])
}

ChessBoard.prototype.positionPiece=function(piece,posTo) {
	this.timeMovePiece(piece,posTo,0)
}

ChessBoard.prototype.timeMovePiece=function(piece,posTo,ms) {
	var pixelPosFrom=piece.pixelPos
	var pixelPosTo=this.posToPixels(posTo)
	piece.gr.forEach(function(el) {
		var m=Raphael.matrix()
		m.translate(pixelPosTo.x-pixelPosFrom.x,pixelPosTo.y-pixelPosFrom.y)
		//m.scale(this.square/piece.rect,this.square/piece.rect)
		var transformString=m.toTransformString()
		el.animate({transform: transformString},ms)
	},this)
	piece.pos=posTo
	//piece.pixelPos=pixelPosTo
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
	for(var i in this.pieces) {
		var piece=this.pieces[i]
		var pixelPos=piece.pixelPos
		this.positionPiece(piece,piece.pos)
	}
}
ChessBoard.prototype.movePieceByPos=function(fromPos,toPos) {
	var piece=this.piecesGetAtPos(fromPos)
	this.movePiece(piece,toPos)
}

// testing code starts here
ChessBoard.prototype.putrooks=function() {
	this.putPiece('rook',new Position(0,0))
	this.putPiece('rook',new Position(7,0))
	this.putPiece('knight',new Position(1,0))
	this.putPiece('knight',new Position(6,0))
}
ChessBoard.prototype.moverooks=function() {
	this.movePieceByPos(new Position(0,0),new Position(0,4))
	this.movePieceByPos(new Position(7,0),new Position(7,4))
}
ChessBoard.prototype.moveknights=function() {
	this.movePieceByPos(new Position(1,0),new Position(2,2))
	this.movePieceByPos(new Position(6,0),new Position(5,2))
}
