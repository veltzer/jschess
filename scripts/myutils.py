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
		'BoardPiece.js',
		'BoardPosition.js',
		'Config.js',
		'ConfigTemplate.js',
		'Game.js',
		'GameMove.js',
		'PgnReader.js',
		'PieceColor.js',
		'PiecePosition.js',
		'PieceType.js',
		'RUtils.js',
		'SvgConfig.js',
		'SvgConfigTemplate.js',
		'SvgBoard.js',
		'Board.js',
		'SvgControls.js',
		'SvgCreator.js',
		'SvgPathAndAttributes.js',
		'SvgPieceData.js',
		'SvgPiece.js',
		'SvgPixelPosition.js',
		'Utils.js',
		'WRaphael.js',
	];
	return mylist
