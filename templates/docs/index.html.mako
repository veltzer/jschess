<%!
    import pydmt.helpers.project
    import pydmt.helpers.signature
    import pydmt.helpers.misc
    import pydmt.helpers.urls
    import user.personal
    import config.jschess
%><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${pydmt.helpers.project.get_name()} - main page</title>
		<link rel="shortcut icon" href="favicon.ico"/>
		<meta name="Description" content="${config.project.description_long}"/>
		<meta name="Keywords" content="${user.personal.fullname}, ${user.personal.slug}, ${pydmt.helpers.project.get_name()}, ${', '.join(config.project.keywords)}"/>

		${config.jschess.jschess_js_section}

		${config.jschess.jschess_js_section_highlight}

		<script type="text/javascript">
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
		<h1>Welcome to the <i>${pydmt.helpers.project.get_name()}</i> web site</h1>
		<p>
			<b>${pydmt.helpers.project.get_name()}</b> is a pure JavaScript library that enables:
		</p>
		<ul>
			<li>Showing chess games in <a href="http://en.wikipedia.org/wiki/Portable_Game_Notation">PGN</a> format (hardcoded or coming from a server)</li>
			<li>Showing chess positions in <a href="http://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation">FEN</a> format (hardcoded or coming from a server)</li>
			<li>Writing a web app that shows chess riddles and their solutions</li>
			<li>Writing a web app that enables the end user to create chess positions and save them (in FEN or other format)</li>
			<li>Allows to build a chess game where the player plays a server or some other player</li>
			<li>Allows to build live broadcast systems for competitions</li>
			<li>Other things I did not think about</li>
		</ul>
		<p>
			What makes <b>${pydmt.helpers.project.get_name()}</b> special:
		</p>
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
		<p>
			Technologies used to develop <b>${pydmt.helpers.project.get_name()}</b>...
		</p>
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
		<p>The current version of <b>${pydmt.helpers.project.get_name()}</b> is ${pydmt.helpers.misc.get_version_str()}
		</p>
		<p>
			<b>This is alpha material at the moment, use at your own risk! API is subject to change!</b>
		</p>
		<p>
			Some links:
		</p>
		<ul>
			<li><b>${pydmt.helpers.project.get_name()}</b> API is <a href="jsdoc/index.html">here</a></li>
			<li><b>${pydmt.helpers.project.get_name()}</b> github clone link is <a href="${pydmt.helpers.urls.get_website_git()}">here</a></li>
			<li><b>${pydmt.helpers.project.get_name()}</b> github development is at <a href="${pydmt.helpers.urls.get_website_source()}">here</a></li>
			<li><b>${pydmt.helpers.project.get_name()}</b> website is at <a href="${pydmt.helpers.urls.get_website()}">here</a></li>
			<li>latest full build for <b>${pydmt.helpers.project.get_name()}</b> is <a href="${pydmt.helpers.urls.get_website()}/out/jschess.js">jschess.js</a></li>
			<li>latest minified output for <b>${pydmt.helpers.project.get_name()}</b> is <a href="${pydmt.helpers.urls.get_website()}/out/jschess.min.js">jschess.min.js</a></li>
			<li>latest package (with third parties) for <b>${pydmt.helpers.project.get_name()}</b> is <a href="${pydmt.helpers.urls.get_website()}/out/jschess.pack.js">jschess.pack.js</a></li>
			<li>latest sources for <b>${pydmt.helpers.project.get_name()}</b> is <a href="${pydmt.helpers.urls.get_website()}/out/jschess.zip">jschess.zip</a></li>
		</ul>
		<p>
			Demos of <b>${pydmt.helpers.project.get_name()}</b>...
		</p>
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
		<p>
			Misc pages that help develop <b>${pydmt.helpers.project.get_name()}</b> and possibly other things...
		</p>
		<ul>
			<li><a href="calc.html">SVG path calculator (comes in handy when doing SVG graphics)</a></li>
			<li><a href="tests.html">${pydmt.helpers.project.get_name()} QUnit tests</a></li>
		</ul>
		<p>
			Here is a quick demo (go ahead and zoom it with Ctrl+[+/-] to see what SVG is all about...):
		</p>
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
		<p>
			Copyright ${user.personal.fullname} © ${pydmt.helpers.signature.get_copyright_years_long()}
			<a href="${user.personal.email}">${user.personal.email}</a>
		</p>
	</body>
</html>
