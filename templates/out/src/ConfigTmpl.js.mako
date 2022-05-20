<%!
	import user.personal
%>/* vim:set filetype=javascript:*/
/*jsl:import Utils.js*/
/*global Utils, Class */


/**
  @class Type safe config class
  This is a configuration template, it has, for each configuration key,
  the following:
  - the key itself (string).
  - the type of the value for that key.
  - the default value for the key (of the same type).
  - an optional validation function.
  - is this option required
  - description of the option
  @author ${user.personal.jsdoc_author}
*/
var ConfigTmpl = Class.create(/** @lends ConfigTmpl.prototype */{
  /**
    create a new instance of this class.
    @this {ConfigTmpl}
    @return {ConfigTmpl} a new instance of this class.
    @author ${user.personal.jsdoc_author}
  */
  initialize: function() {
    // the dictionary holding the current config
    this.tuples = {};
    this.tuplist = [];
  },
  /**
    add another option to this template
    @this {ConfigTmpl}
    @param {object} s config option with all needed properties.
    @author ${user.personal.jsdoc_author}
  */
  add: function(s) {
    Utils.checkEquals(s, ConfigTmpl.fullSet);
    if (!(ConfigTmpl.types.hasOwnProperty(s.type))) {
      throw 'bad type [' + s.type + ']';
    }
    if (this.tuples.hasOwnProperty(s.name)) {
      throw 'repeat of key [' + s.name + ']';
    }
    this.tuples[s.name] = s;
    this.tuplist.push(s);
  },
  /**
    check that a key,value combo is ok
    This method will throw an exception if it finds anything wrong.
    @this {ConfigTmpl}
    @param {string} key key to check.
    @param {anything} value value to check.
    @author ${user.personal.jsdoc_author}
  */
  check: function(key, value) {
    if (!(this.tuples.hasOwnProperty(key))) {
      throw 'wrong key [' + key + ']';
    }
    var type_to_check = this.tuples[key].type;
    var our_type = ConfigTmpl.types[type_to_check];
    Utils.checkType(value, our_type);
  },
  /**
    return whether the template has a key
    @this {ConfigTmpl}
    @param {string} key the key to check.
    @return {boolean} is the key part of this config template.
    @author ${user.personal.jsdoc_author}
  */
  hasKey: function(key) {
    return this.tuples.hasOwnProperty(key);
  },
  /**
    return the default value for a key
    @this {ConfigTmpl}
    @param {string} key the key to fetch the value for.
    @return {anything} the default value for the given key.
    @author ${user.personal.jsdoc_author}
  */
  getDefaultValue: function(key) {
    return this.tuples[key].defaultValue;
  },
  /**
    show HTML that lists all config options for the current template
    @this {ConfigTmpl}
    @return {string} HTML representation of this config template.
    @author ${user.personal.jsdoc_author}
  */
  getHTML: function() {
    var shtml = '';
    shtml += '<table border=\'1\'>';
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


/**
  All needed properties for each config option.
  @author ${user.personal.jsdoc_author}
*/
ConfigTmpl.fullSet = {
  name: undefined,
  type: undefined,
  required: undefined,
  description: undefined,
  defaultValue: undefined
};


/**
  All allowed types for config options.
  @author ${user.personal.jsdoc_author}
*/
ConfigTmpl.types = {
  t_string: 'string',
  t_number: 'number',
  t_boolean: 'boolean'
};
