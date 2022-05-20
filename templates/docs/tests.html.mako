<%!
    import pydmt.helpers.project
    import pydmt.helpers.signature
    import user.personal
    import config.jschess
%><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${pydmt.helpers.project.get_name()} - QUnit testing page</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		<!-- qunit -->
		<link type="text/css" rel="stylesheet" href="third_party/qunit.css"/>

		${config.jschess.jschess_js_section}
	</head>
	<body>
		<div id="qunit"></div>
		<!-- this MUST be the position at which to import qunit.js -->
		<script type="text/javascript" src="third_party/qunit.js"></script>
		<script type="text/javascript" src="tests/Tests.js"></script>
		<p>
			Copyright ${user.personal.fullname} © ${pydmt.helpers.signature.get_copyright_years_long()}
			<a href="${user.personal.email}">${user.personal.email}</a>
		</p>
	</body>
</html>
