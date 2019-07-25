# this is wrong for the tag since they may not be alphabetically ordered...
# tag=subprocess.check_output(['git', 'tag']).decode().rstrip()
# if tag!='':
#    d.git_last_tag=tag.split()[-1].rstrip()
# else:
#    d.git_last_tag='no git tag yet'

# this is right
import subprocess

last_tag = subprocess.check_output(['git', 'describe', '--abbrev=0', '--tags'],
                                       stderr=subprocess.DEVNULL).decode().rstrip()
describe = subprocess.check_output(['git', 'describe'], stderr=subprocess.DEVNULL).decode().rstrip()
version = '.'.join(describe.split('-'))
