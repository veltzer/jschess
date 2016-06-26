<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Showing controls</title>
		<link rel="shortcut icon" href="../static/favicon.ico"/>
		<!-- third parties -->
${tdefs.jschess_getJsThirdParty}
		<!--script src="../out/jschess.min.js"></script-->
		<script type="text/javascript" src="../out/jschess.js"></script>

		<!-- highlight.js stuff -->
		<script type="text/javascript" src="../thirdparty/highlist.min.js"></script>
		<link href="../thirdparty/highlight.min.css" rel="stylesheet" type="text/css" />
		<script>hljs.initHighlightingOnLoad();</script>

		<script type="text/javascript">
			document.observe('dom:loaded', function() {
				var controls=new Controls({
					id:'myid'
				})
			})
		</script>
	</head>
	<body>
		<h1>Showing controls</h1>
		<p>
		A controls object is one which allows you to control a prerecorded game.
		It provides with 6 buttons to control the game.
		You need a place for your controls, so place something like this somewhere in your html:
		</p>
		<pre><code class="xml"><%block filter="h">
		<div id="myid"></div></%block></code></pre>
		Then you can create a Controls object from your javascript code by calling the constructor of Controls.
		<pre><code class="js"><%block filter="h">
			var controls=new Controls({
				id:'myid'
			})</%block></code></pre>
		<p>
		Here is the result:
		</p>
		<div id="myid"></div>
		<p>
			Mark Veltzer, Copyright ${tdefs.project_copyright_years}
			<a href="mailto:${tdefs.personal_email}">${tdefs.personal_email}</a>
		</p>
	</body>
</html>
