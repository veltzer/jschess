<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${config.project.project_name} - Moving pieces</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		${tdefs.project_google_analytics_snipplet}

		${config.js_chess.jschess_js_section}

		${config.js_chess.jschess_js_section_highlight}

		<script type="text/javascript">
			document.observe('dom:loaded', function() {
				var board=new Board()
				var svgBoard=new SvgBoard(board,{
					id:'myid'
				})
				board.startPosition()
				var have_errors;
				function error_reset() {
					$('errors').innerHTML='';
					have_errors=0;
				}
				function error_add(msg) {
					if(have_errors>0) {
						$('errors').innerHTML+=', ';
					}
					$('errors').innerHTML+=msg;
					have_errors+=1;
				}
				function error_have() {
					return have_errors!=0;
				}
				function isNumber(n) {
					return !isNaN(parseFloat(n)) && isFinite(n);
				}
				$('move').observe('click',function() {
					error_reset();
					var fromX=$('fromX').value;
					var fromY=$('fromY').value;
					var toX=$('toX').value;
					var toY=$('toY').value;
					if(!isNumber(fromX)) {
						error_add('fromX is not a number');
					}
					if(!isNumber(fromY)) {
						error_add('fromY is not a number');
					}
					if(!isNumber(toX)) {
						error_add('toX is not a number');
					}
					if(!isNumber(toY)) {
						error_add('toY is not a number');
					}
					if(error_have()) {
						return;
					}
					fromX=parseInt(fromX);
					fromY=parseInt(fromY);
					toX=parseInt(toX);
					toY=parseInt(toY);
					if(fromX<0 || fromX>7) {
						error_add('bad fromX value');
					}
					if(fromY<0 || fromY>7) {
						error_add('bad fromY value');
					}
					if(toX<0 || toX>7) {
						error_add('bad toX value');
					}
					if(toY<0 || toY>7) {
						error_add('bad toY value');
					}
					if(error_have()) {
						return;
					}
					if(!board.hasPieceAtPosition(new PiecePosition(fromX,fromY))) {
						error_add('dont have piece at '+fromX+','+fromY);
					}
					if(board.hasPieceAtPosition(new PiecePosition(toX,toY))) {
						error_add('have piece at '+toX+','+toY);
					}
					if(error_have()) {
						return;
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
		</p>
		<pre><code class="js"><%block filter="h, trim">
board.movePieceByPos(
	new PiecePosition(fromX,fromY),
	new PiecePosition(toX,toY)
);
		</%block></code></pre>
		<p>
		When you build the PiecePosition objects above <b>you</b> must make sure that
		the <b>fromX, fromY, toX, toY</b> values passed to the method are valid numbers
		in the [0..8) range. You must also make sure that a piece is in the from position
		and that the two position does not have a piece. If you fail to do that
		then the method may fail with an exception or some worse way.
		Using this method the board will do <b>no verification</b> that the move is
		a valid chess move in any way. You must make sure of that (parse a correct PGN file, do it
		yourself etc.).
		Currently the board does not support verficiation of moves, although that is
		in the TODO list.
		</p>
		<div id="myid"></div>
		<form action="javascript:void(0);">
			fromX: <input id="fromX"/>
			fromY: <input id="fromY"/>
			toX: <input id="toX"/>
			toY: <input id="toY"/>
		</form>
		<br/>
		<button id="move">move</button>
		<br/>
		<p>
			errors:
		</p>
		<div id="errors"></div>
		<p>
			Copyright ${config.personal.personal_fullname}, ${tdefs.project_copyright_years}
			<a href="${tdefs.personal_email}">${tdefs.personal_email}</a>
		</p>
	</body>
</html>
