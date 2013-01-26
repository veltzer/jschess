var PgnReader = Class.create(
	/** @lends PgnReader# */
{
	/**
		@class A PGN reader. A class that knows how to read a PGN file and give instructions
		to a board.
		creates a new instance
		@constructor
		@author mark.veltzer@gmail.com (Mark Veltzer)
	*/
	initialize: function() {
	},
	/**
		toString method so that you can get a nice printout of instances of this type
		@author mark.veltzer@gmail.com (Mark Veltzer)
	*/
	toString: function() {
		throw 'this is not implemented yet';
	},
	/**
		A method to read a pgn file via ajax.
		@param url url to do the GET from (same server).
		@param func a function to be called once the game is parsed.
		@author mark.veltzer@gmail.com (Mark Veltzer)
	*/
	get: function() {
		// use prototype to do HTTP GET
	}
});
