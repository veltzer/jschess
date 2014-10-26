'''
templating solution for this project
'''

import datetime # for datetime
import subprocess # for check_output
import os.path # for join, expanduser
import glob # for glob
import socket # for gethostname
import configparser # for ConfigParser

import templardefs.deps # for deps, getJsThirdParty, getJsThirdPartyDebug
import templardefs.myutils # for files_in_order

def copyright_years(x):
	curr_year=datetime.datetime.now().year
	return ', '.join(map(str,range(x,curr_year+1)))

def git_describe():
	try:
		ver=subprocess.check_output(['git', 'describe'],stderr=subprocess.DEVNULL).decode().rstrip()
		return ver
	except:
		return 'test'

def jsFiles():
	#files=glob.glob('src/*.js')
	files=templardefs.myutils.files_in_order();
	l=[]
	l.append('<!-- placed by jsFiles() macro -->')
	for f in files:
		l.append('<script src="../'+f+'"></script>')
	l.append('<!-- end of jsFiles() macro -->')
	return '\n'.join(l)

class Attr(object):

	@classmethod
	def read_ini(cls, filename, sections):
		ini_file=os.path.expanduser(filename)
		if os.path.isfile(ini_file):
			ini_config=configparser.ConfigParser()
			ini_config.read(ini_file)
			for section in sections:
				for k,v in ini_config.items(section):
					setattr(cls, '{0}_{1}'.format(section, k), v)


	@classmethod
	def init(cls):
		# general # TODO: get homedir in python
		cls.general_current_year=datetime.datetime.now().year
		cls.general_homedir='/home/mark'
		#cls.general_hostname=subprocess.check_output(['hostname']).decode().rstrip()
		cls.general_hostname=socket.gethostname()
		cls.general_domainname=subprocess.check_output(['hostname','--domain']).decode().rstrip()

		# git stuff
		cls.git_describe=git_describe();

		# project
		cls.project_copyright_years=copyright_years
		cls.project_deps=templardefs.deps.deps
		cls.project_jsThirdParty=templardefs.deps.getJsThirdParty()
		cls.project_jsThirdPartyDebug=templardefs.deps.getJsThirdPartyDebug()
		cls.project_jsFiles=jsFiles()

		# ini files
		cls.read_ini('~/.details.ini',['personal', 'github'])

		# apt
		cls.apt_protocol='https'
		cls.apt_codename=subprocess.check_output(['lsb_release','--codename', '--short']).decode().rstrip()
		cls.apt_arch=subprocess.check_output('dpkg-architecture | grep -e ^DEB_BUILD_ARCH= | cut -d = -f 2', shell=True).decode().rstrip()
		cls.apt_archs='i386 {0} source'.format(cls.apt_arch)
		cls.apt_component='main'
		cls.apt_folder='apt'
		cls.apt_service_dir=os.path.join(cls.general_homedir, 'public_html/public', cls.apt_folder)
		cls.apt_except='50{0}'.format(cls.personal_slug)
		cls.apt_pack_list=glob.glob(os.path.join(cls.general_homedir, 'packages', '*.deb'))
		cls.apt_packlist=' '.join(cls.apt_pack_list)
		cls.apt_id=subprocess.check_output(['lsb_release','--id', '--short']).decode().rstrip()
		cls.apt_keyfile='public_key.gpg'
		cls.apt_apache_site_file='{0}.apt'.format(cls.personal_slug)

		# ours
		cls.depslist=templardefs.deps.depslist()
		cls.sources=templardefs.myutils.sources()

	@classmethod
	def getdeps(cls):
		return ' '.join([
			'templardefs/attr.py',
			os.path.expanduser('~/.details.ini'),
			'/etc/hostname',
		])
