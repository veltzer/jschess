<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>JsChess QUnit testing page</title>
		<link rel="stylesheet" href="../thirdparty/qunit-1.10.0.css"/>
${jsThirdParty()}
		<!--script src="../out/jschess-${ver}.pack.js"></script-->
		<!--script src="../out/jschess-${ver}.min.js"></script-->
		<!--script src="../out/jschess-${ver}.js"></script-->
		<script src="../src/Utils.js"></script>
		<script src="../src/SvgPathAndAttributes.js"></script>
		<script src="../src/SvgPiece.js"></script>
		<script src="../src/SvgCreator.js"></script>
		<script src="../src/SvgPixelPosition.js"></script>
		<script src="../src/SvgBoard.js"></script>
		<script src="../src/PiecePosition.js"></script>
		<script src="../src/PieceColor.js"></script>
		<script src="../src/PieceType.js"></script>
		<script src="../src/Piece.js"></script>
		<script src="../src/BoardPiece.js"></script>
		<script src="../src/BoardPosition.js"></script>
		<script src="../src/Board.js"></script>
	</head>
	<body>
		<div id="qunit"></div>
		<!-- this MUST be the position at which to import qunit.js -->
		<script src="../thirdparty/qunit-1.10.0.js"></script>
		<script src="../tests/Tests.js"></script>
	</body>
</html>
