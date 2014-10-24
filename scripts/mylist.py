#!/usr/bin/python3

'''
Show the list of sources for this project in right order
'''

import myutils

for x in myutils.files_in_order():
	print(x)
#print(myutils.files_in_order())
