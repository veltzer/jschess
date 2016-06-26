<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Config options</title>
		<link rel="shortcut icon" href="../static/favicon.ico"/>
		<!-- third parties -->
${tdefs.jschess_getJsThirdParty}
		<!-- script src="../out/jschess.min.js"></script -->
		<script type="text/javascript" src="../out/jschess.js"></script>

		<!-- highlight.js stuff -->
		<script type="text/javascript" src="../thirdparty/highlight.min.js"></script>
		<link href="../thirdparty/highlight.min.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript">hljs.initHighlightingOnLoad();</script>

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
			Mark Veltzer, Copyright ${tdefs.project_copyright_years}
			<a href="mailto:${tdefs.personal_email}">${tdefs.personal_email}</a>
		</p>
	</body>
</html>
