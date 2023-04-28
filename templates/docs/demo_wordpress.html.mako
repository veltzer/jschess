<%!
    import pydmt.helpers.project
    import pydmt.helpers.signature
    import config.personal
    import config.jschess
%><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${pydmt.helpers.project.get_name()} - Using the Wordpress plugin</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		${config.jschess.jschess_js_section}

		${config.jschess.jschess_js_section_highlight}

	</head>
	<body>
		<h1>Using the Wordpress plugin</h1>
		<p>
		TBD
		</p>
		<p>
			Copyright ${config.personal.fullname} © ${pydmt.helpers.signature.get_copyright_years_long()}
			<a href="${config.personal.email}">${config.personal.email}</a>
		</p>
	</body>
</html>
