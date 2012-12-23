#!/usr/bin/python

# this function is here because python2.6 does not have subprocess.check_output
def system_check_output(arg):
	pr=subprocess.Popen(arg,stdout=subprocess.PIPE)
	(output,errout)=pr.communicate()
	status=pr.returncode
	if status:
		raise ValueError('error in executing',arg)
	return output
