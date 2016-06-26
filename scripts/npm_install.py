#!/usr/bin/python3

'''
this script will install all the required packages that you need on
ubuntu to compile and work with this package.
'''

import subprocess # for check_call

packs=[
	'chess',
	'prototype',
	'qunit',
	'raphael',
]
for pack in packs:
	args=['npm', 'install', pack]
	subprocess.check_call(args)
