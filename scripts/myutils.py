#!/usr/bin/python

# this function is here because python2.6 does not have subprocess.check_output
def system_check_output(arg):
	pr=subprocess.Popen(arg,stdout=subprocess.PIPE)
	(output,errout)=pr.communicate()
	status=pr.returncode
	if status:
		raise ValueError('error in executing',arg)
	return output

def files_in_order():
	mylist=[
		'src/BoardPiece.js',
		'src/BoardPosition.js',
		'src/Config.js',
		'src/ConfigTemplate.js',
		'src/Game.js',
		'src/GameMove.js',
		'src/PgnReader.js',
		'src/PieceColor.js',
		'src/PiecePosition.js',
		'src/PieceType.js',
		'src/SvgConfigTemplate.js',
		'src/SvgBoard.js',
		'src/Board.js',
		'src/SvgControls.js',
		'src/SvgCreator.js',
		'src/SvgPathAndAttributes.js',
		'src/SvgPieceData.js',
		'src/SvgPiece.js',
		'src/SvgPixelPosition.js',
		'src/Utils.js',
		'src/WRaphael.js',
	];
	return mylist
