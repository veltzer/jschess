VER:=0.1
JSDOC:=jsdoc
JSDOC_FILE:=$(JSDOC)/index.html
JSMIN:=out/jschess-$(VER).min.js

.PHONY: all
all: $(JSMIN) $(JSDOC_FILE) 

$(JSMIN): jschess.js
	$(info doing [$@])
	@-mkdir $(dir $@) 2> /dev/null || exit 0
	@yui-compressor $< -o $@

.PHONY: jsdoc
jsdoc: $(JSDOC)/index.html
	$(info doing [$@])

$(JSDOC_FILE): jschess.js
	$(info doing [$@])
	@-rm -rf $(JSDOC)
	@-mkdir $(dir $@) 2> /dev/null || exit 0
	@jsdoc -d=$(JSDOC) jschess.js 1> /dev/null


.PHONY: clean
clean:
	$(info doing [$@])
	-@rm -rf $(JSDOC) $(JSMIN) 
