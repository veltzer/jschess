<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<html>
	<head>
		<meta charset="UTF-8">
		<title>demo0</title>
		<link rel="shortcut icon" href="favicon.ico"/>
		<!-- third parties -->
		<script src="../out/jschess-${ver}.pack.js"></script>

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
			jQuery(document).ready(function() {
				// Finally, to actually run the highlighter, you need to include this JS on your page
				SyntaxHighlighter.all()
				var board=new Board()
				var svgBoard=new SvgBoard(board,{
					id:'myid'
				})
				board.startPosition()
			})
		</script>
	</head>
	<body>
		<h1>Demo0 - Using the .pack.js distribution</h1>
		<p>
		When you want to use jschess there are two options. One is to use the .min.js file in which case you need
		to import all third party modules yourself. The second is to use the .pack.js file in which case you get
		all the third parties built in.
		</p>
		<p>
		When using the .pack.js file download it from <a title="jschess package download" href="../out/jschess-${ver}.pack.js">here</a>.
		Place the file somewhere on your web server and import it from your HTML like this:
		<pre class="brush: xml">
			&lt;script src="jschess-${ver}.pack.js"&gt;&lt;/script&gt;</pre>
		You need a place for your board, so place something like this somewhere in your html:
		<pre class="brush: xml">
			&lt;div id="myid"&gt;
			&lt;/div&gt;</pre>
		Then you can create a board from your javascript code by calling the constructor of SvgBoard. The board will be empty so we call startpos to get initial game position:
		<pre class="brush: js">
			var board=new Board()
			var svgBoard=new SvgBoard(board,{
				id:'myid'
			})
			board.startPosition()</pre>
		</div>
		Here is the result:
		<div id="myid">
		</div>
		<p>
			Mark Veltzer, Copyright ${copyright_years(2012)}
			<a href="mailto:mark.veltzer@gmail.com">mark.veltzer@gmail.com</a>
		</p>
	</body>
</html>
