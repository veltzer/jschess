<%!
	import user.personal
%>/* vim:set filetype=javascript:*/
/*jsl:import Utils.js*/
/*global Class, Utils*/


/**
  @class Forward/Backwards controls.
  @author ${user.personal.jsdoc_author}
*/
var SvgControls = Class.create(/** @lends SvgControls.prototype */{
  /**
    creates a new instance
    @param {Config} config configuration for this instance.
    @return {SvgControls} the new instance.
    @author ${user.personal.jsdoc_author}
  */
  initialize: function(config) {
    Utils.pass(config);
  }
});
