/*jsl:import Utils.js*/


/**
  @class Type safe config class
  The config class is basically a fancy dictionary. The difference
  between it and a dictionary is that it consults a template object
  when setting and getting a value.
  - When setting a value it makes sure that you are giving a name
  of a parameter that exists in the template and that the value
  that you gave to the parameter is correctly converted to the
  type expected.
  - When getting a value it makes sure you use the right name for
  the key.
  The idea is that the user will not be able to accidently put config
  options which are not used and will only be able to supply the right
  types.
  In addition, some config options will <b>have</b> to be supplied by the user
  (div id where to create some HTML elements is an example of this).
  Config will also supply a method by which config options by the user
  will override anything in the default config.
  This class <b>should not</b> be a singleton since the user may want to put
  two boards on the page and have each configured differently.
  @author ${attr.personal_jsdoc_author}
*/
var Config = Class.create(/** @lends Config# */{
  /**
    creates a new instance.
    @param {object} tmpl template to use.
    @return {Config} new instance.
    @author ${attr.personal_jsdoc_author}
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
    set a key to a certain value in the current configuration
    @param {anything} key key to store in the config.
    @param {anything} value value to store in the config.
    @author ${attr.personal_jsdoc_author}
  */
  setValue: function(key, value) {
    // check that the key and value are ok.
    this.tmpl.check(key, value);
    this.d[key] = value;
  },
  /**
    set many values at once
    @param {object} d dictionary of values.
    @author ${attr.personal_jsdoc_author}
  */
  override: function(d) {
    for (var x in d) {
      this.setValue(x, d[x]);
    }
  },
  /**
    check that the config is good to go
    for instance: check that all required arguments are set
    @author ${attr.personal_jsdoc_author}
  */
  check: function() {
    // TODO
  }
});
