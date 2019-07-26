<%!
	import config.project
	import user.personal
	import config.git
	import config.jschess
%><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${config.project.project_name} - QUnit testing page</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		<!-- qunit -->
		<link type="text/css" rel="stylesheet" href="third_party/qunit.css"/>

		${config.project.project_google_analytics_snipplet}

		${config.jschess.jschess_js_section}
	</head>
	<body>
		<div id="qunit"></div>
		<!-- this MUST be the position at which to import qunit.js -->
		<script type="text/javascript" src="third_party/qunit.js"></script>
		<script type="text/javascript" src="tests/Tests.js"></script>
		<p>
			Copyright ${user.personal.personal_fullname}, ${config.project.project_copyright_years}
			<a href="${user.personal.personal_email}">${user.personal.personal_email}</a>
		</p>
	</body>
</html>
