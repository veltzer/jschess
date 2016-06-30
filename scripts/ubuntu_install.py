#!/usr/bin/python3

'''
this script will install all the required packages that you need on
ubuntu to compile and work with this package.
'''

import subprocess # for check_call

packs=[
	# nodejs and npm for installing javascript packages
	'nodejs',
	'npm',

	'yui-compressor', # for yui-compressor(1)
	'jsdoc-toolkit', # for jsdoc(1)
	'closure-linter', # for gjslint(1)
	'tidy', # for tidy(1)

	# my own
	'templar',
]
args=['sudo','apt-get','install','--assume-yes']
args.extend(packs)
subprocess.check_call(args)

node_packs=[
	'jshint',
]

for node_pack in node_packs:
	subprocess.check_call([
		'npm',
		'install',
		node_pack,
	])
