<%!
	import user.personal
%>/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class A full game of chess. Contains the starting position
  including a full set of moves of type GameMove.
  @author ${user.personal.personal_jsdoc_author}
*/
var Game = Class.create(/** @lends Game.prototype */{
  /**
    creates a new instance of this class.
    @return {Game} new instance of this class.
    @author ${user.personal.personal_jsdoc_author}
  */
  initialize: function() {
    return;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @return {string} string representation of this instance.
    @author ${user.personal.personal_jsdoc_author}
  */
  toString: function() {
    return 'no toString for type Game';
  }
});
