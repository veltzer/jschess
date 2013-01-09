#!/usr/bin/python

from __future__ import print_function
import sys
import mako.template # for mako.template.Template
import mako.lookup # for mako.lookup.TemplateLookup
import os # for os.chmod, os.unlink
import subprocess # for subprocess.check_output
import datetime # for now
import glob # for glob

import versioncheck
import myutils
import deps

def years(x):
	curr_year=datetime.datetime.now().year
	return ','.join(map(str,range(x,curr_year+1)))

def jsFiles():
	#files=glob.glob('src/*.js')
	files=myutils.files_in_order();
	l=[]
	l.append('<!-- placed by jsFiles() macro -->')
	for f in files:
		l.append('<script src="../'+f+'"></script>')
	l.append('<!-- end of jsFiles() macro -->')
	return '\n'.join(l)

if len(sys.argv)!=3:
	print(sys.argv[0]+': usage: '+sys.argv[0]+' [input] [output]',file=sys.stderr)
	sys.exit(1)

input_encoding='utf-8'
output_encoding='utf-8'
p_input=sys.argv[1]
p_output=sys.argv[2]

def get_attr():
	attr={}
	attr['ver']=subprocess.check_output(['./scripts/tagname.py']).rstrip()
	attr['copyright_years']=years
	attr['deps']=deps.deps
	attr['jsThirdParty']=deps.getJsThirdParty
	attr['jsFiles']=jsFiles
	return attr

try:
	os.unlink(p_output)
except:
	# handle the error better, only non existant file should be glossed over...
	pass
try:
	mylookup=mako.lookup.TemplateLookup(directories=['.'],input_encoding=input_encoding,output_encoding=output_encoding)
	template=mako.template.Template(filename=p_input,lookup=mylookup,output_encoding=output_encoding,input_encoding=input_encoding)
	file=open(p_output,'w')
	# python 3
	#file.write((template.render_unicode(attributes={})))
	# python 2
	file.write(template.render(**get_attr()))
	file.close()
	# python 3
	#os.chmod(p_output,0o0444)
	# python 2
	os.chmod(p_output,0444)
except Exception,e:
	print('unlinking output')
	os.unlink(p_output)
	raise e
