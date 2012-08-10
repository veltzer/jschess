function ChessBoard() {
}

ChessBoard.createBoard=function(id) {
	var newel=document.createElement('svg')
	var el=document.getElementById(id)
	el.appendChild(newel)
}
