

/**
  @class A set of controls to control the game of chess.
  Includes 6 buttons: goto_start, prev_move, prev_play, next_play, next_move,
  goto_end
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var Controls = Class.create(/** @lends Controls# */{
  /**
    creates a new instance of this class.
    @return {Controls} new instance of this class.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(dict) {
    this.id = dict['id'];
    console.log('this.id is ' + this.id);
  },
  /**
    toString method that allows you to get a nice printout for this type
    @return {string} string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return 'no toString for type Controls';
  }
});
