<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>JsChess QUnit testing page</title>
		<link rel="shortcut icon" href="../static/favicon.ico"/>
		<link type="text/css" rel="stylesheet" href="../thirdparty/qunit.css"/>
${tdefs.jschess_getJsThirdParty}
		<!--script src="../out/jschess.pack.js"></script-->
		<!--script src="../out/jschess.min.js"></script-->
		<!--script src="../out/jschess.js"></script-->
${tdefs.jschess_jsFiles}
	</head>
	<body>
		<div id="qunit"></div>
		<!-- this MUST be the position at which to import qunit.js -->
		<script type="text/javascript" src="../thirdparty/qunit.js"></script>
		<script type="text/javascript" src="../tests/Tests.js"></script>
	</body>
</html>
