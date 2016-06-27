#!/usr/bin/python3

import os.path # for dirname, isfile
import sys # for path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
import templardefs.jschess
import shutil # for rmtree
import urllib.request # for urlretrieve
import os # for mkdir, chmod, listdir
import subprocess # for check_call, DEVNULL

tp='thirdparty'
debug=True

if os.path.isdir(tp):
	shutil.rmtree(tp)
os.mkdir(tp)

for dep in templardefs.jschess.deps:
	print('doing [{0}]'.format(dep.name))
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
