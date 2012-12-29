<html>
	<head>
		<meta charset="UTF-8">
		<title>jschess</title>
		<link rel="shortcut icon" href="favicon.ico"/>
		<!-- third parties -->
		<script src="../thirdparty/prototype-1.7.1.min.js"></script>
		<script src="../thirdparty/jquery-1.8.3.min.js"></script>
		<script src="../thirdparty/jquery.nc.js"></script>
		<script src="../thirdparty/raphael-2.1.0.min.js"></script>
		<!-- our code, options: full pack, minified, regular or file by file -->
		<!--script src="../out/jschess-${ver}.pack.js"></script-->
		<!--script src="../out/jschess-${ver}.min.js"></script-->
		<!--script src="../out/jschess-${ver}.js"></script-->
		<script src="../src/Utils.js"></script>
		<script src="../src/RUtils.js"></script>
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
			jQuery(document).ready(function() {
				var board=new Board();
				var svgBoard=new SvgBoard(board,{
					id:'myid',
				})
				board.startPosition();
				jQuery('#startpos').click(function() {
					board.startPosition()
				});
				jQuery('#moverooks').click(function() {
					if(board.hasPieceAtPosition(new PiecePosition(0,4)) && board.hasPieceAtPosition(new PiecePosition(7,4))) {
						board.movePieceByPos(new PiecePosition(0,4),new PiecePosition(0,0));
						board.movePieceByPos(new PiecePosition(7,4),new PiecePosition(7,0));
					} else {
						if(board.hasPieceAtPosition(new PiecePosition(0,0)) && board.hasPieceAtPosition(new PiecePosition(7,0))) {
							board.movePieceByPos(new PiecePosition(0,0),new PiecePosition(0,4));
							board.movePieceByPos(new PiecePosition(7,0),new PiecePosition(7,4));
						}
					}
				});
				jQuery('#moveknights').click(function() {
					if(board.hasPieceAtPosition(new PiecePosition(1,0)) && board.hasPieceAtPosition(new PiecePosition(6,0))) {
						board.movePieceByPos(new PiecePosition(1,0),new PiecePosition(2,2));
						board.movePieceByPos(new PiecePosition(6,0),new PiecePosition(5,2));
					} else {
						if(board.hasPieceAtPosition(new PiecePosition(2,2)) && board.hasPieceAtPosition(new PiecePosition(5,2))) {
							board.movePieceByPos(new PiecePosition(2,2),new PiecePosition(1,0));
							board.movePieceByPos(new PiecePosition(5,2),new PiecePosition(6,0));
						}
					}
				});
				jQuery('#movebishops').click(function() {
					if(board.hasPieceAtPosition(new PiecePosition(2,0)) && board.hasPieceAtPosition(new PiecePosition(5,0))) {
						board.movePieceByPos(new PiecePosition(2,0),new PiecePosition(4,2));
						board.movePieceByPos(new PiecePosition(5,0),new PiecePosition(3,2));
					} else {
						if(board.hasPieceAtPosition(new PiecePosition(4,2)) && board.hasPieceAtPosition(new PiecePosition(3,2))) {
							board.movePieceByPos(new PiecePosition(4,2),new PiecePosition(2,0));
							board.movePieceByPos(new PiecePosition(3,2),new PiecePosition(5,0));
						}
					}
				});
				jQuery('#flip').click(function() {
					svgBoard.flip()
				});
				jQuery('#glow').click(function() {
					svgBoard.glow(board.getPieceAtPosition(new PiecePosition(0,0)),true);
				});
				jQuery('#toString').click(function() {
					console.log(svgBoard);
				});
				jQuery('#clear').click(function() {
					board.clearPieces()
				});
			})
		</script>
	</head>
	<body>
		<h1>Welcome to the <b>jschess</b> project</h1>
		<p>
			<b>jschess</b> is a JavaScript library that enables:
			<ul>
				<li>Showing chess games in <a href="http://en.wikipedia.org/wiki/Portable_Game_Notation">PGN</a> format (hardcoded or coming from a server)</li>
				<li>Showing chess positions in <a href="http://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation">FEN</a> format (hardcoded or coming from a server)</li>
				<li>Writing a web app that shows chess riddles and their solutions</li>
				<li>Writing a web app that enables the end user to create chess positions and save them (in FEN or other format)</li>
				<li>Allows to build a chess game where the player plays a server or some other player</li>
				<li>Allows to build live broadcast systems for competitions</li>
				<li>Other things I did not think about...</li>
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
				<li>Free source. Full freedom to tweak or you can ask me for help with implementing a feature.</li>
				<li>Sits on top of <a href="http://raphaeljs.com">raphael.js</a> for high level SVG capabilities</li>
				<li>Sits on top of <a href="http://jquery.com">jQuery</a> to make coding easier and have better browser compatibility</li>
				<li>Sits on top of <a href="http://prototypejs.org">prototype</a> to make object oriented easier and more error free</li>
				<li>Sits on top of <a href="http://www.javascriptlint.com/download.htm">jsl</a> to make sure javascript code is standards complient</li>
				<li>Sits on top of <a href="http://qunitjs.com">qunitjs</a> for testing</li>
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
				<li>latest package (with third parties) <b>jschess</b> is <a href="http://veltzer.net/jschess/out/jschess-${ver}.pack.js">jschess-${ver}.pack.js</a></li>
				<li>latest sources for <b>jschess</b> is <a href="http://veltzer.net/jschess/out/jschess-${ver}.zip">jschess-${ver}.zip</a></li>
			</ul>
			Demos of <b>jschess</b>...
			<ul>
				<li><a href="demo0.html">Demo0 - using the .pack.js file</a></li>
				<li><a href="demo1.html">Demo1 - creating the board</a></li>
				<li><a href="demo2.html">Demo2 - moving pieces</a></li>
				<li><a href="demo3.html">Demo3 - showing a FEN position</a></li>
				<li><a href="demo4.html">Demo4 - showing a PGN game</a></li>
			</ul>
			Misc pages that help develop <b>jschess</b>...
			<ul>
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
			<button id="toString">toString</button>
			<button id="clear">clear</button>
		</p>
		<p>
			Mark Veltzer, Copyright ${copyright_years(2012)}
			<a href="mailto:mark.veltzer@gmail.com">mark.veltzer@gmail.com</a>
		</p>
	</body>
</html>
