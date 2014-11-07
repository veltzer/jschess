############
# includes #
############
include /usr/share/templar/Makefile

ALL:=$(TEMPLAR_ALL)
ALL_DEP:=$(TEMPLAR_ALL_DEP)

##############
# parameters #
##############
# should we show commands executed ?
DO_MKDBG:=0
# should we do documentation ?
DO_DOCS:=1

########
# code #
########
SRC_FOLDER=src
TESTS_FOLDER=tests
THIRDPARTY_FOLDER=thirdparty
JSDOC_FOLDER:=jsdoc
JSDOC_FILE:=$(JSDOC_FOLDER)/index.html
WEB_FOLDER:=web
OUT_FOLDER:=out
PGN_FOLDER:=pgn
JSCHECK:=$(OUT_FOLDER)/$(attr.project_name).stamp
JSFULL:=$(OUT_FOLDER)/$(attr.project_name).js
JSMIN:=$(OUT_FOLDER)/$(attr.project_name).min.js
JSMIN_JSMIN:=$(OUT_FOLDER)/$(attr.project_name).min.jsmin.js
JSMIN_YUI:=$(OUT_FOLDER)/$(attr.project_name).min.yui.js
JSMIN_CLOSURE:=$(OUT_FOLDER)/$(attr.project_name).min.closure.js
JSPACK:=$(OUT_FOLDER)/$(attr.project_name).pack.js
JSZIP:=$(OUT_FOLDER)/$(attr.project_name).zip
WEB_DIR:=~mark/public_html/public/$(attr.project_name)
WEB_FOLDER:=web

# tools
TOOL_COMPILER:=~/install/closure/compiler.jar
TOOL_JSMIN:=~/install/jsmin/jsmin
TOOL_JSDOC:=~/install/jsdoc/jsdoc
TOOL_JSL:=~/install/jsl/jsl
# gjslint is taken from an ubuntu package
TOOL_GJSLINT:=gjslint
# yui-compressor is taken from an ubuntu package
TOOL_YUICOMPRESSOR:=yui-compressor

ifeq ($(DO_MKDBG),1)
Q=
# we are not silent in this branch
else # DO_MKDBG
Q=@
#.SILENT:
endif # DO_MKDBG

ALL+=$(JSPACK) $(JSZIP) $(WEB_FILES)
ifeq ($(DO_DOCS),1)
ALL+=$(JSDOC_FILE)
endif # DO_DOCS

###########
# targets #
###########
.DEFAULT_GOAL=all
.PHONY: all
all: $(ALL) $(ALL_DEP)
	$(info doing [$@])

$(JSZIP): $(attr_more.jschess_sources) $(ALL_DEP)
	$(info doing [$@])
	$(Q)zip -qr $@ $(attr_more.jschess_sources)

$(JSCHECK): $(attr_more.jschess_sources) $(ALL_DEP)
	$(info doing [$@])
	$(Q)$(TOOL_JSL) --conf=support/jsl.conf --quiet --nologo --nosummary --nofilelisting $(attr_more.jschess_sources)
	$(Q)wrapper_silent $(TOOL_GJSLINT) --flagfile support/gjslint.cfg $(attr_more.jschess_sources)
	$(Q)mkdir -p $(dir $@)
	$(Q)touch $(JSCHECK)

$(JSFULL): $(attr_more.jschess_sources) $(JSCHECK) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(attr_more.jschess_sources) > $@

$(JSMIN): $(JSFULL) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)$(TOOL_JSMIN) < $< > $(JSMIN_JSMIN)
	$(Q)$(TOOL_YUICOMPRESSOR) $< -o $(JSMIN_YUI)
	$(Q)$(TOOL_COMPILER) $< --js_output_file $(JSMIN_CLOSURE)
	$(Q)cp $(JSMIN_YUI) $(JSMIN)

$(JSPACK): $(JSMIN) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(attr.depslist) $(JSMIN) > $(JSPACK)

$(JSDOC_FILE): $(attr_more.jschess_sources) $(ALL_DEP)
	$(info doing [$@])
	$(Q)-rm -rf $(JSDOC_FOLDER)
	$(Q)mkdir -p $(dir $@)
	$(Q)$(TOOL_JSDOC) -d $(JSDOC_FOLDER) $(SRC_FOLDER) 1> /dev/null
	$(Q)# 2.4 (ubuntu default) jsdoc
	$(Q)#jsdoc -d=$(JSDOC_FOLDER) $(SRC_FOLDER) 1> /dev/null

