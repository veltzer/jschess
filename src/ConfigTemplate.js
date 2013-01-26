/*jsl:import Utils.js*/
var ConfigTemplate = Class.create(
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
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function() {
		// the dictionary holding the current config
		this.tuples = {};
		this.tuplist = [];
	},
	/**
		add another options to this template
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	add: function(s) {
		Utils.checkContains(s, ConfigTemplate.fullSet);
		if (!(s.type in ConfigTemplate.types)) {
			throw 'bad type [' + s.type + ']';
		}
		if (s.name in this.tuples) {
			throw 'repeat of key [' + s.name + ']';
		}
		this.tuples[s.name] = s;
		this.tuplist.push(s);
	},
	/**
		check that a key,value combo is ok
		This method will throw an exception if it finds anything wrong.
		@param key key to check.
		@param value value to check.
		@return nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	check: function(key,value) {
		if (!(key in this.tuples)) {
			throw 'wrong key [' + key + ']';
		}
		if (typeof(value) != this.tuples[key].type) {
			throw 'wrong type for key [' + key + '] and value [' + value + ']';
		}
	},
	/**
		return whether the template has a key
		@param key the key to check.
		@return boolean is the key part of this config template
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	hasKey: function(key) {
		return key in this.tuples;
	},
	/**
		return the default value for a key
		@param key the key to fetch the value for.
		@return the default value for the given key
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	getDefaultValue: function(key) {
		return this.tuples[key].defaultValue;
	},
	/**
		show HTML that lists all config options for the current template
		@return nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	getHTML: function() {
		var shtml = '';
		shtml += '<table border="1">';
		shtml += '<tr>';
		shtml += '<td>name</td>';
		shtml += '<td>type</td>';
		shtml += '<td>required</td>';
		shtml += '<td>description</td>';
		shtml += '<td>defaultValue</td>';
		shtml += '</tr>';
		this.tuplist.forEach(function(e) {
			shtml += '<tr>';
			shtml += '<td>' + e.name + '</td>';
			shtml += '<td>' + e.type + '</td>';
			shtml += '<td>' + e.required + '</td>';
			shtml += '<td>' + e.description + '</td>';
			shtml += '<td>' + e.defaultValue + '</td>';
			shtml += '</tr>';
		});
		shtml += '</table>';
		return shtml;
	}
});
// static data
ConfigTemplate.fullSet = {
	name: undefined,
	type: undefined,
	required: undefined,
	description: undefined,
	defaultValue: undefined
};
ConfigTemplate.types = {
	t_string: undefined,
	t_number: undefined,
	t_boolean: undefined
};
