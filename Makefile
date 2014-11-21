############
# includes #
############
TEMPLAR_NEED_TDEFS_INCLUDE:=1
include /usr/share/templar/make/Makefile

##############
# parameters #
##############
# should we do documentation ?
DO_DOCS:=1
# do you want to validate html?
DO_CHECKHTML:=1

########
# code #
########
JSCHECK:=out/$(tdefs.project_name).stamp
JSFULL:=out/$(tdefs.project_name).js
JSMIN:=out/$(tdefs.project_name).min.js
JSMIN_JSMIN:=out/$(tdefs.project_name).min.jsmin.js
JSMIN_YUI:=out/$(tdefs.project_name).min.yui.js
JSMIN_CLOSURE:=out/$(tdefs.project_name).min.closure.js
JSPACK:=out/$(tdefs.project_name).pack.js
JSZIP:=out/$(tdefs.project_name).zip
WEB_DIR:=../$(tdefs.project_name)-gh-pages
COPY_FOLDERS:=static out jsdoc thirdparty pgn tests web src

ALL_FILES:=$(shell git ls-files)
FILES_NOT_GENERATED:=$(filter-out $(TEMPLAR_ALL_MAKO_TGT), $(ALL_FILES))
FILES_WITHOUT_HARDCODING:=$(filter-out project.ini, $(FILES_NOT_GENERATED))

ifeq ($(DO_MKDBG),1)
Q=
# we are not silent in this branch
else # DO_MKDBG
Q=@
#.SILENT:
endif # DO_MKDBG

ALL+=$(JSPACK) $(JSZIP)
all: $(ALL)

ifeq ($(DO_DOCS),1)
ALL+=jsdoc/index.html
all: $(ALL)
endif # DO_DOCS

SOURCES_HTML_MAKO:=$(shell find templartmpl/web \( -type f -or -type l \) -and -name "*.mako" 2> /dev/null)
SOURCES_HTML:=$(shell make_helper rmfdas $(SOURCES_HTML_MAKO))
HTMLCHECK:=html.stamp
ifeq ($(DO_CHECKHTML),1)
ALL+=$(HTMLCHECK)
all: $(ALL)
endif # DO_CHECKHTML

###########
# targets #
###########
$(JSZIP): $(tdefs.jschess_sources) $(ALL_DEP)
	$(info doing [$@])
	$(Q)zip -qr $@ $(tdefs.jschess_sources)

$(JSCHECK): $(tdefs.jschess_sources) $(ALL_DEP)
	$(info doing [$@])
	$(Q)~/install/jsl/jsl --conf=support/jsl.conf --quiet --nologo --nosummary --nofilelisting $(tdefs.jschess_sources)
	$(Q)make_helper wrapper-silent gjslint --flagfile support/gjslint.cfg $(tdefs.jschess_sources)
	$(Q)mkdir -p $(dir $@)
	$(Q)touch $(JSCHECK)

$(JSFULL): $(tdefs.jschess_sources) $(JSCHECK) $(ALL_DEP)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(tdefs.jschess_sources) > $@

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
	$(Q)cat $(tdefs.depslist) $(JSMIN) > $(JSPACK)

jsdoc/index.html: $(tdefs.jschess_sources) $(ALL_DEP)
	$(info doing [$@])
	$(Q)-rm -rf jsdoc
	$(Q)mkdir -p $(dir $@)
	$(Q)~/install/jsdoc/jsdoc -d jsdoc src 1> /dev/null

.PHONY: check_js
check_js: $(JSCHECK) $(ALL_DEP)
	$(info doing [$@])

.PHONY: check_html
check_html: $(HTMLCHECK)
	$(info doing [$@])

.PHONY: check_hardcoded_names
check_hardcoded_names:
	$(info doing [$@])
	$(Q)make_helper wrapper-ok git grep $(tdefs.personal_slug) -- $(FILES_WITHOUT_HARDCODING)

.PHONY: check_grep
check_grep: $(ALL_DEP)
	$(info doing [$@])
	$(Q)make_helper wrapper-noerr git grep "\"" src/
	$(Q)make_helper wrapper-noerr git grep " $$" src/
	$(Q)make_helper wrapper-noerr git grep "eval" src/

.PHONY: check_all
check_all: check_hardcoded_names check_grep

.PHONY: jsdoc
jsdoc: jsdoc/index.html $(ALL_DEP)
	$(info doing [$@])

.PHONY: debug_me
debug_me: $(ALL_DEP)
	$(info ALL is $(ALL))
	$(info ALL_DEP is $(ALL_DEP))
	$(info JSFULL is $(JSFULL))
	$(info JSMIN is $(JSMIN))
	$(info WEB_DIR is $(WEB_DIR))
	$(info COPY_FOLDERS is $(COPY_FOLDERS))
	$(info SOURCES_HTML is $(SOURCES_HTML))
	$(info FILES_NOT_GENERATED is $(FILES_NOT_GENERATED))
	$(info FILES_WITHOUT_HARDCODING is $(FILES_WITHOUT_HARDCODING))

.PHONY: install
install: all $(ALL_DEP)
	$(info doing [$@])
	$(Q)rm -rf $(WEB_DIR)/*
	$(Q)for folder in $(COPY_FOLDERS); do cp -r $$folder $(WEB_DIR); done
	$(Q)cp support/redirector.html $(WEB_DIR)/index.html
	$(Q)cd $(WEB_DIR); git commit -a -m "new version"; git push

.PHONY: sloccount
sloccount: $(ALL_DEP)
	$(info doing [$@])
	$(Q)sloccount .

$(HTMLCHECK): $(SOURCES_HTML) $(ALL_DEP)
	$(info doing [$@])
	$(Q)tidy -errors -q -utf8 $(SOURCES_HTML)
	$(Q)htmlhint $(SOURCES_HTML) > /dev/null
	$(Q)make_helper touch-mkdir $@
