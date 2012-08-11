VER:=0.1

jschess-$(VER).min.js: jschess.js
	$(info doing [$@])
	yui-compressor $< -o $@

.PHONY: jsdoc
jsdoc: jsdoc/index.html

jsdoc/index.html: jschess.js
	jsdoc -d=jsdoc jschess.js
