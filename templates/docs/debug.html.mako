<%!
    import pydmt.helpers.project
    import pydmt.helpers.signature
    import config.personal
    import config.jschess
%><!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>${pydmt.helpers.project.get_name()} - debug page</title>
	<link rel="shortcut icon" href="favicon.ico"/>
	<meta name="Description" content="${config.project.description_long}"/>
	<meta name="Keywords" content="${config.personal.fullname}, ${config.personal.slug}, ${pydmt.helpers.project.get_name()}, ${', '.join(config.project.keywords)}"/>

	${config.jschess.jschess_js_section_debug}

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
			Copyright ${config.personal.fullname} © ${pydmt.helpers.signature.get_copyright_years_long()}
			<a href="${config.personal.email}">${config.personal.email}</a>
		</p>
	</body>
</html>
