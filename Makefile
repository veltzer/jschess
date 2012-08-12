VER:=0.1
JSDOC:=jsdoc
JSDOC_FILE:=$(JSDOC)/index.html
JSOUT:=jschess-$(VER).min.js

.PHONY: all
all: $(JSOUT) $(JSDOC_FILE) 

$(JSOUT): jschess.js
	$(info doing [$@])
	@yui-compressor $< -o $@

.PHONY: jsdoc
jsdoc: $(JSDOC)/index.html
	$(info doing [$@])

$(JSDOC_FILE): jschess.js
	$(info doing [$@])
	@-rm -rf $(JSDOC)
	@-mkdir $(JSDOC) 2> /dev/null
	@jsdoc -d=$(JSDOC) jschess.js 1> /dev/null


.PHONY: clean
clean:
	$(info doing [$@])
	-@rm -rf $(JSDOC) $(JSOUT) 
