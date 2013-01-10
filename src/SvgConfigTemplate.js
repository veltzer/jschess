/*jsl:import ConfigTemplate.js*/
var SvgConfigTemplate=Class.create(ConfigTemplate,
	/** @lends SvgConfigTemplate# */
{
	/**
		@class Singleton configuration for jschess
		@description creates a new instance
		@constructor
		@param config configuration for this board
		@returns the new instance
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function($super) {
		$super();
		this.add({
			name:'id',
			type:'string',
			required:true,
			description:'id where to place the board'
		});
		this.add({
			name:'size',
			type:'number',
			required:false,
			description:'size of the board',
			defaultValue:500
		});
		this.add({
			name:'black_color',
			type:'string',
			required:false,
			description:'color of the black pieces',
			defaultValue:'000000'
		});
		this.add({
			name:'white_color',
			type:'string',
			required:false,
			description:'color of the white pieces',
			defaultValue:'ffffff'
		});
		this.add({
			name:'black_square_color',
			type:'string',
			required:false,
			description:'color of the black squares',
			defaultValue:'819faa'
		});
		this.add({
			name:'white_square_color',
			type:'string',
			required:false,
			description:'color of the white squares',
			defaultValue:'ffffff'
		});
		this.add({
			name:'black_square_gradient',
			type:'string',
			required:false,
			description:'gradient for black squares',
			defaultValue:'0-#91afba:0-819faa:50-819faa:100'
		});
		this.add({
			name:'white_square_gradient',
			type:'string',
			required:false,
			description:'gradient for white squares',
			defaultValue:'0-#eee:0-#fff:50-#fff:100'
		});
		this.add({
			name:'flipview',
			type:'boolean',
			required:false,
			description:'is the board flipped',
			defaultValue:false
		});
		this.add({
			name:'move_ms',
			type:'number',
			required:false,
			description:'ms for moving animation',
			defaultValue:350
		});
		this.add({
			name:'flip_ms',
			type:'number',
			required:false,
			description:'how fast should flip work in ms',
			defaultValue:350
		});
		this.add({
			name:'pencolor',
			type:'string',
			required:false,
			description:'pen color for drawing the shapes',
			defaultValue:'black'
		});
		this.add({
			name:'gradients',
			type:'boolean',
			required:false,
			description:'should we use gradients?',
			defaultValue:true
		});
		this.add({
			name:'select_color',
			type:'string',
			required:false,
			description:'color of selected squares',
			defaultValue:'ffff00'
		});
		this.add({
			name:'over_color',
			type:'string',
			required:false,
			description:'color of selected squares',
			defaultValue:'00ff00'
		});
		this.add({
			name:'do_select_click',
			type:'boolean',
			required:false,
			description:'should we select clicks',
			defaultValue:false
		});
		this.add({
			name:'do_select_square',
			type:'boolean',
			required:false,
			description:'should we select squares',
			defaultValue:true
		});
		this.add({
			name:'do_select_piece',
			type:'boolean',
			required:false,
			description:'should we select pieces',
			defaultValue:true
		});
		this.add({
			name:'do_select_global',
			type:'boolean',
			required:false,
			description:'should we select pieces via the global variables',
			defaultValue:false
		});
		this.add({
			name:'do_select_piecerec',
			type:'boolean',
			required:false,
			description:'should we select pieces via the global variables',
			defaultValue:true
		});
		this.add({
			name:'do_letters',
			type:'boolean',
			required:false,
			description:'draw letters around the board',
			defaultValue:true
		});
		this.add({
			name:'rec_stroke_color',
			type:'string',
			required:false,
			description:'rectangles stroke color',
			defaultValue:'black'
		});
		this.add({
			name:'rec_stroke_width',
			type:'number',
			required:false,
			description:'rectangles stroke width',
			defaultValue:0.1
		});
		this.add({
			name:'glow_width',
			type:'number',
			required:false,
			description:'glow width',
			defaultValue:10
		});
		this.add({
			name:'glow_fill',
			type:'boolean',
			required:false,
			description:'glow fill',
			defaultValue:false
		});
		this.add({
			name:'glow_opacity',
			type:'number',
			required:false,
			description:'glow opacity',
			defaultValue:0.5
		});
		this.add({
			name:'glow_offsetx',
			type:'number',
			required:false,
			description:'glow offsetx',
			defaultValue:0
		});
		this.add({
			name:'glow_offsety',
			type:'number',
			required:false,
			description:'glow offsety',
			defaultValue:0
		});
		this.add({
			name:'glow_color',
			type:'string',
			required:false,
			description:'glow color',
			defaultValue:'black'
		});
		this.add({
			name:'partial',
			type:'number',
			required:false,
			description:'how many squares for borders',
			defaultValue:0.6
		});
	}
});
// singleton pattern
SvgConfigTemplate.instance=undefined;
SvgConfigTemplate.getInstance=function() {
	if(SvgConfigTemplate.instance==undefined) {
		SvgConfigTemplate.instance=new SvgConfigTemplate();
	}
	return SvgConfigTemplate.instance;
};
