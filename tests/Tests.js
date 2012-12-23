/*jsl:import PiecePosition.js*/
test( "hello test", function() {
	assert.ok( 1 == "1", "Passed!" );
});
test( "check that positions cannot be negative", function() {
	assert.throws(function() {
		new PiecePosition(-5,-6)
	});
});
