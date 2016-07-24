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
	'out/web/thirdparty/prototype.min.js',
	'out/web/thirdparty/prototype.js',
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
	'out/web/thirdparty/raphael.min.js',
	'out/web/thirdparty/raphael.js',
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
	'out/web/thirdparty/chess.min.js',
	'out/web/thirdparty/chess.js',
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
	'out/web/thirdparty/qunit.min.js',
	'out/web/thirdparty/qunit.js',
	'https://qunitjs.com',
	False,
	'https://code.jquery.com/qunit/qunit-2.0.0.css',
	'out/web/thirdparty/qunit.css',
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
	'out/web/thirdparty/highlight.min.js',
	'https://highlightjs.org/usage',
	False,
	'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/default.min.css',
	'out/web/thirdparty/highlight.min.css',
	False,
	False,
))

def getJsThirdParty():
	l=[]
	for dep in deps:
		if dep.runtime:
			l.append('<script type="text/javascript" src="'+dep.myFile+'"></script>')
	return '\n'.join(l)

def getJsThirdPartyDebug():
	l=[]
	for dep in deps:
		if dep.runtime:
			l.append('<script type="text/javascript" src="'+dep.myFileDebug+'"></script>')
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
#		'out/src/goog.js',
		'out/src/BoardPiece.js',
		'out/src/BoardPosition.js',
		'out/src/Config.js',
		'out/src/ConfigTmpl.js',
		'out/src/Game.js',
		'out/src/GameMove.js',
		'out/src/PgnReader.js',
		'out/src/PieceColor.js',
		'out/src/PiecePosition.js',
		'out/src/PieceType.js',
		'out/src/SvgConfigTmpl.js',
		'out/src/SvgBoard.js',
		'out/src/Board.js',
		'out/src/SvgControls.js',
		'out/src/Controls.js',
		'out/src/SvgCreator.js',
		'out/src/SvgPathAndAttributes.js',
		'out/src/SvgPieceData.js',
		'out/src/SvgPiece.js',
		'out/src/SvgPixelPosition.js',
		'out/src/Utils.js',
		'out/src/WRaphael.js',
	]

def sources():
	return ' '.join(files_in_order())

def jsFiles():
	files=files_in_order()
	l=[]
	l.append('<!-- placed by jsFiles() macro -->')
	for f in files:
		l.append('<script type="text/javascript" src="'+f+'"></script>')
	l.append('<!-- end of jsFiles() macro -->')
	return '\n'.join(l)

def jschess_js_section():
	return '<script type="text/javascript" src="jschess.pack.min.js"></script>'

def jschess_js_section_debug():
	return '<script type="text/javascript" src="jschess.pack.js"></script>'

def jschess_js_section_highlight():
	return '''
		<!-- highlight.js -->
		<script type="text/javascript" src="thirdparty/highlight.min.js"></script>
		<link href="thirdparty/highlight.min.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript">hljs.initHighlightingOnLoad();</script>
	'''

def populate(d):
	# ours
	d.jschess_depslist=depslist()
	d.jschess_deps=deps
	d.jschess_sources=sources()
	d.jschess_getJsThirdParty=getJsThirdParty()
	d.jschess_jsFiles=jsFiles()
	d.jschess_runtimedeps=get_rt_deps()
	d.jschess_js_section=jschess_js_section()
	d.jschess_js_section_debug=jschess_js_section_debug()
	d.jschess_js_section_highlight=jschess_js_section_highlight()

def getdeps():
	return [__file__]
