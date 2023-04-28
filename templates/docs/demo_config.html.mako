<%!
    import pydmt.helpers.project
    import pydmt.helpers.signature
    import config.personal
    import config.jschess
%><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${pydmt.helpers.project.get_name()} - Config options</title>
		<link rel="shortcut icon" href="favicon.ico"/>

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
			Copyright ${config.personal.fullname} © ${pydmt.helpers.signature.get_copyright_years_long()}
			<a href="${config.personal.email}">${config.personal.email}</a>
		</p>
	</body>
</html>
