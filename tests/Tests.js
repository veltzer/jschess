/*jsl:import PiecePosition.js*/
test( "basic hellow world test", function() {
	assert.ok( 1 == 1, "Passed!" );
});
test( "check that positions cannot be negative", function() {
	assert.throws(function() {
		new PiecePosition(-5,-6)
	});
});
