<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Using the pack.js file</title>
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
			document.observe('dom:loaded', function() {
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
		<h1>Using the pack.js file</h1>
		<p>
		When you want to use jschess there are two options. One is to use the .min.js file in which case you need
		to import all third party modules yourself. The second is to use the .pack.js file in which case you get
		all the third parties built in.
		</p>
		<p>
		When using the .pack.js file download it from <a title="jschess package download" href="../out/jschess-${ver}.pack.js">here</a>.
		Place the file somewhere on your web server and import it from your HTML like this:
		<pre class="brush: xml"><%block filter="h"><script src="jschess-${ver}.pack.js"></script></%block></pre>
		You need a place for your board, so place something like this somewhere in your html:
		<pre class="brush: xml"><%block filter="h"><div id="myid"></div></%block></pre>
		In order to get a board with initial position we must:
		<ul>
			<li>create a board using the constructor of Board.</li>
			<li>attach an SvgBoard to it so that it will reflect graphically the what happens on the board.</li>
		</ul>
		The SvgBoard will also need the id you prepared since it is the one doing the actual drawing on the screen.
		To do "chess stuff" we will mainly interact with the board: move pieces, delete pieces etc.
		So we will also call the startPosition method to setup a classic chess start position.
		<pre class="brush: js"><%block filter="h">
			var board=new Board()
			var svgBoard=new SvgBoard(board,{
				id:'myid'
			})
			board.startPosition()</%block></pre>
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
