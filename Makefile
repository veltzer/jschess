VER:=0.1
SOURCES:=$(shell find src -name "*.js")
JSDOC:=jsdoc
JSDOC_FILE:=$(JSDOC)/index.html
JSFULL:=out/jschess-$(VER).js
JSMIN:=out/jschess-$(VER).min.js

.PHONY: all
all: $(JSMIN) $(JSDOC_FILE) 

$(JSFULL): $(SOURCES)
	$(info doing [$@])
	cat $(SOURCES) > $@

$(JSMIN): $(JSFULL)
	$(info doing [$@])
	@-mkdir $(dir $@) 2> /dev/null || exit 0
	@yui-compressor $< -o $@

.PHONY: jsdoc
jsdoc: $(JSDOC)/index.html
	$(info doing [$@])

$(JSDOC_FILE): $(SOURCES)
	$(info doing [$@])
	@-rm -rf $(JSDOC)
	@-mkdir $(dir $@) 2> /dev/null || exit 0
	@jsdoc -d=$(JSDOC) src 1> /dev/null


.PHONY: clean
clean:
	$(info doing [$@])
	-@rm -rf $(JSDOC) $(JSMIN) $(JSFULL)

.PHONY: debug
debug:
	$(info SOURCES is $(SOURCES))
	$(info JSFULL is $(JSFULL))
	$(info JSMIN is $(JSMIN))
	$(info JSDOC_FILE is $(JSDOC_FILE))
