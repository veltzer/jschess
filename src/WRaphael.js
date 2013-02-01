

/**
  @class Wrapper for Raphael.js set
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var WSet = Class.create(/** @lends WSet# */{
  /**
    @param {set} the raphael set that this wraps.
    @param {wrapper} the raphael wrapper (with paper and all).
    @return {WSet} a new instance of this class.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(set, wrapper) {
    this.set = set;
    this.wrapper = wrapper;
  },
  /**
    wrapper for the Raphael.js method of the same name
    @param {anything} anything you pass to Raphael.js method of the same name.
    @return {anything} anything that Raphael.js returns from this method.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  push: function() {
    var m = this.set.push;
    var r = m.apply(this.set, arguments);
    return r;
  },
  /**
    wrapper for the Raphael.js method of the same name
    @param {anything} anything you pass to Raphael.js method of the same name.
    @return {anything} anything that Raphael.js returns from this method.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  remove: function() {
    var m = this.set.remove;
    var r = m.apply(this.set, arguments);
    return r;
  },
  /**
    wrapper for the Raphael.js method of the same name
    @param {anything} anything you pass to Raphael.js method of the same name.
    @return {anything} anything that Raphael.js returns from this method.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  forEach: function() {
    var m = this.set.forEach;
    var r = m.apply(this.set, arguments);
    return r;
  },
  /**
    make a set glow
    @param {object} glow_obj parameters to pass to the Raphael.js glow method.
    @return {set} the set of glow objects.
    @author mark.veltzer@gmail.com (Mark Veltzer)
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
    @param {function} f callback. Callback should receive the type of the event.
    @param {object} names of events to register.
    supported are: click, mouseover, mouseout, mousemove, mouseup,
    mousedown.
    @return {nothing} nothing.
    @author mark.veltzer@gmail.com (Mark Veltzer)
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
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var WRaphael = Class.create(/** @lends WRaphael# */{
  /**
    creates a new instance
    @param {anything} anything you pass to Raphael for initialization.
    @return {WRaphael} a new instance of this class.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
    this.r = Raphael.apply(undefined, arguments);
  },
  /**
    create a rectangle on the paper
    @param {anything} anything you pass to Raphael for this method.
    @return {rect} whatever Raphael returns.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  rect: function() {
    var m = this.r.rect;
    var r = m.apply(this.r, arguments);
    return r;
  },
  /**
    create a set on the paper
    @param {anything} anything you pass to Raphael for this method.
    @return {set} our wrapper for Raphael sets.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  set: function() {
    var m = this.r.set;
    var r = m.apply(this.r, arguments);
    return new WSet(r, this);
  },
  /**
    create path on the paper
    @param {anything} anything you pass to Raphael for this method.
    @return {path} whatever Raphael returns.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  path: function() {
    var m = this.r.path;
    var r = m.apply(this.r, arguments);
    return r;
  },
  /**
    create text on the paper
    @param {anything} anything you pass to Raphael for this method.
    @return {text} whatever Raphael returns.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  text: function() {
    var m = this.r.text;
    var r = m.apply(this.r, arguments);
    return r;
  }
});
