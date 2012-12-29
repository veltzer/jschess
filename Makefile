##############
# PARAMETERS #
##############
# should we show commands executed ?
DO_MKDBG?=0
# should we depend on versions of wrappers ?
DO_WRAPDEPS:=1

#############
# VARIABLES #
#############
#VER:=$(shell git tag)
VER:=$(shell ./scripts/tagname.py)
PROJECT=jschess
SRC_FOLDER=src
TESTS_FOLDER=tests
THIRDPARTY_FOLDER=thirdparty
SOURCES:=$(shell find $(SRC_FOLDER) -name "*.js")
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

ifeq ($(DO_WRAPDEPS),1)
	MAKO_WRAPPER_DEP:=$(MAKO_WRAPPER)
else
	MAKO_WRAPPER_DEP:=
endif

ifeq ($(DO_MKDBG),1)
Q=
# we are not silent in this branch
else # DO_MKDBG
Q=@
#.SILENT:
endif # DO_MKDBG

.PHONY: all
all: $(JSPACK) $(JSZIP) $(JSDOC_FILE) $(WEB_FILES)

$(JSZIP): $(SOURCES)
	$(info doing [$@])
	$(Q)zip -qr $@ $(SOURCES)

$(JSCHECK): $(SOURCES)
	$(info doing [$@])
	$(Q)~/install/jsl/jsl --conf=support/jsl.conf --quiet --nologo --nosummary --nofilelisting $(SOURCES)
	$(Q)mkdir -p $(dir $@)
	$(Q)touch $(JSCHECK)

$(JSFULL): $(SOURCES) $(JSCHECK)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(SOURCES) > $@

$(JSMIN): $(JSFULL)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)yui-compressor $< -o $@

$(JSPACK): $(JSMIN)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat thirdparty/prototype-1.7.1.min.js thirdparty/jquery-1.8.3.min.js thirdparty/jquery.nc.js thirdparty/raphael-2.1.0.min.js $(JSMIN) > $(JSPACK)

.PHONY: jsdoc
jsdoc: $(JSDOC_FILE)
	$(info doing [$@])

$(JSDOC_FILE): $(SOURCES)
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

.PHONY: install
install: all
	$(info doing [$@])
	$(Q)sudo rm -rf $(WEB_DIR)
	$(Q)sudo mkdir -p $(WEB_DIR)
	$(Q)sudo cp -r index.html $(OUT_FOLDER) $(WEB_FOLDER) $(THIRDPARTY_FOLDER) $(SRC_FOLDER) $(TESTS_FOLDER) $(JSDOC_FOLDER) $(WEB_DIR)
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

.PHONY: check
check:
	$(Q)-git grep "\"" src/ | grep -v author
	$(Q)-git grep "\ \ " src/
