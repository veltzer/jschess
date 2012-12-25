#!/usr/bin/python

# this scripts retuns the tagname for the build

import subprocess # for subprocess.check_output

try:
	f=open("/dev/null")
	ver=subprocess.check_output(["git", "describe"],stderr=f).rstrip()
	print ver
except:
	print "test"
