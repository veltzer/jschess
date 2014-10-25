<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>JsChess QUnit testing page</title>
		<link rel="stylesheet" href="../thirdparty/qunit-1.10.0.css"/>
${attr.project_jsThirdParty}
		<!--script src="../out/jschess-${attr.git_describe}.pack.js"></script-->
		<!--script src="../out/jschess-${attr.git_describe}.min.js"></script-->
		<!--script src="../out/jschess-${attr.git_describe}.js"></script-->
${attr.project_jsFiles}
	</head>
	<body>
		<div id="qunit"></div>
		<!-- this MUST be the position at which to import qunit.js -->
		<script src="../thirdparty/qunit-1.10.0.js"></script>
		<script src="../tests/Tests.js"></script>
	</body>
</html>
