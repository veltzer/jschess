/*jsl:import Utils.js*/
var Config = Class.create(
	/** @lends Config# */
{
	/**
		@class Type safe config class
		The idea is that the user will not be able to accidently put config
		options which are not used and will only be able to supply the right
		types.
		In addition, some config options will HAVE to be supplied by the user
		(div id where to create some HTML elements is an example of this).
		Config will also supply a method by which config options by the user
		will override anything in the default config.
		This class SHOULD NOT be a singleton since the user may want to put
		two boards on the page and have each configured differently.
		@description creates a new instance.
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function(tmpl) {
		// the dictionary holding the current config
		this.d = {};
		// the template to be used
		this.tmpl = tmpl;
	},
	getValue: function(key) {
		if (this.tmpl.hasKey(key)) {
			if (key in this.d) {
				return this.d[key];
			} else {
				return this.tmpl.getDefaultValue(key);
			}
		} else {
			throw 'request for bad key [' + key + ']';
		}
	},
	/**
		@description set a key to a certain value in the current configuration
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	setValue: function(key,value) {
		// check that the key and value are ok.
		this.tmpl.check(key, value);
		this.d[key] = value;
	},
	/**
		@description set many values at once
		@param d dictionary of values.
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	override: function(d) {
		for (var x in d) {
			this.setValue(x, d[x]);
		}
	},
	/**
		@description check that the config is good to go
		for instance: check that all required arguments are set
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	check: function() {
		// TODO
	}
});
