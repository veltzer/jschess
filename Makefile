VER:=0.1
PROJECT=jschess
SRC_FOLDER=src
TP_FOLDER=thirdparty
SOURCES:=$(shell find $(SRC_FOLDER) -name "*.js")
JSDOC_FOLDER:=jsdoc
JSDOC_FILE:=$(JSDOC_FOLDER)/index.html
HTML_FILES:=index.html calc.html favicon.ico
OUT_FOLDER:=out
JSFULL:=$(OUT_FOLDER)/$(PROJECT)-$(VER).js
JSMIN:=$(OUT_FOLDER)/$(PROJECT)-$(VER).min.js
WEB_DIR:=/var/www/$(PROJECT)

.PHONY: all
all: $(JSMIN) $(JSDOC_FILE) 

$(JSFULL): $(SOURCES)
	$(info doing [$@])
	@mkdir -p $(dir $@)
	@cat $(SOURCES) > $@

$(JSMIN): $(JSFULL)
	$(info doing [$@])
	@mkdir -p $(dir $@)
	@yui-compressor $< -o $@

.PHONY: jsdoc
jsdoc: $(JSDOC_FILE)
	$(info doing [$@])

$(JSDOC_FILE): $(SOURCES)
	$(info doing [$@])
	@-rm -rf $(JSDOC_FOLDER)
	@mkdir -p $(dir $@)
	@jsdoc -d=$(JSDOC_FOLDER) $(SRC_FOLDER) 1> /dev/null


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
	$(info WEB_DIR is $(WEB_DIR))
	$(info SRC_FOLDER is $(SRC_FOLDER))
	$(info TP_FOLDER is $(TP_FOLDER))
	$(info HTML_FILES is $(HTML_FILES))

.PHONY: install
install: all
	sudo rm -rf $(WEB_DIR)
	sudo mkdir -p $(WEB_DIR)
	sudo cp -r $(HTML_FILES) $(TP_FOLDER) $(SRC_FOLDER) $(JSDOC_FOLDER) $(WEB_DIR)
