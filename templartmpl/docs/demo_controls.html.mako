<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${tdefs.project_name} - Showing controls</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		${tdefs.project_google_analytics_snipplet}

		${tdefs.jschess_js_section}

		${tdefs.jschess_js_section_highlight}

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
		<pre><code class="html"><%block filter="h, trim">
		<div id="myid"></div>
		</%block></code></pre>
		Then you can create a Controls object from your javascript code by calling the constructor of Controls.
		<pre><code class="js"><%block filter="h, trim">
var controls=new Controls({
	id:'myid'
})
		</%block></code></pre>
		<p>
		Here is the result:
		</p>
		<div id="myid"></div>
		<p>
			Copyright ${tdefs.personal_fullname}, ${tdefs.project_copyright_years}
			<a href="${tdefs.personal_email}">${tdefs.personal_email}</a>
		</p>
	</body>
</html>
