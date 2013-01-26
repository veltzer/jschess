var Utils = Class.create(
    /** @lends Utils# */
{
    /**
        @class a class to have static utility functions
        creates a new instance
        @return the new instance.
        @constructs
        @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
    */
    initialize: function() {
    }
});
/**
     Unite two javascript objects into a third one.
    Second trumps the first.
    @param o1 first object.
    @param o2 first object.
    @return object which is the unification of the two objects.
    @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Utils.unite = function(o1,o2) {
    var ret = {};
    for (var x in o1) {
        ret[x] = o1[x];
    }
    for (var y in o2) {
        ret[y] = o2[y];
    }
    return ret;
};
/**
    Clone a javascript object
    @param o the object to shalow clone.
    @return object which is a clone of the original one.
    @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Utils.clone = function(o) {
    var ret = {};
    for (var x in o) {
        ret[x] = o[x];
    }
    return ret;
};
/**
    Fake using a parameter.
    This is mainly used to avoid lint warnings.
    @param o the object to use.
    @return nothing.
    @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Utils.fakeUse = function(o) {
    if (Utils.nottrue) {
        window.junkVar = o;
    }
};
/**
    Fake doing something
    This is mainly used to avoid lint warnings.
    @return nothing.
    @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Utils.pass = function() {
};
/**
    Shallow copy an array
    @param a the array to copy.
    @return The copy of the array.
    @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Utils.arrClone = function(a) {
    return a.slice();
    /*
    var ret=[];
    a.forEach(function(x) {
        ret.push(x);
    });
    return ret;
    */
};
Utils.checkType = function(v,t) {
    if (typeof(v) != t) {
        throw 'type is wrong';
    }
};
/**
    Checks whether one dictionary contains all the keys of the other Throws an exceptions if that is not the case.
    @param s1 first set.
    @param s2 second set.
    @return nothing.
    @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
Utils.checkContains = function(s1,s2) {
    for (var x in s1) {
        if (!(x in s2)) {
            throw 'key ' + x + ' is bad';
        }
    }
};
