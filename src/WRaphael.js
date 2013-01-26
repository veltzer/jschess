var WSet = Class.create(
    /** @lends WSet# */
{
    /**
        @class Wrapper for Raphael.js set
        @param set the raphael set that this wraps.
        @param wrapper the raphael wrapper (with paper and all).
        @return a new instance of this class.
        @constructor
        @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
    */
    initialize: function(set, wrapper) {
        this.set = set;
        this.wrapper = wrapper;
    },
    /**
        wrapper for the Raphael.js method of the same name
        @param anything you pass to Raphael.js method of the same name.
        @return anything that Raphael.js returns from this method.
        @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
    */
    push: function() {
        var m = this.set.push;
        var r = m.apply(this.set, arguments);
        return r;
    },
    /**
        wrapper for the Raphael.js method of the same name
        @param anything you pass to Raphael.js method of the same name.
        @return anything that Raphael.js returns from this method.
        @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
    */
    remove: function() {
        var m = this.set.remove;
        var r = m.apply(this.set, arguments);
        return r;
    },
    /**
        wrapper for the Raphael.js method of the same name
        @param anything you pass to Raphael.js method of the same name.
        @return anything that Raphael.js returns from this method.
        @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
    */
    forEach: function() {
        var m = this.set.forEach;
        var r = m.apply(this.set, arguments);
        return r;
    },
    /**
        make a set glow
        @param glow_obj parameters to pass to the Raphael.js glow method.
        @return the set of glow objects.
        @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
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
        @param set set to work on.
        @param f callback. Callback should receive the type of the event.
        @param names of events to register.
        supported are: click, mouseover, mouseout, mousemove, mouseup,
        mousedown.
        @return nothing.
        @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
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

var WRaphael = Class.create(
    /** @lends WRaphael# */
{
    /**
        @class Wrapper for Raphael.js
        creates a new instance
        @param anything you pass to Raphael for initialization.
        @return [WRaphael] a new instance of this class.
        @constructor
        @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
    */
    initialize: function() {
        this.r = Raphael.apply(undefined, arguments);
    },
    /**
        create a rectangle on the paper
        @param anything you pass to Raphael for this method.
        @return whatever Raphael returns.
        @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
    */
    rect: function() {
        var m = this.r.rect;
        var r = m.apply(this.r, arguments);
        return r;
    },
    /**
        create a set on the paper
        @param anything you pass to Raphael for this method.
        @return our wrapper for Raphael sets.
        @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
    */
    set: function() {
        var m = this.r.set;
        var r = m.apply(this.r, arguments);
        return new WSet(r, this);
    },
    /**
        create path on the paper
        @param {anything} anything you pass to Raphael for this method.
        @return {Path} whatever Raphael returns.
        @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
    */
    path: function() {
        var m = this.r.path;
        var r = m.apply(this.r, arguments);
        return r;
    },
    /**
        create text on the paper
        @param {any} anything you pass to Raphael for this method.
        @return {Text} whatever Raphael returns.
        @author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
    */
    text: function() {
        var m = this.r.text;
        var r = m.apply(this.r, arguments);
        return r;
    }
});
