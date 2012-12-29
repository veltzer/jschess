<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<html>
	<head>
		<meta charset="UTF-8">
		<!-- third parties -->
		<script src="../thirdparty/jquery-1.8.3.min.js"></script>
		<script src="../thirdparty/raphael-2.1.0.min.js"></script>
		<script>
			$(document).ready(function() {
				$('#calc').click(function() {
					var path=$('#path').val()
					var x=$('#x').val()
					var y=$('#y').val()
					var m=Raphael.matrix()
					m.translate(x,y)
					var transform=m.toTransformString()
					var transformPath=Raphael.transformPath(path,transform)
					//console.log('path is '+path)
					//console.log('x is '+x)
					//console.log('y is '+y)
					$('#result').text(transformPath)
				})
			})
		</script>
	</head>
	<body>
		<h1>SVG path calculator</h1>
		<p>
		This is an svg calculator. Put in an SVG path and a transform x and y and get the resulting
		path.
		</p>
		Enter the path <input style="width:100%" id="path"/><br/>
		Enter x <input id="x"/><br/>
		Enter y <input id="y"/><br/>
		<button id="calc">calc</button><br/>
		Result <div id="result"/>
	</body>
</html>
