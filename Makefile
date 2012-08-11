VER:=0.1

jschess-$(VER).min.js: jschess.js
	$(info doing [$@])
	yui-compressor $< -o $@
