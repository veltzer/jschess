##############
# parameters #
##############
# should we do documentation ?
DO_DOCS:=1
# do you want to validate html?
DO_CHECKHTML:=1
# do you want to debug the makefile?
DO_MKDBG?=0
# where is the web folder?
DOCS:=docs
# do you want dependency on the Makefile itself ?
DO_ALLDEP:=1

########
# code #
########
PROJECT_NAME=jschess
JSCHECK:=out/$(PROJECT_NAME).stamp
JSFULL:=$(DOCS)/$(PROJECT_NAME).js
JSMIN:=$(DOCS)/$(PROJECT_NAME).min.js
JSMIN_JSMIN:=out/$(PROJECT_NAME).min.jsmin.js
JSMIN_YUI:=out/$(PROJECT_NAME).min.yui.js
JSMIN_CLOSURE:=out/$(PROJECT_NAME).min.closure.js
JSPACKFULL:=$(DOCS)/$(PROJECT_NAME).pack.js
JSPACKMIN:=$(DOCS)/$(PROJECT_NAME).pack.min.js
JSZIP:=out/$(PROJECT_NAME).zip

ALL_FILES:=$(shell git ls-files)
FILES_NOT_GENERATED:=$(filter-out $(TEMPLAR_ALL_MAKO_TGT), $(ALL_FILES))
FILES_WITHOUT_HARDCODING:=$(filter-out config/project.py README.md, $(FILES_NOT_GENERATED))

ifeq ($(DO_MKDBG),1)
Q=
# we are not silent in this branch
else # DO_MKDBG
Q=@
#.SILENT:
endif # DO_MKDBG

ALL+=$(JSPACKFULL) $(JSPACKMIN) $(JSZIP)

JSDOC_FOLDER=$(DOCS)/jsdoc
JSDOC_FILE=$(DOCS)/jsdoc/index.html
ifeq ($(DO_DOCS),1)
ALL+=$(JSDOC_FILE)
endif # DO_DOCS

# dependency on the makefile itself
ifeq ($(DO_ALLDEP),1)
.EXTRA_PREREQS+=$(foreach mk, ${MAKEFILE_LIST},$(abspath ${mk}))
endif

SOURCES_HTML_MAKO:=$(shell find config/docs \( -type f -or -type l \) -and -name "*.mako" 2> /dev/null)
SOURCES_HTML:=$(shell pymakehelper remove_folders $(SOURCES_HTML_MAKO))
HTMLCHECK:=out/html.stamp
ifeq ($(DO_CHECKHTML),1)
ALL+=$(HTMLCHECK)
endif # DO_CHECKHTML

# this line guarantees that if a receipe fails then the target file
# will be deleted.
.DELETE_ON_ERROR:

###########
# targets #
###########
# do not touch this rule
all: $(ALL)
	@true

$(JSZIP): $(tdefs.jschess_sources)
	$(info doing [$@])
	$(Q)zip -qr $@ $(tdefs.jschess_sources)

$(JSCHECK): $(tdefs.jschess_sources)
	$(info doing [$@])
	$(Q)tools/jsl/jsl --conf=support/jsl.conf --quiet --nologo --nosummary --nofilelisting $(tdefs.jschess_sources)
	$(Q)pymakehelper only_print_on_error gjslint --flagfile support/gjslint.cfg $(tdefs.jschess_sources)
	$(Q)node_modules/jshint/bin/jshint $(tdefs.jschess_sources)
	$(Q)node_modules/jslint/bin/jslint.js --browser --terse --todo --plusplus --forin --vars --sloppy --white --config support/jslintrc $(tdefs.jschess_sources) 2> /dev/null
	$(Q)pymakehelper touch_mkdir $@

$(JSFULL): $(tdefs.jschess_sources) $(JSCHECK)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(tdefs.jschess_sources) > $@

$(JSMIN): $(JSFULL)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)tools/jsmin < $< > $(JSMIN_JSMIN)
	$(Q)yui-compressor $< -o $(JSMIN_YUI)
	$(Q)cp $(JSMIN_YUI) $@
#	$(Q)cp $(JSMIN_CLOSURE) $@
#	$(Q)tools/closure.jar --jscomp_error '*' --externs templates/out/src/externs.js.mako --jscomp_off checkTypes $< --js_output_file $(JSMIN_CLOSURE)

$(JSPACKFULL): $(JSFULL)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(tdefs.jschess_depslist) $(JSFULL) > $@

$(JSPACKMIN): $(JSMIN)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(tdefs.jschess_depslist) $(JSMIN) > $@

$(JSDOC_FILE): $(tdefs.jschess_sources)
	$(info doing [$@])
	$(Q)rm -rf jsdoc
	$(Q)mkdir -p $(dir $@)
	$(Q)nodejs node_modules/jsdoc/jsdoc.js -d $(JSDOC_FOLDER) -c support/jsdoc.json out/src 1> /dev/null

.PHONY: check_js
check_js: $(JSCHECK)
	$(info doing [$@])

.PHONY: check_html
check_html: $(HTMLCHECK)
	$(info doing [$@])

.PHONY: check_hardcoded_names
check_hardcoded_names:
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error git grep $(tdefs.personal_slug) -- $(FILES_WITHOUT_HARDCODING)

.PHONY: check_grep
check_grep:
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error git grep "\"" src/
	$(Q)pymakehelper only_print_on_error git grep " $$" src/
	$(Q)pymakehelper only_print_on_error git grep "eval" src/

.PHONY: check_all
check_all: check_hardcoded_names check_grep

.PHONY: jsdoc
jsdoc: $(JSDOC_FILE)
	$(info doing [$@])

.PHONY: jsdoc_rm
jsdoc_rm:
	$(info doing [$@])
	$(Q)rm -rf $(JSDOC_FOLDER)

.PHONY: debug
debug:
	$(info ALL is $(ALL))
	$(info JSFULL is $(JSFULL))
	$(info JSMIN is $(JSMIN))
	$(info SOURCES_HTML is $(SOURCES_HTML))
	$(info FILES_NOT_GENERATED is $(FILES_NOT_GENERATED))
	$(info FILES_WITHOUT_HARDCODING is $(FILES_WITHOUT_HARDCODING))

.PHONY: sloccount
sloccount:
	$(info doing [$@])
	$(Q)sloccount .

$(HTMLCHECK): $(SOURCES_HTML)
	$(info doing [$@])
	$(Q)tidy -errors -q -utf8 $(SOURCES_HTML)
	$(Q)node_modules/htmlhint/bin/htmlhint $(SOURCES_HTML) > /dev/null
	$(Q)pymakehelper touch_mkdir $@
