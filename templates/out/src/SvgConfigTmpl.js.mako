<%!
	import user.personal
%>/* vim:set filetype=javascript:*/
/*jsl:import ConfigTmpl.js*/
/*global ConfigTmpl, Class */


/**
  @class Singleton configuration for jschess
  @author ${user.personal.jsdoc_author}
*/
var SvgConfigTmpl = Class.create(ConfigTmpl,/** @lends SvgConfigTmpl.prototype */ {
  /**
    creates a new instance
    @this {SvgConfigTmpl}
    @param {parent} $super prototype.js parent to enable to call the
    parent constructur.
    @return {SvgConfigTmpl} the new instance.
    @author ${user.personal.jsdoc_author}
  */
  initialize: function($super) {
    $super();
    this.add({
      name: 'id',
      type: 't_string',
      required: true,
      description: 'id where to place the board',
      defaultValue: undefined
    });
    this.add({
      name: 'size',
      type: 't_number',
      required: false,
      description: 'size of the board',
      defaultValue: 500
    });
    this.add({
      name: 'black_color',
      type: 't_string',
      required: false,
      description: 'color of the black pieces',
      defaultValue: '#000000'
    });
    this.add({
      name: 'white_color',
      type: 't_string',
      required: false,
      description: 'color of the white pieces',
      defaultValue: '#ffffff'
    });
    this.add({
      name: 'black_square_color',
      type: 't_string',
      required: false,
      description: 'color of the black squares',
      defaultValue: '#819faa'
    });
    this.add({
      name: 'white_square_color',
      type: 't_string',
      required: false,
      description: 'color of the white squares',
      defaultValue: '#ffffff'
    });
    this.add({
      name: 'black_square_gradient',
      type: 't_string',
      required: false,
      description: 'gradient for black squares',
      defaultValue: '0-#91afba:0-#819faa:50-#819faa:100'
    });
    this.add({
      name: 'white_square_gradient',
      type: 't_string',
      required: false,
      description: 'gradient for white squares',
      defaultValue: '0-#eee:0-#fff:50-#fff:100'
    });
    // TODO: turn this to an enum: white, black, left, right
    this.add({
      name: 'boardview',
      type: 't_string',
      required: false,
      description: 'what board view to use',
      defaultValue: 'white'
    });
    this.add({
      name: 'move_ms',
      type: 't_number',
      required: false,
      description: 'ms for moving animation',
      defaultValue: 350
    });
    this.add({
      name: 'flip_ms',
      type: 't_number',
      required: false,
      description: 'how fast should flip work in ms',
      defaultValue: 350
    });
    this.add({
      name: 'pencolor',
      type: 't_string',
      required: false,
      description: 'pen color for drawing the shapes',
      defaultValue: 'black'
    });
    this.add({
      name: 'gradients',
      type: 't_boolean',
      required: false,
      description: 'should we use gradients?',
      defaultValue: true
    });
    this.add({
      name: 'select_color',
      type: 't_string',
      required: false,
      description: 'color of selected squares',
      defaultValue: '#ffff00'
    });
    this.add({
      name: 'over_color',
      type: 't_string',
      required: false,
      description: 'color of selected squares',
      defaultValue: '#00ff00'
    });
    this.add({
      name: 'do_select_click',
      type: 't_boolean',
      required: false,
      description: 'should we select clicks',
      defaultValue: false
    });
    this.add({
      name: 'do_select_square',
      type: 't_boolean',
      required: false,
      description: 'should we select squares',
      defaultValue: true
    });
    this.add({
      name: 'do_select_piece',
      type: 't_boolean',
      required: false,
      description: 'should we select pieces',
      defaultValue: true
    });
    this.add({
      name: 'do_select_global',
      type: 't_boolean',
      required: false,
      description: 'should we select pieces via the global variables',
      defaultValue: false
    });
    this.add({
      name: 'do_select_piecerec',
      type: 't_boolean',
      required: false,
      description: 'should we select pieces via the global variables',
      defaultValue: false
    });
    this.add({
      name: 'do_letters',
      type: 't_boolean',
      required: false,
      description: 'draw letters around the board',
      defaultValue: true
    });
    this.add({
      name: 'rec_stroke_color',
      type: 't_string',
      required: false,
      description: 'rectangles stroke color',
      defaultValue: 'black'
    });
    this.add({
      name: 'rec_stroke_width',
      type: 't_number',
      required: false,
      description: 'rectangles stroke width',
      defaultValue: 0.1
    });
    this.add({
      name: 'glow_width',
      type: 't_number',
      required: false,
      description: 'glow width',
      defaultValue: 7
    });
    this.add({
      name: 'glow_fill',
      type: 't_boolean',
      required: false,
      description: 'glow fill',
      defaultValue: false
    });
    this.add({
      name: 'glow_opacity',
      type: 't_number',
      required: false,
      description: 'glow opacity',
      defaultValue: 0.5
    });
    this.add({
      name: 'glow_offsetx',
      type: 't_number',
      required: false,
      description: 'glow offsetx',
      defaultValue: 0
    });
    this.add({
      name: 'glow_offsety',
      type: 't_number',
      required: false,
      description: 'glow offsety',
      defaultValue: 0
    });
    this.add({
      name: 'glow_color',
      type: 't_string',
      required: false,
      description: 'glow color',
      defaultValue: 'black'
    });
    this.add({
      name: 'partial',
      type: 't_number',
      required: false,
      description: 'how many squares for borders',
      defaultValue: 0.6
    });
  }
});


/**
  The static singleton instance.
  This is part of the singleton pattern.
  @author ${user.personal.jsdoc_author}
*/
SvgConfigTmpl.instance = undefined;


/**
  The static singleton instance.
  This is part of the singleton pattern.
  @return {SvgConfigTmpl} the singleton SvgConfigTmpl instance.
  @author ${user.personal.jsdoc_author}
*/
SvgConfigTmpl.getInstance = function() {
  if (SvgConfigTmpl.instance === undefined) {
    SvgConfigTmpl.instance = new SvgConfigTmpl();
  }
  return SvgConfigTmpl.instance;
};
