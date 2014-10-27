#!/usr/bin/python3

'''
this is a release script.
it runs git status -s in order to see that everything is commited.
it then tags the current tree with one + the old tag.
it then cleans and then rebuilds everything and puts the results in the output.

TODO:
- add integration with twitter and facebook to announce new versions.
- try to use a better git interface (there are native python git interfaces).
'''

###########
# imports #
###########
import subprocess # for check_output, check_call, DEVNULL
import os # for getcwd
import versioncheck

##############
# parameters #
##############
# do you want debug info printed?
opt_debug=True
# do you want to check if everything is commited ? Answer True to this
# unless you are doing development on this script...
opt_check=True
# what is the name of the project?
opt_project=os.getcwd().split('/')[-1]
# do release?
opt_release=False

#############
# functions #
#############
def get_version():
	try:
		ver=subprocess.check_output(['git', 'describe','--abbrev=0'], stderr=subprocess.DEVNULL).decode().rstrip()
		return int(ver)
	except:
		return 'test'

########
# code #
########
if opt_check:
	out=subprocess.check_output(['git','status','-s']).decode()
	if out!='':
		raise ValueError('first commit everything, then call me...')
tag=get_version();
if tag!='test':
	if opt_debug:
		print('old tag is [{0}]'.format(tag))
	tag+=1
	if opt_debug:
		print('new tag is [{0}]'.format(tag))
	tag=str(tag)
	# tag the new tag
	subprocess.check_call(['git','tag','-s','-m',opt_project+' version '+tag,tag], stdout=subprocess.DEVNULL)

subprocess.check_call(['make','clean'])
subprocess.check_call(['make','install'])
if opt_release and tag!='test':
	import releasemanager # for ReleaseManager
	rm=releasemanager.ReleaseManager()
	rm.release()
