VER:=0.1
PROJECT=jschess
SOURCES:=$(shell find src -name "*.js")
JSDOC_FOLDER:=jsdoc
JSDOC_FILE:=$(JSDOC_FOLDER)/index.html
OUT_FOLDER:=out
JSFULL:=$(OUT_FOLDER)/$(PROJECT)-$(VER).js
JSMIN:=$(OUT_FOLDER)/$(PROJECT)-$(VER).min.js

.PHONY: all
all: $(JSMIN) $(JSDOC_FILE) 

$(JSFULL): $(SOURCES)
	$(info doing [$@])
	@-mkdir $(dir $@) 2> /dev/null || exit 0
	@cat $(SOURCES) > $@

$(JSMIN): $(JSFULL)
	$(info doing [$@])
	@-mkdir $(dir $@) 2> /dev/null || exit 0
	@yui-compressor $< -o $@

.PHONY: jsdoc
jsdoc: $(JSDOC_FILE)
	$(info doing [$@])

$(JSDOC_FILE): $(SOURCES)
	$(info doing [$@])
	@-rm -rf $(JSDOC_FOLDER)
	@-mkdir $(dir $@) 2> /dev/null || exit 0
	@jsdoc -d=$(JSDOC_FOLDER) src 1> /dev/null


.PHONY: clean
clean:
	$(info doing [$@])
	-@rm -rf $(JSDOC_FOLDER) $(OUT_FOLDER)

.PHONY: debug
debug:
	$(info VER is $(VER))
	$(info PROJECT is $(PROJECT))
	$(info SOURCES is $(SOURCES))
	$(info JSFULL is $(JSFULL))
	$(info JSMIN is $(JSMIN))
	$(info OUT_FOLDER is $(OUT_FOLDER))
	$(info JSDOC_FOLDER is $(JSDOC_FOLDER))
	$(info JSDOC_FILE is $(JSDOC_FILE))
