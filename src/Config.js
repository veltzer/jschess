/**
	@class Type safe config class
	@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	The idea is that the user will not be able to accidently put config
	options which are not used and will only be able to supply the right
	types.
	In addition, some config options will HAVE to be supplied by the user
	(div id where to create some HTML elements is an example of this).
	Config will also supply a method by which config options by the user
	will override anything in the default config.
	This class SHOULD NOT be a singleton since the user may want to put
	two boards on the page and have each configured differently.
*/
function Config() {
}
