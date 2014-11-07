<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>${attr.project_name}</title>
		<link rel="shortcut icon" href="../static/favicon.ico"/>
		<!-- third parties -->
${attr_more.jschess_getJsThirdParty}
		<!-- our code, options: full pack, minified, regular or file by file -->
		<!--script src="../out/jschess.pack.js"></script-->
		<!--script src="../out/jschess.min.js"></script-->
		<!--script src="../out/jschess.js"></script-->
${attr_more.jschess_jsFiles}
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
					do_select_piecerec:true,//default:false
					do_select_click:true//default:false
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
				$('rotateright').observe('click',function() {
					svgBoard.rotateright()
				});
				$('rotateleft').observe('click',function() {
					svgBoard.rotateleft()
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
		<h1>Welcome to the <b>${attr.project_name}</b> project</h1>
		<p>
			<b>${attr.project_name}</b> is a pure JavaScript library that enables:
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
			What makes <b>${attr.project_name}</b> special:
			<ul>
				<li>Pure object oriented javascript</li>
				<li>No images - totally scalable graphics</li>
				<li>You can have your board at any size you want (because of scalable graphics)</li>
				<li>As a result of being pure javascript totally controllable programatically</li>
				<li>Looks best (can animate the pieces, show arrows and what not)</li>
				<li>Free source. Full freedom to tweak or you can ask me for help with implementing a feature</li>
				<li>Sits on top of <a href="http://raphaeljs.com">raphaeljs</a> for high level SVG capabilities</li>
				<li>Sits on top of <a href="http://prototypejs.org">prototypejs</a> to make object oriented easier and more error free</li>
				<li>Sits on top of <a href="https://github.com/jhlywa/chess.js">chess.js</a> to do game parsing and validation</li>
			</ul>
		</p>
		<p>
			Technologies used to develop <b>${attr.project_name}</b>...
			<ul>
				<li><a href="http://www.javascriptlint.com/download.htm">jsl</a> to make sure javascript code is standards complient</li>
				<li><a href="http://qunitjs.com">qunitjs</a> for testing</li>
				<li><a href="http://developer.yahoo.com/yui/compressor">YUI compressor</a> is used for compressing</li>
				<li><a href="http://www.crockford.com/javascript/jsmin.html">jsmin</a> is used for compressing</li>
				<li><a href="http://www.python.org">python</a> is used for scripting</li>
				<li><a href="http://www.makotemplates.org">mako</a> is used for templating the web site</li>
				<li><a href="http://www.gnu.org/software/make">GNU make</a> is used for building</li>
				<li><a href="http://www.javascriptlint.com">JavaScript Lint</a> is used for checking the source code</li>
				<li><a href="https://developers.google.com/closure/utilities/docs/linter_howto">Closure Linter</a> is used for checking the source code</li>
			</ul>
		</p>
		<p>The current version of <b>${attr.project_name}</b> is ${attr.git_lasttag}
		</p>
		<p>
			<b>This is alpha material at the moment, use at your own risk! API is subject to change!</b>
		</p>
			Some links:
			<ul>
				<li><b>${attr.project_name}</b> API is <a href="../jsdoc">here</a></li>
				<li><b>${attr.project_name}</b> github projec is <a href="${attr.project_website_git}">here</a></li>
				<li>latest full <b>${attr.project_name}</b> is <a href="${attr.project_website}/out/jschess.js">jschess.js</a></li>
				<li>latest minified <b>${attr.project_name}</b> is <a href="${attr.project_website}/out/jschess.min.js">jschess.min.js</a></li>
				<li>latest package (with third parties) <b>${attr.project_name}</b> is <a href="${attr.project_website}/out/jschess.pack.js">jschess.pack.js</a></li>
				<li>latest sources for <b>${attr.project_name}</b> is <a href="${attr.project_website}/out/jschess.zip">jschess.zip</a></li>
			</ul>
			Demos of <b>${attr.project_name}</b>...
			<ul>
				<li><a href="demo_using_pack.html">Using the pack.js file</a></li>
				<li><a href="demo_using_min.html">Using the min.js file</a></li>
				<li><a href="demo_moving_pieces.html">Moving pieces</a></li>
				<li><a href="demo_fen.html">Showing a FEN position</a></li>
				<li><a href="demo_controls.html">Showing controls</a></li>
				<li><a href="demo_pgn.html">Showing a PGN game</a></li>
				<li><a href="demo_config.html">Config options</a></li>
				<li><a href="demo_wordpress.html">Using the Wordpress plugin</a></li>
			</ul>
			Misc pages that help develop <b>${attr.project_name}</b>...
			<ul>
				<li><a href="calc.html">SVG path calculator (comes in handy when doing SVG graphics)</a></li>
				<li><a href="tests.html">${attr.project_name} QUnit tests</a></li>
			</ul>
			Here is a quick demo (go ahead and zoom it with Ctrl+[+/-] to see what SVG is all about...):
			<div id="myid">
			</div>
			<button id="startpos">startpos</button>
			<button id="moverooks">moverooks</button>
			<button id="moveknights">moveknights</button>
			<button id="movebishops">movebishops</button>
			<button id="flip">flip</button>
			<button id="rotateright">rotateright</button>
			<button id="rotateleft">rotateleft</button>
			<button id="glow">glow</button>
			<button id="clear">clear</button>
		</p>
		<p>
			To donate to <b>${attr.project_name}</b> please use the following button:
			${attr.project_paypal_donate_button_snipplet}
		</p>
		<p>
			Copyright ${attr.personal_fullname}, Copyright ${attr.project_copyright_years}
			<a href="${attr.personal_email}">${attr.personal_email}</a>
		</p>
	</body>
</html>
