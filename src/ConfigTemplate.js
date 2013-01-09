/*jsl:import Utils.js*/
var ConfigTemplate=Class.create(
	/** @lends ConfigTemplate# */
{
	/**
		@class Type safe config class
		This is a configuration template, it has, for each configuration key, the following:
		- the key itself (string).
		- the type of the value for that key.
		- the default value for the key (of the same type).
		- an optional validation function.
		- is this option required
		- description of the option
	*/
	initialize: function() {
		// the dictionary holding the current config
		this.tuples={};
	},
	/**
		@description add another options to this template
	*/
	add: function(s) {
		Utils.checkContains(s,ConfigTemplate.fullSet);
		if(s.name in this.tuples) {
			throw 'repeat of key ['+s.name+']';
		}
		this.tuples[s.name]=s;
	}
});
// static data
ConfigTemplate.fullSet={
	name:undefined,
	type:undefined,
	required:undefined,
	description:undefined,
	defaultValue:undefined
};
