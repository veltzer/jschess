<%!
	import config.personal
%>/* vim:set filetype=javascript:*/
/*global Class*/


/**
  @class a class to have static utility functions
  @author ${config.personal.personal_jsdoc_author}
*/
var Utils = Class.create(/** @lends Utils.prototype */{
  /**
    creates a new instance
    @return {Utils} the new instance.
    @author ${config.personal.personal_jsdoc_author}
  */
  initialize: function() {
    return;
  }
});


/**
  Unite two javascript objects into a third one.
  Second trumps the first.
  @param {object} o1 first object.
  @param {object} o2 first object.
  @return {object} object which is the unification of the two objects.
  @author ${config.personal.personal_jsdoc_author}
*/
Utils.unite = function(o1, o2) {
  var ret = {};
  var x, y;
  for (x in o1) {
    ret[x] = o1[x];
  }
  for (y in o2) {
    ret[y] = o2[y];
  }
  return ret;
};


/**
  Clone a javascript object
  @param {object} o the object to shalow clone.
  @return {object} object which is a clone of the original one.
  @author ${config.personal.personal_jsdoc_author}
*/
Utils.clone = function(o) {
  var ret = {};
  var x;
  for (x in o) {
    ret[x] = o[x];
  }
  return ret;
};


/**
  Fake using a parameter.
  This is mainly used to avoid lint warnings.
  Pass as many args as you like to this function.
  @author ${config.personal.personal_jsdoc_author}
*/
Utils.fakeUse = function() {
  if (Utils.nottrue) {
    window.junkVar = 'junkVal';
  }
};


/**
  Fake doing something
  This is mainly used to avoid lint warnings.
  Pass as many args as you like to this function.
  @author ${config.personal.personal_jsdoc_author}
*/
Utils.pass = function() {
  return;
};


/**
  Shallow copy an array
  @param {Array} a the array to copy.
  @return {Array} The copy of the array.
  @author ${config.personal.personal_jsdoc_author}
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
  Return the type of a variable
  @param {anything} v the variable
  @return {string} the type.
  @author ${config.personal.personal_jsdoc_author}
*/
Utils.getType = function(v) {
  return typeof v;
};


/**
  Check the type of a javascript variable
  This method will throw an exception if the check fails.
  @param {anything} v the variable to check.
  @param {string} t the string representation of the name of the
  type v should be of.
  @author ${config.personal.personal_jsdoc_author}
*/
Utils.checkType = function(v, t) {
  if (Utils.getType(v) !== t) {
    throw 'type is wrong';
  }
};


/**
  Checks whether one dictionary contains all the keys of the
  other Throws an exceptions if that is not the case.
  @param {object} s1 first set.
  @param {object} s2 second set.
  @author ${config.personal.personal_jsdoc_author}
*/
Utils.checkContains = function(s1, s2) {
  var x;
  for (x in s1) {
    if (!(s2.hasOwnProperty(x))) {
      throw 'key ' + x + ' is bad';
    }
  }
};


/**
  Checks whether one dictionary key set equals that of another.
  other Throws an exceptions if that is not the case.
  @param {object} s1 first set.
  @param {object} s2 second set.
  @author ${config.personal.personal_jsdoc_author}
*/
Utils.checkEquals = function(s1, s2) {
  Utils.checkContains(s1, s2);
  Utils.checkContains(s2, s1);
};
