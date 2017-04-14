/*jsl:import PiecePosition.js*/
QUnit.test( "basic hellow world test", function( assert ) {
	assert.ok( 1 == 1, "Passed!" );
});
QUnit.test( "check that positions cannot be negative", function( assert ) {
	assert.throws(function() {
		new PiecePosition(-5,-6)
	});
});
