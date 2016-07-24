<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${tdefs.project_name} - Showing a PGN game</title>
		<link rel="shortcut icon" href="../static/favicon.ico"/>

		${tdefs.project_google_analytics_snipplet}

		${tdefs.jschess_js_section}

		${tdefs.jschess_js_section_highlight}

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
			Copyright ${tdefs.personal_fullname}, ${tdefs.project_copyright_years}
			<a href="${tdefs.personal_email}">${tdefs.personal_email}</a>
		</p>
	</body>
</html>
