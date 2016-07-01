#!/usr/bin/python3

'''
this script will install all the required packages that you need
to compile and work with this package.
'''

###########
# imports #
###########
import subprocess # for check_call, DEVNULL
import os.path # for isfile
import sys # for path
import os # for cwd mkdir, chmod, listdir
import shutil # for rmtree
import urllib.request # for urlretrieve

sys.path.append(os.getcwd())
import templardefs.jschess

##############
# parameters #
##############
tp='thirdparty'
tools='tools'
debug=False
packs=[
	# nodejs and npm for installing javascript packages
	'nodejs',
	'npm',

	'yui-compressor', # for yui-compressor(1)
	'jsdoc-toolkit', # for jsdoc(1)
	'closure-linter', # for gjslint(1)
	'tidy', # for tidy(1)
	'zip', # for zip(1)
	'sloccount', # for sloccount(1)
	'bsdtar', # for bsdtar(1)

	# my own
	'templar',
]
node_packs=[
	'jshint',
	'chess',
	'prototype',
	'qunit',
	'raphael',
	'htmlhint',
	'jsdoc',
	'jslint',
]

########
# code #
########
for pack in packs:
	print('getting ubuntu package for [{0}]'.format(pack))
	subprocess.check_call([
		'sudo',
		'apt-get',
		'install',
		'--assume-yes',
		pack
	], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

for node_pack in node_packs:
	print('getting npm for [{0}]'.format(node_pack))
	subprocess.check_call([
		'npm',
		'--silent',
		'install',
		node_pack,
	], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

if os.path.isdir(tp):
	shutil.rmtree(tp)
os.mkdir(tp)

for dep in templardefs.jschess.deps:
	print('getting javascript library [{0}]'.format(dep.name))
	if dep.downloadUrl:
		if debug:
			print(dep.downloadUrl, dep.myFile)
		urllib.request.urlretrieve(dep.downloadUrl, filename=dep.myFile)
	if dep.downloadUrlDebug:
		if debug:
			print(dep.downloadUrlDebug, dep.myFileDebug)
		urllib.request.urlretrieve(dep.downloadUrlDebug, filename=dep.myFileDebug)
	if dep.downloadCss:
		if debug:
			print(dep.downloadCss, dep.css)
		urllib.request.urlretrieve(dep.downloadCss, filename=dep.css)
	if dep.closure:
		if debug:
			print('doing closure')
		subprocess.check_call([
			'/home/mark/install/closure/closure.jar',
			dep.myFileDebug,
			'--js_output_file',
			dep.myFile,
		], stderr=subprocess.DEVNULL)
	if dep.jsmin:
		if debug:
			print('doing jsmin')
		subprocess.check_call([
			'/home/mark/install/jsmin/jsmin',
			],
			stdout=open(dep.myFile, 'w'),
			stdin=open(dep.myFileDebug),
		)

# chmod all files
for f in os.listdir(tp):
	if debug:
		print('considering [{0}]'.format(f))
	full=os.path.join(tp, f)
	if os.path.isfile(full):
		if debug:
			print('chmodding [{0}]'.format(full))
		os.chmod(full, 0o0444)

if os.path.isdir(tools):
	shutil.rmtree(tools)
os.mkdir(tools)

# install closure
print('install tool [{0}]'.format('closure'))
os.system('wget -qO- https://dl.google.com/closure-compiler/compiler-latest.zip | (cd tools; bsdtar -xf- compiler.jar )');
os.chmod('tools/compiler.jar', 0o0775)
