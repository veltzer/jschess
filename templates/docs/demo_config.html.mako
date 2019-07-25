<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${config.project.project_name} - Config options</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		${tdefs.project_google_analytics_snipplet}

		${config.js_chess.jschess_js_section}

		${config.js_chess.jschess_js_section_highlight}

		<script type="text/javascript">
			document.observe('dom:loaded', function() {
				// print the configuration to div 'myid'
				var config=SvgConfigTmpl.getInstance();
				var myhtml=config.getHTML();
				$('myid').innerHTML=myhtml;
			})
		</script>
	</head>
	<body>
		<h1>Config options</h1>
		<p>
		These are the configuration options that <b>jschess</b> supports:
		</p>
		<div id="myid">
		</div>
		<p>
			Copyright ${config.personal.personal_fullname}, ${tdefs.project_copyright_years}
			<a href="${tdefs.personal_email}">${tdefs.personal_email}</a>
		</p>
	</body>
</html>
