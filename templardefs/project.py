'''
templating solution for this project
'''

import datetime # for datetime
import subprocess # for check_output, DEVNULL

import templardefs.deps # for deps, getJsThirdParty

def git_describe():
	try:
		ver=subprocess.check_output(['git', 'describe'],stderr=subprocess.DEVNULL).decode().rstrip()
		return ver
	except:
		return 'test'

def files_in_order():
	return [
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

def sources():
	return ' '.join(files_in_order())

def jsFiles():
	files=files_in_order();
	l=[]
	l.append('<!-- placed by jsFiles() macro -->')
	for f in files:
		l.append('<script type="text/javascript" src="../'+f+'"></script>')
	l.append('<!-- end of jsFiles() macro -->')
	return '\n'.join(l)

class Attr(object):

	@classmethod
	def init(cls):
		# ours
		cls.jschess_depslist=templardefs.deps.depslist()
		cls.jschess_deps=templardefs.deps.deps
		cls.jschess_sources=sources()
		cls.jschess_getJsThirdParty=templardefs.deps.getJsThirdParty()
		cls.jschess_jsFiles=jsFiles()

	@classmethod
	def getdeps(cls):
		return __file__
