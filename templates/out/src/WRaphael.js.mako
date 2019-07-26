<%!
	import user.personal
%>/* vim:set filetype=javascript:*/
/*global Class, Raphael*/


/**
  @class Wrapper for Raphael.js set
  @author ${user.personal.personal_jsdoc_author}
*/
var WSet = Class.create(/** @lends WSet.prototype */{
  /**
    @this {WSet}
    @param {set} set the raphael set that this wraps.
    @param {wrapper} wrapper the raphael wrapper (with paper and all).
    @return {WSet} a new instance of this class.
    @author ${user.personal.personal_jsdoc_author}
  */
  initialize: function(set, wrapper) {
    this.set = set;
    this.wrapper = wrapper;
  },
  /**
    wrapper for the Raphael.js method of the same name.
    Pass anything you want to raphael.
    @this {WSet}
    @return {anything} anything that Raphael.js returns from this method.
    @author ${user.personal.personal_jsdoc_author}
  */
  push: function() {
    var m = this.set.push;
    var r = m.apply(this.set, arguments);
    return r;
  },
  /**
    wrapper for the Raphael.js method of the same name.
    Pass anything you want to raphael.
    @this {WSet}
    @return {anything} anything that Raphael.js returns from this method.
    @author ${user.personal.personal_jsdoc_author}
  */
  remove: function() {
    var m = this.set.remove;
    var r = m.apply(this.set, arguments);
    return r;
  },
  /**
    wrapper for the Raphael.js method of the same name.
    Pass anything you want to raphael.
    @this {WSet}
    @return {anything} anything that Raphael.js returns from this method.
    @author ${user.personal.personal_jsdoc_author}
  */
  forEach: function() {
    var m = this.set.forEach;
    var r = m.apply(this.set, arguments);
    return r;
  },
  /**
    make a set glow
    @this {WSet}
    @param {object} glow_obj parameters to pass to the Raphael.js glow method.
    @return {set} the set of glow objects.
    @author ${user.personal.personal_jsdoc_author}
  */
  glow: function(glow_obj) {
    var nset = this.wrapper.set();
    this.forEach(function(e) {
      nset.push(e.glow(glow_obj));
    },undefined);
    return nset;
  },
  /**
    setup events for this set
    @this {WSet}
    @param {function()} f callback. Callback should receive the type of the
      event.
    @param {object} names of events to register.
    supported are: click, mouseover, mouseout, mousemove, mouseup,
    mousedown.
    @author ${user.personal.personal_jsdoc_author}
  */
  eventRegister: function(f, names) {
    var that = this;
    names.forEach(function(eventName) {
      that.forEach(function(e) {
        switch (eventName) {
          case 'click':
            e.click(function() {
              f(eventName);
            });
            break;
          case 'mouseover':
            e.mouseover(function() {
              f(eventName);
            });
            break;
          case 'mouseout':
            e.mouseout(function() {
              f(eventName);
            });
            break;
          case 'mousemove':
            e.mousemove(function() {
              f(eventName);
            });
            break;
          case 'mouseup':
            e.mouseup(function() {
              f(eventName);
            });
            break;
          case 'mousedown':
            e.mousedown(function() {
              f(eventName);
            });
            break;
          default:
            throw 'unknown event name ' + eventName;
        }
      });
    });
  }
});


/**
  @class Wrapper for Raphael.js
  @author ${user.personal.personal_jsdoc_author}
*/
var WRaphael = Class.create(/** @lends WRaphael.prototype */{
  /**
    creates a new instance.
    Pass anything you want to raphael.
    @this {WRaphael}
    @return {WRaphael} a new instance of this class.
    @author ${user.personal.personal_jsdoc_author}
  */
  initialize: function() {
    this.r = Raphael.apply(undefined, arguments);
  },
  /**
    create a rectangle on the paper.
    Pass anything you want to raphael.
    @this {WRaphael}
    @return {rect} whatever Raphael returns.
    @author ${user.personal.personal_jsdoc_author}
  */
  rect: function() {
    var m = this.r.rect;
    var r = m.apply(this.r, arguments);
    return r;
  },
  /**
    create a set on the paper.
    Pass anything you want to raphael.
    @this {WRaphael}
    @return {set} our wrapper for Raphael sets.
    @author ${user.personal.personal_jsdoc_author}
  */
  set: function() {
    var m = this.r.set;
    var r = m.apply(this.r, arguments);
    return new WSet(r, this);
  },
  /**
    create path on the paper.
    Pass anything you want to raphael.
    @this {WRaphael}
    @return {path} whatever Raphael returns.
    @author ${user.personal.personal_jsdoc_author}
  */
  path: function() {
    var m = this.r.path;
    var r = m.apply(this.r, arguments);
    return r;
  },
  /**
    create text on the paper.
    Pass anything you want to raphael.
    @this {WRaphael}
    @return {text} whatever Raphael returns.
    @author ${user.personal.personal_jsdoc_author}
  */
  text: function() {
    var m = this.r.text;
    var r = m.apply(this.r, arguments);
    return r;
  }
});
