<html>
	<head>
		<meta charset="UTF-8">
		<title>jschess</title>
		<link rel="shortcut icon" href="favicon.ico"/>
		<!-- third parties -->
${jsThirdParty()}
		<!-- our code, options: full pack, minified, regular or file by file -->
		<!--script src="../out/jschess-${ver}.pack.js"></script-->
		<!--script src="../out/jschess-${ver}.min.js"></script-->
		<!--script src="../out/jschess-${ver}.js"></script-->
${jsFiles()}
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
				var board=new Board();
				var svgBoard=new SvgBoard(board,{
					id:'myid',
					do_select_square:true,//default:true
					do_select_piece:true,//default:true
					do_select_global:false,//default:false
					do_select_piecerec:true,//default:true
					do_select_click:true,//default:false
					do_letters:true,//default:true
					glow_width:7,//default:10
					partial:0.6//default:0.6
				})
				board.startPosition();
				$('startpos').observe('click',function() {
					board.startPosition()
				});
				$('moverooks').observe('click',function() {
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
				$('moveknights').observe('click',function() {
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
				$('movebishops').observe('click',function() {
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
				$('flip').observe('click',function() {
					svgBoard.flip()
				});
				$('glow').observe('click',function() {
					svgBoard.glow(board.getPieceAtPosition(new PiecePosition(0,0)),true);
				});
				$('clear').observe('click',function() {
					board.clearPieces()
				});
			})
		</script>
	</head>
	<body>
		<h1>Welcome to the <b>jschess</b> project</h1>
		<p>
			<b>jschess</b> is a pure JavaScript library that enables:
			<ul>
				<li>Showing chess games in <a href="http://en.wikipedia.org/wiki/Portable_Game_Notation">PGN</a> format (hardcoded or coming from a server)</li>
				<li>Showing chess positions in <a href="http://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation">FEN</a> format (hardcoded or coming from a server)</li>
				<li>Writing a web app that shows chess riddles and their solutions</li>
				<li>Writing a web app that enables the end user to create chess positions and save them (in FEN or other format)</li>
				<li>Allows to build a chess game where the player plays a server or some other player</li>
				<li>Allows to build live broadcast systems for competitions</li>
				<li>Other things I did not think about</li>
			</ul>
		</p>
		<p>
			What makes <b>jschess</b> special:
			<ul>
				<li>Pure object oriented javascript</li>
				<li>No images - totally scalable graphics</li>
				<li>You can have your board at any size you want (because of scalable graphics)</li>
				<li>As a result of being pure javascript totally controllable programatically</li>
				<li>Looks best (can animate the pieces, show arrows and what not)</li>
				<li>Free source. Full freedom to tweak or you can ask me for help with implementing a feature</li>
				<li>Sits on top of <a href="http://raphaeljs.com">raphaeljs</a> for high level SVG capabilities</li>
				<li>Sits on top of <a href="http://prototypejs.org">prototypejs</a> to make object oriented easier and more error free</li>
			</ul>
		</p>
		<p>
			Technologies used to develop <b>jschess</b>...
			<ul>
				<li><a href="http://www.javascriptlint.com/download.htm">jsl</a> to make sure javascript code is standards complient</li>
				<li><a href="http://qunitjs.com">qunitjs</a> for testing</li>
				<li><a href="http://developer.yahoo.com/yui/compressor">YUI compressor</a> is used for compressing</li>
				<li><a href="http://www.crockford.com/javascript/jsmin.html">jsmin</a> is used for compressing</li>
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
				<li><a href="demo_using_pack.html">using the pack.js file</a></li>
				<li><a href="demo_using_min.html">using the min.js file</a></li>
				<li><a href="demo_moving_pieces.html">moving pieces</a></li>
				<li><a href="demo_fen.html">showing a FEN position</a></li>
				<li><a href="demo_pgn.html">showing a PGN game</a></li>
				<li><a href="demo_controls.html">showing controls</a></li>
				<li><a href="demo_config.html">config options</a></li>
				<li><a href="demo_wordpress.html">using it from within wordpress</a></li>
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
			<button id="clear">clear</button>
		</p>
		<p>
			Mark Veltzer, Copyright ${copyright_years(2012)}
			<a href="mailto:mark.veltzer@gmail.com">mark.veltzer@gmail.com</a>
		</p>
	</body>
</html>
