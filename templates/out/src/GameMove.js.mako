<%!
	import config.personal
%>/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class A single move in a game
  contains the position from which the move starts,
  the position where it ends, the piecetype and color doing the
  moving.
  Also potentially more things:
  - A piece which was removed as a result of this move and its
  position before the capture (the position is needed since the piece
  could be in a different position than the capturing position like
  in en passant).
  - info about whether this was a 0-0 or 0-0-0 (all other info
  needed for castling).
  - info about what the piece turns to (in case the piece turns
  into some other piece like in the case of coronation).
  @author ${config.personal.personal_jsdoc_author}
*/
var GameMove = Class.create(/** @lends GameMove.prototype */{
  /**
    creates a new instance
    @author ${config.personal.personal_jsdoc_author}
  */
  initialize: function() {
    return;
  },
  /**
    Debug method that allows you to get a nice printout for this type
    @return {string} the string representation
    @author ${config.personal.personal_jsdoc_author}
  */
  toString: function() {
    return 'no toString for type GameMove';
  }
});
