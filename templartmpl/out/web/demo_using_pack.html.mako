<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${tdefs.project_name} - Using the pack.js file</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		${tdefs.project_google_analytics_snipplet}

		${tdefs.jschess_js_section}

		${tdefs.jschess_js_section_highlight}

		<script type="text/javascript">
			document.observe('dom:loaded', function() {
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
		When using the .pack.js file download it from <a title="jschess package download" href="../out/jschess.pack.js">here</a>.
		Place the file somewhere on your web server and import it from your HTML like this:
		</p>
		<pre><code class="html"><%block filter="h, trim"><script src="jschess.pack.js"></script></%block></code></pre>
		<p>
		You need a place for your board, so place something like this somewhere in your html:
		</p>
		<pre><code class="html"><%block filter="h, trim"><div id="myid"></div></%block></code></pre>
		<p>
		In order to get a board with initial position we must:
		</p>
		<ul>
			<li>create a board using the constructor of Board.</li>
			<li>attach an SvgBoard to it so that it will reflect graphically the what happens on the board.</li>
		</ul>
		<p>
		The SvgBoard will also need the id you prepared since it is the one doing the actual drawing on the screen.
		To do "chess stuff" we will mainly interact with the board: move pieces, delete pieces etc.
		So we will also call the startPosition method to setup a classic chess start position.
		</p>
		<pre><code class="js">var board=new Board()
var svgBoard=new SvgBoard(board,{
	id:'myid'
})
board.startPosition()</code></pre>
		<p>
		Here is the result:
		</p>
		<div id="myid">
		</div>
		<p>
			Copyright ${tdefs.personal_fullname}, ${tdefs.project_copyright_years}
			<a href="${tdefs.personal_email}">${tdefs.personal_email}</a>
		</p>
	</body>
</html>
