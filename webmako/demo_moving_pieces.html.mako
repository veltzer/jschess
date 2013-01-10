<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Moving pieces</title>
		<link rel="shortcut icon" href="favicon.ico"/>
		<!-- third parties -->
${jsThirdParty()}
		<!--script src="../out/jschess-${ver}.min.js"></script!-->
		<script src="../out/jschess-${ver}.min.js"></script>

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
				function error(msg) {
					$('errors').innerHTML=msg;
				}
				$('move').observe('click',function() {
					var fromX=$('fromX').value;
					var fromY=$('fromY').value;
					var toX=$('toX').value;
					var toY=$('toY').value;
					fromX=parseInt(fromX,10);
					fromY=parseInt(fromY,10);
					toX=parseInt(toX,10);
					toY=parseInt(toY,10);
					if(fromX==NaN) {
						error('cannot parse fromX');
					}
					if(fromY==NaN) {
						error('cannot parse fromY');
					}
					if(toX==NaN) {
						error('cannot parse toX');
					}
					if(toY==NaN) {
						error('cannot parse toY');
					}
					if(fromX<0 || fromX>7) {
						error('bad fromX value');
					}
					if(fromY<0 || fromY>7) {
						error('bad fromY value');
					}
					if(toX<0 || toX>7) {
						error('bad toX value');
					}
					if(toY<0 || toY>7) {
						error('bad toY value');
					}
					if(!board.hasPieceAtPosition(new PiecePosition(fromX,fromY))) {
						error('dont have piece at '+fromX+','+fromY);
					}
					if(board.hasPieceAtPosition(new PiecePosition(toX,toY))) {
						error('have piece at '+toX+','+toY);
					}
					board.movePieceByPos(
						new PiecePosition(fromX,fromY),
						new PiecePosition(toX,toY)
					);
				})
			})
		</script>
	</head>
	<body>
		<h1>Moving pieces</h1>
		<p>
		In order to move pieces first create a board (see other guides). Then, once
		you have a board call:
		<pre class="brush: js">
			board.movePieceByPos(
				new PiecePosition(fromX,fromY),
				new PiecePosition(toX,toY)
			);</pre>
		Using this method the board will do <b>no verification</b> that the move is
		valid in any way. You must make sure of that (parse a correct PGN file, do it
		yourself etc.).
		Currently the board does not support verficiation of moves, although that is
		in the TODO list.
		</p>
		<div id='myid'></div>
		fromX: <input id='fromX'></input>
		fromY: <input id='fromY'></input>
		toX: <input id='toX'></input>
		toY: <input id='toY'></input>
		<br/>
		<button id='move'>move</button>
		<br/>
		errors: <div id='errors'></div>
		<p>
			Mark Veltzer, Copyright ${copyright_years(2012)}
			<a href="mailto:mark.veltzer@gmail.com">mark.veltzer@gmail.com</a>
		</p>
	</body>
</html>
