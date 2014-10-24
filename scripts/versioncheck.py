#!/usr/bin/python3

import sys

def checkversion():
	if sys.version_info[0:2] != (3,4):
		raise Exception('you must use python 3.4')

#if __name__=='__main__':
#	checkversion()

checkversion()
