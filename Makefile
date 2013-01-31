##############
# PARAMETERS #
##############
# should we show commands executed ?
DO_MKDBG?=0
# should we depend on versions of wrappers ?
DO_WRAPDEPS:=1
# should we depend on the date of the makefile itself ?
DO_ALL_DEP?=1

#############
# VARIABLES #
#############
#VER:=$(shell git tag)
VER:=$(shell scripts/tagname.py)
PROJECT=jschess
SRC_FOLDER=src
TESTS_FOLDER=tests
THIRDPARTY_FOLDER=thirdparty
#SOURCES:=$(shell find $(SRC_FOLDER) -name "*.js")
SOURCES:=$(shell scripts/mylist.py)
JSDOC_FOLDER:=jsdoc
JSDOC_FILE:=$(JSDOC_FOLDER)/index.html
WEB_FOLDER:=web
OUT_FOLDER:=out
JSCHECK:=$(OUT_FOLDER)/$(PROJECT)-$(VER).stamp
JSFULL:=$(OUT_FOLDER)/$(PROJECT)-$(VER).js
JSMIN:=$(OUT_FOLDER)/$(PROJECT)-$(VER).min.js
JSPACK:=$(OUT_FOLDER)/$(PROJECT)-$(VER).pack.js
JSZIP:=$(OUT_FOLDER)/$(PROJECT)-$(VER).zip
WEB_DIR:=/var/www/$(PROJECT)
WEB_FOLDER:=web
WEBMAKO_FOLDER:=webmako
WEBMAKO_FILES_MAKO:=$(shell find $(WEBMAKO_FOLDER) -type f -and -name "*.mako")
WEBMAKO_FILES_OTHER:=$(shell find $(WEBMAKO_FOLDER) -type f -and -not -name "*.mako")
WEBMAKO_FILES:=$(WEBMAKO_FILES_MAKO) $(WEBMAKO_FILES_OTHER)
WEB_FILES_MAKO:=$(addprefix $(WEB_FOLDER)/,$(notdir $(basename $(WEBMAKO_FILES_MAKO))))
WEB_FILES_OTHER:=$(addprefix $(WEB_FOLDER)/,$(notdir $(WEBMAKO_FILES_OTHER)))
WEB_FILES:=$(WEB_FILES_MAKO) $(WEB_FILES_OTHER)
MAKO_WRAPPER:=scripts/mako_wrapper.py
DEPS:=$(shell scripts/deps.py)

ifeq ($(DO_WRAPDEPS),1)
	MAKO_WRAPPER_DEP:=$(MAKO_WRAPPER)
else
	MAKO_WRAPPER_DEP:=
endif

ALL_DEP:=
ifeq ($(DO_ALL_DEP),1)
	ALL_DEP:=$(ALL_DEP) Makefile
endif

ifeq ($(DO_MKDBG),1)
Q=
# we are not silent in this branch
else # DO_MKDBG
Q=@
#.SILENT:
endif # DO_MKDBG

.PHONY: all
all: $(JSPACK) $(JSZIP) $(JSDOC_FILE) $(WEB_FILES) $(ALL_DEP)

.PHONY: all_no_doc
all_no_doc: $(JSPACK) $(JSZIP) $(WEB_FILES) $(ALL_DEP)

$(JSZIP): $(SOURCES) $(ALL_DEP)
	$(info doing [$@])
	$(Q)zip -qr $@ $(SOURCES)

.PHONY: check
check: $(JSCHECK) $(ALL_DEP)

$(JSCHECK): $(SOURCES) $(ALL_DEP)
	$(info doing [$@])
	$(Q)~/install/jsl/jsl --conf=support/jsl.conf --quiet --nologo --nosummary --nofilelisting $(SOURCES)
	$(Q)scripts/wrapper.py gjslint --strict $(SOURCES)
	$(Q)mkdir -p $(dir $@)
	$(Q)touch $(JSCHECK)

$(JSFULL): $(SOURCES) $(JSCHECK) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(SOURCES) > $@

$(JSMIN): $(JSFULL) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)jsmin < $< > $@
#$(Q)yui-compressor $< -o $@

$(JSPACK): $(JSMIN) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(DEPS) $(JSMIN) > $(JSPACK)

.PHONY: jsdoc
jsdoc: $(JSDOC_FILE) $(ALL_DEP)
	$(info doing [$@])

$(JSDOC_FILE): $(SOURCES) $(ALL_DEP)
	$(info doing [$@])
	$(Q)-rm -rf $(JSDOC_FOLDER)
	$(Q)mkdir -p $(dir $@)
	$(Q)jsdoc -d=$(JSDOC_FOLDER) $(SRC_FOLDER) 1> /dev/null

.PHONY: clean
clean:
	$(info doing [$@])
	$(Q)-rm -rf $(JSDOC_FOLDER) $(OUT_FOLDER) $(WEB_FOLDER)

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
	$(info THIRDPARTY_FOLDER is $(THIRDPARTY_FOLDER))
	$(info WEB_FOLDER is $(WEB_FOLDER))
	$(info WEBMAKO_FILES is $(WEBMAKO_FILES))
	$(info WEB_FILES is $(WEB_FILES))
	$(info DEPS is $(DEPS))

.PHONY: install
install: all $(ALL_DEP)
	$(info doing [$@])
	$(Q)sudo rm -rf $(WEB_DIR)
	$(Q)sudo mkdir -p $(WEB_DIR)
	$(Q)sudo cp -r index.html $(OUT_FOLDER) $(WEB_FOLDER) $(THIRDPARTY_FOLDER) $(SRC_FOLDER) $(TESTS_FOLDER) $(JSDOC_FOLDER) $(WEB_DIR)
	$(Q)sudo ln -s $(WEB_DIR)/$(OUT_FOLDER)/$(PROJECT)-$(VER).js $(WEB_DIR)/$(OUT_FOLDER)/$(PROJECT).js
	$(Q)sudo ln -s $(WEB_DIR)/$(OUT_FOLDER)/$(PROJECT)-$(VER).min.js $(WEB_DIR)/$(OUT_FOLDER)/$(PROJECT).min.js

.PHONY: install_no_doc
install_no_doc: all_no_doc $(ALL_DEP)
	$(info doing [$@])
	$(Q)sudo rm -rf $(WEB_DIR)
	$(Q)sudo mkdir -p $(WEB_DIR)
	$(Q)sudo cp -r index.html $(OUT_FOLDER) $(WEB_FOLDER) $(THIRDPARTY_FOLDER) $(SRC_FOLDER) $(TESTS_FOLDER) $(WEB_DIR)
	$(Q)sudo ln -s $(WEB_DIR)/$(OUT_FOLDER)/$(PROJECT)-$(VER).js $(WEB_DIR)/$(OUT_FOLDER)/$(PROJECT).js
	$(Q)sudo ln -s $(WEB_DIR)/$(OUT_FOLDER)/$(PROJECT)-$(VER).min.js $(WEB_DIR)/$(OUT_FOLDER)/$(PROJECT).min.js


.PHONY: sloccount
sloccount: $(ALL_DEP)
	$(info doing [$@])
	$(Q)sloccount .

$(WEB_FILES_MAKO): $(WEB_FOLDER)/%: $(WEBMAKO_FOLDER)/%.mako $(MAKO_WRAPPER_DEP) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)$(MAKO_WRAPPER) $< $@
$(WEB_FILES_OTHER): $(WEB_FOLDER)/%: $(WEBMAKO_FOLDER)/% $(MAKO_WRAPPER_DEP) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cp $< $@

.PHONY: grep
grep:
	$(Q)scripts/wrapper_noerr.py git grep "\"" src/
