import datetime

project_github_username="veltzer"
project_name="jschess"
project_website=f"https://{project_github_username}.github.io/{project_name}"
project_website_source=f"https://github.com/{project_github_username}/{project_name}"
project_website_git=f"git://github.com/{project_github_username}/{project_name}.git"
project_paypal_donate_button_id="XKSSBRVJM7HHA"
project_google_analytics_tracking_id="UA-80188541-1"
project_google_analytics_snipplet = f"""<script type="text/javascript">
(function(i,s,o,g,r,a,m){{i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){{
(i[r].q=i[r].q||[]).push(arguments)}},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
}})(window,document,"script","https://www.google-analytics.com/analytics.js","ga");

ga("create", "{project_google_analytics_tracking_id}", "auto");
ga("send", "pageview");

</script>"""
project_long_description="jschess is a JavaScript based chess board"
project_keywords=[
    "JavaScript",
    "chess",
    "board",
    "chessboard",
]
project_year_started="2012"
project_copyright_years = ", ".join(
    map(str, range(int(project_year_started), datetime.datetime.now().year + 1)))
project_description=f"""jschess is a JavaScript chess board written in pure JavaScript.
It allows yo to create a chess board, have it show games in PGN
notation from a server, moves pieces around, set up positions
and more.

Technologies used
-----------------
* Prototype javascript library at http://prototypejs.org.
* Raphael javascript library at http://raphaeljs.com.
* chess.java javascript library at https://github.com/jhlywa/chess.js.

Demo
----
Is at github pages at {project_website}.

What makes jschess different?
-----------------------------
* Pure javascript.
* No images - totally scalable graphics.
* You can have your board at any size you want (because of scalable graphics).
* As a result of being pure javascript totally controllable programatically.
* Looks best.
* Sits on top of good infrastructure (prototype.js,raphael.js,chess.js).

Monetary contribution
---------------------
If you"d like to see a feature added to jschess or would just like to show
your appreciation you are welcome to contribute to it"s development at
{project_website}.
I am ready to work with any chess organization wishing to incorporate jschess
into their infrastructre and am already working with two such organizations..."""

project_paypal_donate_button_id = "0"
project_paypal_donate_button_snipplet = f"""<form action="https://www.paypal.com/cgi-bin/webscr"
    method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="{project_paypal_donate_button_id}">
<input type="image" src="https://www.paypalobjects.com/en_US/IL/i/btn/btn_donateCC_LG.gif" name="submit"
alt="PayPal - The safer, easier way to pay online!">
<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
</form>"""
