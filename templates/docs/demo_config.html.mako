<%!
	import config.project
	import user.personal
	import config.git
	import config.jschess
%><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${config.project.project_name} - Config options</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		${config.project.project_google_analytics_snipplet}

		${config.jschess.jschess_js_section}

		${config.jschess.jschess_js_section_highlight}

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
			Copyright ${user.personal.personal_fullname}, ${config.project.project_copyright_years}
			<a href="${user.personal.personal_email}">${user.personal.personal_email}</a>
		</p>
	</body>
</html>
