#!/usr/bin/python3

'''
module to help handle javascript dependencies for a piece of software
'''

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

deps=[];
deps.append(Dep(
	'prototype',
	'1.7.1',
	'http://prototypejs.org',
	'not available from the web',
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
		l.append('<script src="../'+dep.myFile+'"></script>')
	return '\n'.join(l)
def getJsThirdPartyDebug():
	l=[]
	for dep in deps:
		l.append('<script src="../'+dep.myFileDebug+'"></script>')
	return '\n'.join(l)

if __name__=='__main__':
	l=[]
	for dep in deps:
		l.append(dep.myFile)
	print(' '.join(l))
