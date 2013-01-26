/*jsl:import Utils.js*/
var SvgControls = Class.create(/** @lends SvgControls# */{
  /**
    @class Forward/Backwards controls.
    creates a new instance
    @param {Config} config configuration for this instance.
    @return {SvgControls} the new instance.
    @constructor
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(config) {
    Utils.pass(config);
  }
});
