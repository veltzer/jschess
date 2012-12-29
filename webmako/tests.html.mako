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
${jsFiles()}
	</head>
	<body>
		<div id="qunit"></div>
		<!-- this MUST be the position at which to import qunit.js -->
		<script src="../thirdparty/qunit-1.10.0.js"></script>
		<script src="../tests/Tests.js"></script>
	</body>
</html>
