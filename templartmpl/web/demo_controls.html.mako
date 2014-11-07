<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Showing controls</title>
		<link rel="shortcut icon" href="../static/favicon.ico"/>
		<!-- third parties -->
${attr_more.jschess_getJsThirdParty}
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
				var controls=new Controls({
					id:'myid'
				})
			})
		</script>
	</head>
	<body>
		<h1>Showing controls</h1>
		<p>
		A controls object is one which allows you to control a prerecorded game.
		It provides with 6 buttons to control the game.
		You need a place for your controls, so place something like this somewhere in your html:
		</p>
		<pre class="brush: xml"><%block filter="h">
		<div id="myid"></div></%block></pre>
		Then you can create a Controls object from your javascript code by calling the constructor of Controls.
		<pre class="brush: js"><%block filter="h">
			var controls=new Controls({
				id:'myid'
			})</%block></pre>
		<p>
		Here is the result:
		</p>
		<div id="myid"></div>
		<p>
			Mark Veltzer, Copyright ${attr.project_copyright_years}
			<a href="mailto:${attr.personal_email}">${attr.personal_email}</a>
		</p>
	</body>
</html>
