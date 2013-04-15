<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Configuration options for JsChess</title>
		<link rel="shortcut icon" href="favicon.ico"/>
		<!-- third parties -->
${jsThirdParty()}
		<!-- script src="../out/jschess-${ver}.min.js"></script -->
		<script src="../out/jschess-${ver}.js"></script>

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
			 
		<script>
			document.observe('dom:loaded', function() {
				// Finally, to actually run the highlighter, you need to include this JS on your page
				SyntaxHighlighter.all()
				// print the configuration to div 'myid'
				var config=SvgConfigTmpl.getInstance();
				var myhtml=config.getHTML();
				$('myid').innerHTML=myhtml;
			})
		</script>
	</head>
	<body>
		<h1>Configuration options for JsChess</h1>
		<p>
		These are the configuration options that <b>jschess</b> supports:
			<div id="myid">
			</div>
		</p>
		<p>
			Mark Veltzer, Copyright ${copyright_years(2012)}
			<a href="mailto:mark.veltzer@gmail.com">mark.veltzer@gmail.com</a>
		</p>
	</body>
</html>
