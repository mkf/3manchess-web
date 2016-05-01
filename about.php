<!DOCTYPE html>
<html>

<head>
	<title>3manchess-web — About us</title>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<!--script type="text/javascript" src="js/jquery-2.2.3.min.js"></script-->
</head>

<body>
	<!-- Google Tag Manager -->
	<noscript>
		<iframe src="//www.googletagmanager.com/ns.html?id=GTM-5ZJ772" height="0" width="0" style="display:none;visibility:hidden">
		</iframe>
	</noscript>
	<script>
		(function(w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({
				'gtm.start': new Date().getTime(),
				event: 'gtm.js'
			});
			var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != 'dataLayer' ? '&l=' + l : '';
			j.async = true;
			j.src =
				'//www.googletagmanager.com/gtm.js?id=' + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-5ZJ772');
	</script>
	<!-- End Google Tag Manager -->
	<a href="https://github.com/ArchieT/3manchess">Backend on GitHub</a><br>
	<a href="https://github.com/ArchieT/3manchess-web">This website on GitHub</a><br>
	<hr>

	<?php
include_once 'dep/markdown.php';
$ourtext = file_get_contents('about.md');
$ourconten = Markdown($ourtext);
echo $ourconten;
?>
		<hr>

		<a href="http://3manchess.com" target="_blank">About the game (rules, tutorial, sets)</a>

		<!--script type="text/javascript" src="js/website.js"></script-->
</body>

</html>