.PHONY: check
check: $(JSCHECK) $(ALL_DEP)
	$(info doing [$@])

.PHONY: check_veltzer_https
check_veltzer_https:
	$(info doing [$@])
	$(Q)wrapper_ok git grep "http:\/\/veltzer.net"

.PHONY: check_all
check_all: check_veltzer_https

.PHONY: jsdoc
jsdoc: $(JSDOC_FILE) $(ALL_DEP)
	$(info doing [$@])

.PHONY: clean
clean:
	$(info doing [$@])
	$(Q)git clean -xdf > /dev/null

.PHONY: clean_manual
clean_manual:
	$(info doing [$@])
	$(Q)-rm -rf $(JSDOC_FOLDER) $(OUT_FOLDER) $(WEB_FOLDER)

.PHONY: debug
debug: $(ALL_DEP)
	$(info ALL is $(ALL))
	$(info JSFULL is $(JSFULL))
	$(info JSMIN is $(JSMIN))
	$(info OUT_FOLDER is $(OUT_FOLDER))
	$(info JSDOC_FOLDER is $(JSDOC_FOLDER))
	$(info PGN_FOLDER is $(PGN_FOLDER))
	$(info JSDOC_FILE is $(JSDOC_FILE))
	$(info WEB_DIR is $(WEB_DIR))
	$(info SRC_FOLDER is $(SRC_FOLDER))
	$(info THIRDPARTY_FOLDER is $(THIRDPARTY_FOLDER))
	$(info WEB_FOLDER is $(WEB_FOLDER))
	$(info WEBMAKO_FILES is $(WEBMAKO_FILES))
	$(info WEB_FILES is $(WEB_FILES))
	$(info ALL_DEP is $(ALL_DEP))

.PHONY: install
install: all $(ALL_DEP)
	$(info doing [$@])
	$(Q)rm -rf $(WEB_DIR)
	$(Q)mkdir -p $(WEB_DIR)
	$(Q)cp -r extra/* index.html $(PGN_FOLDER) $(OUT_FOLDER) $(WEB_FOLDER) $(THIRDPARTY_FOLDER) $(SRC_FOLDER) $(TESTS_FOLDER) $(JSDOC_FOLDER) $(WEB_DIR)
	$(Q)ln -s $(WEB_DIR)/$(OUT_FOLDER)/$(attr.project_name).js $(WEB_DIR)/$(OUT_FOLDER)/$(attr.project_name).js
	$(Q)ln -s $(WEB_DIR)/$(OUT_FOLDER)/$(attr.project_name).min.js $(WEB_DIR)/$(OUT_FOLDER)/$(attr.project_name).min.js

.PHONY: install_no_doc
install_no_doc: all_no_doc $(ALL_DEP)
	$(info doing [$@])
	$(Q)rm -rf $(WEB_DIR)
	$(Q)mkdir -p $(WEB_DIR)
	$(Q)cp -r extra/* index.html $(PGN_FOLDER) $(OUT_FOLDER) $(WEB_FOLDER) $(THIRDPARTY_FOLDER) $(SRC_FOLDER) $(TESTS_FOLDER) $(WEB_DIR)
	$(Q)ln -s $(WEB_DIR)/$(OUT_FOLDER)/$(attr.project_name).js $(WEB_DIR)/$(OUT_FOLDER)/$(attr.project_name).js
	$(Q)ln -s $(WEB_DIR)/$(OUT_FOLDER)/$(attr.project_name).min.js $(WEB_DIR)/$(OUT_FOLDER)/$(attr.project_name).min.js

.PHONY: chmod
chmod:
	$(info doing [$@])
	$(Q)chmod go+rx `find . -type d`
	$(Q)chmod go+r `find . -type f`

.PHONY: check_grep
check_grep: $(ALL_DEP)
	$(info doing [$@])
	$(Q)wrapper_noerr git grep "\"" src/
	$(Q)wrapper_noerr git grep " $$" src/
	$(Q)wrapper_noerr git grep "eval" src/
.PHONY: sloccount
sloccount: $(ALL_DEP)
	$(info doing [$@])
	$(Q)sloccount .

#################
# pattern rules #
#################
$(WEB_FILES_OTHER): $(WEB_FOLDER)/%: $(WEBMAKO_FOLDER)/% $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)rm -f $@
	$(Q)cp $< $@
	$(Q)chmod a-w $@
