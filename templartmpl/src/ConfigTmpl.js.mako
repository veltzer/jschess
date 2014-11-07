/*jsl:import Utils.js*/


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
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var ConfigTmpl = Class.create(/** @lends ConfigTmpl# */{
  /**
    create a new instance of this class.
    @return {ConfigTmpl} a new instance of this class.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
    // the dictionary holding the current config
    this.tuples = {};
    this.tuplist = [];
  },
  /**
    add another option to this template
    @param {object} s config option with all needed properties.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  add: function(s) {
    Utils.checkEquals(s, ConfigTmpl.fullSet);
    if (!(s.type in ConfigTmpl.types)) {
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
    @param {string} key key to check.
    @param {anything} value value to check.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  check: function(key, value) {
    if (!(key in this.tuples)) {
      throw 'wrong key [' + key + ']';
    }
    var type_to_check = this.tuples[key].type;
    var our_type = ConfigTmpl.types[type_to_check];
    if (typeof(value) != our_type) {
      throw 'wrong type for key [' + key + '] and value [' + value + ']';
    }
  },
  /**
    return whether the template has a key
    @param {string} key the key to check.
    @return {boolean} is the key part of this config template.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  hasKey: function(key) {
    return key in this.tuples;
  },
  /**
    return the default value for a key
    @param {string} key the key to fetch the value for.
    @return {anything} the default value for the given key.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getDefaultValue: function(key) {
    return this.tuples[key].defaultValue;
  },
  /**
    show HTML that lists all config options for the current template
    @return {string} HTML representation of this config template.
    @author mark.veltzer@gmail.com (Mark Veltzer)
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
  @author mark.veltzer@gmail.com (Mark Veltzer)
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
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
ConfigTmpl.types = {
  t_string: 'string',
  t_number: 'number',
  t_boolean: 'boolean'
};
