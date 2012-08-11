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
	this.drawBoard()
}

ChessBoard.prototype.drawBoard=function() {
	var square=this.config['size']/8
	var widget=this
	Raphael(this.config['id'],this.config['size'],this.config['size'],function() {
		widget.paper=this
		for(var x=0;x<8;x++) {
			for(var y=0;y<8;y++) {
				// Creates circle at x = 50, y = 40, with radius 10
				var rec =this.rect(x*square,y*square,square,square)
				if((x+y)%2==1) {
					// Sets the fill attribute of the circle to red (#f00)
					rec.attr('fill', widget.config['black_color'])
					rec.attr('stroke', 'none')
				} else {
					rec.attr('fill', widget.config['white_color'])
					rec.attr('stroke', 'none')
				}
			}
		}
		widget.drawRook()
	})
}

ChessBoard.prototype.drawRook=function() {
	var el=this.paper.path('M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z')
	el.attr({'stroke-linecap':'butt'})
	var el=this.paper.path('M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z')
	el.attr({'stroke-linecap':'butt'})
	var el=this.paper.path('M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14')
	el.attr({'stroke-linecap':'butt'})
	var el=this.paper.path('M 34,14 L 31,17 L 14,17 L 11,14')
	var el=this.paper.path('M 31,17 L 31,29.5 L 14,29.5 L 14,17')
	el.attr({'stroke-linecap':'butt','stroke-linejoin':'miter'})
	var el=this.paper.path('M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5')
	var el=this.paper.path('M 11,14 L 34,14')
	el.attr({'fill':'none','stroke':'#000000','stroke-linejoin':'miter'})
}
