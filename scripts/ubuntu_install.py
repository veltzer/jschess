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

	'yui-compressor',
	'jsdoc-toolkit',
	'closure-linter',
	'python-tweepy',
	'python-tweepy-doc',
	'python-twitter',
	'python-twitter-doc',

	# my own
	'templar',
]
args=['sudo','apt-get','install','--assume-yes']
args.extend(packs)
subprocess.check_call(args)
