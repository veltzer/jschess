/**
	Creates a new Board
	@constructor 
*/ 
function ChessBoard() {
}

ChessBoard.createBoard=function(config) {
	// lets get the configs out
	// must have values
	if(!id in config) {
		throw 'no id'
	}
	var id=config['id']
	// values with defaults
	var size=config['size'] || 600
	var black_color=config['black_color'] || '819faa'
	var white_color=config['white_color'] || 'ffffff'
	// real code starts here
	var square=size/8
	var paper = Raphael(id,size,size,function() {
		for(var x=0;x<8;x++) {
			for(var y=0;y<8;y++) {
				// Creates circle at x = 50, y = 40, with radius 10
				var rec =this.rect(x*square,y*square,square,square)
				if((x+y)%2==1) {
					// Sets the fill attribute of the circle to red (#f00)
					rec.attr('fill', black_color)
					rec.attr('stroke', 'none')
				} else {
					rec.attr('fill', white_color)
					rec.attr('stroke', 'none')
				}
			}
		}
		// lets draw a rook
		var el=this.path('M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z')
		el.attr({'stroke-linecap':'butt'})
		var el=this.path('M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z')
		el.attr({'stroke-linecap':'butt'})
		var el=this.path('M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14')
		el.attr({'stroke-linecap':'butt'})
		var el=this.path('M 34,14 L 31,17 L 14,17 L 11,14')
		var el=this.path('M 31,17 L 31,29.5 L 14,29.5 L 14,17')
		el.attr({'stroke-linecap':'butt','stroke-linejoin':'miter'})
		var el=this.path('M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5')
		var el=this.path('M 11,14 L 34,14')
		el.attr({'fill':'none','stroke':'#000000','stroke-linejoin':'miter'})
		// end if rook drawing
	})
}
