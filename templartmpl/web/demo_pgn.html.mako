<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Showing a PGN game</title>
		<link rel="shortcut icon" href="../static/favicon.ico"/>
		<!-- third parties -->
${tdefs.jschess_getJsThirdParty}
		<!--script src="../out/jschess.min.js"></script-->
		<script type="text/javascript" src="../out/jschess.js"></script>

		<!-- syntax highlighter stuff -->
		<!-- Include required JS files -->
		<script type="text/javascript" src="../thirdparty/sh/scripts/shCore.js"></script>
		<!--
			At least one brush, here we choose JS. You need to include a brush for every
			language you want to highlight
		-->
		<script type="text/javascript" src="../thirdparty/sh/scripts/shBrushJScript.js"></script>
		<script type="text/javascript" src="../thirdparty/sh/scripts/shBrushXml.js"></script>
		<!-- Include *at least* the core style and default theme -->
		<link href="../thirdparty/sh/styles/shCore.css" rel="stylesheet" type="text/css" />
		<link href="../thirdparty/sh/styles/shThemeDefault.css" rel="stylesheet" type="text/css" />

		<!-- You also need to add some content to highlight, but that is covered elsewhere. -->

		<script type="text/javascript">
			document.observe('dom:loaded', function() {
				// Finally, to actually run the highlighter, you need to include this JS on your page
				SyntaxHighlighter.all()
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
			Mark Veltzer, Copyright ${tdefs.project_copyright_years}
			<a href="mailto:${tdefs.personal_email}">${tdefs.personal_email}</a>
		</p>
	</body>
</html>
