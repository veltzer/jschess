'''
templating solution for this project
'''

import datetime # for datetime
import subprocess # for check_output, DEVNULL
import cgi # for escape

class Dep:
	def __init__(self,name,version,website,downloadUrl,downloadUrlDebug,myFile,myFileDebug,documentation):
		self.name=name
		self.version=version
		self.website=website
		self.downloadUrl=downloadUrl
		self.downloadUrlDebug=downloadUrlDebug
		self.myFile=myFile
		self.myFileDebug=myFileDebug
		self.documentation=documentation

deps=[]
deps.append(Dep(
	'prototype',
	'1.7.1',
	'http://prototypejs.org',
	None,
	'https://ajax.googleapis.com/ajax/libs/prototype/1.7.1.0/prototype.js',
	'thirdparty/prototype-1.7.1.min.js',
	'thirdparty/prototype-1.7.1.js',
	'http://prototypejs.org/learn',
))
deps.append(Dep(
	'raphael',
	'2.1.0',
	'http://raphaeljs.com',
	'http://github.com/DmitryBaranovskiy/raphael/raw/master/raphael-min.js',
	'http://github.com/DmitryBaranovskiy/raphael/raw/master/raphael.js',
	'thirdparty/raphael-2.1.0.min.js',
	'thirdparty/raphael-2.1.0.js',
	'http://raphaeljs.com/reference.html',
))
deps.append(Dep(
	'chess.js',
	'v0.1-47-gb7c9788',
	'https://github.com/jhlywa/chess.js',
	'https://github.com/jhlywa/chess.js/raw/master/chess.min.js',
	'https://github.com/jhlywa/chess.js/raw/master/chess.js',
	'thirdparty/chess.min.js',
	'thirdparty/chess.js',
	'https://github.com/jhlywa/chess.js/blob/master/README.md',
))

def getJsThirdParty():
	l=[]
	for dep in deps:
		l.append('<script type="text/javascript" src="../'+dep.myFile+'"></script>')
	return '\n'.join(l)

def getJsThirdPartyDebug():
	l=[]
	for dep in deps:
		l.append('<script type="text/javascript" src="../'+dep.myFileDebug+'"></script>')
	return '\n'.join(l)

def depslist():
	l=[]
	for dep in deps:
		l.append(dep.myFile)
	return ' '.join(l)

def git_describe():
	try:
		ver=subprocess.check_output(['git', 'describe'],stderr=subprocess.DEVNULL).decode().rstrip()
		return ver
	except:
		return 'test'

def files_in_order():
	return [
		'src/goog.js',
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
	]

def sources():
	return ' '.join(files_in_order())

def jsFiles():
	files=files_in_order()
	l=[]
	l.append('<!-- placed by jsFiles() macro -->')
	for f in files:
		l.append('<script type="text/javascript" src="../'+f+'"></script>')
	l.append('<!-- end of jsFiles() macro -->')
	return '\n'.join(l)

def populate(d):
	# ours
	d.jschess_depslist=depslist()
	d.jschess_deps=deps
	d.jschess_sources=sources()
	d.jschess_getJsThirdParty=getJsThirdParty()
	d.jschess_jsFiles=jsFiles()

def getdeps():
	return [__file__]
