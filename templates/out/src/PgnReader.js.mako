<%!
	import config.personal
%>/* vim:set filetype=javascript:*/
/*jsl:import Utils.js*/
/*global Ajax, Class, Chess, Utils */


/**
  @class A PGN reader. A class that knows how to read a PGN file and give
  instructions to a board.
  @author ${config.personal.jsdoc_author}
*/
var PgnReader = Class.create(/** @lends PgnReader.prototype */{
  /**
    creates a new instance
    @return {PgnReader} the new instance.
    @author ${config.personal.jsdoc_author}
  */
  initialize: function() {
    return;
  },
  /**
    toString method so that you can get a nice printout of instances of
    this type
    @return {string} string representation of this instance.
    @author ${config.personal.jsdoc_author}
  */
  toString: function() {
    throw 'toString for PgnReader not implemented yet';
  },
  /**
    A method to read a pgn file via ajax.
    @param {string} url url to do the GET from (same server).
    @author ${config.personal.jsdoc_author}
  */
  get: function(url) {
    //Utils.fakeUse(url);
    // we use prototype to do HTTP GET
    var req = new Ajax.Request(url, {
      method: 'get',
      onSuccess: function(transport) {
        var response = transport.responseText;
        //console.log('got response ' + response);
        var chess = new Chess();
        chess.load_pgn(response);
        console.log(chess.history({ verbose: true }));
      },
      onFailure: function(transport) {
        console.log('error in transport for url ' + url);
        console.dir(transport);
      }
    });
    Utils.fakeUse(req);
  }
});
