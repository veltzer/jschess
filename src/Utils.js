

/**
  @class a class to have static utility functions
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var Utils = Class.create(/** @lends Utils# */{
  /**
    creates a new instance
    @return {Utils} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
  }
});


/**
  Unite two javascript objects into a third one.
  Second trumps the first.
  @param {object} o1 first object.
  @param {object} o2 first object.
  @return {object} object which is the unification of the two objects.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.unite = function(o1, o2) {
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
  @param {object} o the object to shalow clone.
  @return {object} object which is a clone of the original one.
  @author mark.veltzer@gmail.com (Mark Veltzer)
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
  Pass as many args as you like to this function.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.fakeUse = function() {
  if (Utils.nottrue) {
    window.junkVar = 'junkVal';
  }
};


/**
  Fake doing something
  This is mainly used to avoid lint warnings.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.pass = function() {
};


/**
  Shallow copy an array
  @param {Array} a the array to copy.
  @return {Array} The copy of the array.
  @author mark.veltzer@gmail.com (Mark Veltzer)
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


/**
  Check the type of a javascript variable
  This method will throw an exception if the check fails.
  @param {anything} v the variable to check.
  @param {string} t the string representation of the name of the
  type v should be of.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.checkType = function(v, t) {
  if (typeof(v) != t) {
    throw 'type is wrong';
  }
};


/**
  Checks whether one dictionary contains all the keys of the
  other Throws an exceptions if that is not the case.
  @param {object} s1 first set.
  @param {object} s2 second set.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.checkContains = function(s1, s2) {
  for (var x in s1) {
    if (!(x in s2)) {
      throw 'key ' + x + ' is bad';
    }
  }
};
