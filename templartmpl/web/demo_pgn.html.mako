<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Showing a PGN game</title>
		<link rel="shortcut icon" href="../static/favicon.ico"/>
		<!-- third parties -->
${tdefs.jschess_getJsThirdParty}
		<!--script src="../out/jschess.min.js"></script-->
		<script type="text/javascript" src="../out/jschess.js"></script>

		<!-- highlight.js stuff -->
		<script type="text/javascript" src="../thirdparty/highlist.min.js"></script>
		<link href="../thirdparty/highlight.min.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript">hljs.initHighlightingOnLoad();</script>

		<script type="text/javascript">
			document.observe('dom:loaded', function() {
				console.log('in here');
				var pgnReader=new PgnReader();
				pgnReader.get('../pgn/karpov_kasparov_1975.pgn');
			})
		</script>
	</head>
	<body>
		<h1>Showing a PGN game</h1>
		<p>
		TBD
		</p>
		<p>
			Mark Veltzer, Copyright ${tdefs.project_copyright_years}
			<a href="mailto:${tdefs.personal_email}">${tdefs.personal_email}</a>
		</p>
	</body>
</html>
