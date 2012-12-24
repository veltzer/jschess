<html>
	<head>
		<meta charset="UTF-8">
		<title>jschess</title>
		<link rel="shortcut icon" href="favicon.ico"/>
		<!-- third parties -->
		<script src="../thirdparty/jquery-1.8.3.min.js"></script>
		<script src="../thirdparty/raphael-2.1.0.min.js"></script>
		<!-- our code, three options: minified, regular or file by file -->
		<!--script src="../out/jschess-${ver}.min.js"></script-->
		<!--script src="../out/jschess-${ver}.js"></script-->
		<script src="../src/Utils.js"></script>
		<script src="../src/SvgPathAndAttributes.js"></script>
		<script src="../src/SvgPiece.js"></script>
		<script src="../src/SvgCreator.js"></script>
		<script src="../src/SvgPixelPosition.js"></script>
		<script src="../src/SvgPieceData.js"></script>
		<script src="../src/SvgBoard.js"></script>
		<script src="../src/PiecePosition.js"></script>
		<script src="../src/PieceColor.js"></script>
		<script src="../src/PieceType.js"></script>
		<script src="../src/BoardPiece.js"></script>
		<script src="../src/BoardPosition.js"></script>
		<script src="../src/Board.js"></script>

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
			$(document).ready(function() {
				var svgBoard=new SvgBoard({
					id:'myid',
				})
				svgBoard.getBoard().startPosition();
				$('#startpos').click(function() {
					svgBoard.startPosition()
				});
				$('#moverooks').click(function() {
					svgBoard.moverooks()
				});
				$('#moveknights').click(function() {
					svgBoard.moveknights()
				});
				$('#movebishops').click(function() {
					svgBoard.movebishops()
				});
				$('#flip').click(function() {
					svgBoard.flip()
				});
				$('#glow').click(function() {
					svgBoard.glow()
				});
				$('#dump').click(function() {
					svgBoard.dump()
				});
			})
		</script>
	</head>
	<body>
		<h1>Welcome to the <b>jschess</b> project</h1>
		<p>
			<b>jschess</b> is a JavaScript library that enables:
			<ul>
				<li>showing chess games in pgn format from a server</li>
				<li>showing chess positions as riddles and show solutions</li>
				<li>enable the end user to create chess positions and save them</li>
				<li>allows to build a chess game where the player plays the server or some other player</li>
				<li>allows to build live broadcast systems</li>
				<li>other things I did not think about...</li>
			</ul>
		</p>
		<p>
			What makes <b>jschess</b> special?
			<ul>
				<li>Pure object oriented javascript</li>
				<li>No images - totally scalable graphics</li>
				<li>You can have your board at any size you want (because of scalable graphics)</li>
				<li>As a result of being pure javascript totally controllable programatically</li>
				<li>Looks best (can animate the pieces, show arrows and what not)</li>
				<li>Sits on top of <a href="http://raphaeljs.com">raphael.js</a> for high level SVG capabilities</li>
				<li>Sits on top of <a href="http://jquery.com">jQuery</a> to make coding easier and have better browser compatibility</li>
				<li>Sits on top of <a href="http://prototypejs.org">prototype</a> to make object oriented easier and more error free</li>
				<li>Uses <a href="http://www.javascriptlint.com/download.htm">jsl</a> to make sure javascript code is standards complient</li>
				<li>Uses <a href="http://qunitjs.com">qunitjs</a> for testing</li>
			</ul>
		</p>
		<p>The current version of <b>jschess</b> is ${ver}
		</p>
		<p>
			<b>This is alpha material at the moment, use at your own risk! API is subject to change!</b>
		</p>
			Some links:
			<ul>
				<li><b>jschess</b> API is <a href="../jsdoc">here</a></li>
				<li><b>jschess</b> github projec is <a href="https://github.com/veltzer/jschess">here</a></li>
				<li>latest full <b>jschess</b> is <a href="http://veltzer.net/jschess/out/jschess-${ver}.js">jschess-${ver}.js</a></li>
				<li>latest minified <b>jschess</b> is <a href="http://veltzer.net/jschess/out/jschess-${ver}.min.js">jschess-${ver}.min.js</a></li>
			</ul>
			Demos of <b>jschess</b>...
			<ul>
				<li><a href="demo1.html">Demo1 - creating the board</a></li>
				<li><a href="demo2.html">Demo2 - moving pieces</a></li>
				<li><a href="calc.html">SVG path calculator (comes in handy when doing SVG graphics)</a></li>
				<li><a href="tests.html">JSChess QUnit tests</a></li>
			</ul>
			Here is a quick demo (go ahead and zoom it with Ctrl+[+/-] to see what SVG is all about...):
			<div id="myid">
			</div>
			<button id="startpos">startpos</button>
			<button id="moverooks">moverooks</button>
			<button id="moveknights">moveknights</button>
			<button id="movebishops">movebishops</button>
			<button id="flip">flip</button>
			<button id="glow">glow</button>
			<button id="dump">dump</button>
		</p>
		<p>
			Mark Veltzer, <?php 
				$copyYear = 2012;
				$curYear = date('Y');
				echo $copyYear . (($copyYear != $curYear) ? '-' . $curYear : '');
			?>
			<a href="mailto:mark.veltzer@gmail.com">mark.veltzer@gmail.com</a>
		</p>
	</body>
</html>
