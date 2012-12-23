/**
	A class that knows how to read a PGN file and give instructions
	to a board.
	@class A PGN reader
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
function PgnReader() {
}
/**
	Debug method so that you can get a nice printout of instances of this type
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PgnReader.prototype.toString=function() {
	throw 'this is not implemented yet';
};
/**
	A method to read a pgn file via ajax.
	@param url url to do the GET from (same server)
	@param func a function to be called once the game is parsed
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
*/
PgnReader.prototype.get=function() {
	// use jQuery to do HTTP GET
};
