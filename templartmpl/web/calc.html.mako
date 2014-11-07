<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>SVG path calculator</title>
		<link rel="shortcut icon" href="../static/favicon.ico"/>
		<!-- third parties -->
${attr_more.jschess_getJsThirdParty}
		<script type="text/javascript">
			document.observe('dom:loaded', function() {
				$('calc').observe('click',function() {
					var path=$('path').value
					var x=$('x').value
					var y=$('y').value
					var m=Raphael.matrix()
					m.translate(x,y)
					var transform=m.toTransformString()
					var transformPath=Raphael.transformPath(path,transform)
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
		<form action="javascript:void(0);">
			Enter the path <input style="width:100%" id="path"/><br/>
			Enter x <input id="x"/><br/>
			Enter y <input id="y"/><br/>
			<button id="calc">calc</button><br/>
			Result <div id="result"></div>
		</form>
		<p>
		Example can be:<br/>
		path: M 34,14 L 31,17 L 14,17 L 11,14<br/>
		x: 5<br/>
		y: 6<br/>
		</p>
		<p>
			Mark Veltzer, Copyright ${attr.project_copyright_years}
			<a href="mailto:${attr.personal_email}">${attr.personal_email}</a>
		</p>
	</body>
</html>
