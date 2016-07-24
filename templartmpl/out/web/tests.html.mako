<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${tdefs.project_name} - QUnit testing page</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		<!-- qunit -->
		<link type="text/css" rel="stylesheet" href="thirdparty/qunit.css"/>

		${tdefs.project_google_analytics_snipplet}

		${tdefs.jschess_js_section}
	</head>
	<body>
		<div id="qunit"></div>
		<!-- this MUST be the position at which to import qunit.js -->
		<script type="text/javascript" src="thirdparty/qunit.js"></script>
		<script type="text/javascript" src="tests/Tests.js"></script>
		<p>
			Copyright ${tdefs.personal_fullname}, ${tdefs.project_copyright_years}
			<a href="${tdefs.personal_email}">${tdefs.personal_email}</a>
		</p>
	</body>
</html>
