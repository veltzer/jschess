<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<html>
	<head>
		<meta charset="UTF-8">
		<title>SVG path calculator</title>
		<!-- third parties -->
${jsThirdParty()}
		<script>
			document.observe('dom:loaded', function() {
				$('calc').observe('click',function() {
					var path=$('path').value
					var x=$('x').value
					var y=$('y').value
					var m=Raphael.matrix()
					m.translate(x,y)
					var transform=m.toTransformString()
					var transformPath=Raphael.transformPath(path,transform)
					//console.log('path is '+path)
					//console.log('x is '+x)
					//console.log('y is '+y)
					$('result').update(transformPath)
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
		Result <div id="result"></div>
		<p>
		Example can be:<br/>
		path: M 34,14 L 31,17 L 14,17 L 11,14<br/>
		x: 5<br/>
		y: 6<br/>
		</p>
		<p>
			Mark Veltzer, Copyright ${copyright_years(2012)}
			<a href="mailto:mark.veltzer@gmail.com">mark.veltzer@gmail.com</a>
		</p>
	</body>
</html>
