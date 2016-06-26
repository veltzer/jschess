#!/bin/bash
set -euo pipefail

TP=thirdparty
rm -rf $TP
mkdir $TP

# prototype
curl https://ajax.googleapis.com/ajax/libs/prototype/1.7.3.0/prototype.js -o $TP/prototype.js 2> /dev/null
~/install/closure/closure.jar $TP/prototype.js --js_output_file $TP/prototype.min.js 2> /dev/null

# chess
curl https://raw.githubusercontent.com/jhlywa/chess.js/master/chess.js -o $TP/chess.js 2> /dev/null
curl https://raw.githubusercontent.com/jhlywa/chess.js/master/chess.min.js -o $TP/chess.min.js 2> /dev/null

# qunit
curl https://code.jquery.com/qunit/qunit-2.0.0.js -o $TP/qunit.js 2> /dev/null
curl https://code.jquery.com/qunit/qunit-2.0.0.css -o $TP/qunit.css 2> /dev/null

# raphael
curl https://raw.githubusercontent.com/DmitryBaranovskiy/raphael/master/raphael.min.js -o $TP/raphael.min.js 2> /dev/null
curl https://raw.githubusercontent.com/DmitryBaranovskiy/raphael/master/raphael.js -o $TP/raphael.js 2> /dev/null

# highlight
curl https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/default.min.css -o $TP/highlight.min.css 2> /dev/null
curl https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/highlight.min.js -o $TP/highlight.min.js 2> /dev/null

# finish up
chmod 444 $TP/*
