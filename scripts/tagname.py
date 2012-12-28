#!/usr/bin/python

# this scripts retuns the tagname for the build

import subprocess # for subprocess.check_output

def get_version():
	try:
		f=open("/dev/null")
		ver=subprocess.check_output(["git", "describe"],stderr=f).rstrip()
		return ver
	except:
		return "test"

print get_version()
