#!/usr/bin/python3

def files_in_order():
	mylist=[
		'src/BoardPiece.js',
		'src/BoardPosition.js',
		'src/Config.js',
		'src/ConfigTmpl.js',
		'src/Game.js',
		'src/GameMove.js',
		'src/PgnReader.js',
		'src/PieceColor.js',
		'src/PiecePosition.js',
		'src/PieceType.js',
		'src/SvgConfigTmpl.js',
		'src/SvgBoard.js',
		'src/Board.js',
		'src/SvgControls.js',
		'src/Controls.js',
		'src/SvgCreator.js',
		'src/SvgPathAndAttributes.js',
		'src/SvgPieceData.js',
		'src/SvgPiece.js',
		'src/SvgPixelPosition.js',
		'src/Utils.js',
		'src/WRaphael.js',
	];
	return mylist

def sources():
	return ' '.join(files_in_order())
