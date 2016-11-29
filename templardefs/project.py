'''
project definitions for templar
'''

def populate(d):
    d.project_github_username='veltzer'
    d.project_name='jschess'
    d.project_website='https://{project_github_username}.github.io/{project_name}'.format(**d)
    d.project_website_source='https://github.com/{project_github_username}/{project_name}'.format(**d)
    d.project_website_git='git://github.com/{project_github_username}/{project_name}.git'.format(**d)
    d.project_paypal_donate_button_id='XKSSBRVJM7HHA'
    d.project_google_analytics_tracking_id='UA-80188541-1'
    d.project_long_description='jschess is a JavaScript based chess board'
    d.project_keywords=[
        'JavaScript',
        'chess',
        'board',
        'chessboard',
    ]
    d.project_year_started='2012'
    d.project_description='''jschess is a JavaScript chess board written in pure JavaScript.
It allows yo to create a chess board, have it show games in PGN
notation from a server, moves pieces around, set up positions
and more.

Technologies used
-----------------
* Prototype javascript library at http://prototypejs.org.
* Raphael javascript library at http://raphaeljs.com.
* chess.java javascript library at https://github.com/jhlywa/chess.js.

Demo
----
Is at github pages at {project_website}.

What makes jschess different?
-----------------------------
* Pure javascript.
* No images - totally scalable graphics.
* You can have your board at any size you want (because of scalable graphics).
* As a result of being pure javascript totally controllable programatically.
* Looks best.
* Sits on top of good infrastructure (prototype.js,raphael.js,chess.js).

Monetary contribution
---------------------
If you'd like to see a feature added to jschess or would just like to show
your appreciation you are welcome to contribute to it's development at
{project_website}.
I am ready to work with any chess organization wishing to incorporate jschess
into their infrastructre and am already working with two such organizations...'''.format(**d)

def get_deps():
    return [
        __file__, # myself
    ]
