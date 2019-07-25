<%!
	import config.project
	import config.personal
	import config.git
	import config.jschess
%><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${config.project.project_name} - Using the Wordpress plugin</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		${config.project.project_google_analytics_snipplet}

		${config.jschess.jschess_js_section}

		${config.jschess.jschess_js_section_highlight}

	</head>
	<body>
		<h1>Using the Wordpress plugin</h1>
		<p>
		TBD
		</p>
		<p>
			Copyright ${config.personal.personal_fullname}, ${config.project.project_copyright_years}
			<a href="${config.personal.personal_email}">${config.personal.personal_email}</a>
		</p>
	</body>
</html>
