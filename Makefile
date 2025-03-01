##############
# parameters #
##############
# do the javascript stuff ?
DO_JS:=1
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
ALL:=
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
JS_TEMPLATES:=$(shell find templates/out/src -type f -and -name "*.mako")
JS_SOURCES:=$(shell find out/src -type f -and -name "*.js")

ifeq ($(DO_MKDBG),1)
Q=
# we are not silent in this branch
else # DO_MKDBG
Q=@
#.SILENT:
endif # DO_MKDBG

ifeq ($(DO_JS),1)
ALL+=$(JSPACKFULL) $(JSPACKMIN) $(JSZIP)
endif # DO_JS

JSDOC_FOLDER=$(DOCS)/jsdoc
JSDOC_FILE=$(DOCS)/jsdoc/index.html
ifeq ($(DO_DOCS),1)
ALL+=$(JSDOC_FILE)
endif # DO_DOCS

SOURCES_HTML_MAKO:=$(shell find templates/docs -type f -and -name "*.mako" 2> /dev/null)
# SOURCES_HTML:=$(shell pymakehelper remove_folders $(SOURCES_HTML_MAKO))
SOURCES_HTML:=$(shell find docs -type f -and -name "*.html")
HTMLCHECK:=out/html.stamp
ifeq ($(DO_CHECKHTML),1)
ALL+=$(HTMLCHECK)
endif # DO_CHECKHTML

# this line guarantees that if a receipe fails then the target file
# will be deleted.
.DELETE_ON_ERROR:

#########
# rules #
#########
# do not touch this rule
all: $(ALL)
	@true

$(JSZIP): $(JS_SOURCES)
	$(info doing [$@])
	$(Q)zip -qr $@ $(JS_SOURCES)

$(JSCHECK): $(JS_SOURCES) .jshintrc
	$(info doing [$@])
	$(Q)pymakehelper touch_mkdir $@
#	$(Q)node_modules/.bin/jslint --browser --terse --todo --plusplus --forin --vars --sloppy --white --config support/jslintrc $(JS_SOURCES) 2> /dev/null
#	$(Q)node_modules/.bin/jshint $(JS_SOURCES)
# $(Q)pymakehelper only_print_on_error gjslint --flagfile support/gjslint.cfg $(JS_SOURCES)
# $(Q)tools/jsl/jsl --conf=support/jsl.conf --quiet --nologo --nosummary --nofilelisting $(JS_SOURCES)

$(JSFULL): $(JS_SOURCES) $(JSCHECK)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(JS_SOURCES) > $@

$(JSMIN): $(JSFULL)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)node_modules/.bin/jsmin < $< > $(JSMIN_JSMIN)
	$(Q)node_modules/.bin/yuicompressor $< -o $(JSMIN_YUI)
	$(Q)cp $(JSMIN_YUI) $@
#	$(Q)cp $(JSMIN_CLOSURE) $@
#	$(Q)tools/closure.jar --jscomp_error '*' --externs templates/out/src/externs.js.mako --jscomp_off checkTypes $< --js_output_file $(JSMIN_CLOSURE)

$(JSPACKFULL): $(JSFULL)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(JS_DEPLIST) $(JSFULL) > $@

$(JSPACKMIN): $(JSMIN)
	$(info doing [$@])
	$(Q)mkdir -p $(dir $@)
	$(Q)cat $(JS_DEPLIST) $(JSMIN) > $@

$(JSDOC_FILE): $(JS_SOURCES)
	$(info doing [$@])
	$(Q)rm -rf $(JSDOC_FOLDER)
	$(Q)mkdir -p $(dir $@)
	$(Q)node_modules/.bin/jsdoc -d $(JSDOC_FOLDER) -c support/jsdoc.json out/src 1> /dev/null

.PHONY: check_js
check_js: $(JSCHECK)
	$(info doing [$@])

.PHONY: check_html
check_html: $(HTMLCHECK)
	$(info doing [$@])

.PHONY: check_grep
check_grep:
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error git grep "\"" src/
	$(Q)pymakehelper only_print_on_error git grep " $$" src/
	$(Q)pymakehelper only_print_on_error git grep "eval" src/

.PHONY: check_all
check_all: check_grep

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
	$(info JS_TEMPLATES is $(JS_TEMPLATES))
	$(info JS_SOURCES is $(JS_SOURCES))

.PHONY: clean_hard
clean_hard:
	$(info doing [$@])
	$(Q)git clean -qffxd

.PHONY: clean
clean:
	$(Q)rm -f $(ALL)

.PHONY: sloccount
sloccount:
	$(info doing [$@])
	$(Q)sloccount .

$(HTMLCHECK): $(SOURCES_HTML) .htmlhintrc
	$(info doing [$@])
	$(Q)pymakehelper only_print_on_error node_modules/.bin/htmlhint $(SOURCES_HTML)
	$(Q)pymakehelper touch_mkdir $@
#	$(Q)tidy -errors -q -utf8 $(SOURCES_HTML)

##########
# alldep #
##########
ifeq ($(DO_ALLDEP),1)
.EXTRA_PREREQS+=$(foreach mk, ${MAKEFILE_LIST},$(abspath ${mk}))
endif # DO_ALLDEP
