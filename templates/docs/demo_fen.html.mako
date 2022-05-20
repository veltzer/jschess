<%!
    import pydmt.helpers.project
    import pydmt.helpers.signature
    import user.personal
    import config.jschess
%><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${pydmt.helpers.project.get_name()} - Showing a FEN position</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		${config.jschess.jschess_js_section}

		${config.jschess.jschess_js_section_highlight}

	</head>
	<body>
		<h1>Showing a FEN position</h1>
		<p>
		TBD
		</p>
		<p>
			Copyright ${user.personal.fullname} © ${pydmt.helpers.signature.get_copyright_years_long()}
			<a href="${user.personal.email}">${user.personal.email}</a>
		</p>
	</body>
</html>
