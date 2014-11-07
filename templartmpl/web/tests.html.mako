<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>JsChess QUnit testing page</title>
		<link rel="shortcut icon" href="../static/favicon.ico"/>
		<link rel="stylesheet" href="../thirdparty/qunit-1.10.0.css"/>
${attr_more.jschess_getJsThirdParty}
		<!--script src="../out/jschess.pack.js"></script-->
		<!--script src="../out/jschess.min.js"></script-->
		<!--script src="../out/jschess.js"></script-->
${attr_more.jschess_jsFiles}
	</head>
	<body>
		<div id="qunit"></div>
		<!-- this MUST be the position at which to import qunit.js -->
		<script src="../thirdparty/qunit-1.10.0.js"></script>
		<script src="../tests/Tests.js"></script>
	</body>
</html>
