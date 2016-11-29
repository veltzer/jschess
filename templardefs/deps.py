'''
dependencies for this project
'''

def populate(d):
    d.tools=[
        'jsl',
        'jsmin',
        'closure',
        'css-validator',
    ]
    d.packs=[
        # for installing javascript packages
        'nodejs',
        # for installing javascript packages
        'npm',
        # for yui-compressor(1)
        'yui-compressor',
        # for jsdoc(1)
        'jsdoc-toolkit',
        # for gjslint(1)
        'closure-linter',
        # for tidy(1)
        'tidy',
        # for zip(1)
        'zip',
        # for sloccount(1)
        'sloccount',
        # for bsdtar(1)
        'bsdtar',
        # for templating
        'templar',
    ]

def get_deps():
    return [
        __file__, # myself
    ]
