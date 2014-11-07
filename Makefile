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
JSCHECK:=out/$(attr.project_name).stamp
JSFULL:=out/$(attr.project_name).js
JSMIN:=out/$(attr.project_name).min.js
JSMIN_JSMIN:=out/$(attr.project_name).min.jsmin.js
JSMIN_YUI:=out/$(attr.project_name).min.yui.js
JSMIN_CLOSURE:=out/$(attr.project_name).min.closure.js
JSPACK:=out/$(attr.project_name).pack.js
JSZIP:=out/$(attr.project_name).zip
WEB_DIR:=../jschess-gh-pages
COPY_FOLDERS:={static,out,jsdoc,thirdparty,pgn,tests,web,src}

ifeq ($(DO_MKDBG),1)
Q=
# we are not silent in this branch
else # DO_MKDBG
Q=@
#.SILENT:
endif # DO_MKDBG

ALL+=$(JSPACK) $(JSZIP)
ifeq ($(DO_DOCS),1)
ALL+=jsdoc/index.html
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
	$(Q)~/install/jsl/jsl --conf=support/jsl.conf --quiet --nologo --nosummary --nofilelisting $(attr_more.jschess_sources)
	$(Q)wrapper_silent gjslint --flagfile support/gjslint.cfg $(attr_more.jschess_sources)
	$(Q)mkdir -p $(dir $@)
	$(Q)touch $(JSCHECK)

$(JSFULL): $(attr_more.jschess_sources) $(JSCHECK) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(attr_more.jschess_sources) > $@

$(JSMIN): $(JSFULL) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)~/install/jsmin/jsmin < $< > $(JSMIN_JSMIN)
	$(Q)yui-compressor $< -o $(JSMIN_YUI)
	$(Q)~/install/closure/compiler.jar $< --js_output_file $(JSMIN_CLOSURE)
	$(Q)cp $(JSMIN_YUI) $(JSMIN)

$(JSPACK): $(JSMIN) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(attr.depslist) $(JSMIN) > $(JSPACK)

jsdoc/index.html: $(attr_more.jschess_sources) $(ALL_DEP)
	$(info doing [$@])
	$(Q)-rm -rf jsdoc
	$(Q)mkdir -p $(dir $@)
	$(Q)~/install/jsdoc/jsdoc -d jsdoc src 1> /dev/null

.PHONY: check
check: $(JSCHECK) $(ALL_DEP)
	$(info doing [$@])

.PHONY: check_hardcoded_names
check_hardcoded_names:
	$(info doing [$@])
	$(Q)wrapper_ok git grep $(attr.personal_slug) 

.PHONY: check_grep
check_grep: $(ALL_DEP)
	$(info doing [$@])
	$(Q)wrapper_noerr git grep "\"" src/
	$(Q)wrapper_noerr git grep " $$" src/
	$(Q)wrapper_noerr git grep "eval" src/

.PHONY: check_all
check_all: check_hardcoded_names check_grep

.PHONY: jsdoc
jsdoc: jsdoc/index.html $(ALL_DEP)
	$(info doing [$@])

.PHONY: clean
clean:
	$(info doing [$@])
	$(Q)git clean -xdf > /dev/null

.PHONY: debug
debug: $(ALL_DEP)
	$(info ALL is $(ALL))
	$(info ALL_DEP is $(ALL_DEP))
	$(info JSFULL is $(JSFULL))
	$(info JSMIN is $(JSMIN))
	$(info WEB_DIR is $(WEB_DIR))
	$(info COPY_FOLDERS is $(COPY_FOLDERS))

.PHONY: install
install: all $(ALL_DEP)
	$(info doing [$@])
	$(Q)-rm -rf $(WEB_DIR)/$(COPY_FOLDERS)
	$(Q)cp -r ./$(COPY_FOLDERS) $(WEB_DIR)
	$(Q)cp support/redirect.html $(WEB_DIR)/index.html
	$(info now cd $(WEB_DIR); git status; make; git add -A; git push)

.PHONY: sloccount
sloccount: $(ALL_DEP)
	$(info doing [$@])
	$(Q)sloccount .
