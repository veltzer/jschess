'''
templating solution for this project
'''

import subprocess # for check_output, DEVNULL

class Dep:
	def __init__(self,name,version,website,downloadUrl,downloadUrlDebug,
		myFile,myFileDebug,documentation,runtime,downloadCss,css,closure,jsmin):
		self.name=name
		self.version=version
		self.website=website
		self.downloadUrl=downloadUrl
		self.downloadUrlDebug=downloadUrlDebug
		self.myFile=myFile
		self.myFileDebug=myFileDebug
		self.documentation=documentation
		self.runtime=runtime
		self.downloadCss=downloadCss
		self.css=css
		self.closure=closure
		self.jsmin=jsmin

deps=[]
deps.append(Dep(
	'prototype',
	'1.7.3',
	'http://prototypejs.org',
	None,
	'https://ajax.googleapis.com/ajax/libs/prototype/1.7.3.0/prototype.js',
	'thirdparty/prototype.min.js',
	'thirdparty/prototype.js',
	'http://prototypejs.org/learn',
	True,
	None,
	None,
	True,
	False,
))
deps.append(Dep(
	'raphael',
	'2.2.0',
	'http://raphaeljs.com',
	'https://raw.githubusercontent.com/DmitryBaranovskiy/raphael/master/raphael.min.js',
	'https://raw.githubusercontent.com/DmitryBaranovskiy/raphael/master/raphael.js',
	'thirdparty/raphael.min.js',
	'thirdparty/raphael.js',
	'http://raphaeljs.com/reference.html',
	True,
	None,
	None,
	False,
	False,
))
deps.append(Dep(
	'chess.js',
	'0.10.2',
	'https://github.com/jhlywa/chess.js',
	None,
	'https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.2/chess.js',
	'thirdparty/chess.min.js',
	'thirdparty/chess.js',
	'https://github.com/jhlywa/chess.js/blob/master/README.md',
	True,
	None,
	None,
	False,
	True,
))
deps.append(Dep(
	'qunit',
	'2.0.0',
	'https://qunitjs.com',
	None,
	'https://code.jquery.com/qunit/qunit-2.0.0.js',
	'thirdparty/qunit.min.js',
	'thirdparty/qunit.js',
	'https://qunitjs.com',
	False,
	'https://code.jquery.com/qunit/qunit-2.0.0.css',
	'thirdparty/qunit.css',
	False,
	False,
))
deps.append(Dep(
	'highlight.js',
	'9.4.0',
	'https://highlightjs.org/',
	None,
	'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/highlight.min.js',
	None,
	'thirdparty/highlight.min.js',
	'https://highlightjs.org/usage',
	False,
	'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/default.min.css',
	'thirdparty/highlight.min.css',
	False,
	False,
))

def getJsThirdParty():
	l=[]
	for dep in deps:
		if dep.runtime:
			l.append('<script type="text/javascript" src="../'+dep.myFile+'"></script>')
	return '\n'.join(l)

def getJsThirdPartyDebug():
	l=[]
	for dep in deps:
		if dep.runtime:
			l.append('<script type="text/javascript" src="../'+dep.myFileDebug+'"></script>')
	return '\n'.join(l)

def depslist():
	l=[]
	for dep in deps:
		if dep.runtime:
			l.append(dep.myFile)
	return ' '.join(l)

def get_rt_deps():
	l=[]
	for dep in deps:
		if dep.runtime:
			l.append(dep)
	return l

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
	d.jschess_runtimedeps=get_rt_deps()

def getdeps():
	return [__file__]
