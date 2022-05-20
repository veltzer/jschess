<%!
    import pydmt.helpers.project
    import pydmt.helpers.signature
    import user.personal
    import config.jschess
%><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>${pydmt.helpers.project.get_name()} - Using the min.js file</title>
		<link rel="shortcut icon" href="favicon.ico"/>

		${config.jschess.jschess_js_section}

		${config.jschess.jschess_js_section_highlight}

		<script type="text/javascript">
			document.observe('dom:loaded', function() {
				var board=new Board()
				var svgBoard=new SvgBoard(board,{
					id:'myid'
				})
				board.startPosition()
			})
		</script>
	</head>
	<body>
		<h1>Using the min.js file</h1>
		<p>
			In order to use <b>jschess</b> you will either need to .pack.js file which contains all needed libraries (which is discussed
			elsewhere) or you will need to download the minified version (.min.js) which is discussed here.
			This is the list of third party libraries used by <b>jschess</b> and their download location...
		</p>
		<table border="1">
			<tr>
				<td>name</td>
				<td>version</td>
				<td>minified from web</td>
				<td>debug from web</td>
				<td>documentation</td>
				<td>debug from me</td>
				<td>minified from me</td>
			</tr>
			% for dep in config.jschess.jschess_runtimedeps:
			<tr>
				<td>${dep.name}</td>
				<td>${dep.version}</td>
				% if dep.downloadUrl is not None:
				<td><a href="${dep.downloadUrl}">download</a></td>
				% else:
				<td>Not available for download</td>
				% endif
				% if dep.downloadUrlDebug is not None:
				<td><a href="${dep.downloadUrlDebug}">download</a></td>
				% else:
				<td>Not available for download</td>
				% endif
				<td><a href="${dep.documentation}">link</a></td>
				<td><a href="../${dep.myFileDebug}">my download</a></td>
				<td><a href="../${dep.myFile}">my download</a></td>
			</tr>
			% endfor
		</table>
		<p>
		Import them so:
		</p>
		<pre><code class="html"><%block filter="h, trim">
${config.jschess.jschess_getJsThirdParty}></%block></code></pre>
		<p>
		Then download the minified <b>jschess</b> file from <a title="jschess compressed download" href="../out/jschess.min.js">here</a>.
		Place the file somewhere on your web server and import it from your HTML like this:
		</p>
		<pre><code class="html"><%block filter="h, trim">
		<script type="text/javascript" src="jschess.min.js"></script></%block></code></pre>
		If you want to help me debug <b>jschess</b> or are experiencing problems you can download the uncompressed file
		from <a title="jschess uncompressed download" href="../out/jschess.js">here</a> and use it like this:
		<pre><code class="html"><%block filter="h, trim">
		<script type="text/javascript" src="jschess.js"></script></%block></code></pre>
		You need a place for your board, so place something like this somewhere in your html:
		<pre><code class="html"><%block filter="h, trim">
		<div id="myid"></div></%block></code></pre>
		Then you can create a board from your javascript code by calling the constructor of SvgBoard. The board will be empty so we call startpos to get initial game position:
		<pre><code class="js"><%block filter="h, trim">
var board=new Board()
var svgBoard=new SvgBoard(board,{ id:'myid' })
board.startPosition()
		</%block></code></pre>
		<p>
		Here is the result:
		</p>
		<div id="myid"></div>
		<p>
			Copyright ${user.personal.fullname} © ${pydmt.helpers.signature.get_copyright_years_long()}
			<a href="${user.personal.email}">${user.personal.email}</a>
		</p>
	</body>
</html>
