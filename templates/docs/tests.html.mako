<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${config.project.project_name} - QUnit testing page</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		<!-- qunit -->
		<link type="text/css" rel="stylesheet" href="third_party/qunit.css"/>

		${tdefs.project_google_analytics_snipplet}

		${config.js_chess.jschess_js_section}
	</head>
	<body>
		<div id="qunit"></div>
		<!-- this MUST be the position at which to import qunit.js -->
		<script type="text/javascript" src="third_party/qunit.js"></script>
		<script type="text/javascript" src="tests/Tests.js"></script>
		<p>
			Copyright ${config.personal.personal_fullname}, ${tdefs.project_copyright_years}
			<a href="${tdefs.personal_email}">${tdefs.personal_email}</a>
		</p>
	</body>
</html>
