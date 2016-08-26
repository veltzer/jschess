'''
dependencies for this project
'''

def populate(d):
    d.tools=['jsl','jsmin','closure','css-validator']

def getdeps():
    return [
        __file__, # myself
    ]
