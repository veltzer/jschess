#!/usr/bin/python

from __future__ import print_function

"""
module to help handle javascript dependencies for a piece of software
"""

class Dep:
	def __init__(self,name,version,website,downloadUrl,myFile,myFileDebug,documentation):
		self.name=name
		self.version=version
		self.website=website
		self.downloadUrl=downloadUrl
		self.myFile=myFile
		self.myFileDebug=myFileDebug
		self.documentation=documentation

deps=[];
deps.append(Dep(
		'prototype',
		'1.7.1',
		'http://prototypejs.org',
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
		'thirdparty/raphael-2.1.0.min.js',
		'thirdparty/raphael-2.1.0.js',
		'http://raphaeljs.com/reference.html',
))

def getJsThirdParty():
	l=[]
	l.append('<!-- placed by auto tool, do not edit -->');
	for dep in deps:
		l.append('<script src="../'+dep.myFile+'"></script>')
	l.append('<!-- end of auto tool -->');
	return '\n'.join(l)

def getJsThirdPartyDebug():
	l=[]
	l.append('<!-- placed by auto tool, do not edit -->');
	for dep in deps:
		l.append('<script src="../'+dep.myFileDebug+'"></script>')
	l.append('<!-- end of auto tool -->');
	return '\n'.join(l)

if __name__=='__main__':
	l=[]
	for dep in deps:
		l.append(dep.myFile)
	print(' '.join(l))
