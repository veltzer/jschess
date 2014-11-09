/* vim:set filetype=javascript:*/


/**
  @class A set of controls to control the game of chess.
  Includes 6 buttons: goto_start, prev_move, prev_play, next_play, next_move,
  goto_end
  @author ${tdefs.personal_jsdoc_author}
*/
var Controls = Class.create(/** @lends Controls# */{
  /**
    creates a new instance of this class.
    @return {Controls} new instance of this class.
    @author ${tdefs.personal_jsdoc_author}
  */
  initialize: function(dict) {
    this.id = dict['id'];
    this.b_goto_start = new Element('button').update('goto_start');
    this.b_prev_move = new Element('button').update('prev_move');
    this.b_prev_play = new Element('button').update('prev_play');
    this.b_next_play = new Element('button').update('next_play');
    this.b_next_move = new Element('button').update('next_move');
    this.b_goto_end = new Element('button').update('goto_end');
    $(this.id).appendChild(this.b_goto_start);
    $(this.id).appendChild(this.b_prev_move);
    $(this.id).appendChild(this.b_prev_play);
    $(this.id).appendChild(this.b_next_play);
    $(this.id).appendChild(this.b_next_move);
    $(this.id).appendChild(this.b_goto_end);
  },
  /**
    toString method that allows you to get a nice printout for this type
    @return {string} string representation of this instance.
    @author ${tdefs.personal_jsdoc_author}
  */
  toString: function() {
    return 'no toString for type Controls';
  }
});
