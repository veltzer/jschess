<%!
	import config.project
	import user.personal
	import config.git
	import config.jschess
%><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${config.project.project_name} - Showing a PGN game</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		${config.project.project_google_analytics_snipplet}

		${config.jschess.jschess_js_section}

		${config.jschess.jschess_js_section_highlight}

		<script type="text/javascript">
			document.observe('dom:loaded', function() {
				console.log('in here');
				var pgnReader=new PgnReader();
				pgnReader.get('../pgn/karpov_kasparov_1975.pgn');
			})
		</script>
	</head>
	<body>
		<h1>Showing a PGN game</h1>
		<p>
		TBD
		</p>
		<p>
			Copyright ${user.personal.personal_fullname}, ${config.project.project_copyright_years}
			<a href="${user.personal.personal_email}">${user.personal.personal_email}</a>
		</p>
	</body>
</html>
