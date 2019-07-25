<%!
	import config.personal
%>/* vim:set filetype=javascript:*/
/*jsl:import Utils.js*/
/*global Class, Utils*/


/**
  @class Forward/Backwards controls.
  @author ${config.personal.personal_jsdoc_author}
*/
var SvgControls = Class.create(/** @lends SvgControls.prototype */{
  /**
    creates a new instance
    @param {Config} config configuration for this instance.
    @return {SvgControls} the new instance.
    @author ${config.personal.personal_jsdoc_author}
  */
  initialize: function(config) {
    Utils.pass(config);
  }
});
