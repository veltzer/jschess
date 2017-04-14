
var Prototype={Version:'1.7.3',Browser:(function(){var ua=navigator.userAgent;var isOpera=Object.prototype.toString.call(window.opera)=='[object Opera]';return{IE:!!window.attachEvent&&!isOpera,Opera:isOpera,WebKit:ua.indexOf('AppleWebKit/')>-1,Gecko:ua.indexOf('Gecko')>-1&&ua.indexOf('KHTML')===-1,MobileSafari:/Apple.*Mobile/.test(ua)}})(),BrowserFeatures:{XPath:!!document.evaluate,SelectorsAPI:!!document.querySelector,ElementExtensions:(function(){var constructor=window.Element||window.HTMLElement;return!!(constructor&&constructor.prototype);})(),SpecificElementExtensions:(function(){if(typeof window.HTMLDivElement!=='undefined')
return true;var div=document.createElement('div'),form=document.createElement('form'),isSupported=false;if(div['__proto__']&&(div['__proto__']!==form['__proto__'])){isSupported=true;}
div=form=null;return isSupported;})()},ScriptFragment:'<script[^>]*>([\\S\\s]*?)<\/script\\s*>',JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,emptyFunction:function(){},K:function(x){return x}};if(Prototype.Browser.MobileSafari)
Prototype.BrowserFeatures.SpecificElementExtensions=false;var Class=(function(){var IS_DONTENUM_BUGGY=(function(){for(var p in{toString:1}){if(p==='toString')return false;}
return true;})();function subclass(){};function create(){var parent=null,properties=$A(arguments);if(Object.isFunction(properties[0]))
parent=properties.shift();function klass(){this.initialize.apply(this,arguments);}
Object.extend(klass,Class.Methods);klass.superclass=parent;klass.subclasses=[];if(parent){subclass.prototype=parent.prototype;klass.prototype=new subclass;parent.subclasses.push(klass);}
for(var i=0,length=properties.length;i<length;i++)
klass.addMethods(properties[i]);if(!klass.prototype.initialize)
klass.prototype.initialize=Prototype.emptyFunction;klass.prototype.constructor=klass;return klass;}
function addMethods(source){var ancestor=this.superclass&&this.superclass.prototype,properties=Object.keys(source);if(IS_DONTENUM_BUGGY){if(source.toString!=Object.prototype.toString)
properties.push("toString");if(source.valueOf!=Object.prototype.valueOf)
properties.push("valueOf");}
for(var i=0,length=properties.length;i<length;i++){var property=properties[i],value=source[property];if(ancestor&&Object.isFunction(value)&&value.argumentNames()[0]=="$super"){var method=value;value=(function(m){return function(){return ancestor[m].apply(this,arguments);};})(property).wrap(method);value.valueOf=(function(method){return function(){return method.valueOf.call(method);};})(method);value.toString=(function(method){return function(){return method.toString.call(method);};})(method);}
this.prototype[property]=value;}
return this;}
return{create:create,Methods:{addMethods:addMethods}};})();(function(){var _toString=Object.prototype.toString,_hasOwnProperty=Object.prototype.hasOwnProperty,NULL_TYPE='Null',UNDEFINED_TYPE='Undefined',BOOLEAN_TYPE='Boolean',NUMBER_TYPE='Number',STRING_TYPE='String',OBJECT_TYPE='Object',FUNCTION_CLASS='[object Function]',BOOLEAN_CLASS='[object Boolean]',NUMBER_CLASS='[object Number]',STRING_CLASS='[object String]',ARRAY_CLASS='[object Array]',DATE_CLASS='[object Date]',NATIVE_JSON_STRINGIFY_SUPPORT=window.JSON&&typeof JSON.stringify==='function'&&JSON.stringify(0)==='0'&&typeof JSON.stringify(Prototype.K)==='undefined';var DONT_ENUMS=['toString','toLocaleString','valueOf','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','constructor'];var IS_DONTENUM_BUGGY=(function(){for(var p in{toString:1}){if(p==='toString')return false;}
return true;})();function Type(o){switch(o){case null:return NULL_TYPE;case(void 0):return UNDEFINED_TYPE;}
var type=typeof o;switch(type){case'boolean':return BOOLEAN_TYPE;case'number':return NUMBER_TYPE;case'string':return STRING_TYPE;}
return OBJECT_TYPE;}
function extend(destination,source){for(var property in source)
destination[property]=source[property];return destination;}
function inspect(object){try{if(isUndefined(object))return'undefined';if(object===null)return'null';return object.inspect?object.inspect():String(object);}catch(e){if(e instanceof RangeError)return'...';throw e;}}
function toJSON(value){return Str('',{'':value},[]);}
function Str(key,holder,stack){var value=holder[key];if(Type(value)===OBJECT_TYPE&&typeof value.toJSON==='function'){value=value.toJSON(key);}
var _class=_toString.call(value);switch(_class){case NUMBER_CLASS:case BOOLEAN_CLASS:case STRING_CLASS:value=value.valueOf();}
switch(value){case null:return'null';case true:return'true';case false:return'false';}
var type=typeof value;switch(type){case'string':return value.inspect(true);case'number':return isFinite(value)?String(value):'null';case'object':for(var i=0,length=stack.length;i<length;i++){if(stack[i]===value){throw new TypeError("Cyclic reference to '"+value+"' in object");}}
stack.push(value);var partial=[];if(_class===ARRAY_CLASS){for(var i=0,length=value.length;i<length;i++){var str=Str(i,value,stack);partial.push(typeof str==='undefined'?'null':str);}
partial='['+partial.join(',')+']';}else{var keys=Object.keys(value);for(var i=0,length=keys.length;i<length;i++){var key=keys[i],str=Str(key,value,stack);if(typeof str!=="undefined"){partial.push(key.inspect(true)+':'+str);}}
partial='{'+partial.join(',')+'}';}
stack.pop();return partial;}}
function stringify(object){return JSON.stringify(object);}
function toQueryString(object){return $H(object).toQueryString();}
function toHTML(object){return object&&object.toHTML?object.toHTML():String.interpret(object);}
function keys(object){if(Type(object)!==OBJECT_TYPE){throw new TypeError();}
var results=[];for(var property in object){if(_hasOwnProperty.call(object,property))
results.push(property);}
if(IS_DONTENUM_BUGGY){for(var i=0;property=DONT_ENUMS[i];i++){if(_hasOwnProperty.call(object,property))
results.push(property);}}
return results;}
function values(object){var results=[];for(var property in object)
results.push(object[property]);return results;}
function clone(object){return extend({},object);}
function isElement(object){return!!(object&&object.nodeType==1);}
function isArray(object){return _toString.call(object)===ARRAY_CLASS;}
var hasNativeIsArray=(typeof Array.isArray=='function')&&Array.isArray([])&&!Array.isArray({});if(hasNativeIsArray){isArray=Array.isArray;}
function isHash(object){return object instanceof Hash;}
function isFunction(object){return _toString.call(object)===FUNCTION_CLASS;}
function isString(object){return _toString.call(object)===STRING_CLASS;}
function isNumber(object){return _toString.call(object)===NUMBER_CLASS;}
function isDate(object){return _toString.call(object)===DATE_CLASS;}
function isUndefined(object){return typeof object==="undefined";}
extend(Object,{extend:extend,inspect:inspect,toJSON:NATIVE_JSON_STRINGIFY_SUPPORT?stringify:toJSON,toQueryString:toQueryString,toHTML:toHTML,keys:Object.keys||keys,values:values,clone:clone,isElement:isElement,isArray:isArray,isHash:isHash,isFunction:isFunction,isString:isString,isNumber:isNumber,isDate:isDate,isUndefined:isUndefined});})();Object.extend(Function.prototype,(function(){var slice=Array.prototype.slice;function update(array,args){var arrayLength=array.length,length=args.length;while(length--)array[arrayLength+length]=args[length];return array;}
function merge(array,args){array=slice.call(array,0);return update(array,args);}
function argumentNames(){var names=this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g,'').replace(/\s+/g,'').split(',');return names.length==1&&!names[0]?[]:names;}
function bind(context){if(arguments.length<2&&Object.isUndefined(arguments[0]))
return this;if(!Object.isFunction(this))
throw new TypeError("The object is not callable.");var nop=function(){};var __method=this,args=slice.call(arguments,1);var bound=function(){var a=merge(args,arguments);var c=this instanceof bound?this:context;return __method.apply(c,a);};nop.prototype=this.prototype;bound.prototype=new nop();return bound;}
function bindAsEventListener(context){var __method=this,args=slice.call(arguments,1);return function(event){var a=update([event||window.event],args);return __method.apply(context,a);}}
function curry(){if(!arguments.length)return this;var __method=this,args=slice.call(arguments,0);return function(){var a=merge(args,arguments);return __method.apply(this,a);}}
function delay(timeout){var __method=this,args=slice.call(arguments,1);timeout=timeout*1000;return window.setTimeout(function(){return __method.apply(__method,args);},timeout);}
function defer(){var args=update([0.01],arguments);return this.delay.apply(this,args);}
function wrap(wrapper){var __method=this;return function(){var a=update([__method.bind(this)],arguments);return wrapper.apply(this,a);}}
function methodize(){if(this._methodized)return this._methodized;var __method=this;return this._methodized=function(){var a=update([this],arguments);return __method.apply(null,a);};}
var extensions={argumentNames:argumentNames,bindAsEventListener:bindAsEventListener,curry:curry,delay:delay,defer:defer,wrap:wrap,methodize:methodize};if(!Function.prototype.bind)
extensions.bind=bind;return extensions;})());(function(proto){function toISOString(){return this.getUTCFullYear()+'-'+
(this.getUTCMonth()+1).toPaddedString(2)+'-'+
this.getUTCDate().toPaddedString(2)+'T'+
this.getUTCHours().toPaddedString(2)+':'+
this.getUTCMinutes().toPaddedString(2)+':'+
this.getUTCSeconds().toPaddedString(2)+'Z';}
function toJSON(){return this.toISOString();}
if(!proto.toISOString)proto.toISOString=toISOString;if(!proto.toJSON)proto.toJSON=toJSON;})(Date.prototype);RegExp.prototype.match=RegExp.prototype.test;RegExp.escape=function(str){return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g,'\\$1');};var PeriodicalExecuter=Class.create({initialize:function(callback,frequency){this.callback=callback;this.frequency=frequency;this.currentlyExecuting=false;this.registerCallback();},registerCallback:function(){this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000);},execute:function(){this.callback(this);},stop:function(){if(!this.timer)return;clearInterval(this.timer);this.timer=null;},onTimerEvent:function(){if(!this.currentlyExecuting){try{this.currentlyExecuting=true;this.execute();this.currentlyExecuting=false;}catch(e){this.currentlyExecuting=false;throw e;}}}});Object.extend(String,{interpret:function(value){return value==null?'':String(value);},specialChar:{'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','\\':'\\\\'}});Object.extend(String.prototype,(function(){var NATIVE_JSON_PARSE_SUPPORT=window.JSON&&typeof JSON.parse==='function'&&JSON.parse('{"test": true}').test;function prepareReplacement(replacement){if(Object.isFunction(replacement))return replacement;var template=new Template(replacement);return function(match){return template.evaluate(match)};}
function isNonEmptyRegExp(regexp){return regexp.source&&regexp.source!=='(?:)';}
function gsub(pattern,replacement){var result='',source=this,match;replacement=prepareReplacement(replacement);if(Object.isString(pattern))
pattern=RegExp.escape(pattern);if(!(pattern.length||isNonEmptyRegExp(pattern))){replacement=replacement('');return replacement+source.split('').join(replacement)+replacement;}
while(source.length>0){match=source.match(pattern)
if(match&&match[0].length>0){result+=source.slice(0,match.index);result+=String.interpret(replacement(match));source=source.slice(match.index+match[0].length);}else{result+=source,source='';}}
return result;}
function sub(pattern,replacement,count){replacement=prepareReplacement(replacement);count=Object.isUndefined(count)?1:count;return this.gsub(pattern,function(match){if(--count<0)return match[0];return replacement(match);});}
function scan(pattern,iterator){this.gsub(pattern,iterator);return String(this);}
function truncate(length,truncation){length=length||30;truncation=Object.isUndefined(truncation)?'...':truncation;return this.length>length?this.slice(0,length-truncation.length)+truncation:String(this);}
function strip(){return this.replace(/^\s+/,'').replace(/\s+$/,'');}
function stripTags(){return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?(\/)?>|<\/\w+>/gi,'');}
function stripScripts(){return this.replace(new RegExp(Prototype.ScriptFragment,'img'),'');}
function extractScripts(){var matchAll=new RegExp(Prototype.ScriptFragment,'img'),matchOne=new RegExp(Prototype.ScriptFragment,'im');return(this.match(matchAll)||[]).map(function(scriptTag){return(scriptTag.match(matchOne)||['',''])[1];});}
function evalScripts(){return this.extractScripts().map(function(script){return eval(script);});}
function escapeHTML(){return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function unescapeHTML(){return this.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');}
function toQueryParams(separator){var match=this.strip().match(/([^?#]*)(#.*)?$/);if(!match)return{};return match[1].split(separator||'&').inject({},function(hash,pair){if((pair=pair.split('='))[0]){var key=decodeURIComponent(pair.shift()),value=pair.length>1?pair.join('='):pair[0];if(value!=undefined){value=value.gsub('+',' ');value=decodeURIComponent(value);}
if(key in hash){if(!Object.isArray(hash[key]))hash[key]=[hash[key]];hash[key].push(value);}
else hash[key]=value;}
return hash;});}
function toArray(){return this.split('');}
function succ(){return this.slice(0,this.length-1)+
String.fromCharCode(this.charCodeAt(this.length-1)+1);}
function times(count){return count<1?'':new Array(count+1).join(this);}
function camelize(){return this.replace(/-+(.)?/g,function(match,chr){return chr?chr.toUpperCase():'';});}
function capitalize(){return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase();}
function underscore(){return this.replace(/::/g,'/').replace(/([A-Z]+)([A-Z][a-z])/g,'$1_$2').replace(/([a-z\d])([A-Z])/g,'$1_$2').replace(/-/g,'_').toLowerCase();}
function dasherize(){return this.replace(/_/g,'-');}
function inspect(useDoubleQuotes){var escapedString=this.replace(/[\x00-\x1f\\]/g,function(character){if(character in String.specialChar){return String.specialChar[character];}
return'\\u00'+character.charCodeAt().toPaddedString(2,16);});if(useDoubleQuotes)return'"'+escapedString.replace(/"/g,'\\"')+'"';return"'"+escapedString.replace(/'/g,'\\\'')+"'";}
function unfilterJSON(filter){return this.replace(filter||Prototype.JSONFilter,'$1');}
function isJSON(){var str=this;if(str.blank())return false;str=str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@');str=str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']');str=str.replace(/(?:^|:|,)(?:\s*\[)+/g,'');return(/^[\],:{}\s]*$/).test(str);}
function evalJSON(sanitize){var json=this.unfilterJSON(),cx=/[\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff\u0000]/g;if(cx.test(json)){json=json.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
try{if(!sanitize||json.isJSON())return eval('('+json+')');}catch(e){}
throw new SyntaxError('Badly formed JSON string: '+this.inspect());}
function parseJSON(){var json=this.unfilterJSON();return JSON.parse(json);}
function include(pattern){return this.indexOf(pattern)>-1;}
function startsWith(pattern,position){position=Object.isNumber(position)?position:0;return this.lastIndexOf(pattern,position)===position;}
function endsWith(pattern,position){pattern=String(pattern);position=Object.isNumber(position)?position:this.length;if(position<0)position=0;if(position>this.length)position=this.length;var d=position-pattern.length;return d>=0&&this.indexOf(pattern,d)===d;}
function empty(){return this=='';}
function blank(){return/^\s*$/.test(this);}
function interpolate(object,pattern){return new Template(this,pattern).evaluate(object);}
return{gsub:gsub,sub:sub,scan:scan,truncate:truncate,strip:String.prototype.trim||strip,stripTags:stripTags,stripScripts:stripScripts,extractScripts:extractScripts,evalScripts:evalScripts,escapeHTML:escapeHTML,unescapeHTML:unescapeHTML,toQueryParams:toQueryParams,parseQuery:toQueryParams,toArray:toArray,succ:succ,times:times,camelize:camelize,capitalize:capitalize,underscore:underscore,dasherize:dasherize,inspect:inspect,unfilterJSON:unfilterJSON,isJSON:isJSON,evalJSON:NATIVE_JSON_PARSE_SUPPORT?parseJSON:evalJSON,include:include,startsWith:String.prototype.startsWith||startsWith,endsWith:String.prototype.endsWith||endsWith,empty:empty,blank:blank,interpolate:interpolate};})());var Template=Class.create({initialize:function(template,pattern){this.template=template.toString();this.pattern=pattern||Template.Pattern;},evaluate:function(object){if(object&&Object.isFunction(object.toTemplateReplacements))
object=object.toTemplateReplacements();return this.template.gsub(this.pattern,function(match){if(object==null)return(match[1]+'');var before=match[1]||'';if(before=='\\')return match[2];var ctx=object,expr=match[3],pattern=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;match=pattern.exec(expr);if(match==null)return before;while(match!=null){var comp=match[1].startsWith('[')?match[2].replace(/\\\\]/g,']'):match[1];ctx=ctx[comp];if(null==ctx||''==match[3])break;expr=expr.substring('['==match[3]?match[1].length:match[0].length);match=pattern.exec(expr);}
return before+String.interpret(ctx);});}});Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;var $break={};var Enumerable=(function(){function each(iterator,context){try{this._each(iterator,context);}catch(e){if(e!=$break)throw e;}
return this;}
function eachSlice(number,iterator,context){var index=-number,slices=[],array=this.toArray();if(number<1)return array;while((index+=number)<array.length)
slices.push(array.slice(index,index+number));return slices.collect(iterator,context);}
function all(iterator,context){iterator=iterator||Prototype.K;var result=true;this.each(function(value,index){result=result&&!!iterator.call(context,value,index,this);if(!result)throw $break;},this);return result;}
function any(iterator,context){iterator=iterator||Prototype.K;var result=false;this.each(function(value,index){if(result=!!iterator.call(context,value,index,this))
throw $break;},this);return result;}
function collect(iterator,context){iterator=iterator||Prototype.K;var results=[];this.each(function(value,index){results.push(iterator.call(context,value,index,this));},this);return results;}
function detect(iterator,context){var result;this.each(function(value,index){if(iterator.call(context,value,index,this)){result=value;throw $break;}},this);return result;}
function findAll(iterator,context){var results=[];this.each(function(value,index){if(iterator.call(context,value,index,this))
results.push(value);},this);return results;}
function grep(filter,iterator,context){iterator=iterator||Prototype.K;var results=[];if(Object.isString(filter))
filter=new RegExp(RegExp.escape(filter));this.each(function(value,index){if(filter.match(value))
results.push(iterator.call(context,value,index,this));},this);return results;}
function include(object){if(Object.isFunction(this.indexOf)&&this.indexOf(object)!=-1)
return true;var found=false;this.each(function(value){if(value==object){found=true;throw $break;}});return found;}
function inGroupsOf(number,fillWith){fillWith=Object.isUndefined(fillWith)?null:fillWith;return this.eachSlice(number,function(slice){while(slice.length<number)slice.push(fillWith);return slice;});}
function inject(memo,iterator,context){this.each(function(value,index){memo=iterator.call(context,memo,value,index,this);},this);return memo;}
function invoke(method){var args=$A(arguments).slice(1);return this.map(function(value){return value[method].apply(value,args);});}
function max(iterator,context){iterator=iterator||Prototype.K;var result;this.each(function(value,index){value=iterator.call(context,value,index,this);if(result==null||value>=result)
result=value;},this);return result;}
function min(iterator,context){iterator=iterator||Prototype.K;var result;this.each(function(value,index){value=iterator.call(context,value,index,this);if(result==null||value<result)
result=value;},this);return result;}
function partition(iterator,context){iterator=iterator||Prototype.K;var trues=[],falses=[];this.each(function(value,index){(iterator.call(context,value,index,this)?trues:falses).push(value);},this);return[trues,falses];}
function pluck(property){var results=[];this.each(function(value){results.push(value[property]);});return results;}
function reject(iterator,context){var results=[];this.each(function(value,index){if(!iterator.call(context,value,index,this))
results.push(value);},this);return results;}
function sortBy(iterator,context){return this.map(function(value,index){return{value:value,criteria:iterator.call(context,value,index,this)};},this).sort(function(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0;}).pluck('value');}
function toArray(){return this.map();}
function zip(){var iterator=Prototype.K,args=$A(arguments);if(Object.isFunction(args.last()))
iterator=args.pop();var collections=[this].concat(args).map($A);return this.map(function(value,index){return iterator(collections.pluck(index));});}
function size(){return this.toArray().length;}
function inspect(){return'#<Enumerable:'+this.toArray().inspect()+'>';}
return{each:each,eachSlice:eachSlice,all:all,every:all,any:any,some:any,collect:collect,map:collect,detect:detect,findAll:findAll,select:findAll,filter:findAll,grep:grep,include:include,member:include,inGroupsOf:inGroupsOf,inject:inject,invoke:invoke,max:max,min:min,partition:partition,pluck:pluck,reject:reject,sortBy:sortBy,toArray:toArray,entries:toArray,zip:zip,size:size,inspect:inspect,find:detect};})();function $A(iterable){if(!iterable)return[];if('toArray'in Object(iterable))return iterable.toArray();var length=iterable.length||0,results=new Array(length);while(length--)results[length]=iterable[length];return results;}
function $w(string){if(!Object.isString(string))return[];string=string.strip();return string?string.split(/\s+/):[];}
Array.from=$A;(function(){var arrayProto=Array.prototype,slice=arrayProto.slice,_each=arrayProto.forEach;function each(iterator,context){for(var i=0,length=this.length>>>0;i<length;i++){if(i in this)iterator.call(context,this[i],i,this);}}
if(!_each)_each=each;function clear(){this.length=0;return this;}
function first(){return this[0];}
function last(){return this[this.length-1];}
function compact(){return this.select(function(value){return value!=null;});}
function flatten(){return this.inject([],function(array,value){if(Object.isArray(value))
return array.concat(value.flatten());array.push(value);return array;});}
function without(){var values=slice.call(arguments,0);return this.select(function(value){return!values.include(value);});}
function reverse(inline){return(inline===false?this.toArray():this)._reverse();}
function uniq(sorted){return this.inject([],function(array,value,index){if(0==index||(sorted?array.last()!=value:!array.include(value)))
array.push(value);return array;});}
function intersect(array){return this.uniq().findAll(function(item){return array.indexOf(item)!==-1;});}
function clone(){return slice.call(this,0);}
function size(){return this.length;}
function inspect(){return'['+this.map(Object.inspect).join(', ')+']';}
function indexOf(item,i){if(this==null)throw new TypeError();var array=Object(this),length=array.length>>>0;if(length===0)return-1;i=Number(i);if(isNaN(i)){i=0;}else if(i!==0&&isFinite(i)){i=(i>0?1:-1)*Math.floor(Math.abs(i));}
if(i>length)return-1;var k=i>=0?i:Math.max(length-Math.abs(i),0);for(;k<length;k++)
if(k in array&&array[k]===item)return k;return-1;}
function lastIndexOf(item,i){if(this==null)throw new TypeError();var array=Object(this),length=array.length>>>0;if(length===0)return-1;if(!Object.isUndefined(i)){i=Number(i);if(isNaN(i)){i=0;}else if(i!==0&&isFinite(i)){i=(i>0?1:-1)*Math.floor(Math.abs(i));}}else{i=length;}
var k=i>=0?Math.min(i,length-1):length-Math.abs(i);for(;k>=0;k--)
if(k in array&&array[k]===item)return k;return-1;}
function concat(_){var array=[],items=slice.call(arguments,0),item,n=0;items.unshift(this);for(var i=0,length=items.length;i<length;i++){item=items[i];if(Object.isArray(item)&&!('callee'in item)){for(var j=0,arrayLength=item.length;j<arrayLength;j++){if(j in item)array[n]=item[j];n++;}}else{array[n++]=item;}}
array.length=n;return array;}
function wrapNative(method){return function(){if(arguments.length===0){return method.call(this,Prototype.K);}else if(arguments[0]===undefined){var args=slice.call(arguments,1);args.unshift(Prototype.K);return method.apply(this,args);}else{return method.apply(this,arguments);}};}
function map(iterator){if(this==null)throw new TypeError();iterator=iterator||Prototype.K;var object=Object(this);var results=[],context=arguments[1],n=0;for(var i=0,length=object.length>>>0;i<length;i++){if(i in object){results[n]=iterator.call(context,object[i],i,object);}
n++;}
results.length=n;return results;}
if(arrayProto.map){map=wrapNative(Array.prototype.map);}
function filter(iterator){if(this==null||!Object.isFunction(iterator))
throw new TypeError();var object=Object(this);var results=[],context=arguments[1],value;for(var i=0,length=object.length>>>0;i<length;i++){if(i in object){value=object[i];if(iterator.call(context,value,i,object)){results.push(value);}}}
return results;}
if(arrayProto.filter){filter=Array.prototype.filter;}
function some(iterator){if(this==null)throw new TypeError();iterator=iterator||Prototype.K;var context=arguments[1];var object=Object(this);for(var i=0,length=object.length>>>0;i<length;i++){if(i in object&&iterator.call(context,object[i],i,object)){return true;}}
return false;}
if(arrayProto.some){some=wrapNative(Array.prototype.some);}
function every(iterator){if(this==null)throw new TypeError();iterator=iterator||Prototype.K;var context=arguments[1];var object=Object(this);for(var i=0,length=object.length>>>0;i<length;i++){if(i in object&&!iterator.call(context,object[i],i,object)){return false;}}
return true;}
if(arrayProto.every){every=wrapNative(Array.prototype.every);}
Object.extend(arrayProto,Enumerable);if(arrayProto.entries===Enumerable.entries){delete arrayProto.entries;}
if(!arrayProto._reverse)
arrayProto._reverse=arrayProto.reverse;Object.extend(arrayProto,{_each:_each,map:map,collect:map,select:filter,filter:filter,findAll:filter,some:some,any:some,every:every,all:every,clear:clear,first:first,last:last,compact:compact,flatten:flatten,without:without,reverse:reverse,uniq:uniq,intersect:intersect,clone:clone,toArray:clone,size:size,inspect:inspect});var CONCAT_ARGUMENTS_BUGGY=(function(){return[].concat(arguments)[0][0]!==1;})(1,2);if(CONCAT_ARGUMENTS_BUGGY)arrayProto.concat=concat;if(!arrayProto.indexOf)arrayProto.indexOf=indexOf;if(!arrayProto.lastIndexOf)arrayProto.lastIndexOf=lastIndexOf;})();function $H(object){return new Hash(object);};var Hash=Class.create(Enumerable,(function(){function initialize(object){this._object=Object.isHash(object)?object.toObject():Object.clone(object);}
function _each(iterator,context){var i=0;for(var key in this._object){var value=this._object[key],pair=[key,value];pair.key=key;pair.value=value;iterator.call(context,pair,i);i++;}}
function set(key,value){return this._object[key]=value;}
function get(key){if(this._object[key]!==Object.prototype[key])
return this._object[key];}
function unset(key){var value=this._object[key];delete this._object[key];return value;}
function toObject(){return Object.clone(this._object);}
function keys(){return this.pluck('key');}
function values(){return this.pluck('value');}
function index(value){var match=this.detect(function(pair){return pair.value===value;});return match&&match.key;}
function merge(object){return this.clone().update(object);}
function update(object){return new Hash(object).inject(this,function(result,pair){result.set(pair.key,pair.value);return result;});}
function toQueryPair(key,value){if(Object.isUndefined(value))return key;value=String.interpret(value);value=value.gsub(/(\r)?\n/,'\r\n');value=encodeURIComponent(value);value=value.gsub(/%20/,'+');return key+'='+value;}
function toQueryString(){return this.inject([],function(results,pair){var key=encodeURIComponent(pair.key),values=pair.value;if(values&&typeof values=='object'){if(Object.isArray(values)){var queryValues=[];for(var i=0,len=values.length,value;i<len;i++){value=values[i];queryValues.push(toQueryPair(key,value));}
return results.concat(queryValues);}}else results.push(toQueryPair(key,values));return results;}).join('&');}
function inspect(){return'#<Hash:{'+this.map(function(pair){return pair.map(Object.inspect).join(': ');}).join(', ')+'}>';}
function clone(){return new Hash(this);}
return{initialize:initialize,_each:_each,set:set,get:get,unset:unset,toObject:toObject,toTemplateReplacements:toObject,keys:keys,values:values,index:index,merge:merge,update:update,toQueryString:toQueryString,inspect:inspect,toJSON:toObject,clone:clone};})());Hash.from=$H;Object.extend(Number.prototype,(function(){function toColorPart(){return this.toPaddedString(2,16);}
function succ(){return this+1;}
function times(iterator,context){$R(0,this,true).each(iterator,context);return this;}
function toPaddedString(length,radix){var string=this.toString(radix||10);return'0'.times(length-string.length)+string;}
function abs(){return Math.abs(this);}
function round(){return Math.round(this);}
function ceil(){return Math.ceil(this);}
function floor(){return Math.floor(this);}
return{toColorPart:toColorPart,succ:succ,times:times,toPaddedString:toPaddedString,abs:abs,round:round,ceil:ceil,floor:floor};})());function $R(start,end,exclusive){return new ObjectRange(start,end,exclusive);}
var ObjectRange=Class.create(Enumerable,(function(){function initialize(start,end,exclusive){this.start=start;this.end=end;this.exclusive=exclusive;}
function _each(iterator,context){var value=this.start,i;for(i=0;this.include(value);i++){iterator.call(context,value,i);value=value.succ();}}
function include(value){if(value<this.start)
return false;if(this.exclusive)
return value<this.end;return value<=this.end;}
return{initialize:initialize,_each:_each,include:include};})());var Abstract={};var Try={these:function(){var returnValue;for(var i=0,length=arguments.length;i<length;i++){var lambda=arguments[i];try{returnValue=lambda();break;}catch(e){}}
return returnValue;}};var Ajax={getTransport:function(){return Try.these(function(){return new XMLHttpRequest()},function(){return new ActiveXObject('Msxml2.XMLHTTP')},function(){return new ActiveXObject('Microsoft.XMLHTTP')})||false;},activeRequestCount:0};Ajax.Responders={responders:[],_each:function(iterator,context){this.responders._each(iterator,context);},register:function(responder){if(!this.include(responder))
this.responders.push(responder);},unregister:function(responder){this.responders=this.responders.without(responder);},dispatch:function(callback,request,transport,json){this.each(function(responder){if(Object.isFunction(responder[callback])){try{responder[callback].apply(responder,[request,transport,json]);}catch(e){}}});}};Object.extend(Ajax.Responders,Enumerable);Ajax.Responders.register({onCreate:function(){Ajax.activeRequestCount++},onComplete:function(){Ajax.activeRequestCount--}});Ajax.Base=Class.create({initialize:function(options){this.options={method:'post',asynchronous:true,contentType:'application/x-www-form-urlencoded',encoding:'UTF-8',parameters:'',evalJSON:true,evalJS:true};Object.extend(this.options,options||{});this.options.method=this.options.method.toLowerCase();if(Object.isHash(this.options.parameters))
this.options.parameters=this.options.parameters.toObject();}});Ajax.Request=Class.create(Ajax.Base,{_complete:false,initialize:function($super,url,options){$super(options);this.transport=Ajax.getTransport();this.request(url);},request:function(url){this.url=url;this.method=this.options.method;var params=Object.isString(this.options.parameters)?this.options.parameters:Object.toQueryString(this.options.parameters);if(!['get','post'].include(this.method)){params+=(params?'&':'')+"_method="+this.method;this.method='post';}
if(params&&this.method==='get'){this.url+=(this.url.include('?')?'&':'?')+params;}
this.parameters=params.toQueryParams();try{var response=new Ajax.Response(this);if(this.options.onCreate)this.options.onCreate(response);Ajax.Responders.dispatch('onCreate',this,response);this.transport.open(this.method.toUpperCase(),this.url,this.options.asynchronous);if(this.options.asynchronous)this.respondToReadyState.bind(this).defer(1);this.transport.onreadystatechange=this.onStateChange.bind(this);this.setRequestHeaders();this.body=this.method=='post'?(this.options.postBody||params):null;this.transport.send(this.body);if(!this.options.asynchronous&&this.transport.overrideMimeType)
this.onStateChange();}
catch(e){this.dispatchException(e);}},onStateChange:function(){var readyState=this.transport.readyState;if(readyState>1&&!((readyState==4)&&this._complete))
this.respondToReadyState(this.transport.readyState);},setRequestHeaders:function(){var headers={'X-Requested-With':'XMLHttpRequest','X-Prototype-Version':Prototype.Version,'Accept':'text/javascript, text/html, application/xml, text/xml, */*'};if(this.method=='post'){headers['Content-type']=this.options.contentType+
(this.options.encoding?'; charset='+this.options.encoding:'');if(this.transport.overrideMimeType&&(navigator.userAgent.match(/Gecko\/(\d{4})/)||[0,2005])[1]<2005)
headers['Connection']='close';}
if(typeof this.options.requestHeaders=='object'){var extras=this.options.requestHeaders;if(Object.isFunction(extras.push))
for(var i=0,length=extras.length;i<length;i+=2)
headers[extras[i]]=extras[i+1];else
$H(extras).each(function(pair){headers[pair.key]=pair.value});}
for(var name in headers)
if(headers[name]!=null)
this.transport.setRequestHeader(name,headers[name]);},success:function(){var status=this.getStatus();return!status||(status>=200&&status<300)||status==304;},getStatus:function(){try{if(this.transport.status===1223)return 204;return this.transport.status||0;}catch(e){return 0}},respondToReadyState:function(readyState){var state=Ajax.Request.Events[readyState],response=new Ajax.Response(this);if(state=='Complete'){try{this._complete=true;(this.options['on'+response.status]||this.options['on'+(this.success()?'Success':'Failure')]||Prototype.emptyFunction)(response,response.headerJSON);}catch(e){this.dispatchException(e);}
var contentType=response.getHeader('Content-type');if(this.options.evalJS=='force'||(this.options.evalJS&&this.isSameOrigin()&&contentType&&contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
this.evalResponse();}
try{(this.options['on'+state]||Prototype.emptyFunction)(response,response.headerJSON);Ajax.Responders.dispatch('on'+state,this,response,response.headerJSON);}catch(e){this.dispatchException(e);}
if(state=='Complete'){this.transport.onreadystatechange=Prototype.emptyFunction;}},isSameOrigin:function(){var m=this.url.match(/^\s*https?:\/\/[^\/]*/);return!m||(m[0]=='#{protocol}//#{domain}#{port}'.interpolate({protocol:location.protocol,domain:document.domain,port:location.port?':'+location.port:''}));},getHeader:function(name){try{return this.transport.getResponseHeader(name)||null;}catch(e){return null;}},evalResponse:function(){try{return eval((this.transport.responseText||'').unfilterJSON());}catch(e){this.dispatchException(e);}},dispatchException:function(exception){(this.options.onException||Prototype.emptyFunction)(this,exception);Ajax.Responders.dispatch('onException',this,exception);}});Ajax.Request.Events=['Uninitialized','Loading','Loaded','Interactive','Complete'];Ajax.Response=Class.create({initialize:function(request){this.request=request;var transport=this.transport=request.transport,readyState=this.readyState=transport.readyState;if((readyState>2&&!Prototype.Browser.IE)||readyState==4){this.status=this.getStatus();this.statusText=this.getStatusText();this.responseText=String.interpret(transport.responseText);this.headerJSON=this._getHeaderJSON();}
if(readyState==4){var xml=transport.responseXML;this.responseXML=Object.isUndefined(xml)?null:xml;this.responseJSON=this._getResponseJSON();}},status:0,statusText:'',getStatus:Ajax.Request.prototype.getStatus,getStatusText:function(){try{return this.transport.statusText||'';}catch(e){return''}},getHeader:Ajax.Request.prototype.getHeader,getAllHeaders:function(){try{return this.getAllResponseHeaders();}catch(e){return null}},getResponseHeader:function(name){return this.transport.getResponseHeader(name);},getAllResponseHeaders:function(){return this.transport.getAllResponseHeaders();},_getHeaderJSON:function(){var json=this.getHeader('X-JSON');if(!json)return null;try{json=decodeURIComponent(escape(json));}catch(e){}
try{return json.evalJSON(this.request.options.sanitizeJSON||!this.request.isSameOrigin());}catch(e){this.request.dispatchException(e);}},_getResponseJSON:function(){var options=this.request.options;if(!options.evalJSON||(options.evalJSON!='force'&&!(this.getHeader('Content-type')||'').include('application/json'))||this.responseText.blank())
return null;try{return this.responseText.evalJSON(options.sanitizeJSON||!this.request.isSameOrigin());}catch(e){this.request.dispatchException(e);}}});Ajax.Updater=Class.create(Ajax.Request,{initialize:function($super,container,url,options){this.container={success:(container.success||container),failure:(container.failure||(container.success?null:container))};options=Object.clone(options);var onComplete=options.onComplete;options.onComplete=(function(response,json){this.updateContent(response.responseText);if(Object.isFunction(onComplete))onComplete(response,json);}).bind(this);$super(url,options);},updateContent:function(responseText){var receiver=this.container[this.success()?'success':'failure'],options=this.options;if(!options.evalScripts)responseText=responseText.stripScripts();if(receiver=$(receiver)){if(options.insertion){if(Object.isString(options.insertion)){var insertion={};insertion[options.insertion]=responseText;receiver.insert(insertion);}
else options.insertion(receiver,responseText);}
else receiver.update(responseText);}}});Ajax.PeriodicalUpdater=Class.create(Ajax.Base,{initialize:function($super,container,url,options){$super(options);this.onComplete=this.options.onComplete;this.frequency=(this.options.frequency||2);this.decay=(this.options.decay||1);this.updater={};this.container=container;this.url=url;this.start();},start:function(){this.options.onComplete=this.updateComplete.bind(this);this.onTimerEvent();},stop:function(){this.updater.options.onComplete=undefined;clearTimeout(this.timer);(this.onComplete||Prototype.emptyFunction).apply(this,arguments);},updateComplete:function(response){if(this.options.decay){this.decay=(response.responseText==this.lastText?this.decay*this.options.decay:1);this.lastText=response.responseText;}
this.timer=this.onTimerEvent.bind(this).delay(this.decay*this.frequency);},onTimerEvent:function(){this.updater=new Ajax.Updater(this.container,this.url,this.options);}});(function(GLOBAL){var UNDEFINED;var SLICE=Array.prototype.slice;var DIV=document.createElement('div');function $(element){if(arguments.length>1){for(var i=0,elements=[],length=arguments.length;i<length;i++)
elements.push($(arguments[i]));return elements;}
if(Object.isString(element))
element=document.getElementById(element);return Element.extend(element);}
GLOBAL.$=$;if(!GLOBAL.Node)GLOBAL.Node={};if(!GLOBAL.Node.ELEMENT_NODE){Object.extend(GLOBAL.Node,{ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12});}
var ELEMENT_CACHE={};function shouldUseCreationCache(tagName,attributes){if(tagName==='select')return false;if('type'in attributes)return false;return true;}
var HAS_EXTENDED_CREATE_ELEMENT_SYNTAX=(function(){try{var el=document.createElement('<input name="x">');return el.tagName.toLowerCase()==='input'&&el.name==='x';}
catch(err){return false;}})();var oldElement=GLOBAL.Element;function Element(tagName,attributes){attributes=attributes||{};tagName=tagName.toLowerCase();if(HAS_EXTENDED_CREATE_ELEMENT_SYNTAX&&attributes.name){tagName='<'+tagName+' name="'+attributes.name+'">';delete attributes.name;return Element.writeAttribute(document.createElement(tagName),attributes);}
if(!ELEMENT_CACHE[tagName])
ELEMENT_CACHE[tagName]=Element.extend(document.createElement(tagName));var node=shouldUseCreationCache(tagName,attributes)?ELEMENT_CACHE[tagName].cloneNode(false):document.createElement(tagName);return Element.writeAttribute(node,attributes);}
GLOBAL.Element=Element;Object.extend(GLOBAL.Element,oldElement||{});if(oldElement)GLOBAL.Element.prototype=oldElement.prototype;Element.Methods={ByTag:{},Simulated:{}};var methods={};var INSPECT_ATTRIBUTES={id:'id',className:'class'};function inspect(element){element=$(element);var result='<'+element.tagName.toLowerCase();var attribute,value;for(var property in INSPECT_ATTRIBUTES){attribute=INSPECT_ATTRIBUTES[property];value=(element[property]||'').toString();if(value)result+=' '+attribute+'='+value.inspect(true);}
return result+'>';}
methods.inspect=inspect;function visible(element){return $(element).getStyle('display')!=='none';}
function toggle(element,bool){element=$(element);if(typeof bool!=='boolean')
bool=!Element.visible(element);Element[bool?'show':'hide'](element);return element;}
function hide(element){element=$(element);element.style.display='none';return element;}
function show(element){element=$(element);element.style.display='';return element;}
Object.extend(methods,{visible:visible,toggle:toggle,hide:hide,show:show});function remove(element){element=$(element);element.parentNode.removeChild(element);return element;}
var SELECT_ELEMENT_INNERHTML_BUGGY=(function(){var el=document.createElement("select"),isBuggy=true;el.innerHTML="<option value=\"test\">test</option>";if(el.options&&el.options[0]){isBuggy=el.options[0].nodeName.toUpperCase()!=="OPTION";}
el=null;return isBuggy;})();var TABLE_ELEMENT_INNERHTML_BUGGY=(function(){try{var el=document.createElement("table");if(el&&el.tBodies){el.innerHTML="<tbody><tr><td>test</td></tr></tbody>";var isBuggy=typeof el.tBodies[0]=="undefined";el=null;return isBuggy;}}catch(e){return true;}})();var LINK_ELEMENT_INNERHTML_BUGGY=(function(){try{var el=document.createElement('div');el.innerHTML="<link />";var isBuggy=(el.childNodes.length===0);el=null;return isBuggy;}catch(e){return true;}})();var ANY_INNERHTML_BUGGY=SELECT_ELEMENT_INNERHTML_BUGGY||TABLE_ELEMENT_INNERHTML_BUGGY||LINK_ELEMENT_INNERHTML_BUGGY;var SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING=(function(){var s=document.createElement("script"),isBuggy=false;try{s.appendChild(document.createTextNode(""));isBuggy=!s.firstChild||s.firstChild&&s.firstChild.nodeType!==3;}catch(e){isBuggy=true;}
s=null;return isBuggy;})();function update(element,content){element=$(element);var descendants=element.getElementsByTagName('*'),i=descendants.length;while(i--)purgeElement(descendants[i]);if(content&&content.toElement)
content=content.toElement();if(Object.isElement(content))
return element.update().insert(content);content=Object.toHTML(content);var tagName=element.tagName.toUpperCase();if(tagName==='SCRIPT'&&SCRIPT_ELEMENT_REJECTS_TEXTNODE_APPENDING){element.text=content;return element;}
if(ANY_INNERHTML_BUGGY){if(tagName in INSERTION_TRANSLATIONS.tags){while(element.firstChild)
element.removeChild(element.firstChild);var nodes=getContentFromAnonymousElement(tagName,content.stripScripts());for(var i=0,node;node=nodes[i];i++)
element.appendChild(node);}else if(LINK_ELEMENT_INNERHTML_BUGGY&&Object.isString(content)&&content.indexOf('<link')>-1){while(element.firstChild)
element.removeChild(element.firstChild);var nodes=getContentFromAnonymousElement(tagName,content.stripScripts(),true);for(var i=0,node;node=nodes[i];i++)
element.appendChild(node);}else{element.innerHTML=content.stripScripts();}}else{element.innerHTML=content.stripScripts();}
content.evalScripts.bind(content).defer();return element;}
function replace(element,content){element=$(element);if(content&&content.toElement){content=content.toElement();}else if(!Object.isElement(content)){content=Object.toHTML(content);var range=element.ownerDocument.createRange();range.selectNode(element);content.evalScripts.bind(content).defer();content=range.createContextualFragment(content.stripScripts());}
element.parentNode.replaceChild(content,element);return element;}
var INSERTION_TRANSLATIONS={before:function(element,node){element.parentNode.insertBefore(node,element);},top:function(element,node){element.insertBefore(node,element.firstChild);},bottom:function(element,node){element.appendChild(node);},after:function(element,node){element.parentNode.insertBefore(node,element.nextSibling);},tags:{TABLE:['<table>','</table>',1],TBODY:['<table><tbody>','</tbody></table>',2],TR:['<table><tbody><tr>','</tr></tbody></table>',3],TD:['<table><tbody><tr><td>','</td></tr></tbody></table>',4],SELECT:['<select>','</select>',1]}};var tags=INSERTION_TRANSLATIONS.tags;Object.extend(tags,{THEAD:tags.TBODY,TFOOT:tags.TBODY,TH:tags.TD});function replace_IE(element,content){element=$(element);if(content&&content.toElement)
content=content.toElement();if(Object.isElement(content)){element.parentNode.replaceChild(content,element);return element;}
content=Object.toHTML(content);var parent=element.parentNode,tagName=parent.tagName.toUpperCase();if(tagName in INSERTION_TRANSLATIONS.tags){var nextSibling=Element.next(element);var fragments=getContentFromAnonymousElement(tagName,content.stripScripts());parent.removeChild(element);var iterator;if(nextSibling)
iterator=function(node){parent.insertBefore(node,nextSibling)};else
iterator=function(node){parent.appendChild(node);}
fragments.each(iterator);}else{element.outerHTML=content.stripScripts();}
content.evalScripts.bind(content).defer();return element;}
if('outerHTML'in document.documentElement)
replace=replace_IE;function isContent(content){if(Object.isUndefined(content)||content===null)return false;if(Object.isString(content)||Object.isNumber(content))return true;if(Object.isElement(content))return true;if(content.toElement||content.toHTML)return true;return false;}
function insertContentAt(element,content,position){position=position.toLowerCase();var method=INSERTION_TRANSLATIONS[position];if(content&&content.toElement)content=content.toElement();if(Object.isElement(content)){method(element,content);return element;}
content=Object.toHTML(content);var tagName=((position==='before'||position==='after')?element.parentNode:element).tagName.toUpperCase();var childNodes=getContentFromAnonymousElement(tagName,content.stripScripts());if(position==='top'||position==='after')childNodes.reverse();for(var i=0,node;node=childNodes[i];i++)
method(element,node);content.evalScripts.bind(content).defer();}
function insert(element,insertions){element=$(element);if(isContent(insertions))
insertions={bottom:insertions};for(var position in insertions)
insertContentAt(element,insertions[position],position);return element;}
function wrap(element,wrapper,attributes){element=$(element);if(Object.isElement(wrapper)){$(wrapper).writeAttribute(attributes||{});}else if(Object.isString(wrapper)){wrapper=new Element(wrapper,attributes);}else{wrapper=new Element('div',wrapper);}
if(element.parentNode)
element.parentNode.replaceChild(wrapper,element);wrapper.appendChild(element);return wrapper;}
function cleanWhitespace(element){element=$(element);var node=element.firstChild;while(node){var nextNode=node.nextSibling;if(node.nodeType===Node.TEXT_NODE&&!/\S/.test(node.nodeValue))
element.removeChild(node);node=nextNode;}
return element;}
function empty(element){return $(element).innerHTML.blank();}
function getContentFromAnonymousElement(tagName,html,force){var t=INSERTION_TRANSLATIONS.tags[tagName],div=DIV;var workaround=!!t;if(!workaround&&force){workaround=true;t=['','',0];}
if(workaround){div.innerHTML='&#160;'+t[0]+html+t[1];div.removeChild(div.firstChild);for(var i=t[2];i--;)
div=div.firstChild;}else{div.innerHTML=html;}
return $A(div.childNodes);}
function clone(element,deep){if(!(element=$(element)))return;var clone=element.cloneNode(deep);if(!HAS_UNIQUE_ID_PROPERTY){clone._prototypeUID=UNDEFINED;if(deep){var descendants=Element.select(clone,'*'),i=descendants.length;while(i--)
descendants[i]._prototypeUID=UNDEFINED;}}
return Element.extend(clone);}
function purgeElement(element){var uid=getUniqueElementID(element);if(uid){Element.stopObserving(element);if(!HAS_UNIQUE_ID_PROPERTY)
element._prototypeUID=UNDEFINED;delete Element.Storage[uid];}}
function purgeCollection(elements){var i=elements.length;while(i--)
purgeElement(elements[i]);}
function purgeCollection_IE(elements){var i=elements.length,element,uid;while(i--){element=elements[i];uid=getUniqueElementID(element);delete Element.Storage[uid];delete Event.cache[uid];}}
if(HAS_UNIQUE_ID_PROPERTY){purgeCollection=purgeCollection_IE;}
function purge(element){if(!(element=$(element)))return;purgeElement(element);var descendants=element.getElementsByTagName('*'),i=descendants.length;while(i--)purgeElement(descendants[i]);return null;}
Object.extend(methods,{remove:remove,update:update,replace:replace,insert:insert,wrap:wrap,cleanWhitespace:cleanWhitespace,empty:empty,clone:clone,purge:purge});function recursivelyCollect(element,property,maximumLength){element=$(element);maximumLength=maximumLength||-1;var elements=[];while(element=element[property]){if(element.nodeType===Node.ELEMENT_NODE)
elements.push(Element.extend(element));if(elements.length===maximumLength)break;}
return elements;}
function ancestors(element){return recursivelyCollect(element,'parentNode');}
function descendants(element){return Element.select(element,'*');}
function firstDescendant(element){element=$(element).firstChild;while(element&&element.nodeType!==Node.ELEMENT_NODE)
element=element.nextSibling;return $(element);}
function immediateDescendants(element){var results=[],child=$(element).firstChild;while(child){if(child.nodeType===Node.ELEMENT_NODE)
results.push(Element.extend(child));child=child.nextSibling;}
return results;}
function previousSiblings(element){return recursivelyCollect(element,'previousSibling');}
function nextSiblings(element){return recursivelyCollect(element,'nextSibling');}
function siblings(element){element=$(element);var previous=previousSiblings(element),next=nextSiblings(element);return previous.reverse().concat(next);}
function match(element,selector){element=$(element);if(Object.isString(selector))
return Prototype.Selector.match(element,selector);return selector.match(element);}
function _recursivelyFind(element,property,expression,index){element=$(element),expression=expression||0,index=index||0;if(Object.isNumber(expression)){index=expression,expression=null;}
while(element=element[property]){if(element.nodeType!==1)continue;if(expression&&!Prototype.Selector.match(element,expression))
continue;if(--index>=0)continue;return Element.extend(element);}}
function up(element,expression,index){element=$(element);if(arguments.length===1)return $(element.parentNode);return _recursivelyFind(element,'parentNode',expression,index);}
function down(element,expression,index){if(arguments.length===1)return firstDescendant(element);element=$(element),expression=expression||0,index=index||0;if(Object.isNumber(expression))
index=expression,expression='*';var node=Prototype.Selector.select(expression,element)[index];return Element.extend(node);}
function previous(element,expression,index){return _recursivelyFind(element,'previousSibling',expression,index);}
function next(element,expression,index){return _recursivelyFind(element,'nextSibling',expression,index);}
function select(element){element=$(element);var expressions=SLICE.call(arguments,1).join(', ');return Prototype.Selector.select(expressions,element);}
function adjacent(element){element=$(element);var expressions=SLICE.call(arguments,1).join(', ');var siblings=Element.siblings(element),results=[];for(var i=0,sibling;sibling=siblings[i];i++){if(Prototype.Selector.match(sibling,expressions))
results.push(sibling);}
return results;}
function descendantOf_DOM(element,ancestor){element=$(element),ancestor=$(ancestor);if(!element||!ancestor)return false;while(element=element.parentNode)
if(element===ancestor)return true;return false;}
function descendantOf_contains(element,ancestor){element=$(element),ancestor=$(ancestor);if(!element||!ancestor)return false;if(!ancestor.contains)return descendantOf_DOM(element,ancestor);return ancestor.contains(element)&&ancestor!==element;}
function descendantOf_compareDocumentPosition(element,ancestor){element=$(element),ancestor=$(ancestor);if(!element||!ancestor)return false;return(element.compareDocumentPosition(ancestor)&8)===8;}
var descendantOf;if(DIV.compareDocumentPosition){descendantOf=descendantOf_compareDocumentPosition;}else if(DIV.contains){descendantOf=descendantOf_contains;}else{descendantOf=descendantOf_DOM;}
Object.extend(methods,{recursivelyCollect:recursivelyCollect,ancestors:ancestors,descendants:descendants,firstDescendant:firstDescendant,immediateDescendants:immediateDescendants,previousSiblings:previousSiblings,nextSiblings:nextSiblings,siblings:siblings,match:match,up:up,down:down,previous:previous,next:next,select:select,adjacent:adjacent,descendantOf:descendantOf,getElementsBySelector:select,childElements:immediateDescendants});var idCounter=1;function identify(element){element=$(element);var id=Element.readAttribute(element,'id');if(id)return id;do{id='anonymous_element_'+idCounter++}while($(id));Element.writeAttribute(element,'id',id);return id;}
function readAttribute(element,name){return $(element).getAttribute(name);}
function readAttribute_IE(element,name){element=$(element);var table=ATTRIBUTE_TRANSLATIONS.read;if(table.values[name])
return table.values[name](element,name);if(table.names[name])name=table.names[name];if(name.include(':')){if(!element.attributes||!element.attributes[name])return null;return element.attributes[name].value;}
return element.getAttribute(name);}
function readAttribute_Opera(element,name){if(name==='title')return element.title;return element.getAttribute(name);}
var PROBLEMATIC_ATTRIBUTE_READING=(function(){DIV.setAttribute('onclick',[]);var value=DIV.getAttribute('onclick');var isFunction=Object.isArray(value);DIV.removeAttribute('onclick');return isFunction;})();if(PROBLEMATIC_ATTRIBUTE_READING){readAttribute=readAttribute_IE;}else if(Prototype.Browser.Opera){readAttribute=readAttribute_Opera;}
function writeAttribute(element,name,value){element=$(element);var attributes={},table=ATTRIBUTE_TRANSLATIONS.write;if(typeof name==='object'){attributes=name;}else{attributes[name]=Object.isUndefined(value)?true:value;}
for(var attr in attributes){name=table.names[attr]||attr;value=attributes[attr];if(table.values[attr]){value=table.values[attr](element,value);if(Object.isUndefined(value))continue;}
if(value===false||value===null)
element.removeAttribute(name);else if(value===true)
element.setAttribute(name,name);else element.setAttribute(name,value);}
return element;}
var PROBLEMATIC_HAS_ATTRIBUTE_WITH_CHECKBOXES=(function(){if(!HAS_EXTENDED_CREATE_ELEMENT_SYNTAX){return false;}
var checkbox=document.createElement('<input type="checkbox">');checkbox.checked=true;var node=checkbox.getAttributeNode('checked');return!node||!node.specified;})();function hasAttribute(element,attribute){attribute=ATTRIBUTE_TRANSLATIONS.has[attribute]||attribute;var node=$(element).getAttributeNode(attribute);return!!(node&&node.specified);}
function hasAttribute_IE(element,attribute){if(attribute==='checked'){return element.checked;}
return hasAttribute(element,attribute);}
GLOBAL.Element.Methods.Simulated.hasAttribute=PROBLEMATIC_HAS_ATTRIBUTE_WITH_CHECKBOXES?hasAttribute_IE:hasAttribute;function classNames(element){return new Element.ClassNames(element);}
var regExpCache={};function getRegExpForClassName(className){if(regExpCache[className])return regExpCache[className];var re=new RegExp("(^|\\s+)"+className+"(\\s+|$)");regExpCache[className]=re;return re;}
function hasClassName(element,className){if(!(element=$(element)))return;var elementClassName=element.className;if(elementClassName.length===0)return false;if(elementClassName===className)return true;return getRegExpForClassName(className).test(elementClassName);}
function addClassName(element,className){if(!(element=$(element)))return;if(!hasClassName(element,className))
element.className+=(element.className?' ':'')+className;return element;}
function removeClassName(element,className){if(!(element=$(element)))return;element.className=element.className.replace(getRegExpForClassName(className),' ').strip();return element;}
function toggleClassName(element,className,bool){if(!(element=$(element)))return;if(Object.isUndefined(bool))
bool=!hasClassName(element,className);var method=Element[bool?'addClassName':'removeClassName'];return method(element,className);}
var ATTRIBUTE_TRANSLATIONS={};var classProp='className',forProp='for';DIV.setAttribute(classProp,'x');if(DIV.className!=='x'){DIV.setAttribute('class','x');if(DIV.className==='x')
classProp='class';}
var LABEL=document.createElement('label');LABEL.setAttribute(forProp,'x');if(LABEL.htmlFor!=='x'){LABEL.setAttribute('htmlFor','x');if(LABEL.htmlFor==='x')
forProp='htmlFor';}
LABEL=null;function _getAttr(element,attribute){return element.getAttribute(attribute);}
function _getAttr2(element,attribute){return element.getAttribute(attribute,2);}
function _getAttrNode(element,attribute){var node=element.getAttributeNode(attribute);return node?node.value:'';}
function _getFlag(element,attribute){return $(element).hasAttribute(attribute)?attribute:null;}
DIV.onclick=Prototype.emptyFunction;var onclickValue=DIV.getAttribute('onclick');var _getEv;if(String(onclickValue).indexOf('{')>-1){_getEv=function(element,attribute){var value=element.getAttribute(attribute);if(!value)return null;value=value.toString();value=value.split('{')[1];value=value.split('}')[0];return value.strip();};}
else if(onclickValue===''){_getEv=function(element,attribute){var value=element.getAttribute(attribute);if(!value)return null;return value.strip();};}
ATTRIBUTE_TRANSLATIONS.read={names:{'class':classProp,'className':classProp,'for':forProp,'htmlFor':forProp},values:{style:function(element){return element.style.cssText.toLowerCase();},title:function(element){return element.title;}}};ATTRIBUTE_TRANSLATIONS.write={names:{className:'class',htmlFor:'for',cellpadding:'cellPadding',cellspacing:'cellSpacing'},values:{checked:function(element,value){value=!!value;element.checked=value;return value?'checked':null;},style:function(element,value){element.style.cssText=value?value:'';}}};ATTRIBUTE_TRANSLATIONS.has={names:{}};Object.extend(ATTRIBUTE_TRANSLATIONS.write.names,ATTRIBUTE_TRANSLATIONS.read.names);var CAMEL_CASED_ATTRIBUTE_NAMES=$w('colSpan rowSpan vAlign dateTime '+'accessKey tabIndex encType maxLength readOnly longDesc frameBorder');for(var i=0,attr;attr=CAMEL_CASED_ATTRIBUTE_NAMES[i];i++){ATTRIBUTE_TRANSLATIONS.write.names[attr.toLowerCase()]=attr;ATTRIBUTE_TRANSLATIONS.has.names[attr.toLowerCase()]=attr;}
Object.extend(ATTRIBUTE_TRANSLATIONS.read.values,{href:_getAttr2,src:_getAttr2,type:_getAttr,action:_getAttrNode,disabled:_getFlag,checked:_getFlag,readonly:_getFlag,multiple:_getFlag,onload:_getEv,onunload:_getEv,onclick:_getEv,ondblclick:_getEv,onmousedown:_getEv,onmouseup:_getEv,onmouseover:_getEv,onmousemove:_getEv,onmouseout:_getEv,onfocus:_getEv,onblur:_getEv,onkeypress:_getEv,onkeydown:_getEv,onkeyup:_getEv,onsubmit:_getEv,onreset:_getEv,onselect:_getEv,onchange:_getEv});Object.extend(methods,{identify:identify,readAttribute:readAttribute,writeAttribute:writeAttribute,classNames:classNames,hasClassName:hasClassName,addClassName:addClassName,removeClassName:removeClassName,toggleClassName:toggleClassName});function normalizeStyleName(style){if(style==='float'||style==='styleFloat')
return'cssFloat';return style.camelize();}
function normalizeStyleName_IE(style){if(style==='float'||style==='cssFloat')
return'styleFloat';return style.camelize();}
function setStyle(element,styles){element=$(element);var elementStyle=element.style,match;if(Object.isString(styles)){elementStyle.cssText+=';'+styles;if(styles.include('opacity')){var opacity=styles.match(/opacity:\s*(\d?\.?\d*)/)[1];Element.setOpacity(element,opacity);}
return element;}
for(var property in styles){if(property==='opacity'){Element.setOpacity(element,styles[property]);}else{var value=styles[property];if(property==='float'||property==='cssFloat'){property=Object.isUndefined(elementStyle.styleFloat)?'cssFloat':'styleFloat';}
elementStyle[property]=value;}}
return element;}
function getStyle(element,style){element=$(element);style=normalizeStyleName(style);var value=element.style[style];if(!value||value==='auto'){var css=document.defaultView.getComputedStyle(element,null);value=css?css[style]:null;}
if(style==='opacity')return value?parseFloat(value):1.0;return value==='auto'?null:value;}
function getStyle_Opera(element,style){switch(style){case'height':case'width':if(!Element.visible(element))return null;var dim=parseInt(getStyle(element,style),10);if(dim!==element['offset'+style.capitalize()])
return dim+'px';return Element.measure(element,style);default:return getStyle(element,style);}}
function getStyle_IE(element,style){element=$(element);style=normalizeStyleName_IE(style);var value=element.style[style];if(!value&&element.currentStyle){value=element.currentStyle[style];}
if(style==='opacity'){if(!STANDARD_CSS_OPACITY_SUPPORTED)
return getOpacity_IE(element);else return value?parseFloat(value):1.0;}
if(value==='auto'){if((style==='width'||style==='height')&&Element.visible(element))
return Element.measure(element,style)+'px';return null;}
return value;}
function stripAlphaFromFilter_IE(filter){return(filter||'').replace(/alpha\([^\)]*\)/gi,'');}
function hasLayout_IE(element){if(!element.currentStyle||!element.currentStyle.hasLayout)
element.style.zoom=1;return element;}
var STANDARD_CSS_OPACITY_SUPPORTED=(function(){DIV.style.cssText="opacity:.55";return/^0.55/.test(DIV.style.opacity);})();function setOpacity(element,value){element=$(element);if(value==1||value==='')value='';else if(value<0.00001)value=0;element.style.opacity=value;return element;}
function setOpacity_IE(element,value){if(STANDARD_CSS_OPACITY_SUPPORTED)
return setOpacity(element,value);element=hasLayout_IE($(element));var filter=Element.getStyle(element,'filter'),style=element.style;if(value==1||value===''){filter=stripAlphaFromFilter_IE(filter);if(filter)style.filter=filter;else style.removeAttribute('filter');return element;}
if(value<0.00001)value=0;style.filter=stripAlphaFromFilter_IE(filter)+' alpha(opacity='+(value*100)+')';return element;}
function getOpacity(element){return Element.getStyle(element,'opacity');}
function getOpacity_IE(element){if(STANDARD_CSS_OPACITY_SUPPORTED)
return getOpacity(element);var filter=Element.getStyle(element,'filter');if(filter.length===0)return 1.0;var match=(filter||'').match(/alpha\(opacity=(.*)\)/i);if(match&&match[1])return parseFloat(match[1])/100;return 1.0;}
Object.extend(methods,{setStyle:setStyle,getStyle:getStyle,setOpacity:setOpacity,getOpacity:getOpacity});if('styleFloat'in DIV.style){methods.getStyle=getStyle_IE;methods.setOpacity=setOpacity_IE;methods.getOpacity=getOpacity_IE;}
var UID=0;GLOBAL.Element.Storage={UID:1};function getUniqueElementID(element){if(element===window)return 0;if(typeof element._prototypeUID==='undefined')
element._prototypeUID=Element.Storage.UID++;return element._prototypeUID;}
function getUniqueElementID_IE(element){if(element===window)return 0;if(element==document)return 1;return element.uniqueID;}
var HAS_UNIQUE_ID_PROPERTY=('uniqueID'in DIV);if(HAS_UNIQUE_ID_PROPERTY)
getUniqueElementID=getUniqueElementID_IE;function getStorage(element){if(!(element=$(element)))return;var uid=getUniqueElementID(element);if(!Element.Storage[uid])
Element.Storage[uid]=$H();return Element.Storage[uid];}
function store(element,key,value){if(!(element=$(element)))return;var storage=getStorage(element);if(arguments.length===2){storage.update(key);}else{storage.set(key,value);}
return element;}
function retrieve(element,key,defaultValue){if(!(element=$(element)))return;var storage=getStorage(element),value=storage.get(key);if(Object.isUndefined(value)){storage.set(key,defaultValue);value=defaultValue;}
return value;}
Object.extend(methods,{getStorage:getStorage,store:store,retrieve:retrieve});var Methods={},ByTag=Element.Methods.ByTag,F=Prototype.BrowserFeatures;if(!F.ElementExtensions&&('__proto__'in DIV)){GLOBAL.HTMLElement={};GLOBAL.HTMLElement.prototype=DIV['__proto__'];F.ElementExtensions=true;}
function checkElementPrototypeDeficiency(tagName){if(typeof window.Element==='undefined')return false;if(!HAS_EXTENDED_CREATE_ELEMENT_SYNTAX)return false;var proto=window.Element.prototype;if(proto){var id='_'+(Math.random()+'').slice(2),el=document.createElement(tagName);proto[id]='x';var isBuggy=(el[id]!=='x');delete proto[id];el=null;return isBuggy;}
return false;}
var HTMLOBJECTELEMENT_PROTOTYPE_BUGGY=checkElementPrototypeDeficiency('object');function extendElementWith(element,methods){for(var property in methods){var value=methods[property];if(Object.isFunction(value)&&!(property in element))
element[property]=value.methodize();}}
var EXTENDED={};function elementIsExtended(element){var uid=getUniqueElementID(element);return(uid in EXTENDED);}
function extend(element){if(!element||elementIsExtended(element))return element;if(element.nodeType!==Node.ELEMENT_NODE||element==window)
return element;var methods=Object.clone(Methods),tagName=element.tagName.toUpperCase();if(ByTag[tagName])Object.extend(methods,ByTag[tagName]);extendElementWith(element,methods);EXTENDED[getUniqueElementID(element)]=true;return element;}
function extend_IE8(element){if(!element||elementIsExtended(element))return element;var t=element.tagName;if(t&&(/^(?:object|applet|embed)$/i.test(t))){extendElementWith(element,Element.Methods);extendElementWith(element,Element.Methods.Simulated);extendElementWith(element,Element.Methods.ByTag[t.toUpperCase()]);}
return element;}
if(F.SpecificElementExtensions){extend=HTMLOBJECTELEMENT_PROTOTYPE_BUGGY?extend_IE8:Prototype.K;}
function addMethodsToTagName(tagName,methods){tagName=tagName.toUpperCase();if(!ByTag[tagName])ByTag[tagName]={};Object.extend(ByTag[tagName],methods);}
function mergeMethods(destination,methods,onlyIfAbsent){if(Object.isUndefined(onlyIfAbsent))onlyIfAbsent=false;for(var property in methods){var value=methods[property];if(!Object.isFunction(value))continue;if(!onlyIfAbsent||!(property in destination))
destination[property]=value.methodize();}}
function findDOMClass(tagName){var klass;var trans={"OPTGROUP":"OptGroup","TEXTAREA":"TextArea","P":"Paragraph","FIELDSET":"FieldSet","UL":"UList","OL":"OList","DL":"DList","DIR":"Directory","H1":"Heading","H2":"Heading","H3":"Heading","H4":"Heading","H5":"Heading","H6":"Heading","Q":"Quote","INS":"Mod","DEL":"Mod","A":"Anchor","IMG":"Image","CAPTION":"TableCaption","COL":"TableCol","COLGROUP":"TableCol","THEAD":"TableSection","TFOOT":"TableSection","TBODY":"TableSection","TR":"TableRow","TH":"TableCell","TD":"TableCell","FRAMESET":"FrameSet","IFRAME":"IFrame"};if(trans[tagName])klass='HTML'+trans[tagName]+'Element';if(window[klass])return window[klass];klass='HTML'+tagName+'Element';if(window[klass])return window[klass];klass='HTML'+tagName.capitalize()+'Element';if(window[klass])return window[klass];var element=document.createElement(tagName),proto=element['__proto__']||element.constructor.prototype;element=null;return proto;}
function addMethods(methods){if(arguments.length===0)addFormMethods();if(arguments.length===2){var tagName=methods;methods=arguments[1];}
if(!tagName){Object.extend(Element.Methods,methods||{});}else{if(Object.isArray(tagName)){for(var i=0,tag;tag=tagName[i];i++)
addMethodsToTagName(tag,methods);}else{addMethodsToTagName(tagName,methods);}}
var ELEMENT_PROTOTYPE=window.HTMLElement?HTMLElement.prototype:Element.prototype;if(F.ElementExtensions){mergeMethods(ELEMENT_PROTOTYPE,Element.Methods);mergeMethods(ELEMENT_PROTOTYPE,Element.Methods.Simulated,true);}
if(F.SpecificElementExtensions){for(var tag in Element.Methods.ByTag){var klass=findDOMClass(tag);if(Object.isUndefined(klass))continue;mergeMethods(klass.prototype,ByTag[tag]);}}
Object.extend(Element,Element.Methods);Object.extend(Element,Element.Methods.Simulated);delete Element.ByTag;delete Element.Simulated;Element.extend.refresh();ELEMENT_CACHE={};}
Object.extend(GLOBAL.Element,{extend:extend,addMethods:addMethods});if(extend===Prototype.K){GLOBAL.Element.extend.refresh=Prototype.emptyFunction;}else{GLOBAL.Element.extend.refresh=function(){if(Prototype.BrowserFeatures.ElementExtensions)return;Object.extend(Methods,Element.Methods);Object.extend(Methods,Element.Methods.Simulated);EXTENDED={};};}
function addFormMethods(){Object.extend(Form,Form.Methods);Object.extend(Form.Element,Form.Element.Methods);Object.extend(Element.Methods.ByTag,{"FORM":Object.clone(Form.Methods),"INPUT":Object.clone(Form.Element.Methods),"SELECT":Object.clone(Form.Element.Methods),"TEXTAREA":Object.clone(Form.Element.Methods),"BUTTON":Object.clone(Form.Element.Methods)});}
Element.addMethods(methods);function destroyCache_IE(){DIV=null;ELEMENT_CACHE=null;}
if(window.attachEvent)
window.attachEvent('onunload',destroyCache_IE);})(this);(function(){function toDecimal(pctString){var match=pctString.match(/^(\d+)%?$/i);if(!match)return null;return(Number(match[1])/100);}
function getRawStyle(element,style){element=$(element);var value=element.style[style];if(!value||value==='auto'){var css=document.defaultView.getComputedStyle(element,null);value=css?css[style]:null;}
if(style==='opacity')return value?parseFloat(value):1.0;return value==='auto'?null:value;}
function getRawStyle_IE(element,style){var value=element.style[style];if(!value&&element.currentStyle){value=element.currentStyle[style];}
return value;}
function getContentWidth(element,context){var boxWidth=element.offsetWidth;var bl=getPixelValue(element,'borderLeftWidth',context)||0;var br=getPixelValue(element,'borderRightWidth',context)||0;var pl=getPixelValue(element,'paddingLeft',context)||0;var pr=getPixelValue(element,'paddingRight',context)||0;return boxWidth-bl-br-pl-pr;}
if(!Object.isUndefined(document.documentElement.currentStyle)&&!Prototype.Browser.Opera){getRawStyle=getRawStyle_IE;}
function getPixelValue(value,property,context){var element=null;if(Object.isElement(value)){element=value;value=getRawStyle(element,property);}
if(value===null||Object.isUndefined(value)){return null;}
if((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(value)){return window.parseFloat(value);}
var isPercentage=value.include('%'),isViewport=(context===document.viewport);if(/\d/.test(value)&&element&&element.runtimeStyle&&!(isPercentage&&isViewport)){var style=element.style.left,rStyle=element.runtimeStyle.left;element.runtimeStyle.left=element.currentStyle.left;element.style.left=value||0;value=element.style.pixelLeft;element.style.left=style;element.runtimeStyle.left=rStyle;return value;}
if(element&&isPercentage){context=context||element.parentNode;var decimal=toDecimal(value),whole=null;var isHorizontal=property.include('left')||property.include('right')||property.include('width');var isVertical=property.include('top')||property.include('bottom')||property.include('height');if(context===document.viewport){if(isHorizontal){whole=document.viewport.getWidth();}else if(isVertical){whole=document.viewport.getHeight();}}else{if(isHorizontal){whole=$(context).measure('width');}else if(isVertical){whole=$(context).measure('height');}}
return(whole===null)?0:whole*decimal;}
return 0;}
function toCSSPixels(number){if(Object.isString(number)&&number.endsWith('px'))
return number;return number+'px';}
function isDisplayed(element){while(element&&element.parentNode){var display=element.getStyle('display');if(display==='none'){return false;}
element=$(element.parentNode);}
return true;}
var hasLayout=Prototype.K;if('currentStyle'in document.documentElement){hasLayout=function(element){if(!element.currentStyle.hasLayout){element.style.zoom=1;}
return element;};}
function cssNameFor(key){if(key.include('border'))key=key+'-width';return key.camelize();}
Element.Layout=Class.create(Hash,{initialize:function($super,element,preCompute){$super();this.element=$(element);Element.Layout.PROPERTIES.each(function(property){this._set(property,null);},this);if(preCompute){this._preComputing=true;this._begin();Element.Layout.PROPERTIES.each(this._compute,this);this._end();this._preComputing=false;}},_set:function(property,value){return Hash.prototype.set.call(this,property,value);},set:function(property,value){throw"Properties of Element.Layout are read-only.";},get:function($super,property){var value=$super(property);return value===null?this._compute(property):value;},_begin:function(){if(this._isPrepared())return;var element=this.element;if(isDisplayed(element)){this._setPrepared(true);return;}
var originalStyles={position:element.style.position||'',width:element.style.width||'',visibility:element.style.visibility||'',display:element.style.display||''};element.store('prototype_original_styles',originalStyles);var position=getRawStyle(element,'position'),width=element.offsetWidth;if(width===0||width===null){element.style.display='block';width=element.offsetWidth;}
var context=(position==='fixed')?document.viewport:element.parentNode;var tempStyles={visibility:'hidden',display:'block'};if(position!=='fixed')tempStyles.position='absolute';element.setStyle(tempStyles);var positionedWidth=element.offsetWidth,newWidth;if(width&&(positionedWidth===width)){newWidth=getContentWidth(element,context);}else if(position==='absolute'||position==='fixed'){newWidth=getContentWidth(element,context);}else{var parent=element.parentNode,pLayout=$(parent).getLayout();newWidth=pLayout.get('width')-
this.get('margin-left')-
this.get('border-left')-
this.get('padding-left')-
this.get('padding-right')-
this.get('border-right')-
this.get('margin-right');}
element.setStyle({width:newWidth+'px'});this._setPrepared(true);},_end:function(){var element=this.element;var originalStyles=element.retrieve('prototype_original_styles');element.store('prototype_original_styles',null);element.setStyle(originalStyles);this._setPrepared(false);},_compute:function(property){var COMPUTATIONS=Element.Layout.COMPUTATIONS;if(!(property in COMPUTATIONS)){throw"Property not found.";}
return this._set(property,COMPUTATIONS[property].call(this,this.element));},_isPrepared:function(){return this.element.retrieve('prototype_element_layout_prepared',false);},_setPrepared:function(bool){return this.element.store('prototype_element_layout_prepared',bool);},toObject:function(){var args=$A(arguments);var keys=(args.length===0)?Element.Layout.PROPERTIES:args.join(' ').split(' ');var obj={};keys.each(function(key){if(!Element.Layout.PROPERTIES.include(key))return;var value=this.get(key);if(value!=null)obj[key]=value;},this);return obj;},toHash:function(){var obj=this.toObject.apply(this,arguments);return new Hash(obj);},toCSS:function(){var args=$A(arguments);var keys=(args.length===0)?Element.Layout.PROPERTIES:args.join(' ').split(' ');var css={};keys.each(function(key){if(!Element.Layout.PROPERTIES.include(key))return;if(Element.Layout.COMPOSITE_PROPERTIES.include(key))return;var value=this.get(key);if(value!=null)css[cssNameFor(key)]=value+'px';},this);return css;},inspect:function(){return"#<Element.Layout>";}});Object.extend(Element.Layout,{PROPERTIES:$w('height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height'),COMPOSITE_PROPERTIES:$w('padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height'),COMPUTATIONS:{'height':function(element){if(!this._preComputing)this._begin();var bHeight=this.get('border-box-height');if(bHeight<=0){if(!this._preComputing)this._end();return 0;}
var bTop=this.get('border-top'),bBottom=this.get('border-bottom');var pTop=this.get('padding-top'),pBottom=this.get('padding-bottom');if(!this._preComputing)this._end();return bHeight-bTop-bBottom-pTop-pBottom;},'width':function(element){if(!this._preComputing)this._begin();var bWidth=this.get('border-box-width');if(bWidth<=0){if(!this._preComputing)this._end();return 0;}
var bLeft=this.get('border-left'),bRight=this.get('border-right');var pLeft=this.get('padding-left'),pRight=this.get('padding-right');if(!this._preComputing)this._end();return bWidth-bLeft-bRight-pLeft-pRight;},'padding-box-height':function(element){var height=this.get('height'),pTop=this.get('padding-top'),pBottom=this.get('padding-bottom');return height+pTop+pBottom;},'padding-box-width':function(element){var width=this.get('width'),pLeft=this.get('padding-left'),pRight=this.get('padding-right');return width+pLeft+pRight;},'border-box-height':function(element){if(!this._preComputing)this._begin();var height=element.offsetHeight;if(!this._preComputing)this._end();return height;},'border-box-width':function(element){if(!this._preComputing)this._begin();var width=element.offsetWidth;if(!this._preComputing)this._end();return width;},'margin-box-height':function(element){var bHeight=this.get('border-box-height'),mTop=this.get('margin-top'),mBottom=this.get('margin-bottom');if(bHeight<=0)return 0;return bHeight+mTop+mBottom;},'margin-box-width':function(element){var bWidth=this.get('border-box-width'),mLeft=this.get('margin-left'),mRight=this.get('margin-right');if(bWidth<=0)return 0;return bWidth+mLeft+mRight;},'top':function(element){var offset=element.positionedOffset();return offset.top;},'bottom':function(element){var offset=element.positionedOffset(),parent=element.getOffsetParent(),pHeight=parent.measure('height');var mHeight=this.get('border-box-height');return pHeight-mHeight-offset.top;},'left':function(element){var offset=element.positionedOffset();return offset.left;},'right':function(element){var offset=element.positionedOffset(),parent=element.getOffsetParent(),pWidth=parent.measure('width');var mWidth=this.get('border-box-width');return pWidth-mWidth-offset.left;},'padding-top':function(element){return getPixelValue(element,'paddingTop');},'padding-bottom':function(element){return getPixelValue(element,'paddingBottom');},'padding-left':function(element){return getPixelValue(element,'paddingLeft');},'padding-right':function(element){return getPixelValue(element,'paddingRight');},'border-top':function(element){return getPixelValue(element,'borderTopWidth');},'border-bottom':function(element){return getPixelValue(element,'borderBottomWidth');},'border-left':function(element){return getPixelValue(element,'borderLeftWidth');},'border-right':function(element){return getPixelValue(element,'borderRightWidth');},'margin-top':function(element){return getPixelValue(element,'marginTop');},'margin-bottom':function(element){return getPixelValue(element,'marginBottom');},'margin-left':function(element){return getPixelValue(element,'marginLeft');},'margin-right':function(element){return getPixelValue(element,'marginRight');}}});if('getBoundingClientRect'in document.documentElement){Object.extend(Element.Layout.COMPUTATIONS,{'right':function(element){var parent=hasLayout(element.getOffsetParent());var rect=element.getBoundingClientRect(),pRect=parent.getBoundingClientRect();return(pRect.right-rect.right).round();},'bottom':function(element){var parent=hasLayout(element.getOffsetParent());var rect=element.getBoundingClientRect(),pRect=parent.getBoundingClientRect();return(pRect.bottom-rect.bottom).round();}});}
Element.Offset=Class.create({initialize:function(left,top){this.left=left.round();this.top=top.round();this[0]=this.left;this[1]=this.top;},relativeTo:function(offset){return new Element.Offset(this.left-offset.left,this.top-offset.top);},inspect:function(){return"#<Element.Offset left: #{left} top: #{top}>".interpolate(this);},toString:function(){return"[#{left}, #{top}]".interpolate(this);},toArray:function(){return[this.left,this.top];}});function getLayout(element,preCompute){return new Element.Layout(element,preCompute);}
function measure(element,property){return $(element).getLayout().get(property);}
function getHeight(element){return Element.getDimensions(element).height;}
function getWidth(element){return Element.getDimensions(element).width;}
function getDimensions(element){element=$(element);var display=Element.getStyle(element,'display');if(display&&display!=='none'){return{width:element.offsetWidth,height:element.offsetHeight};}
var style=element.style;var originalStyles={visibility:style.visibility,position:style.position,display:style.display};var newStyles={visibility:'hidden',display:'block'};if(originalStyles.position!=='fixed')
newStyles.position='absolute';Element.setStyle(element,newStyles);var dimensions={width:element.offsetWidth,height:element.offsetHeight};Element.setStyle(element,originalStyles);return dimensions;}
function getOffsetParent(element){element=$(element);function selfOrBody(element){return isHtml(element)?$(document.body):$(element);}
if(isDocument(element)||isDetached(element)||isBody(element)||isHtml(element))
return $(document.body);var isInline=(Element.getStyle(element,'display')==='inline');if(!isInline&&element.offsetParent)return selfOrBody(element.offsetParent);while((element=element.parentNode)&&element!==document.body){if(Element.getStyle(element,'position')!=='static'){return selfOrBody(element);}}
return $(document.body);}
function cumulativeOffset(element){element=$(element);var valueT=0,valueL=0;if(element.parentNode){do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;element=element.offsetParent;}while(element);}
return new Element.Offset(valueL,valueT);}
function positionedOffset(element){element=$(element);var layout=element.getLayout();var valueT=0,valueL=0;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;element=element.offsetParent;if(element){if(isBody(element))break;var p=Element.getStyle(element,'position');if(p!=='static')break;}}while(element);valueL-=layout.get('margin-left');valueT-=layout.get('margin-top');return new Element.Offset(valueL,valueT);}
function cumulativeScrollOffset(element){var valueT=0,valueL=0;do{if(element===document.body){var bodyScrollNode=document.documentElement||document.body.parentNode||document.body;valueT+=!Object.isUndefined(window.pageYOffset)?window.pageYOffset:bodyScrollNode.scrollTop||0;valueL+=!Object.isUndefined(window.pageXOffset)?window.pageXOffset:bodyScrollNode.scrollLeft||0;break;}else{valueT+=element.scrollTop||0;valueL+=element.scrollLeft||0;element=element.parentNode;}}while(element);return new Element.Offset(valueL,valueT);}
function viewportOffset(forElement){var valueT=0,valueL=0,docBody=document.body;forElement=$(forElement);var element=forElement;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;if(element.offsetParent==docBody&&Element.getStyle(element,'position')=='absolute')break;}while(element=element.offsetParent);element=forElement;do{if(element!=docBody){valueT-=element.scrollTop||0;valueL-=element.scrollLeft||0;}}while(element=element.parentNode);return new Element.Offset(valueL,valueT);}
function absolutize(element){element=$(element);if(Element.getStyle(element,'position')==='absolute'){return element;}
var offsetParent=getOffsetParent(element);var eOffset=element.viewportOffset(),pOffset=offsetParent.viewportOffset();var offset=eOffset.relativeTo(pOffset);var layout=element.getLayout();element.store('prototype_absolutize_original_styles',{position:element.getStyle('position'),left:element.getStyle('left'),top:element.getStyle('top'),width:element.getStyle('width'),height:element.getStyle('height')});element.setStyle({position:'absolute',top:offset.top+'px',left:offset.left+'px',width:layout.get('width')+'px',height:layout.get('height')+'px'});return element;}
function relativize(element){element=$(element);if(Element.getStyle(element,'position')==='relative'){return element;}
var originalStyles=element.retrieve('prototype_absolutize_original_styles');if(originalStyles)element.setStyle(originalStyles);return element;}
function scrollTo(element){element=$(element);var pos=Element.cumulativeOffset(element);window.scrollTo(pos.left,pos.top);return element;}
function makePositioned(element){element=$(element);var position=Element.getStyle(element,'position'),styles={};if(position==='static'||!position){styles.position='relative';if(Prototype.Browser.Opera){styles.top=0;styles.left=0;}
Element.setStyle(element,styles);Element.store(element,'prototype_made_positioned',true);}
return element;}
function undoPositioned(element){element=$(element);var storage=Element.getStorage(element),madePositioned=storage.get('prototype_made_positioned');if(madePositioned){storage.unset('prototype_made_positioned');Element.setStyle(element,{position:'',top:'',bottom:'',left:'',right:''});}
return element;}
function makeClipping(element){element=$(element);var storage=Element.getStorage(element),madeClipping=storage.get('prototype_made_clipping');if(Object.isUndefined(madeClipping)){var overflow=Element.getStyle(element,'overflow');storage.set('prototype_made_clipping',overflow);if(overflow!=='hidden')
element.style.overflow='hidden';}
return element;}
function undoClipping(element){element=$(element);var storage=Element.getStorage(element),overflow=storage.get('prototype_made_clipping');if(!Object.isUndefined(overflow)){storage.unset('prototype_made_clipping');element.style.overflow=overflow||'';}
return element;}
function clonePosition(element,source,options){options=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},options||{});var docEl=document.documentElement;source=$(source);element=$(element);var p,delta,layout,styles={};if(options.setLeft||options.setTop){p=Element.viewportOffset(source);delta=[0,0];if(Element.getStyle(element,'position')==='absolute'){var parent=Element.getOffsetParent(element);if(parent!==document.body)delta=Element.viewportOffset(parent);}}
function pageScrollXY(){var x=0,y=0;if(Object.isNumber(window.pageXOffset)){x=window.pageXOffset;y=window.pageYOffset;}else if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){x=document.body.scrollLeft;y=document.body.scrollTop;}else if(docEl&&(docEl.scrollLeft||docEl.scrollTop)){x=docEl.scrollLeft;y=docEl.scrollTop;}
return{x:x,y:y};}
var pageXY=pageScrollXY();if(options.setWidth||options.setHeight){layout=Element.getLayout(source);}
if(options.setLeft)
styles.left=(p[0]+pageXY.x-delta[0]+options.offsetLeft)+'px';if(options.setTop)
styles.top=(p[1]+pageXY.y-delta[1]+options.offsetTop)+'px';var currentLayout=element.getLayout();if(options.setWidth){styles.width=layout.get('width')+'px';}
if(options.setHeight){styles.height=layout.get('height')+'px';}
return Element.setStyle(element,styles);}
if(Prototype.Browser.IE){getOffsetParent=getOffsetParent.wrap(function(proceed,element){element=$(element);if(isDocument(element)||isDetached(element)||isBody(element)||isHtml(element))
return $(document.body);var position=element.getStyle('position');if(position!=='static')return proceed(element);element.setStyle({position:'relative'});var value=proceed(element);element.setStyle({position:position});return value;});positionedOffset=positionedOffset.wrap(function(proceed,element){element=$(element);if(!element.parentNode)return new Element.Offset(0,0);var position=element.getStyle('position');if(position!=='static')return proceed(element);var offsetParent=element.getOffsetParent();if(offsetParent&&offsetParent.getStyle('position')==='fixed')
hasLayout(offsetParent);element.setStyle({position:'relative'});var value=proceed(element);element.setStyle({position:position});return value;});}else if(Prototype.Browser.Webkit){cumulativeOffset=function(element){element=$(element);var valueT=0,valueL=0;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;if(element.offsetParent==document.body){if(Element.getStyle(element,'position')=='absolute')break;}
element=element.offsetParent;}while(element);return new Element.Offset(valueL,valueT);};}
Element.addMethods({getLayout:getLayout,measure:measure,getWidth:getWidth,getHeight:getHeight,getDimensions:getDimensions,getOffsetParent:getOffsetParent,cumulativeOffset:cumulativeOffset,positionedOffset:positionedOffset,cumulativeScrollOffset:cumulativeScrollOffset,viewportOffset:viewportOffset,absolutize:absolutize,relativize:relativize,scrollTo:scrollTo,makePositioned:makePositioned,undoPositioned:undoPositioned,makeClipping:makeClipping,undoClipping:undoClipping,clonePosition:clonePosition});function isBody(element){return element.nodeName.toUpperCase()==='BODY';}
function isHtml(element){return element.nodeName.toUpperCase()==='HTML';}
function isDocument(element){return element.nodeType===Node.DOCUMENT_NODE;}
function isDetached(element){return element!==document.body&&!Element.descendantOf(element,document.body);}
if('getBoundingClientRect'in document.documentElement){Element.addMethods({viewportOffset:function(element){element=$(element);if(isDetached(element))return new Element.Offset(0,0);var rect=element.getBoundingClientRect(),docEl=document.documentElement;return new Element.Offset(rect.left-docEl.clientLeft,rect.top-docEl.clientTop);}});}})();(function(){var IS_OLD_OPERA=Prototype.Browser.Opera&&(window.parseFloat(window.opera.version())<9.5);var ROOT=null;function getRootElement(){if(ROOT)return ROOT;ROOT=IS_OLD_OPERA?document.body:document.documentElement;return ROOT;}
function getDimensions(){return{width:this.getWidth(),height:this.getHeight()};}
function getWidth(){return getRootElement().clientWidth;}
function getHeight(){return getRootElement().clientHeight;}
function getScrollOffsets(){var x=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft;var y=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;return new Element.Offset(x,y);}
document.viewport={getDimensions:getDimensions,getWidth:getWidth,getHeight:getHeight,getScrollOffsets:getScrollOffsets};})();window.$$=function(){var expression=$A(arguments).join(', ');return Prototype.Selector.select(expression,document);};Prototype.Selector=(function(){function select(){throw new Error('Method "Prototype.Selector.select" must be defined.');}
function match(){throw new Error('Method "Prototype.Selector.match" must be defined.');}
function find(elements,expression,index){index=index||0;var match=Prototype.Selector.match,length=elements.length,matchIndex=0,i;for(i=0;i<length;i++){if(match(elements[i],expression)&&index==matchIndex++){return Element.extend(elements[i]);}}}
function extendElements(elements){for(var i=0,length=elements.length;i<length;i++){Element.extend(elements[i]);}
return elements;}
var K=Prototype.K;return{select:select,match:match,find:find,extendElements:(Element.extend===K)?K:extendElements,extendElement:Element.extend};})();Prototype._original_property=window.Sizzle;;(function(){function fakeDefine(fn){Prototype._actual_sizzle=fn();}
fakeDefine.amd=true;if(typeof define!=='undefined'&&define.amd){Prototype._original_define=define;Prototype._actual_sizzle=null;window.define=fakeDefine;}})();(function(window){var i,support,Expr,getText,isXML,compile,select,outermostContext,sortInput,hasDuplicate,setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains,expando="sizzle"+ -(new Date()),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),sortOrder=function(a,b){if(a===b){hasDuplicate=true;}
return 0;},strundefined=typeof undefined,MAX_NEGATIVE=1<<31,hasOwn=({}).hasOwnProperty,arr=[],pop=arr.pop,push_native=arr.push,push=arr.push,slice=arr.slice,indexOf=arr.indexOf||function(elem){var i=0,len=this.length;for(;i<len;i++){if(this[i]===elem){return i;}}
return-1;},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",whitespace="[\\x20\\t\\r\\n\\f]",characterEncoding="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",identifier=characterEncoding.replace("w","w#"),attributes="\\["+whitespace+"*("+characterEncoding+")"+whitespace+"*(?:([*^$|!~]?=)"+whitespace+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+identifier+")|)|)"+whitespace+"*\\]",pseudos=":("+characterEncoding+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+attributes.replace(3,8)+")*)|.*)\\)|)",rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rattributeQuotes=new RegExp("="+whitespace+"*([^\\]'\"]*?)"+whitespace+"*\\]","g"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={"ID":new RegExp("^#("+characterEncoding+")"),"CLASS":new RegExp("^\\.("+characterEncoding+")"),"TAG":new RegExp("^("+characterEncoding.replace("w","w*")+")"),"ATTR":new RegExp("^"+attributes),"PSEUDO":new RegExp("^"+pseudos),"CHILD":new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),"bool":new RegExp("^(?:"+booleans+")$","i"),"needsContext":new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+
whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rnative=/^[^{]+\{\s*\[native \w/,rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rsibling=/[+~]/,rescape=/'|\\/g,runescape=new RegExp("\\\\([\\da-f]{1,6}"+whitespace+"?|("+whitespace+")|.)","ig"),funescape=function(_,escaped,escapedWhitespace){var high="0x"+escaped-0x10000;return high!==high||escapedWhitespace?escaped:high<0?String.fromCharCode(high+0x10000):String.fromCharCode(high>>10|0xD800,high&0x3FF|0xDC00);};try{push.apply((arr=slice.call(preferredDoc.childNodes)),preferredDoc.childNodes);arr[preferredDoc.childNodes.length].nodeType;}catch(e){push={apply:arr.length?function(target,els){push_native.apply(target,slice.call(els));}:function(target,els){var j=target.length,i=0;while((target[j++]=els[i++])){}
target.length=j-1;}};}
function Sizzle(selector,context,results,seed){var match,elem,m,nodeType,i,groups,old,nid,newContext,newSelector;if((context?context.ownerDocument||context:preferredDoc)!==document){setDocument(context);}
context=context||document;results=results||[];if(!selector||typeof selector!=="string"){return results;}
if((nodeType=context.nodeType)!==1&&nodeType!==9){return[];}
if(documentIsHTML&&!seed){if((match=rquickExpr.exec(selector))){if((m=match[1])){if(nodeType===9){elem=context.getElementById(m);if(elem&&elem.parentNode){if(elem.id===m){results.push(elem);return results;}}else{return results;}}else{if(context.ownerDocument&&(elem=context.ownerDocument.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);return results;}}}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results;}else if((m=match[3])&&support.getElementsByClassName&&context.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}}
if(support.qsa&&(!rbuggyQSA||!rbuggyQSA.test(selector))){nid=old=expando;newContext=context;newSelector=nodeType===9&&selector;if(nodeType===1&&context.nodeName.toLowerCase()!=="object"){groups=tokenize(selector);if((old=context.getAttribute("id"))){nid=old.replace(rescape,"\\$&");}else{context.setAttribute("id",nid);}
nid="[id='"+nid+"'] ";i=groups.length;while(i--){groups[i]=nid+toSelector(groups[i]);}
newContext=rsibling.test(selector)&&testContext(context.parentNode)||context;newSelector=groups.join(",");}
if(newSelector){try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError){}finally{if(!old){context.removeAttribute("id");}}}}}
return select(selector.replace(rtrim,"$1"),context,results,seed);}
function createCache(){var keys=[];function cache(key,value){if(keys.push(key+" ")>Expr.cacheLength){delete cache[keys.shift()];}
return(cache[key+" "]=value);}
return cache;}
function markFunction(fn){fn[expando]=true;return fn;}
function assert(fn){var div=document.createElement("div");try{return!!fn(div);}catch(e){return false;}finally{if(div.parentNode){div.parentNode.removeChild(div);}
div=null;}}
function addHandle(attrs,handler){var arr=attrs.split("|"),i=attrs.length;while(i--){Expr.attrHandle[arr[i]]=handler;}}
function siblingCheck(a,b){var cur=b&&a,diff=cur&&a.nodeType===1&&b.nodeType===1&&(~b.sourceIndex||MAX_NEGATIVE)-
(~a.sourceIndex||MAX_NEGATIVE);if(diff){return diff;}
if(cur){while((cur=cur.nextSibling)){if(cur===b){return-1;}}}
return a?1:-1;}
function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type===type;};}
function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&elem.type===type;};}
function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;while(i--){if(seed[(j=matchIndexes[i])]){seed[j]=!(matches[j]=seed[j]);}}});});}
function testContext(context){return context&&typeof context.getElementsByTagName!==strundefined&&context;}
support=Sizzle.support={};isXML=Sizzle.isXML=function(elem){var documentElement=elem&&(elem.ownerDocument||elem).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;};setDocument=Sizzle.setDocument=function(node){var hasCompare,doc=node?node.ownerDocument||node:preferredDoc,parent=doc.defaultView;if(doc===document||doc.nodeType!==9||!doc.documentElement){return document;}
document=doc;docElem=doc.documentElement;documentIsHTML=!isXML(doc);if(parent&&parent!==parent.top){if(parent.addEventListener){parent.addEventListener("unload",function(){setDocument();},false);}else if(parent.attachEvent){parent.attachEvent("onunload",function(){setDocument();});}}
support.attributes=assert(function(div){div.className="i";return!div.getAttribute("className");});support.getElementsByTagName=assert(function(div){div.appendChild(doc.createComment(""));return!div.getElementsByTagName("*").length;});support.getElementsByClassName=rnative.test(doc.getElementsByClassName)&&assert(function(div){div.innerHTML="<div class='a'></div><div class='a i'></div>";div.firstChild.className="i";return div.getElementsByClassName("i").length===2;});support.getById=assert(function(div){docElem.appendChild(div).id=expando;return!doc.getElementsByName||!doc.getElementsByName(expando).length;});if(support.getById){Expr.find["ID"]=function(id,context){if(typeof context.getElementById!==strundefined&&documentIsHTML){var m=context.getElementById(id);return m&&m.parentNode?[m]:[];}};Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id")===attrId;};};}else{delete Expr.find["ID"];Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node=typeof elem.getAttributeNode!==strundefined&&elem.getAttributeNode("id");return node&&node.value===attrId;};};}
Expr.find["TAG"]=support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName!==strundefined){return context.getElementsByTagName(tag);}}:function(tag,context){var elem,tmp=[],i=0,results=context.getElementsByTagName(tag);if(tag==="*"){while((elem=results[i++])){if(elem.nodeType===1){tmp.push(elem);}}
return tmp;}
return results;};Expr.find["CLASS"]=support.getElementsByClassName&&function(className,context){if(typeof context.getElementsByClassName!==strundefined&&documentIsHTML){return context.getElementsByClassName(className);}};rbuggyMatches=[];rbuggyQSA=[];if((support.qsa=rnative.test(doc.querySelectorAll))){assert(function(div){div.innerHTML="<select t=''><option selected=''></option></select>";if(div.querySelectorAll("[t^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")");}
if(!div.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")");}
if(!div.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");}});assert(function(div){var input=doc.createElement("input");input.setAttribute("type","hidden");div.appendChild(input).setAttribute("name","D");if(div.querySelectorAll("[name=d]").length){rbuggyQSA.push("name"+whitespace+"*[*^$|!~]?=");}
if(!div.querySelectorAll(":enabled").length){rbuggyQSA.push(":enabled",":disabled");}
div.querySelectorAll("*,:x");rbuggyQSA.push(",.*:");});}
if((support.matchesSelector=rnative.test((matches=docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector)))){assert(function(div){support.disconnectedMatch=matches.call(div,"div");matches.call(div,"[s!='']:x");rbuggyMatches.push("!=",pseudos);});}
rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|"));hasCompare=rnative.test(docElem.compareDocumentPosition);contains=hasCompare||rnative.test(docElem.contains)?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16));}:function(a,b){if(b){while((b=b.parentNode)){if(b===a){return true;}}}
return false;};sortOrder=hasCompare?function(a,b){if(a===b){hasDuplicate=true;return 0;}
var compare=!a.compareDocumentPosition-!b.compareDocumentPosition;if(compare){return compare;}
compare=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1;if(compare&1||(!support.sortDetached&&b.compareDocumentPosition(a)===compare)){if(a===doc||a.ownerDocument===preferredDoc&&contains(preferredDoc,a)){return-1;}
if(b===doc||b.ownerDocument===preferredDoc&&contains(preferredDoc,b)){return 1;}
return sortInput?(indexOf.call(sortInput,a)-indexOf.call(sortInput,b)):0;}
return compare&4?-1:1;}:function(a,b){if(a===b){hasDuplicate=true;return 0;}
var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b];if(!aup||!bup){return a===doc?-1:b===doc?1:aup?-1:bup?1:sortInput?(indexOf.call(sortInput,a)-indexOf.call(sortInput,b)):0;}else if(aup===bup){return siblingCheck(a,b);}
cur=a;while((cur=cur.parentNode)){ap.unshift(cur);}
cur=b;while((cur=cur.parentNode)){bp.unshift(cur);}
while(ap[i]===bp[i]){i++;}
return i?siblingCheck(ap[i],bp[i]):ap[i]===preferredDoc?-1:bp[i]===preferredDoc?1:0;};return doc;};Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements);};Sizzle.matchesSelector=function(elem,expr){if((elem.ownerDocument||elem)!==document){setDocument(elem);}
expr=expr.replace(rattributeQuotes,"='$1']");if(support.matchesSelector&&documentIsHTML&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr);if(ret||support.disconnectedMatch||elem.document&&elem.document.nodeType!==11){return ret;}}catch(e){}}
return Sizzle(expr,document,null,[elem]).length>0;};Sizzle.contains=function(context,elem){if((context.ownerDocument||context)!==document){setDocument(context);}
return contains(context,elem);};Sizzle.attr=function(elem,name){if((elem.ownerDocument||elem)!==document){setDocument(elem);}
var fn=Expr.attrHandle[name.toLowerCase()],val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;return val!==undefined?val:support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null;};Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg);};Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0;hasDuplicate=!support.detectDuplicates;sortInput=!support.sortStable&&results.slice(0);results.sort(sortOrder);if(hasDuplicate){while((elem=results[i++])){if(elem===results[i]){j=duplicates.push(i);}}
while(j--){results.splice(duplicates[j],1);}}
sortInput=null;return results;};getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(!nodeType){while((node=elem[i++])){ret+=getText(node);}}else if(nodeType===1||nodeType===9||nodeType===11){if(typeof elem.textContent==="string"){return elem.textContent;}else{for(elem=elem.firstChild;elem;elem=elem.nextSibling){ret+=getText(elem);}}}else if(nodeType===3||nodeType===4){return elem.nodeValue;}
return ret;};Expr=Sizzle.selectors={cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function(match){match[1]=match[1].replace(runescape,funescape);match[3]=(match[4]||match[5]||"").replace(runescape,funescape);if(match[2]==="~="){match[3]=" "+match[3]+" ";}
return match.slice(0,4);},"CHILD":function(match){match[1]=match[1].toLowerCase();if(match[1].slice(0,3)==="nth"){if(!match[3]){Sizzle.error(match[0]);}
match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));match[5]=+((match[7]+match[8])||match[3]==="odd");}else if(match[3]){Sizzle.error(match[0]);}
return match;},"PSEUDO":function(match){var excess,unquoted=!match[5]&&match[2];if(matchExpr["CHILD"].test(match[0])){return null;}
if(match[3]&&match[4]!==undefined){match[2]=match[4];}else if(unquoted&&rpseudo.test(unquoted)&&(excess=tokenize(unquoted,true))&&(excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){match[0]=match[0].slice(0,excess);match[2]=unquoted.slice(0,excess);}
return match.slice(0,3);}},filter:{"TAG":function(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return nodeNameSelector==="*"?function(){return true;}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName;};},"CLASS":function(className){var pattern=classCache[className+" "];return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!==strundefined&&elem.getAttribute("class")||"");});},"ATTR":function(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);if(result==null){return operator==="!=";}
if(!operator){return true;}
result+="";return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.slice(-check.length)===check:operator==="~="?(" "+result+" ").indexOf(check)>-1:operator==="|="?result===check||result.slice(0,check.length+1)===check+"-":false;};},"CHILD":function(type,what,argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";return first===1&&last===0?function(elem){return!!elem.parentNode;}:function(elem,context,xml){var cache,outerCache,node,diff,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType;if(parent){if(simple){while(dir){node=elem;while((node=node[dir])){if(ofType?node.nodeName.toLowerCase()===name:node.nodeType===1){return false;}}
start=dir=type==="only"&&!start&&"nextSibling";}
return true;}
start=[forward?parent.firstChild:parent.lastChild];if(forward&&useCache){outerCache=parent[expando]||(parent[expando]={});cache=outerCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=cache[0]===dirruns&&cache[2];node=nodeIndex&&parent.childNodes[nodeIndex];while((node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())){if(node.nodeType===1&&++diff&&node===elem){outerCache[type]=[dirruns,nodeIndex,diff];break;}}}else if(useCache&&(cache=(elem[expando]||(elem[expando]={}))[type])&&cache[0]===dirruns){diff=cache[1];}else{while((node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())){if((ofType?node.nodeName.toLowerCase()===name:node.nodeType===1)&&++diff){if(useCache){(node[expando]||(node[expando]={}))[type]=[dirruns,diff];}
if(node===elem){break;}}}}
diff-=last;return diff===first||(diff%first===0&&diff/first>=0);}};},"PSEUDO":function(pseudo,argument){var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);if(fn[expando]){return fn(argument);}
if(fn.length>1){args=[pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--){idx=indexOf.call(seed,matched[i]);seed[idx]=!(matches[idx]=matched[i]);}}):function(elem){return fn(elem,0,args);};}
return fn;}},pseudos:{"not":markFunction(function(selector){var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;while(i--){if((elem=unmatched[i])){seed[i]=!(matches[i]=elem);}}}):function(elem,context,xml){input[0]=elem;matcher(input,null,xml,results);return!results.pop();};}),"has":markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0;};}),"contains":markFunction(function(text){return function(elem){return(elem.textContent||elem.innerText||getText(elem)).indexOf(text)>-1;};}),"lang":markFunction(function(lang){if(!ridentifier.test(lang||"")){Sizzle.error("unsupported lang: "+lang);}
lang=lang.replace(runescape,funescape).toLowerCase();return function(elem){var elemLang;do{if((elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang"))){elemLang=elemLang.toLowerCase();return elemLang===lang||elemLang.indexOf(lang+"-")===0;}}while((elem=elem.parentNode)&&elem.nodeType===1);return false;};}),"target":function(elem){var hash=window.location&&window.location.hash;return hash&&hash.slice(1)===elem.id;},"root":function(elem){return elem===docElem;},"focus":function(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex);},"enabled":function(elem){return elem.disabled===false;},"disabled":function(elem){return elem.disabled===true;},"checked":function(elem){var nodeName=elem.nodeName.toLowerCase();return(nodeName==="input"&&!!elem.checked)||(nodeName==="option"&&!!elem.selected);},"selected":function(elem){if(elem.parentNode){elem.parentNode.selectedIndex;}
return elem.selected===true;},"empty":function(elem){for(elem=elem.firstChild;elem;elem=elem.nextSibling){if(elem.nodeType<6){return false;}}
return true;},"parent":function(elem){return!Expr.pseudos["empty"](elem);},"header":function(elem){return rheader.test(elem.nodeName);},"input":function(elem){return rinputs.test(elem.nodeName);},"button":function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type==="button"||name==="button";},"text":function(elem){var attr;return elem.nodeName.toLowerCase()==="input"&&elem.type==="text"&&((attr=elem.getAttribute("type"))==null||attr.toLowerCase()==="text");},"first":createPositionalPseudo(function(){return[0];}),"last":createPositionalPseudo(function(matchIndexes,length){return[length-1];}),"eq":createPositionalPseudo(function(matchIndexes,length,argument){return[argument<0?argument+length:argument];}),"even":createPositionalPseudo(function(matchIndexes,length){var i=0;for(;i<length;i+=2){matchIndexes.push(i);}
return matchIndexes;}),"odd":createPositionalPseudo(function(matchIndexes,length){var i=1;for(;i<length;i+=2){matchIndexes.push(i);}
return matchIndexes;}),"lt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;--i>=0;){matchIndexes.push(i);}
return matchIndexes;}),"gt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;++i<length;){matchIndexes.push(i);}
return matchIndexes;})}};Expr.pseudos["nth"]=Expr.pseudos["eq"];for(i in{radio:true,checkbox:true,file:true,password:true,image:true}){Expr.pseudos[i]=createInputPseudo(i);}
for(i in{submit:true,reset:true}){Expr.pseudos[i]=createButtonPseudo(i);}
function setFilters(){}
setFilters.prototype=Expr.filters=Expr.pseudos;Expr.setFilters=new setFilters();function tokenize(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];if(cached){return parseOnly?0:cached.slice(0);}
soFar=selector;groups=[];preFilters=Expr.preFilter;while(soFar){if(!matched||(match=rcomma.exec(soFar))){if(match){soFar=soFar.slice(match[0].length)||soFar;}
groups.push((tokens=[]));}
matched=false;if((match=rcombinators.exec(soFar))){matched=match.shift();tokens.push({value:matched,type:match[0].replace(rtrim," ")});soFar=soFar.slice(matched.length);}
for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){matched=match.shift();tokens.push({value:matched,type:type,matches:match});soFar=soFar.slice(matched.length);}}
if(!matched){break;}}
return parseOnly?soFar.length:soFar?Sizzle.error(selector):tokenCache(selector,groups).slice(0);}
function toSelector(tokens){var i=0,len=tokens.length,selector="";for(;i<len;i++){selector+=tokens[i].value;}
return selector;}
function addCombinator(matcher,combinator,base){var dir=combinator.dir,checkNonElements=base&&dir==="parentNode",doneName=done++;return combinator.first?function(elem,context,xml){while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml);}}}:function(elem,context,xml){var oldCache,outerCache,newCache=[dirruns,doneName];if(xml){while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true;}}}}else{while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={});if((oldCache=outerCache[dir])&&oldCache[0]===dirruns&&oldCache[1]===doneName){return(newCache[2]=oldCache[2]);}else{outerCache[dir]=newCache;if((newCache[2]=matcher(elem,context,xml))){return true;}}}}}};}
function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;while(i--){if(!matchers[i](elem,context,xml)){return false;}}
return true;}:matchers[0];}
function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;for(;i<len;i++){Sizzle(selector,contexts[i],results);}
return results;}
function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;for(;i<len;i++){if((elem=unmatched[i])){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}
return newUnmatched;}
function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter);}
if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector);}
return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length,elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher?postFinder||(seed?preFilter:preexisting||postFilter)?[]:results:matcherIn;if(matcher){matcher(matcherIn,matcherOut,context,xml);}
if(postFilter){temp=condense(matcherOut,postMap);postFilter(temp,[],context,xml);i=temp.length;while(i--){if((elem=temp[i])){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem);}}}
if(seed){if(postFinder||preFilter){if(postFinder){temp=[];i=matcherOut.length;while(i--){if((elem=matcherOut[i])){temp.push((matcherIn[i]=elem));}}
postFinder(null,(matcherOut=[]),temp,xml);}
i=matcherOut.length;while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf.call(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem);}}}}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else{push.apply(results,matcherOut);}}});}
function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,matchContext=addCombinator(function(elem){return elem===checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf.call(checkContext,elem)>-1;},implicitRelative,true),matchers=[function(elem,context,xml){return(!leadingRelative&&(xml||context!==outermostContext))||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml));}];for(;i<len;i++){if((matcher=Expr.relative[tokens[i].type])){matchers=[addCombinator(elementMatcher(matchers),matcher)];}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);if(matcher[expando]){j=++i;for(;j<len;j++){if(Expr.relative[tokens[j].type]){break;}}
return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector(tokens.slice(0,i-1).concat({value:tokens[i-2].type===" "?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens((tokens=tokens.slice(j))),j<len&&toSelector(tokens));}
matchers.push(matcher);}}
return elementMatcher(matchers);}
function matcherFromGroupMatchers(elementMatchers,setMatchers){var bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function(seed,context,xml,results,outermost){var elem,j,matcher,matchedCount=0,i="0",unmatched=seed&&[],setMatched=[],contextBackup=outermostContext,elems=seed||byElement&&Expr.find["TAG"]("*",outermost),dirrunsUnique=(dirruns+=contextBackup==null?1:Math.random()||0.1),len=elems.length;if(outermost){outermostContext=context!==document&&context;}
for(;i!==len&&(elem=elems[i])!=null;i++){if(byElement&&elem){j=0;while((matcher=elementMatchers[j++])){if(matcher(elem,context,xml)){results.push(elem);break;}}
if(outermost){dirruns=dirrunsUnique;}}
if(bySet){if((elem=!matcher&&elem)){matchedCount--;}
if(seed){unmatched.push(elem);}}}
matchedCount+=i;if(bySet&&i!==matchedCount){j=0;while((matcher=setMatchers[j++])){matcher(unmatched,setMatched,context,xml);}
if(seed){if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results);}}}
setMatched=condense(setMatched);}
push.apply(results,setMatched);if(outermost&&!seed&&setMatched.length>0&&(matchedCount+setMatchers.length)>1){Sizzle.uniqueSort(results);}}
if(outermost){dirruns=dirrunsUnique;outermostContext=contextBackup;}
return unmatched;};return bySet?markFunction(superMatcher):superMatcher;}
compile=Sizzle.compile=function(selector,match){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];if(!cached){if(!match){match=tokenize(selector);}
i=match.length;while(i--){cached=matcherFromTokens(match[i]);if(cached[expando]){setMatchers.push(cached);}else{elementMatchers.push(cached);}}
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers));cached.selector=selector;}
return cached;};select=Sizzle.select=function(selector,context,results,seed){var i,tokens,token,type,find,compiled=typeof selector==="function"&&selector,match=!seed&&tokenize((selector=compiled.selector||selector));results=results||[];if(match.length===1){tokens=match[0]=match[0].slice(0);if(tokens.length>2&&(token=tokens[0]).type==="ID"&&support.getById&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find["ID"](token.matches[0].replace(runescape,funescape),context)||[])[0];if(!context){return results;}else if(compiled){context=context.parentNode;}
selector=selector.slice(tokens.shift().value.length);}
i=matchExpr["needsContext"].test(selector)?0:tokens.length;while(i--){token=tokens[i];if(Expr.relative[(type=token.type)]){break;}
if((find=Expr.find[type])){if((seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&testContext(context.parentNode)||context))){tokens.splice(i,1);selector=seed.length&&toSelector(tokens);if(!selector){push.apply(results,seed);return results;}
break;}}}}
(compiled||compile(selector,match))(seed,context,!documentIsHTML,results,rsibling.test(selector)&&testContext(context.parentNode)||context);return results;};support.sortStable=expando.split("").sort(sortOrder).join("")===expando;support.detectDuplicates=!!hasDuplicate;setDocument();support.sortDetached=assert(function(div1){return div1.compareDocumentPosition(document.createElement("div"))&1;});if(!assert(function(div){div.innerHTML="<a href='#'></a>";return div.firstChild.getAttribute("href")==="#";})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase()==="type"?1:2);}});}
if(!support.attributes||!assert(function(div){div.innerHTML="<input/>";div.firstChild.setAttribute("value","");return div.firstChild.getAttribute("value")==="";})){addHandle("value",function(elem,name,isXML){if(!isXML&&elem.nodeName.toLowerCase()==="input"){return elem.defaultValue;}});}
if(!assert(function(div){return div.getAttribute("disabled")==null;})){addHandle(booleans,function(elem,name,isXML){var val;if(!isXML){return elem[name]===true?name.toLowerCase():(val=elem.getAttributeNode(name))&&val.specified?val.value:null;}});}
if(typeof define==="function"&&define.amd){define(function(){return Sizzle;});}else if(typeof module!=="undefined"&&module.exports){module.exports=Sizzle;}else{window.Sizzle=Sizzle;}})(window);;(function(){if(typeof Sizzle!=='undefined'){return;}
if(typeof define!=='undefined'&&define.amd){window.Sizzle=Prototype._actual_sizzle;window.define=Prototype._original_define;delete Prototype._actual_sizzle;delete Prototype._original_define;}else if(typeof module!=='undefined'&&module.exports){window.Sizzle=module.exports;module.exports={};}})();;(function(engine){var extendElements=Prototype.Selector.extendElements;function select(selector,scope){return extendElements(engine(selector,scope||document));}
function match(element,selector){return engine.matches(selector,[element]).length==1;}
Prototype.Selector.engine=engine;Prototype.Selector.select=select;Prototype.Selector.match=match;})(Sizzle);window.Sizzle=Prototype._original_property;delete Prototype._original_property;var Form={reset:function(form){form=$(form);form.reset();return form;},serializeElements:function(elements,options){if(typeof options!='object')options={hash:!!options};else if(Object.isUndefined(options.hash))options.hash=true;var key,value,submitted=false,submit=options.submit,accumulator,initial;if(options.hash){initial={};accumulator=function(result,key,value){if(key in result){if(!Object.isArray(result[key]))result[key]=[result[key]];result[key]=result[key].concat(value);}else result[key]=value;return result;};}else{initial='';accumulator=function(result,key,values){if(!Object.isArray(values)){values=[values];}
if(!values.length){return result;}
var encodedKey=encodeURIComponent(key).gsub(/%20/,'+');return result+(result?"&":"")+values.map(function(value){value=value.gsub(/(\r)?\n/,'\r\n');value=encodeURIComponent(value);value=value.gsub(/%20/,'+');return encodedKey+"="+value;}).join("&");};}
return elements.inject(initial,function(result,element){if(!element.disabled&&element.name){key=element.name;value=$(element).getValue();if(value!=null&&element.type!='file'&&(element.type!='submit'||(!submitted&&submit!==false&&(!submit||key==submit)&&(submitted=true)))){result=accumulator(result,key,value);}}
return result;});}};Form.Methods={serialize:function(form,options){return Form.serializeElements(Form.getElements(form),options);},getElements:function(form){var elements=$(form).getElementsByTagName('*');var element,results=[],serializers=Form.Element.Serializers;for(var i=0;element=elements[i];i++){if(serializers[element.tagName.toLowerCase()])
results.push(Element.extend(element));}
return results;},getInputs:function(form,typeName,name){form=$(form);var inputs=form.getElementsByTagName('input');if(!typeName&&!name)return $A(inputs).map(Element.extend);for(var i=0,matchingInputs=[],length=inputs.length;i<length;i++){var input=inputs[i];if((typeName&&input.type!=typeName)||(name&&input.name!=name))
continue;matchingInputs.push(Element.extend(input));}
return matchingInputs;},disable:function(form){form=$(form);Form.getElements(form).invoke('disable');return form;},enable:function(form){form=$(form);Form.getElements(form).invoke('enable');return form;},findFirstElement:function(form){var elements=$(form).getElements().findAll(function(element){return'hidden'!=element.type&&!element.disabled;});var firstByIndex=elements.findAll(function(element){return element.hasAttribute('tabIndex')&&element.tabIndex>=0;}).sortBy(function(element){return element.tabIndex}).first();return firstByIndex?firstByIndex:elements.find(function(element){return/^(?:input|select|textarea)$/i.test(element.tagName);});},focusFirstElement:function(form){form=$(form);var element=form.findFirstElement();if(element)element.activate();return form;},request:function(form,options){form=$(form),options=Object.clone(options||{});var params=options.parameters,action=form.readAttribute('action')||'';if(action.blank())action=window.location.href;options.parameters=form.serialize(true);if(params){if(Object.isString(params))params=params.toQueryParams();Object.extend(options.parameters,params);}
if(form.hasAttribute('method')&&!options.method)
options.method=form.method;return new Ajax.Request(action,options);}};Form.Element={focus:function(element){$(element).focus();return element;},select:function(element){$(element).select();return element;}};Form.Element.Methods={serialize:function(element){element=$(element);if(!element.disabled&&element.name){var value=element.getValue();if(value!=undefined){var pair={};pair[element.name]=value;return Object.toQueryString(pair);}}
return'';},getValue:function(element){element=$(element);var method=element.tagName.toLowerCase();return Form.Element.Serializers[method](element);},setValue:function(element,value){element=$(element);var method=element.tagName.toLowerCase();Form.Element.Serializers[method](element,value);return element;},clear:function(element){$(element).value='';return element;},present:function(element){return $(element).value!='';},activate:function(element){element=$(element);try{element.focus();if(element.select&&(element.tagName.toLowerCase()!='input'||!(/^(?:button|reset|submit)$/i.test(element.type))))
element.select();}catch(e){}
return element;},disable:function(element){element=$(element);element.disabled=true;return element;},enable:function(element){element=$(element);element.disabled=false;return element;}};var Field=Form.Element;var $F=Form.Element.Methods.getValue;Form.Element.Serializers=(function(){function input(element,value){switch(element.type.toLowerCase()){case'checkbox':case'radio':return inputSelector(element,value);default:return valueSelector(element,value);}}
function inputSelector(element,value){if(Object.isUndefined(value))
return element.checked?element.value:null;else element.checked=!!value;}
function valueSelector(element,value){if(Object.isUndefined(value))return element.value;else element.value=value;}
function select(element,value){if(Object.isUndefined(value))
return(element.type==='select-one'?selectOne:selectMany)(element);var opt,currentValue,single=!Object.isArray(value);for(var i=0,length=element.length;i<length;i++){opt=element.options[i];currentValue=this.optionValue(opt);if(single){if(currentValue==value){opt.selected=true;return;}}
else opt.selected=value.include(currentValue);}}
function selectOne(element){var index=element.selectedIndex;return index>=0?optionValue(element.options[index]):null;}
function selectMany(element){var values,length=element.length;if(!length)return null;for(var i=0,values=[];i<length;i++){var opt=element.options[i];if(opt.selected)values.push(optionValue(opt));}
return values;}
function optionValue(opt){return Element.hasAttribute(opt,'value')?opt.value:opt.text;}
return{input:input,inputSelector:inputSelector,textarea:valueSelector,select:select,selectOne:selectOne,selectMany:selectMany,optionValue:optionValue,button:valueSelector};})();Abstract.TimedObserver=Class.create(PeriodicalExecuter,{initialize:function($super,element,frequency,callback){$super(callback,frequency);this.element=$(element);this.lastValue=this.getValue();},execute:function(){var value=this.getValue();if(Object.isString(this.lastValue)&&Object.isString(value)?this.lastValue!=value:String(this.lastValue)!=String(value)){this.callback(this.element,value);this.lastValue=value;}}});Form.Element.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.Element.getValue(this.element);}});Form.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.serialize(this.element);}});Abstract.EventObserver=Class.create({initialize:function(element,callback){this.element=$(element);this.callback=callback;this.lastValue=this.getValue();if(this.element.tagName.toLowerCase()=='form')
this.registerFormCallbacks();else
this.registerCallback(this.element);},onElementEvent:function(){var value=this.getValue();if(this.lastValue!=value){this.callback(this.element,value);this.lastValue=value;}},registerFormCallbacks:function(){Form.getElements(this.element).each(this.registerCallback,this);},registerCallback:function(element){if(element.type){switch(element.type.toLowerCase()){case'checkbox':case'radio':Event.observe(element,'click',this.onElementEvent.bind(this));break;default:Event.observe(element,'change',this.onElementEvent.bind(this));break;}}}});Form.Element.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.Element.getValue(this.element);}});Form.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.serialize(this.element);}});(function(GLOBAL){var DIV=document.createElement('div');var docEl=document.documentElement;var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED='onmouseenter'in docEl&&'onmouseleave'in docEl;var Event={KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45};var isIELegacyEvent=function(event){return false;};if(window.attachEvent){if(window.addEventListener){isIELegacyEvent=function(event){return!(event instanceof window.Event);};}else{isIELegacyEvent=function(event){return true;};}}
var _isButton;function _isButtonForDOMEvents(event,code){return event.which?(event.which===code+1):(event.button===code);}
var legacyButtonMap={0:1,1:4,2:2};function _isButtonForLegacyEvents(event,code){return event.button===legacyButtonMap[code];}
function _isButtonForWebKit(event,code){switch(code){case 0:return event.which==1&&!event.metaKey;case 1:return event.which==2||(event.which==1&&event.metaKey);case 2:return event.which==3;default:return false;}}
if(window.attachEvent){if(!window.addEventListener){_isButton=_isButtonForLegacyEvents;}else{_isButton=function(event,code){return isIELegacyEvent(event)?_isButtonForLegacyEvents(event,code):_isButtonForDOMEvents(event,code);}}}else if(Prototype.Browser.WebKit){_isButton=_isButtonForWebKit;}else{_isButton=_isButtonForDOMEvents;}
function isLeftClick(event){return _isButton(event,0)}
function isMiddleClick(event){return _isButton(event,1)}
function isRightClick(event){return _isButton(event,2)}
function element(event){return Element.extend(_element(event));}
function _element(event){event=Event.extend(event);var node=event.target,type=event.type,currentTarget=event.currentTarget;if(currentTarget&&currentTarget.tagName){if(type==='load'||type==='error'||(type==='click'&&currentTarget.tagName.toLowerCase()==='input'&&currentTarget.type==='radio'))
node=currentTarget;}
return node.nodeType==Node.TEXT_NODE?node.parentNode:node;}
function findElement(event,expression){var element=_element(event),selector=Prototype.Selector;if(!expression)return Element.extend(element);while(element){if(Object.isElement(element)&&selector.match(element,expression))
return Element.extend(element);element=element.parentNode;}}
function pointer(event){return{x:pointerX(event),y:pointerY(event)};}
function pointerX(event){var docElement=document.documentElement,body=document.body||{scrollLeft:0};return event.pageX||(event.clientX+
(docElement.scrollLeft||body.scrollLeft)-
(docElement.clientLeft||0));}
function pointerY(event){var docElement=document.documentElement,body=document.body||{scrollTop:0};return event.pageY||(event.clientY+
(docElement.scrollTop||body.scrollTop)-
(docElement.clientTop||0));}
function stop(event){Event.extend(event);event.preventDefault();event.stopPropagation();event.stopped=true;}
Event.Methods={isLeftClick:isLeftClick,isMiddleClick:isMiddleClick,isRightClick:isRightClick,element:element,findElement:findElement,pointer:pointer,pointerX:pointerX,pointerY:pointerY,stop:stop};var methods=Object.keys(Event.Methods).inject({},function(m,name){m[name]=Event.Methods[name].methodize();return m;});if(window.attachEvent){function _relatedTarget(event){var element;switch(event.type){case'mouseover':case'mouseenter':element=event.fromElement;break;case'mouseout':case'mouseleave':element=event.toElement;break;default:return null;}
return Element.extend(element);}
var additionalMethods={stopPropagation:function(){this.cancelBubble=true},preventDefault:function(){this.returnValue=false},inspect:function(){return'[object Event]'}};Event.extend=function(event,element){if(!event)return false;if(!isIELegacyEvent(event))return event;if(event._extendedByPrototype)return event;event._extendedByPrototype=Prototype.emptyFunction;var pointer=Event.pointer(event);Object.extend(event,{target:event.srcElement||element,relatedTarget:_relatedTarget(event),pageX:pointer.x,pageY:pointer.y});Object.extend(event,methods);Object.extend(event,additionalMethods);return event;};}else{Event.extend=Prototype.K;}
if(window.addEventListener){Event.prototype=window.Event.prototype||document.createEvent('HTMLEvents').__proto__;Object.extend(Event.prototype,methods);}
var EVENT_TRANSLATIONS={mouseenter:'mouseover',mouseleave:'mouseout'};function getDOMEventName(eventName){return EVENT_TRANSLATIONS[eventName]||eventName;}
if(MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED)
getDOMEventName=Prototype.K;function getUniqueElementID(element){if(element===window)return 0;if(typeof element._prototypeUID==='undefined')
element._prototypeUID=Element.Storage.UID++;return element._prototypeUID;}
function getUniqueElementID_IE(element){if(element===window)return 0;if(element==document)return 1;return element.uniqueID;}
if('uniqueID'in DIV)
getUniqueElementID=getUniqueElementID_IE;function isCustomEvent(eventName){return eventName.include(':');}
Event._isCustomEvent=isCustomEvent;function getOrCreateRegistryFor(element,uid){var CACHE=GLOBAL.Event.cache;if(Object.isUndefined(uid))
uid=getUniqueElementID(element);if(!CACHE[uid])CACHE[uid]={element:element};return CACHE[uid];}
function destroyRegistryForElement(element,uid){if(Object.isUndefined(uid))
uid=getUniqueElementID(element);delete GLOBAL.Event.cache[uid];}
function register(element,eventName,handler){var registry=getOrCreateRegistryFor(element);if(!registry[eventName])registry[eventName]=[];var entries=registry[eventName];var i=entries.length;while(i--)
if(entries[i].handler===handler)return null;var uid=getUniqueElementID(element);var responder=GLOBAL.Event._createResponder(uid,eventName,handler);var entry={responder:responder,handler:handler};entries.push(entry);return entry;}
function unregister(element,eventName,handler){var registry=getOrCreateRegistryFor(element);var entries=registry[eventName]||[];var i=entries.length,entry;while(i--){if(entries[i].handler===handler){entry=entries[i];break;}}
if(entry){var index=entries.indexOf(entry);entries.splice(index,1);}
if(entries.length===0){delete registry[eventName];if(Object.keys(registry).length===1&&('element'in registry))
destroyRegistryForElement(element);}
return entry;}
function observe(element,eventName,handler){element=$(element);var entry=register(element,eventName,handler);if(entry===null)return element;var responder=entry.responder;if(isCustomEvent(eventName))
observeCustomEvent(element,eventName,responder);else
observeStandardEvent(element,eventName,responder);return element;}
function observeStandardEvent(element,eventName,responder){var actualEventName=getDOMEventName(eventName);if(element.addEventListener){element.addEventListener(actualEventName,responder,false);}else{element.attachEvent('on'+actualEventName,responder);}}
function observeCustomEvent(element,eventName,responder){if(element.addEventListener){element.addEventListener('dataavailable',responder,false);}else{element.attachEvent('ondataavailable',responder);element.attachEvent('onlosecapture',responder);}}
function stopObserving(element,eventName,handler){element=$(element);var handlerGiven=!Object.isUndefined(handler),eventNameGiven=!Object.isUndefined(eventName);if(!eventNameGiven&&!handlerGiven){stopObservingElement(element);return element;}
if(!handlerGiven){stopObservingEventName(element,eventName);return element;}
var entry=unregister(element,eventName,handler);if(!entry)return element;removeEvent(element,eventName,entry.responder);return element;}
function stopObservingStandardEvent(element,eventName,responder){var actualEventName=getDOMEventName(eventName);if(element.removeEventListener){element.removeEventListener(actualEventName,responder,false);}else{element.detachEvent('on'+actualEventName,responder);}}
function stopObservingCustomEvent(element,eventName,responder){if(element.removeEventListener){element.removeEventListener('dataavailable',responder,false);}else{element.detachEvent('ondataavailable',responder);element.detachEvent('onlosecapture',responder);}}
function stopObservingElement(element){var uid=getUniqueElementID(element),registry=GLOBAL.Event.cache[uid];if(!registry)return;destroyRegistryForElement(element,uid);var entries,i;for(var eventName in registry){if(eventName==='element')continue;entries=registry[eventName];i=entries.length;while(i--)
removeEvent(element,eventName,entries[i].responder);}}
function stopObservingEventName(element,eventName){var registry=getOrCreateRegistryFor(element);var entries=registry[eventName];if(entries){delete registry[eventName];}
entries=entries||[];var i=entries.length;while(i--)
removeEvent(element,eventName,entries[i].responder);for(var name in registry){if(name==='element')continue;return;}
destroyRegistryForElement(element);}
function removeEvent(element,eventName,handler){if(isCustomEvent(eventName))
stopObservingCustomEvent(element,eventName,handler);else
stopObservingStandardEvent(element,eventName,handler);}
function getFireTarget(element){if(element!==document)return element;if(document.createEvent&&!element.dispatchEvent)
return document.documentElement;return element;}
function fire(element,eventName,memo,bubble){element=getFireTarget($(element));if(Object.isUndefined(bubble))bubble=true;memo=memo||{};var event=fireEvent(element,eventName,memo,bubble);return Event.extend(event);}
function fireEvent_DOM(element,eventName,memo,bubble){var event=document.createEvent('HTMLEvents');event.initEvent('dataavailable',bubble,true);event.eventName=eventName;event.memo=memo;element.dispatchEvent(event);return event;}
function fireEvent_IE(element,eventName,memo,bubble){var event=document.createEventObject();event.eventType=bubble?'ondataavailable':'onlosecapture';event.eventName=eventName;event.memo=memo;element.fireEvent(event.eventType,event);return event;}
var fireEvent=document.createEvent?fireEvent_DOM:fireEvent_IE;Event.Handler=Class.create({initialize:function(element,eventName,selector,callback){this.element=$(element);this.eventName=eventName;this.selector=selector;this.callback=callback;this.handler=this.handleEvent.bind(this);},start:function(){Event.observe(this.element,this.eventName,this.handler);return this;},stop:function(){Event.stopObserving(this.element,this.eventName,this.handler);return this;},handleEvent:function(event){var element=Event.findElement(event,this.selector);if(element)this.callback.call(this.element,event,element);}});function on(element,eventName,selector,callback){element=$(element);if(Object.isFunction(selector)&&Object.isUndefined(callback)){callback=selector,selector=null;}
return new Event.Handler(element,eventName,selector,callback).start();}
Object.extend(Event,Event.Methods);Object.extend(Event,{fire:fire,observe:observe,stopObserving:stopObserving,on:on});Element.addMethods({fire:fire,observe:observe,stopObserving:stopObserving,on:on});Object.extend(document,{fire:fire.methodize(),observe:observe.methodize(),stopObserving:stopObserving.methodize(),on:on.methodize(),loaded:false});if(GLOBAL.Event)Object.extend(window.Event,Event);else GLOBAL.Event=Event;GLOBAL.Event.cache={};function destroyCache_IE(){GLOBAL.Event.cache=null;}
if(window.attachEvent)
window.attachEvent('onunload',destroyCache_IE);DIV=null;docEl=null;})(this);(function(GLOBAL){var docEl=document.documentElement;var MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED='onmouseenter'in docEl&&'onmouseleave'in docEl;function isSimulatedMouseEnterLeaveEvent(eventName){return!MOUSEENTER_MOUSELEAVE_EVENTS_SUPPORTED&&(eventName==='mouseenter'||eventName==='mouseleave');}
function createResponder(uid,eventName,handler){if(Event._isCustomEvent(eventName))
return createResponderForCustomEvent(uid,eventName,handler);if(isSimulatedMouseEnterLeaveEvent(eventName))
return createMouseEnterLeaveResponder(uid,eventName,handler);return function(event){if(!Event.cache)return;var element=Event.cache[uid].element;Event.extend(event,element);handler.call(element,event);};}
function createResponderForCustomEvent(uid,eventName,handler){return function(event){var cache=Event.cache[uid];var element=cache&&cache.element;if(Object.isUndefined(event.eventName))
return false;if(event.eventName!==eventName)
return false;Event.extend(event,element);handler.call(element,event);};}
function createMouseEnterLeaveResponder(uid,eventName,handler){return function(event){var element=Event.cache[uid].element;Event.extend(event,element);var parent=event.relatedTarget;while(parent&&parent!==element){try{parent=parent.parentNode;}
catch(e){parent=element;}}
if(parent===element)return;handler.call(element,event);}}
GLOBAL.Event._createResponder=createResponder;docEl=null;})(this);(function(GLOBAL){var TIMER;function fireContentLoadedEvent(){if(document.loaded)return;if(TIMER)window.clearTimeout(TIMER);document.loaded=true;document.fire('dom:loaded');}
function checkReadyState(){if(document.readyState==='complete'){document.detachEvent('onreadystatechange',checkReadyState);fireContentLoadedEvent();}}
function pollDoScroll(){try{document.documentElement.doScroll('left');}catch(e){TIMER=pollDoScroll.defer();return;}
fireContentLoadedEvent();}
if(document.readyState==='complete'){fireContentLoadedEvent();return;}
if(document.addEventListener){document.addEventListener('DOMContentLoaded',fireContentLoadedEvent,false);}else{document.attachEvent('onreadystatechange',checkReadyState);if(window==top)TIMER=pollDoScroll.defer();}
Event.observe(window,'load',fireContentLoadedEvent);})(this);Element.addMethods();Hash.toQueryString=Object.toQueryString;var Toggle={display:Element.toggle};Element.addMethods({childOf:Element.Methods.descendantOf});var Insertion={Before:function(element,content){return Element.insert(element,{before:content});},Top:function(element,content){return Element.insert(element,{top:content});},Bottom:function(element,content){return Element.insert(element,{bottom:content});},After:function(element,content){return Element.insert(element,{after:content});}};var $continue=new Error('"throw $continue" is deprecated, use "return" instead');var Position={includeScrollOffsets:false,prepare:function(){this.deltaX=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;this.deltaY=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;},within:function(element,x,y){if(this.includeScrollOffsets)
return this.withinIncludingScrolloffsets(element,x,y);this.xcomp=x;this.ycomp=y;this.offset=Element.cumulativeOffset(element);return(y>=this.offset[1]&&y<this.offset[1]+element.offsetHeight&&x>=this.offset[0]&&x<this.offset[0]+element.offsetWidth);},withinIncludingScrolloffsets:function(element,x,y){var offsetcache=Element.cumulativeScrollOffset(element);this.xcomp=x+offsetcache[0]-this.deltaX;this.ycomp=y+offsetcache[1]-this.deltaY;this.offset=Element.cumulativeOffset(element);return(this.ycomp>=this.offset[1]&&this.ycomp<this.offset[1]+element.offsetHeight&&this.xcomp>=this.offset[0]&&this.xcomp<this.offset[0]+element.offsetWidth);},overlap:function(mode,element){if(!mode)return 0;if(mode=='vertical')
return((this.offset[1]+element.offsetHeight)-this.ycomp)/element.offsetHeight;if(mode=='horizontal')
return((this.offset[0]+element.offsetWidth)-this.xcomp)/element.offsetWidth;},cumulativeOffset:Element.Methods.cumulativeOffset,positionedOffset:Element.Methods.positionedOffset,absolutize:function(element){Position.prepare();return Element.absolutize(element);},relativize:function(element){Position.prepare();return Element.relativize(element);},realOffset:Element.Methods.cumulativeScrollOffset,offsetParent:Element.Methods.getOffsetParent,page:Element.Methods.viewportOffset,clone:function(source,target,options){options=options||{};return Element.clonePosition(target,source,options);}};if(!document.getElementsByClassName)document.getElementsByClassName=function(instanceMethods){function iter(name){return name.blank()?null:"[contains(concat(' ', @class, ' '), ' "+name+" ')]";}
instanceMethods.getElementsByClassName=Prototype.BrowserFeatures.XPath?function(element,className){className=className.toString().strip();var cond=/\s/.test(className)?$w(className).map(iter).join(''):iter(className);return cond?document._getElementsByXPath('.//*'+cond,element):[];}:function(element,className){className=className.toString().strip();var elements=[],classNames=(/\s/.test(className)?$w(className):null);if(!classNames&&!className)return elements;var nodes=$(element).getElementsByTagName('*');className=' '+className+' ';for(var i=0,child,cn;child=nodes[i];i++){if(child.className&&(cn=' '+child.className+' ')&&(cn.include(className)||(classNames&&classNames.all(function(name){return!name.toString().blank()&&cn.include(' '+name+' ');}))))
elements.push(Element.extend(child));}
return elements;};return function(className,parentElement){return $(parentElement||document.body).getElementsByClassName(className);};}(Element.Methods);Element.ClassNames=Class.create();Element.ClassNames.prototype={initialize:function(element){this.element=$(element);},_each:function(iterator,context){this.element.className.split(/\s+/).select(function(name){return name.length>0;})._each(iterator,context);},set:function(className){this.element.className=className;},add:function(classNameToAdd){if(this.include(classNameToAdd))return;this.set($A(this).concat(classNameToAdd).join(' '));},remove:function(classNameToRemove){if(!this.include(classNameToRemove))return;this.set($A(this).without(classNameToRemove).join(' '));},toString:function(){return $A(this).join(' ');}};Object.extend(Element.ClassNames.prototype,Enumerable);(function(){window.Selector=Class.create({initialize:function(expression){this.expression=expression.strip();},findElements:function(rootElement){return Prototype.Selector.select(this.expression,rootElement);},match:function(element){return Prototype.Selector.match(element,this.expression);},toString:function(){return this.expression;},inspect:function(){return"#<Selector: "+this.expression+">";}});Object.extend(Selector,{matchElements:function(elements,expression){var match=Prototype.Selector.match,results=[];for(var i=0,length=elements.length;i<length;i++){var element=elements[i];if(match(element,expression)){results.push(Element.extend(element));}}
return results;},findElement:function(elements,expression,index){index=index||0;var matchIndex=0,element;for(var i=0,length=elements.length;i<length;i++){element=elements[i];if(Prototype.Selector.match(element,expression)&&index===matchIndex++){return Element.extend(element);}}},findChildElements:function(element,expressions){var selector=expressions.toArray().join(', ');return Prototype.Selector.select(selector,element||document);}});})();!function t(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.Raphael=r():e.Raphael=r()}(this,function(){return function(t){function e(i){if(r[i])return r[i].exports;var n=r[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){var i,n;i=[r(1),r(3),r(4)],n=function(t){return t}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;i=[r(2)],n=function(t){function e(r){if(e.is(r,"function"))return w?r():t.on("raphael.DOMload",r);if(e.is(r,Q))return e._engine.create[z](e,r.splice(0,3+e.is(r[0],$))).add(r);var i=Array.prototype.slice.call(arguments,0);if(e.is(i[i.length-1],"function")){var n=i.pop();return w?n.call(e._engine.create[z](e,i)):t.on("raphael.DOMload",function(){n.call(e._engine.create[z](e,i))})}return e._engine.create[z](e,arguments)}function r(t){if("function"==typeof t||Object(t)!==t)return t;var e=new t.constructor;for(var i in t)t[A](i)&&(e[i]=r(t[i]));return e}function i(t,e){for(var r=0,i=t.length;r<i;r++)if(t[r]===e)return t.push(t.splice(r,1)[0])}function n(t,e,r){function n(){var a=Array.prototype.slice.call(arguments,0),s=a.join("␀"),o=n.cache=n.cache||{},l=n.count=n.count||[];return o[A](s)?(i(l,s),r?r(o[s]):o[s]):(l.length>=1e3&&delete o[l.shift()],l.push(s),o[s]=t[z](e,a),r?r(o[s]):o[s])}return n}function a(){return this.hex}function s(t,e){for(var r=[],i=0,n=t.length;n-2*!e>i;i+=2){var a=[{x:+t[i-2],y:+t[i-1]},{x:+t[i],y:+t[i+1]},{x:+t[i+2],y:+t[i+3]},{x:+t[i+4],y:+t[i+5]}];e?i?n-4==i?a[3]={x:+t[0],y:+t[1]}:n-2==i&&(a[2]={x:+t[0],y:+t[1]},a[3]={x:+t[2],y:+t[3]}):a[0]={x:+t[n-2],y:+t[n-1]}:n-4==i?a[3]=a[2]:i||(a[0]={x:+t[i],y:+t[i+1]}),r.push(["C",(-a[0].x+6*a[1].x+a[2].x)/6,(-a[0].y+6*a[1].y+a[2].y)/6,(a[1].x+6*a[2].x-a[3].x)/6,(a[1].y+6*a[2].y-a[3].y)/6,a[2].x,a[2].y])}return r}function o(t,e,r,i,n){var a=-3*e+9*r-9*i+3*n,s=t*a+6*e-12*r+6*i;return t*s-3*e+3*r}function l(t,e,r,i,n,a,s,l,h){null==h&&(h=1),h=h>1?1:h<0?0:h;for(var u=h/2,c=12,f=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],p=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],d=0,g=0;g<c;g++){var v=u*f[g]+u,x=o(v,t,r,n,s),y=o(v,e,i,a,l),m=x*x+y*y;d+=p[g]*Y.sqrt(m)}return u*d}function h(t,e,r,i,n,a,s,o,h){if(!(h<0||l(t,e,r,i,n,a,s,o)<h)){var u=1,c=u/2,f=u-c,p,d=.01;for(p=l(t,e,r,i,n,a,s,o,f);H(p-h)>d;)c/=2,f+=(p<h?1:-1)*c,p=l(t,e,r,i,n,a,s,o,f);return f}}function u(t,e,r,i,n,a,s,o){if(!(W(t,r)<G(n,s)||G(t,r)>W(n,s)||W(e,i)<G(a,o)||G(e,i)>W(a,o))){var l=(t*i-e*r)*(n-s)-(t-r)*(n*o-a*s),h=(t*i-e*r)*(a-o)-(e-i)*(n*o-a*s),u=(t-r)*(a-o)-(e-i)*(n-s);if(u){var c=l/u,f=h/u,p=+c.toFixed(2),d=+f.toFixed(2);if(!(p<+G(t,r).toFixed(2)||p>+W(t,r).toFixed(2)||p<+G(n,s).toFixed(2)||p>+W(n,s).toFixed(2)||d<+G(e,i).toFixed(2)||d>+W(e,i).toFixed(2)||d<+G(a,o).toFixed(2)||d>+W(a,o).toFixed(2)))return{x:c,y:f}}}}function c(t,e){return p(t,e)}function f(t,e){return p(t,e,1)}function p(t,r,i){var n=e.bezierBBox(t),a=e.bezierBBox(r);if(!e.isBBoxIntersect(n,a))return i?0:[];for(var s=l.apply(0,t),o=l.apply(0,r),h=W(~~(s/5),1),c=W(~~(o/5),1),f=[],p=[],d={},g=i?0:[],v=0;v<h+1;v++){var x=e.findDotsAtSegment.apply(e,t.concat(v/h));f.push({x:x.x,y:x.y,t:v/h})}for(v=0;v<c+1;v++)x=e.findDotsAtSegment.apply(e,r.concat(v/c)),p.push({x:x.x,y:x.y,t:v/c});for(v=0;v<h;v++)for(var y=0;y<c;y++){var m=f[v],b=f[v+1],_=p[y],w=p[y+1],k=H(b.x-m.x)<.001?"y":"x",B=H(w.x-_.x)<.001?"y":"x",C=u(m.x,m.y,b.x,b.y,_.x,_.y,w.x,w.y);if(C){if(d[C.x.toFixed(4)]==C.y.toFixed(4))continue;d[C.x.toFixed(4)]=C.y.toFixed(4);var S=m.t+H((C[k]-m[k])/(b[k]-m[k]))*(b.t-m.t),A=_.t+H((C[B]-_[B])/(w[B]-_[B]))*(w.t-_.t);S>=0&&S<=1.001&&A>=0&&A<=1.001&&(i?g++:g.push({x:C.x,y:C.y,t1:G(S,1),t2:G(A,1)}))}}return g}function d(t,r,i){t=e._path2curve(t),r=e._path2curve(r);for(var n,a,s,o,l,h,u,c,f,d,g=i?0:[],v=0,x=t.length;v<x;v++){var y=t[v];if("M"==y[0])n=l=y[1],a=h=y[2];else{"C"==y[0]?(f=[n,a].concat(y.slice(1)),n=f[6],a=f[7]):(f=[n,a,n,a,l,h,l,h],n=l,a=h);for(var m=0,b=r.length;m<b;m++){var _=r[m];if("M"==_[0])s=u=_[1],o=c=_[2];else{"C"==_[0]?(d=[s,o].concat(_.slice(1)),s=d[6],o=d[7]):(d=[s,o,s,o,u,c,u,c],s=u,o=c);var w=p(f,d,i);if(i)g+=w;else{for(var k=0,B=w.length;k<B;k++)w[k].segment1=v,w[k].segment2=m,w[k].bez1=f,w[k].bez2=d;g=g.concat(w)}}}}}return g}function g(t,e,r,i,n,a){null!=t?(this.a=+t,this.b=+e,this.c=+r,this.d=+i,this.e=+n,this.f=+a):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function v(){return this.x+j+this.y}function x(){return this.x+j+this.y+j+this.width+" × "+this.height}function y(t,e,r,i,n,a){function s(t){return((c*t+u)*t+h)*t}function o(t,e){var r=l(t,e);return((d*r+p)*r+f)*r}function l(t,e){var r,i,n,a,o,l;for(n=t,l=0;l<8;l++){if(a=s(n)-t,H(a)<e)return n;if(o=(3*c*n+2*u)*n+h,H(o)<1e-6)break;n-=a/o}if(r=0,i=1,n=t,n<r)return r;if(n>i)return i;for(;r<i;){if(a=s(n),H(a-t)<e)return n;t>a?r=n:i=n,n=(i-r)/2+r}return n}var h=3*e,u=3*(i-e)-h,c=1-h-u,f=3*r,p=3*(n-r)-f,d=1-f-p;return o(t,1/(200*a))}function m(t,e){var r=[],i={};if(this.ms=e,this.times=1,t){for(var n in t)t[A](n)&&(i[ht(n)]=t[n],r.push(ht(n)));r.sort(Bt)}this.anim=i,this.top=r[r.length-1],this.percents=r}function b(r,i,n,a,s,o){n=ht(n);var l,h,u,c=[],f,p,d,v=r.ms,x={},m={},b={};if(a)for(w=0,B=Ee.length;w<B;w++){var _=Ee[w];if(_.el.id==i.id&&_.anim==r){_.percent!=n?(Ee.splice(w,1),u=1):h=_,i.attr(_.totalOrigin);break}}else a=+m;for(var w=0,B=r.percents.length;w<B;w++){if(r.percents[w]==n||r.percents[w]>a*r.top){n=r.percents[w],p=r.percents[w-1]||0,v=v/r.top*(n-p),f=r.percents[w+1],l=r.anim[n];break}a&&i.attr(r.anim[r.percents[w]])}if(l){if(h)h.initstatus=a,h.start=new Date-h.ms*a;else{for(var C in l)if(l[A](C)&&(pt[A](C)||i.paper.customAttributes[A](C)))switch(x[C]=i.attr(C),null==x[C]&&(x[C]=ft[C]),m[C]=l[C],pt[C]){case $:b[C]=(m[C]-x[C])/v;break;case"colour":x[C]=e.getRGB(x[C]);var S=e.getRGB(m[C]);b[C]={r:(S.r-x[C].r)/v,g:(S.g-x[C].g)/v,b:(S.b-x[C].b)/v};break;case"path":var T=Qt(x[C],m[C]),E=T[1];for(x[C]=T[0],b[C]=[],w=0,B=x[C].length;w<B;w++){b[C][w]=[0];for(var M=1,N=x[C][w].length;M<N;M++)b[C][w][M]=(E[w][M]-x[C][w][M])/v}break;case"transform":var L=i._,z=le(L[C],m[C]);if(z)for(x[C]=z.from,m[C]=z.to,b[C]=[],b[C].real=!0,w=0,B=x[C].length;w<B;w++)for(b[C][w]=[x[C][w][0]],M=1,N=x[C][w].length;M<N;M++)b[C][w][M]=(m[C][w][M]-x[C][w][M])/v;else{var F=i.matrix||new g,R={_:{transform:L.transform},getBBox:function(){return i.getBBox(1)}};x[C]=[F.a,F.b,F.c,F.d,F.e,F.f],se(R,m[C]),m[C]=R._.transform,b[C]=[(R.matrix.a-F.a)/v,(R.matrix.b-F.b)/v,(R.matrix.c-F.c)/v,(R.matrix.d-F.d)/v,(R.matrix.e-F.e)/v,(R.matrix.f-F.f)/v]}break;case"csv":var j=I(l[C])[q](k),D=I(x[C])[q](k);if("clip-rect"==C)for(x[C]=D,b[C]=[],w=D.length;w--;)b[C][w]=(j[w]-x[C][w])/v;m[C]=j;break;default:for(j=[][P](l[C]),D=[][P](x[C]),b[C]=[],w=i.paper.customAttributes[C].length;w--;)b[C][w]=((j[w]||0)-(D[w]||0))/v}var V=l.easing,O=e.easing_formulas[V];if(!O)if(O=I(V).match(st),O&&5==O.length){var Y=O;O=function(t){return y(t,+Y[1],+Y[2],+Y[3],+Y[4],v)}}else O=St;if(d=l.start||r.start||+new Date,_={anim:r,percent:n,timestamp:d,start:d+(r.del||0),status:0,initstatus:a||0,stop:!1,ms:v,easing:O,from:x,diff:b,to:m,el:i,callback:l.callback,prev:p,next:f,repeat:o||r.times,origin:i.attr(),totalOrigin:s},Ee.push(_),a&&!h&&!u&&(_.stop=!0,_.start=new Date-v*a,1==Ee.length))return Ne();u&&(_.start=new Date-_.ms*a),1==Ee.length&&Me(Ne)}t("raphael.anim.start."+i.id,i,r)}}function _(t){for(var e=0;e<Ee.length;e++)Ee[e].el.paper==t&&Ee.splice(e--,1)}e.version="2.2.0",e.eve=t;var w,k=/[, ]+/,B={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},C=/\{(\d+)\}/g,S="prototype",A="hasOwnProperty",T={doc:document,win:window},E={was:Object.prototype[A].call(T.win,"Raphael"),is:T.win.Raphael},M=function(){this.ca=this.customAttributes={}},N,L="appendChild",z="apply",P="concat",F="ontouchstart"in T.win||T.win.DocumentTouch&&T.doc instanceof DocumentTouch,R="",j=" ",I=String,q="split",D="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[q](j),V={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},O=I.prototype.toLowerCase,Y=Math,W=Y.max,G=Y.min,H=Y.abs,X=Y.pow,U=Y.PI,$="number",Z="string",Q="array",J="toString",K="fill",tt=Object.prototype.toString,et={},rt="push",it=e._ISURL=/^url\(['"]?(.+?)['"]?\)$/i,nt=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,at={NaN:1,Infinity:1,"-Infinity":1},st=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,ot=Y.round,lt="setAttribute",ht=parseFloat,ut=parseInt,ct=I.prototype.toUpperCase,ft=e._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0,"class":""},pt=e._availableAnimAttrs={blur:$,"clip-rect":"csv",cx:$,cy:$,fill:"colour","fill-opacity":$,"font-size":$,height:$,opacity:$,path:"path",r:$,rx:$,ry:$,stroke:"colour","stroke-opacity":$,"stroke-width":$,transform:"transform",width:$,x:$,y:$},dt=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,gt=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,vt={hs:1,rg:1},xt=/,?([achlmqrstvxz]),?/gi,yt=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,mt=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,bt=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,_t=e._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,wt={},kt=function(t,e){return t.key-e.key},Bt=function(t,e){return ht(t)-ht(e)},Ct=function(){},St=function(t){return t},At=e._rectPath=function(t,e,r,i,n){return n?[["M",t+n,e],["l",r-2*n,0],["a",n,n,0,0,1,n,n],["l",0,i-2*n],["a",n,n,0,0,1,-n,n],["l",2*n-r,0],["a",n,n,0,0,1,-n,-n],["l",0,2*n-i],["a",n,n,0,0,1,n,-n],["z"]]:[["M",t,e],["l",r,0],["l",0,i],["l",-r,0],["z"]]},Tt=function(t,e,r,i){return null==i&&(i=r),[["M",t,e],["m",0,-i],["a",r,i,0,1,1,0,2*i],["a",r,i,0,1,1,0,-2*i],["z"]]},Et=e._getPath={path:function(t){return t.attr("path")},circle:function(t){var e=t.attrs;return Tt(e.cx,e.cy,e.r)},ellipse:function(t){var e=t.attrs;return Tt(e.cx,e.cy,e.rx,e.ry)},rect:function(t){var e=t.attrs;return At(e.x,e.y,e.width,e.height,e.r)},image:function(t){var e=t.attrs;return At(e.x,e.y,e.width,e.height)},text:function(t){var e=t._getBBox();return At(e.x,e.y,e.width,e.height)},set:function(t){var e=t._getBBox();return At(e.x,e.y,e.width,e.height)}},Mt=e.mapPath=function(t,e){if(!e)return t;var r,i,n,a,s,o,l;for(t=Qt(t),n=0,s=t.length;n<s;n++)for(l=t[n],a=1,o=l.length;a<o;a+=2)r=e.x(l[a],l[a+1]),i=e.y(l[a],l[a+1]),l[a]=r,l[a+1]=i;return t};if(e._g=T,e.type=T.win.SVGAngle||T.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML","VML"==e.type){var Nt=T.doc.createElement("div"),Lt;if(Nt.innerHTML='<v:shape adj="1"/>',Lt=Nt.firstChild,Lt.style.behavior="url(#default#VML)",!Lt||"object"!=typeof Lt.adj)return e.type=R;Nt=null}e.svg=!(e.vml="VML"==e.type),e._Paper=M,e.fn=N=M.prototype=e.prototype,e._id=0,e.is=function(t,e){return e=O.call(e),"finite"==e?!at[A](+t):"array"==e?t instanceof Array:"null"==e&&null===t||e==typeof t&&null!==t||"object"==e&&t===Object(t)||"array"==e&&Array.isArray&&Array.isArray(t)||tt.call(t).slice(8,-1).toLowerCase()==e},e.angle=function(t,r,i,n,a,s){if(null==a){var o=t-i,l=r-n;return o||l?(180+180*Y.atan2(-l,-o)/U+360)%360:0}return e.angle(t,r,a,s)-e.angle(i,n,a,s)},e.rad=function(t){return t%360*U/180},e.deg=function(t){return Math.round(180*t/U%360*1e3)/1e3},e.snapTo=function(t,r,i){if(i=e.is(i,"finite")?i:10,e.is(t,Q)){for(var n=t.length;n--;)if(H(t[n]-r)<=i)return t[n]}else{t=+t;var a=r%t;if(a<i)return r-a;if(a>t-i)return r-a+t}return r};var zt=e.createUUID=function(t,e){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t,e).toUpperCase()}}(/[xy]/g,function(t){var e=16*Y.random()|0,r="x"==t?e:3&e|8;return r.toString(16)});e.setWindow=function(r){t("raphael.setWindow",e,T.win,r),T.win=r,T.doc=T.win.document,e._engine.initWin&&e._engine.initWin(T.win)};var Pt=function(t){if(e.vml){var r=/^\s+|\s+$/g,i;try{var a=new ActiveXObject("htmlfile");a.write("<body>"),a.close(),i=a.body}catch(s){i=createPopup().document.body}var o=i.createTextRange();Pt=n(function(t){try{i.style.color=I(t).replace(r,R);var e=o.queryCommandValue("ForeColor");return e=(255&e)<<16|65280&e|(16711680&e)>>>16,"#"+("000000"+e.toString(16)).slice(-6)}catch(n){return"none"}})}else{var l=T.doc.createElement("i");l.title="Raphaël Colour Picker",l.style.display="none",T.doc.body.appendChild(l),Pt=n(function(t){return l.style.color=t,T.doc.defaultView.getComputedStyle(l,R).getPropertyValue("color")})}return Pt(t)},Ft=function(){return"hsb("+[this.h,this.s,this.b]+")"},Rt=function(){return"hsl("+[this.h,this.s,this.l]+")"},jt=function(){return this.hex},It=function(t,r,i){if(null==r&&e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t&&(i=t.b,r=t.g,t=t.r),null==r&&e.is(t,Z)){var n=e.getRGB(t);t=n.r,r=n.g,i=n.b}return(t>1||r>1||i>1)&&(t/=255,r/=255,i/=255),[t,r,i]},qt=function(t,r,i,n){t*=255,r*=255,i*=255;var a={r:t,g:r,b:i,hex:e.rgb(t,r,i),toString:jt};return e.is(n,"finite")&&(a.opacity=n),a};e.color=function(t){var r;return e.is(t,"object")&&"h"in t&&"s"in t&&"b"in t?(r=e.hsb2rgb(t),t.r=r.r,t.g=r.g,t.b=r.b,t.hex=r.hex):e.is(t,"object")&&"h"in t&&"s"in t&&"l"in t?(r=e.hsl2rgb(t),t.r=r.r,t.g=r.g,t.b=r.b,t.hex=r.hex):(e.is(t,"string")&&(t=e.getRGB(t)),e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t?(r=e.rgb2hsl(t),t.h=r.h,t.s=r.s,t.l=r.l,r=e.rgb2hsb(t),t.v=r.b):(t={hex:"none"},t.r=t.g=t.b=t.h=t.s=t.v=t.l=-1)),t.toString=jt,t},e.hsb2rgb=function(t,e,r,i){this.is(t,"object")&&"h"in t&&"s"in t&&"b"in t&&(r=t.b,e=t.s,i=t.o,t=t.h),t*=360;var n,a,s,o,l;return t=t%360/60,l=r*e,o=l*(1-H(t%2-1)),n=a=s=r-l,t=~~t,n+=[l,o,0,0,o,l][t],a+=[o,l,l,o,0,0][t],s+=[0,0,o,l,l,o][t],qt(n,a,s,i)},e.hsl2rgb=function(t,e,r,i){this.is(t,"object")&&"h"in t&&"s"in t&&"l"in t&&(r=t.l,e=t.s,t=t.h),(t>1||e>1||r>1)&&(t/=360,e/=100,r/=100),t*=360;var n,a,s,o,l;return t=t%360/60,l=2*e*(r<.5?r:1-r),o=l*(1-H(t%2-1)),n=a=s=r-l/2,t=~~t,n+=[l,o,0,0,o,l][t],a+=[o,l,l,o,0,0][t],s+=[0,0,o,l,l,o][t],qt(n,a,s,i)},e.rgb2hsb=function(t,e,r){r=It(t,e,r),t=r[0],e=r[1],r=r[2];var i,n,a,s;return a=W(t,e,r),s=a-G(t,e,r),i=0==s?null:a==t?(e-r)/s:a==e?(r-t)/s+2:(t-e)/s+4,i=(i+360)%6*60/360,n=0==s?0:s/a,{h:i,s:n,b:a,toString:Ft}},e.rgb2hsl=function(t,e,r){r=It(t,e,r),t=r[0],e=r[1],r=r[2];var i,n,a,s,o,l;return s=W(t,e,r),o=G(t,e,r),l=s-o,i=0==l?null:s==t?(e-r)/l:s==e?(r-t)/l+2:(t-e)/l+4,i=(i+360)%6*60/360,a=(s+o)/2,n=0==l?0:a<.5?l/(2*a):l/(2-2*a),{h:i,s:n,l:a,toString:Rt}},e._path2string=function(){return this.join(",").replace(xt,"$1")};var Dt=e._preload=function(t,e){var r=T.doc.createElement("img");r.style.cssText="position:absolute;left:-9999em;top:-9999em",r.onload=function(){e.call(this),this.onload=null,T.doc.body.removeChild(this)},r.onerror=function(){T.doc.body.removeChild(this)},T.doc.body.appendChild(r),r.src=t};e.getRGB=n(function(t){if(!t||(t=I(t)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a};if("none"==t)return{r:-1,g:-1,b:-1,hex:"none",toString:a};!(vt[A](t.toLowerCase().substring(0,2))||"#"==t.charAt())&&(t=Pt(t));var r,i,n,s,o,l,h,u=t.match(nt);return u?(u[2]&&(s=ut(u[2].substring(5),16),n=ut(u[2].substring(3,5),16),i=ut(u[2].substring(1,3),16)),u[3]&&(s=ut((l=u[3].charAt(3))+l,16),n=ut((l=u[3].charAt(2))+l,16),i=ut((l=u[3].charAt(1))+l,16)),u[4]&&(h=u[4][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),"rgba"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100)),u[5]?(h=u[5][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),("deg"==h[0].slice(-3)||"°"==h[0].slice(-1))&&(i/=360),"hsba"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100),e.hsb2rgb(i,n,s,o)):u[6]?(h=u[6][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),("deg"==h[0].slice(-3)||"°"==h[0].slice(-1))&&(i/=360),"hsla"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100),e.hsl2rgb(i,n,s,o)):(u={r:i,g:n,b:s,toString:a},u.hex="#"+(16777216|s|n<<8|i<<16).toString(16).slice(1),e.is(o,"finite")&&(u.opacity=o),u)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a}},e),e.hsb=n(function(t,r,i){return e.hsb2rgb(t,r,i).hex}),e.hsl=n(function(t,r,i){return e.hsl2rgb(t,r,i).hex}),e.rgb=n(function(t,e,r){function i(t){return t+.5|0}return"#"+(16777216|i(r)|i(e)<<8|i(t)<<16).toString(16).slice(1)}),e.getColor=function(t){var e=this.getColor.start=this.getColor.start||{h:0,s:1,b:t||.75},r=this.hsb2rgb(e.h,e.s,e.b);return e.h+=.075,e.h>1&&(e.h=0,e.s-=.2,e.s<=0&&(this.getColor.start={h:0,s:1,b:e.b})),r.hex},e.getColor.reset=function(){delete this.start},e.parsePathString=function(t){if(!t)return null;var r=Vt(t);if(r.arr)return Yt(r.arr);var i={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},n=[];return e.is(t,Q)&&e.is(t[0],Q)&&(n=Yt(t)),n.length||I(t).replace(yt,function(t,e,r){var a=[],s=e.toLowerCase();if(r.replace(bt,function(t,e){e&&a.push(+e)}),"m"==s&&a.length>2&&(n.push([e][P](a.splice(0,2))),s="l",e="m"==e?"l":"L"),"r"==s)n.push([e][P](a));else for(;a.length>=i[s]&&(n.push([e][P](a.splice(0,i[s]))),i[s]););}),n.toString=e._path2string,r.arr=Yt(n),n},e.parseTransformString=n(function(t){if(!t)return null;var r={r:3,s:4,t:2,m:6},i=[];return e.is(t,Q)&&e.is(t[0],Q)&&(i=Yt(t)),i.length||I(t).replace(mt,function(t,e,r){var n=[],a=O.call(e);r.replace(bt,function(t,e){e&&n.push(+e)}),i.push([e][P](n))}),i.toString=e._path2string,i});var Vt=function(t){var e=Vt.ps=Vt.ps||{};return e[t]?e[t].sleep=100:e[t]={sleep:100},setTimeout(function(){for(var r in e)e[A](r)&&r!=t&&(e[r].sleep--,!e[r].sleep&&delete e[r])}),e[t]};e.findDotsAtSegment=function(t,e,r,i,n,a,s,o,l){var h=1-l,u=X(h,3),c=X(h,2),f=l*l,p=f*l,d=u*t+3*c*l*r+3*h*l*l*n+p*s,g=u*e+3*c*l*i+3*h*l*l*a+p*o,v=t+2*l*(r-t)+f*(n-2*r+t),x=e+2*l*(i-e)+f*(a-2*i+e),y=r+2*l*(n-r)+f*(s-2*n+r),m=i+2*l*(a-i)+f*(o-2*a+i),b=h*t+l*r,_=h*e+l*i,w=h*n+l*s,k=h*a+l*o,B=90-180*Y.atan2(v-y,x-m)/U;return(v>y||x<m)&&(B+=180),{x:d,y:g,m:{x:v,y:x},n:{x:y,y:m},start:{x:b,y:_},end:{x:w,y:k},alpha:B}},e.bezierBBox=function(t,r,i,n,a,s,o,l){e.is(t,"array")||(t=[t,r,i,n,a,s,o,l]);var h=Zt.apply(null,t);return{x:h.min.x,y:h.min.y,x2:h.max.x,y2:h.max.y,width:h.max.x-h.min.x,height:h.max.y-h.min.y}},e.isPointInsideBBox=function(t,e,r){return e>=t.x&&e<=t.x2&&r>=t.y&&r<=t.y2},e.isBBoxIntersect=function(t,r){var i=e.isPointInsideBBox;return i(r,t.x,t.y)||i(r,t.x2,t.y)||i(r,t.x,t.y2)||i(r,t.x2,t.y2)||i(t,r.x,r.y)||i(t,r.x2,r.y)||i(t,r.x,r.y2)||i(t,r.x2,r.y2)||(t.x<r.x2&&t.x>r.x||r.x<t.x2&&r.x>t.x)&&(t.y<r.y2&&t.y>r.y||r.y<t.y2&&r.y>t.y)},e.pathIntersection=function(t,e){return d(t,e)},e.pathIntersectionNumber=function(t,e){return d(t,e,1)},e.isPointInsidePath=function(t,r,i){var n=e.pathBBox(t);return e.isPointInsideBBox(n,r,i)&&d(t,[["M",r,i],["H",n.x2+10]],1)%2==1},e._removedFactory=function(e){return function(){t("raphael.log",null,"Raphaël: you are calling to method “"+e+"” of removed object",e)}};var Ot=e.pathBBox=function(t){var e=Vt(t);if(e.bbox)return r(e.bbox);if(!t)return{x:0,y:0,width:0,height:0,x2:0,y2:0};t=Qt(t);for(var i=0,n=0,a=[],s=[],o,l=0,h=t.length;l<h;l++)if(o=t[l],"M"==o[0])i=o[1],n=o[2],a.push(i),s.push(n);else{var u=Zt(i,n,o[1],o[2],o[3],o[4],o[5],o[6]);a=a[P](u.min.x,u.max.x),s=s[P](u.min.y,u.max.y),i=o[5],n=o[6]}var c=G[z](0,a),f=G[z](0,s),p=W[z](0,a),d=W[z](0,s),g=p-c,v=d-f,x={x:c,y:f,x2:p,y2:d,width:g,height:v,cx:c+g/2,cy:f+v/2};return e.bbox=r(x),x},Yt=function(t){var i=r(t);return i.toString=e._path2string,i},Wt=e._pathToRelative=function(t){var r=Vt(t);if(r.rel)return Yt(r.rel);e.is(t,Q)&&e.is(t&&t[0],Q)||(t=e.parsePathString(t));var i=[],n=0,a=0,s=0,o=0,l=0;"M"==t[0][0]&&(n=t[0][1],a=t[0][2],s=n,o=a,l++,i.push(["M",n,a]));for(var h=l,u=t.length;h<u;h++){var c=i[h]=[],f=t[h];if(f[0]!=O.call(f[0]))switch(c[0]=O.call(f[0]),c[0]){case"a":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]-n).toFixed(3),c[7]=+(f[7]-a).toFixed(3);break;case"v":c[1]=+(f[1]-a).toFixed(3);break;case"m":s=f[1],o=f[2];default:for(var p=1,d=f.length;p<d;p++)c[p]=+(f[p]-(p%2?n:a)).toFixed(3)}else{c=i[h]=[],"m"==f[0]&&(s=f[1]+n,o=f[2]+a);for(var g=0,v=f.length;g<v;g++)i[h][g]=f[g]}var x=i[h].length;switch(i[h][0]){case"z":n=s,a=o;break;case"h":n+=+i[h][x-1];break;case"v":a+=+i[h][x-1];break;default:n+=+i[h][x-2],a+=+i[h][x-1]}}return i.toString=e._path2string,r.rel=Yt(i),i},Gt=e._pathToAbsolute=function(t){var r=Vt(t);if(r.abs)return Yt(r.abs);if(e.is(t,Q)&&e.is(t&&t[0],Q)||(t=e.parsePathString(t)),!t||!t.length)return[["M",0,0]];var i=[],n=0,a=0,o=0,l=0,h=0;"M"==t[0][0]&&(n=+t[0][1],a=+t[0][2],o=n,l=a,h++,i[0]=["M",n,a]);for(var u=3==t.length&&"M"==t[0][0]&&"R"==t[1][0].toUpperCase()&&"Z"==t[2][0].toUpperCase(),c,f,p=h,d=t.length;p<d;p++){if(i.push(c=[]),f=t[p],f[0]!=ct.call(f[0]))switch(c[0]=ct.call(f[0]),c[0]){case"A":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]+n),c[7]=+(f[7]+a);break;case"V":c[1]=+f[1]+a;break;case"H":c[1]=+f[1]+n;break;case"R":for(var g=[n,a][P](f.slice(1)),v=2,x=g.length;v<x;v++)g[v]=+g[v]+n,g[++v]=+g[v]+a;i.pop(),i=i[P](s(g,u));break;case"M":o=+f[1]+n,l=+f[2]+a;default:for(v=1,x=f.length;v<x;v++)c[v]=+f[v]+(v%2?n:a)}else if("R"==f[0])g=[n,a][P](f.slice(1)),i.pop(),i=i[P](s(g,u)),c=["R"][P](f.slice(-2));else for(var y=0,m=f.length;y<m;y++)c[y]=f[y];switch(c[0]){case"Z":n=o,a=l;break;case"H":n=c[1];break;case"V":a=c[1];break;case"M":o=c[c.length-2],l=c[c.length-1];default:n=c[c.length-2],a=c[c.length-1]}}return i.toString=e._path2string,r.abs=Yt(i),i},Ht=function(t,e,r,i){return[t,e,r,i,r,i]},Xt=function(t,e,r,i,n,a){var s=1/3,o=2/3;return[s*t+o*r,s*e+o*i,s*n+o*r,s*a+o*i,n,a]},Ut=function(t,e,r,i,a,s,o,l,h,u){var c=120*U/180,f=U/180*(+a||0),p=[],d,g=n(function(t,e,r){var i=t*Y.cos(r)-e*Y.sin(r),n=t*Y.sin(r)+e*Y.cos(r);return{x:i,y:n}});if(u)S=u[0],A=u[1],B=u[2],C=u[3];else{d=g(t,e,-f),t=d.x,e=d.y,d=g(l,h,-f),l=d.x,h=d.y;var v=Y.cos(U/180*a),x=Y.sin(U/180*a),y=(t-l)/2,m=(e-h)/2,b=y*y/(r*r)+m*m/(i*i);b>1&&(b=Y.sqrt(b),r=b*r,i=b*i);var _=r*r,w=i*i,k=(s==o?-1:1)*Y.sqrt(H((_*w-_*m*m-w*y*y)/(_*m*m+w*y*y))),B=k*r*m/i+(t+l)/2,C=k*-i*y/r+(e+h)/2,S=Y.asin(((e-C)/i).toFixed(9)),A=Y.asin(((h-C)/i).toFixed(9));S=t<B?U-S:S,A=l<B?U-A:A,S<0&&(S=2*U+S),A<0&&(A=2*U+A),o&&S>A&&(S-=2*U),!o&&A>S&&(A-=2*U)}var T=A-S;if(H(T)>c){var E=A,M=l,N=h;A=S+c*(o&&A>S?1:-1),l=B+r*Y.cos(A),h=C+i*Y.sin(A),p=Ut(l,h,r,i,a,0,o,M,N,[A,E,B,C])}T=A-S;var L=Y.cos(S),z=Y.sin(S),F=Y.cos(A),R=Y.sin(A),j=Y.tan(T/4),I=4/3*r*j,D=4/3*i*j,V=[t,e],O=[t+I*z,e-D*L],W=[l+I*R,h-D*F],G=[l,h];if(O[0]=2*V[0]-O[0],O[1]=2*V[1]-O[1],u)return[O,W,G][P](p);p=[O,W,G][P](p).join()[q](",");for(var X=[],$=0,Z=p.length;$<Z;$++)X[$]=$%2?g(p[$-1],p[$],f).y:g(p[$],p[$+1],f).x;return X},$t=function(t,e,r,i,n,a,s,o,l){var h=1-l;return{x:X(h,3)*t+3*X(h,2)*l*r+3*h*l*l*n+X(l,3)*s,y:X(h,3)*e+3*X(h,2)*l*i+3*h*l*l*a+X(l,3)*o}},Zt=n(function(t,e,r,i,n,a,s,o){var l=n-2*r+t-(s-2*n+r),h=2*(r-t)-2*(n-r),u=t-r,c=(-h+Y.sqrt(h*h-4*l*u))/2/l,f=(-h-Y.sqrt(h*h-4*l*u))/2/l,p=[e,o],d=[t,s],g;return H(c)>"1e12"&&(c=.5),H(f)>"1e12"&&(f=.5),c>0&&c<1&&(g=$t(t,e,r,i,n,a,s,o,c),d.push(g.x),p.push(g.y)),f>0&&f<1&&(g=$t(t,e,r,i,n,a,s,o,f),d.push(g.x),p.push(g.y)),l=a-2*i+e-(o-2*a+i),h=2*(i-e)-2*(a-i),u=e-i,c=(-h+Y.sqrt(h*h-4*l*u))/2/l,f=(-h-Y.sqrt(h*h-4*l*u))/2/l,H(c)>"1e12"&&(c=.5),H(f)>"1e12"&&(f=.5),c>0&&c<1&&(g=$t(t,e,r,i,n,a,s,o,c),d.push(g.x),p.push(g.y)),f>0&&f<1&&(g=$t(t,e,r,i,n,a,s,o,f),d.push(g.x),p.push(g.y)),{min:{x:G[z](0,d),y:G[z](0,p)},max:{x:W[z](0,d),y:W[z](0,p)}}}),Qt=e._path2curve=n(function(t,e){var r=!e&&Vt(t);if(!e&&r.curve)return Yt(r.curve);for(var i=Gt(t),n=e&&Gt(e),a={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},s={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},o=(function(t,e,r){var i,n,a={T:1,Q:1};if(!t)return["C",e.x,e.y,e.x,e.y,e.x,e.y];switch(!(t[0]in a)&&(e.qx=e.qy=null),t[0]){case"M":e.X=t[1],e.Y=t[2];break;case"A":t=["C"][P](Ut[z](0,[e.x,e.y][P](t.slice(1))));break;case"S":"C"==r||"S"==r?(i=2*e.x-e.bx,n=2*e.y-e.by):(i=e.x,n=e.y),t=["C",i,n][P](t.slice(1));break;case"T":"Q"==r||"T"==r?(e.qx=2*e.x-e.qx,e.qy=2*e.y-e.qy):(e.qx=e.x,e.qy=e.y),t=["C"][P](Xt(e.x,e.y,e.qx,e.qy,t[1],t[2]));break;case"Q":e.qx=t[1],e.qy=t[2],t=["C"][P](Xt(e.x,e.y,t[1],t[2],t[3],t[4]));break;case"L":t=["C"][P](Ht(e.x,e.y,t[1],t[2]));break;case"H":t=["C"][P](Ht(e.x,e.y,t[1],e.y));break;case"V":t=["C"][P](Ht(e.x,e.y,e.x,t[1]));break;case"Z":t=["C"][P](Ht(e.x,e.y,e.X,e.Y))}return t}),l=function(t,e){if(t[e].length>7){t[e].shift();for(var r=t[e];r.length;)u[e]="A",n&&(c[e]="A"),t.splice(e++,0,["C"][P](r.splice(0,6)));t.splice(e,1),g=W(i.length,n&&n.length||0)}},h=function(t,e,r,a,s){t&&e&&"M"==t[s][0]&&"M"!=e[s][0]&&(e.splice(s,0,["M",a.x,a.y]),r.bx=0,r.by=0,r.x=t[s][1],r.y=t[s][2],g=W(i.length,n&&n.length||0))},u=[],c=[],f="",p="",d=0,g=W(i.length,n&&n.length||0);d<g;d++){i[d]&&(f=i[d][0]),"C"!=f&&(u[d]=f,d&&(p=u[d-1])),i[d]=o(i[d],a,p),"A"!=u[d]&&"C"==f&&(u[d]="C"),l(i,d),n&&(n[d]&&(f=n[d][0]),"C"!=f&&(c[d]=f,d&&(p=c[d-1])),n[d]=o(n[d],s,p),"A"!=c[d]&&"C"==f&&(c[d]="C"),l(n,d)),h(i,n,a,s,d),h(n,i,s,a,d);var v=i[d],x=n&&n[d],y=v.length,m=n&&x.length;a.x=v[y-2],a.y=v[y-1],a.bx=ht(v[y-4])||a.x,a.by=ht(v[y-3])||a.y,s.bx=n&&(ht(x[m-4])||s.x),s.by=n&&(ht(x[m-3])||s.y),s.x=n&&x[m-2],s.y=n&&x[m-1]}return n||(r.curve=Yt(i)),n?[i,n]:i},null,Yt),Jt=e._parseDots=n(function(t){for(var r=[],i=0,n=t.length;i<n;i++){var a={},s=t[i].match(/^([^:]*):?([\d\.]*)/);if(a.color=e.getRGB(s[1]),a.color.error)return null;a.opacity=a.color.opacity,a.color=a.color.hex,s[2]&&(a.offset=s[2]+"%"),r.push(a)}for(i=1,n=r.length-1;i<n;i++)if(!r[i].offset){for(var o=ht(r[i-1].offset||0),l=0,h=i+1;h<n;h++)if(r[h].offset){l=r[h].offset;break}l||(l=100,h=n),l=ht(l);for(var u=(l-o)/(h-i+1);i<h;i++)o+=u,r[i].offset=o+"%"}return r}),Kt=e._tear=function(t,e){t==e.top&&(e.top=t.prev),t==e.bottom&&(e.bottom=t.next),t.next&&(t.next.prev=t.prev),t.prev&&(t.prev.next=t.next)},te=e._tofront=function(t,e){e.top!==t&&(Kt(t,e),t.next=null,t.prev=e.top,e.top.next=t,e.top=t)},ee=e._toback=function(t,e){e.bottom!==t&&(Kt(t,e),t.next=e.bottom,t.prev=null,e.bottom.prev=t,e.bottom=t)},re=e._insertafter=function(t,e,r){Kt(t,r),e==r.top&&(r.top=t),e.next&&(e.next.prev=t),t.next=e.next,t.prev=e,e.next=t},ie=e._insertbefore=function(t,e,r){Kt(t,r),e==r.bottom&&(r.bottom=t),e.prev&&(e.prev.next=t),t.prev=e.prev,e.prev=t,t.next=e},ne=e.toMatrix=function(t,e){var r=Ot(t),i={_:{transform:R},getBBox:function(){return r}};return se(i,e),i.matrix},ae=e.transformPath=function(t,e){return Mt(t,ne(t,e))},se=e._extractTransform=function(t,r){if(null==r)return t._.transform;r=I(r).replace(/\.{3}|\u2026/g,t._.transform||R);var i=e.parseTransformString(r),n=0,a=0,s=0,o=1,l=1,h=t._,u=new g;if(h.transform=i||[],i)for(var c=0,f=i.length;c<f;c++){var p=i[c],d=p.length,v=I(p[0]).toLowerCase(),x=p[0]!=v,y=x?u.invert():0,m,b,_,w,k;"t"==v&&3==d?x?(m=y.x(0,0),b=y.y(0,0),_=y.x(p[1],p[2]),w=y.y(p[1],p[2]),u.translate(_-m,w-b)):u.translate(p[1],p[2]):"r"==v?2==d?(k=k||t.getBBox(1),u.rotate(p[1],k.x+k.width/2,k.y+k.height/2),n+=p[1]):4==d&&(x?(_=y.x(p[2],p[3]),w=y.y(p[2],p[3]),u.rotate(p[1],_,w)):u.rotate(p[1],p[2],p[3]),n+=p[1]):"s"==v?2==d||3==d?(k=k||t.getBBox(1),u.scale(p[1],p[d-1],k.x+k.width/2,k.y+k.height/2),o*=p[1],l*=p[d-1]):5==d&&(x?(_=y.x(p[3],p[4]),w=y.y(p[3],p[4]),u.scale(p[1],p[2],_,w)):u.scale(p[1],p[2],p[3],p[4]),o*=p[1],l*=p[2]):"m"==v&&7==d&&u.add(p[1],p[2],p[3],p[4],p[5],p[6]),h.dirtyT=1,t.matrix=u}t.matrix=u,h.sx=o,h.sy=l,h.deg=n,h.dx=a=u.e,h.dy=s=u.f,1==o&&1==l&&!n&&h.bbox?(h.bbox.x+=+a,h.bbox.y+=+s):h.dirtyT=1},oe=function(t){var e=t[0];switch(e.toLowerCase()){case"t":return[e,0,0];case"m":return[e,1,0,0,1,0,0];case"r":return 4==t.length?[e,0,t[2],t[3]]:[e,0];case"s":return 5==t.length?[e,1,1,t[3],t[4]]:3==t.length?[e,1,1]:[e,1]}},le=e._equaliseTransform=function(t,r){r=I(r).replace(/\.{3}|\u2026/g,t),t=e.parseTransformString(t)||[],r=e.parseTransformString(r)||[];for(var i=W(t.length,r.length),n=[],a=[],s=0,o,l,h,u;s<i;s++){if(h=t[s]||oe(r[s]),u=r[s]||oe(h),h[0]!=u[0]||"r"==h[0].toLowerCase()&&(h[2]!=u[2]||h[3]!=u[3])||"s"==h[0].toLowerCase()&&(h[3]!=u[3]||h[4]!=u[4]))return;for(n[s]=[],a[s]=[],o=0,l=W(h.length,u.length);o<l;o++)o in h&&(n[s][o]=h[o]),o in u&&(a[s][o]=u[o])}return{from:n,to:a}};e._getContainer=function(t,r,i,n){var a;if(a=null!=n||e.is(t,"object")?t:T.doc.getElementById(t),null!=a)return a.tagName?null==r?{container:a,width:a.style.pixelWidth||a.offsetWidth,height:a.style.pixelHeight||a.offsetHeight}:{container:a,width:r,height:i}:{container:1,x:t,y:r,width:i,height:n}},e.pathToRelative=Wt,e._engine={},e.path2curve=Qt,e.matrix=function(t,e,r,i,n,a){return new g(t,e,r,i,n,a)},function(t){function r(t){return t[0]*t[0]+t[1]*t[1]}function i(t){var e=Y.sqrt(r(t));t[0]&&(t[0]/=e),t[1]&&(t[1]/=e)}t.add=function(t,e,r,i,n,a){var s=[[],[],[]],o=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],l=[[t,r,n],[e,i,a],[0,0,1]],h,u,c,f;for(t&&t instanceof g&&(l=[[t.a,t.c,t.e],[t.b,t.d,t.f],[0,0,1]]),h=0;h<3;h++)for(u=0;u<3;u++){for(f=0,c=0;c<3;c++)f+=o[h][c]*l[c][u];s[h][u]=f}this.a=s[0][0],this.b=s[1][0],this.c=s[0][1],this.d=s[1][1],this.e=s[0][2],this.f=s[1][2]},t.invert=function(){var t=this,e=t.a*t.d-t.b*t.c;return new g(t.d/e,-t.b/e,-t.c/e,t.a/e,(t.c*t.f-t.d*t.e)/e,(t.b*t.e-t.a*t.f)/e)},t.clone=function(){return new g(this.a,this.b,this.c,this.d,this.e,this.f)},t.translate=function(t,e){
this.add(1,0,0,1,t,e)},t.scale=function(t,e,r,i){null==e&&(e=t),(r||i)&&this.add(1,0,0,1,r,i),this.add(t,0,0,e,0,0),(r||i)&&this.add(1,0,0,1,-r,-i)},t.rotate=function(t,r,i){t=e.rad(t),r=r||0,i=i||0;var n=+Y.cos(t).toFixed(9),a=+Y.sin(t).toFixed(9);this.add(n,a,-a,n,r,i),this.add(1,0,0,1,-r,-i)},t.x=function(t,e){return t*this.a+e*this.c+this.e},t.y=function(t,e){return t*this.b+e*this.d+this.f},t.get=function(t){return+this[I.fromCharCode(97+t)].toFixed(4)},t.toString=function(){return e.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},t.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},t.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},t.split=function(){var t={};t.dx=this.e,t.dy=this.f;var n=[[this.a,this.c],[this.b,this.d]];t.scalex=Y.sqrt(r(n[0])),i(n[0]),t.shear=n[0][0]*n[1][0]+n[0][1]*n[1][1],n[1]=[n[1][0]-n[0][0]*t.shear,n[1][1]-n[0][1]*t.shear],t.scaley=Y.sqrt(r(n[1])),i(n[1]),t.shear/=t.scaley;var a=-n[0][1],s=n[1][1];return s<0?(t.rotate=e.deg(Y.acos(s)),a<0&&(t.rotate=360-t.rotate)):t.rotate=e.deg(Y.asin(a)),t.isSimple=!(+t.shear.toFixed(9)||t.scalex.toFixed(9)!=t.scaley.toFixed(9)&&t.rotate),t.isSuperSimple=!+t.shear.toFixed(9)&&t.scalex.toFixed(9)==t.scaley.toFixed(9)&&!t.rotate,t.noRotation=!+t.shear.toFixed(9)&&!t.rotate,t},t.toTransformString=function(t){var e=t||this[q]();return e.isSimple?(e.scalex=+e.scalex.toFixed(4),e.scaley=+e.scaley.toFixed(4),e.rotate=+e.rotate.toFixed(4),(e.dx||e.dy?"t"+[e.dx,e.dy]:R)+(1!=e.scalex||1!=e.scaley?"s"+[e.scalex,e.scaley,0,0]:R)+(e.rotate?"r"+[e.rotate,0,0]:R)):"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(g.prototype);for(var he=function(){this.returnValue=!1},ue=function(){return this.originalEvent.preventDefault()},ce=function(){this.cancelBubble=!0},fe=function(){return this.originalEvent.stopPropagation()},pe=function(t){var e=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,r=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft;return{x:t.clientX+r,y:t.clientY+e}},de=function(){return T.doc.addEventListener?function(t,e,r,i){var n=function(t){var e=pe(t);return r.call(i,t,e.x,e.y)};if(t.addEventListener(e,n,!1),F&&V[e]){var a=function(e){for(var n=pe(e),a=e,s=0,o=e.targetTouches&&e.targetTouches.length;s<o;s++)if(e.targetTouches[s].target==t){e=e.targetTouches[s],e.originalEvent=a,e.preventDefault=ue,e.stopPropagation=fe;break}return r.call(i,e,n.x,n.y)};t.addEventListener(V[e],a,!1)}return function(){return t.removeEventListener(e,n,!1),F&&V[e]&&t.removeEventListener(V[e],a,!1),!0}}:T.doc.attachEvent?function(t,e,r,i){var n=function(t){t=t||T.win.event;var e=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,n=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft,a=t.clientX+n,s=t.clientY+e;return t.preventDefault=t.preventDefault||he,t.stopPropagation=t.stopPropagation||ce,r.call(i,t,a,s)};t.attachEvent("on"+e,n);var a=function(){return t.detachEvent("on"+e,n),!0};return a}:void 0}(),ge=[],ve=function(e){for(var r=e.clientX,i=e.clientY,n=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,a=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft,s,o=ge.length;o--;){if(s=ge[o],F&&e.touches){for(var l=e.touches.length,h;l--;)if(h=e.touches[l],h.identifier==s.el._drag.id){r=h.clientX,i=h.clientY,(e.originalEvent?e.originalEvent:e).preventDefault();break}}else e.preventDefault();var u=s.el.node,c,f=u.nextSibling,p=u.parentNode,d=u.style.display;T.win.opera&&p.removeChild(u),u.style.display="none",c=s.el.paper.getElementByPoint(r,i),u.style.display=d,T.win.opera&&(f?p.insertBefore(u,f):p.appendChild(u)),c&&t("raphael.drag.over."+s.el.id,s.el,c),r+=a,i+=n,t("raphael.drag.move."+s.el.id,s.move_scope||s.el,r-s.el._drag.x,i-s.el._drag.y,r,i,e)}},xe=function(r){e.unmousemove(ve).unmouseup(xe);for(var i=ge.length,n;i--;)n=ge[i],n.el._drag={},t("raphael.drag.end."+n.el.id,n.end_scope||n.start_scope||n.move_scope||n.el,r);ge=[]},ye=e.el={},me=D.length;me--;)!function(t){e[t]=ye[t]=function(r,i){return e.is(r,"function")&&(this.events=this.events||[],this.events.push({name:t,f:r,unbind:de(this.shape||this.node||T.doc,t,r,i||this)})),this},e["un"+t]=ye["un"+t]=function(r){for(var i=this.events||[],n=i.length;n--;)i[n].name!=t||!e.is(r,"undefined")&&i[n].f!=r||(i[n].unbind(),i.splice(n,1),!i.length&&delete this.events);return this}}(D[me]);ye.data=function(r,i){var n=wt[this.id]=wt[this.id]||{};if(0==arguments.length)return n;if(1==arguments.length){if(e.is(r,"object")){for(var a in r)r[A](a)&&this.data(a,r[a]);return this}return t("raphael.data.get."+this.id,this,n[r],r),n[r]}return n[r]=i,t("raphael.data.set."+this.id,this,i,r),this},ye.removeData=function(t){return null==t?wt[this.id]={}:wt[this.id]&&delete wt[this.id][t],this},ye.getData=function(){return r(wt[this.id]||{})},ye.hover=function(t,e,r,i){return this.mouseover(t,r).mouseout(e,i||r)},ye.unhover=function(t,e){return this.unmouseover(t).unmouseout(e)};var be=[];ye.drag=function(r,i,n,a,s,o){function l(l){(l.originalEvent||l).preventDefault();var h=l.clientX,u=l.clientY,c=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,f=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft;if(this._drag.id=l.identifier,F&&l.touches)for(var p=l.touches.length,d;p--;)if(d=l.touches[p],this._drag.id=d.identifier,d.identifier==this._drag.id){h=d.clientX,u=d.clientY;break}this._drag.x=h+f,this._drag.y=u+c,!ge.length&&e.mousemove(ve).mouseup(xe),ge.push({el:this,move_scope:a,start_scope:s,end_scope:o}),i&&t.on("raphael.drag.start."+this.id,i),r&&t.on("raphael.drag.move."+this.id,r),n&&t.on("raphael.drag.end."+this.id,n),t("raphael.drag.start."+this.id,s||a||this,l.clientX+f,l.clientY+c,l)}return this._drag={},be.push({el:this,start:l}),this.mousedown(l),this},ye.onDragOver=function(e){e?t.on("raphael.drag.over."+this.id,e):t.unbind("raphael.drag.over."+this.id)},ye.undrag=function(){for(var r=be.length;r--;)be[r].el==this&&(this.unmousedown(be[r].start),be.splice(r,1),t.unbind("raphael.drag.*."+this.id));!be.length&&e.unmousemove(ve).unmouseup(xe),ge=[]},N.circle=function(t,r,i){var n=e._engine.circle(this,t||0,r||0,i||0);return this.__set__&&this.__set__.push(n),n},N.rect=function(t,r,i,n,a){var s=e._engine.rect(this,t||0,r||0,i||0,n||0,a||0);return this.__set__&&this.__set__.push(s),s},N.ellipse=function(t,r,i,n){var a=e._engine.ellipse(this,t||0,r||0,i||0,n||0);return this.__set__&&this.__set__.push(a),a},N.path=function(t){t&&!e.is(t,Z)&&!e.is(t[0],Q)&&(t+=R);var r=e._engine.path(e.format[z](e,arguments),this);return this.__set__&&this.__set__.push(r),r},N.image=function(t,r,i,n,a){var s=e._engine.image(this,t||"about:blank",r||0,i||0,n||0,a||0);return this.__set__&&this.__set__.push(s),s},N.text=function(t,r,i){var n=e._engine.text(this,t||0,r||0,I(i));return this.__set__&&this.__set__.push(n),n},N.set=function(t){!e.is(t,"array")&&(t=Array.prototype.splice.call(arguments,0,arguments.length));var r=new ze(t);return this.__set__&&this.__set__.push(r),r.paper=this,r.type="set",r},N.setStart=function(t){this.__set__=t||this.set()},N.setFinish=function(t){var e=this.__set__;return delete this.__set__,e},N.getSize=function(){var t=this.canvas.parentNode;return{width:t.offsetWidth,height:t.offsetHeight}},N.setSize=function(t,r){return e._engine.setSize.call(this,t,r)},N.setViewBox=function(t,r,i,n,a){return e._engine.setViewBox.call(this,t,r,i,n,a)},N.top=N.bottom=null,N.raphael=e;var _e=function(t){var e=t.getBoundingClientRect(),r=t.ownerDocument,i=r.body,n=r.documentElement,a=n.clientTop||i.clientTop||0,s=n.clientLeft||i.clientLeft||0,o=e.top+(T.win.pageYOffset||n.scrollTop||i.scrollTop)-a,l=e.left+(T.win.pageXOffset||n.scrollLeft||i.scrollLeft)-s;return{y:o,x:l}};N.getElementByPoint=function(t,e){var r=this,i=r.canvas,n=T.doc.elementFromPoint(t,e);if(T.win.opera&&"svg"==n.tagName){var a=_e(i),s=i.createSVGRect();s.x=t-a.x,s.y=e-a.y,s.width=s.height=1;var o=i.getIntersectionList(s,null);o.length&&(n=o[o.length-1])}if(!n)return null;for(;n.parentNode&&n!=i.parentNode&&!n.raphael;)n=n.parentNode;return n==r.canvas.parentNode&&(n=i),n=n&&n.raphael?r.getById(n.raphaelid):null},N.getElementsByBBox=function(t){var r=this.set();return this.forEach(function(i){e.isBBoxIntersect(i.getBBox(),t)&&r.push(i)}),r},N.getById=function(t){for(var e=this.bottom;e;){if(e.id==t)return e;e=e.next}return null},N.forEach=function(t,e){for(var r=this.bottom;r;){if(t.call(e,r)===!1)return this;r=r.next}return this},N.getElementsByPoint=function(t,e){var r=this.set();return this.forEach(function(i){i.isPointInside(t,e)&&r.push(i)}),r},ye.isPointInside=function(t,r){var i=this.realPath=Et[this.type](this);return this.attr("transform")&&this.attr("transform").length&&(i=e.transformPath(i,this.attr("transform"))),e.isPointInsidePath(i,t,r)},ye.getBBox=function(t){if(this.removed)return{};var e=this._;return t?(!e.dirty&&e.bboxwt||(this.realPath=Et[this.type](this),e.bboxwt=Ot(this.realPath),e.bboxwt.toString=x,e.dirty=0),e.bboxwt):((e.dirty||e.dirtyT||!e.bbox)&&(!e.dirty&&this.realPath||(e.bboxwt=0,this.realPath=Et[this.type](this)),e.bbox=Ot(Mt(this.realPath,this.matrix)),e.bbox.toString=x,e.dirty=e.dirtyT=0),e.bbox)},ye.clone=function(){if(this.removed)return null;var t=this.paper[this.type]().attr(this.attr());return this.__set__&&this.__set__.push(t),t},ye.glow=function(t){if("text"==this.type)return null;t=t||{};var e={width:(t.width||10)+(+this.attr("stroke-width")||1),fill:t.fill||!1,opacity:null==t.opacity?.5:t.opacity,offsetx:t.offsetx||0,offsety:t.offsety||0,color:t.color||"#000"},r=e.width/2,i=this.paper,n=i.set(),a=this.realPath||Et[this.type](this);a=this.matrix?Mt(a,this.matrix):a;for(var s=1;s<r+1;s++)n.push(i.path(a).attr({stroke:e.color,fill:e.fill?e.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(e.width/r*s).toFixed(3),opacity:+(e.opacity/r).toFixed(3)}));return n.insertBefore(this).translate(e.offsetx,e.offsety)};var we={},ke=function(t,r,i,n,a,s,o,u,c){return null==c?l(t,r,i,n,a,s,o,u):e.findDotsAtSegment(t,r,i,n,a,s,o,u,h(t,r,i,n,a,s,o,u,c))},Be=function(t,r){return function(i,n,a){i=Qt(i);for(var s,o,l,h,u="",c={},f,p=0,d=0,g=i.length;d<g;d++){if(l=i[d],"M"==l[0])s=+l[1],o=+l[2];else{if(h=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6]),p+h>n){if(r&&!c.start){if(f=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6],n-p),u+=["C"+f.start.x,f.start.y,f.m.x,f.m.y,f.x,f.y],a)return u;c.start=u,u=["M"+f.x,f.y+"C"+f.n.x,f.n.y,f.end.x,f.end.y,l[5],l[6]].join(),p+=h,s=+l[5],o=+l[6];continue}if(!t&&!r)return f=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6],n-p),{x:f.x,y:f.y,alpha:f.alpha}}p+=h,s=+l[5],o=+l[6]}u+=l.shift()+l}return c.end=u,f=t?p:r?c:e.findDotsAtSegment(s,o,l[0],l[1],l[2],l[3],l[4],l[5],1),f.alpha&&(f={x:f.x,y:f.y,alpha:f.alpha}),f}},Ce=Be(1),Se=Be(),Ae=Be(0,1);e.getTotalLength=Ce,e.getPointAtLength=Se,e.getSubpath=function(t,e,r){if(this.getTotalLength(t)-r<1e-6)return Ae(t,e).end;var i=Ae(t,r,1);return e?Ae(i,e).end:i},ye.getTotalLength=function(){var t=this.getPath();if(t)return this.node.getTotalLength?this.node.getTotalLength():Ce(t)},ye.getPointAtLength=function(t){var e=this.getPath();if(e)return Se(e,t)},ye.getPath=function(){var t,r=e._getPath[this.type];if("text"!=this.type&&"set"!=this.type)return r&&(t=r(this)),t},ye.getSubpath=function(t,r){var i=this.getPath();if(i)return e.getSubpath(i,t,r)};var Te=e.easing_formulas={linear:function(t){return t},"<":function(t){return X(t,1.7)},">":function(t){return X(t,.48)},"<>":function(t){var e=.48-t/1.04,r=Y.sqrt(.1734+e*e),i=r-e,n=X(H(i),1/3)*(i<0?-1:1),a=-r-e,s=X(H(a),1/3)*(a<0?-1:1),o=n+s+.5;return 3*(1-o)*o*o+o*o*o},backIn:function(t){var e=1.70158;return t*t*((e+1)*t-e)},backOut:function(t){t-=1;var e=1.70158;return t*t*((e+1)*t+e)+1},elastic:function(t){return t==!!t?t:X(2,-10*t)*Y.sin((t-.075)*(2*U)/.3)+1},bounce:function(t){var e=7.5625,r=2.75,i;return t<1/r?i=e*t*t:t<2/r?(t-=1.5/r,i=e*t*t+.75):t<2.5/r?(t-=2.25/r,i=e*t*t+.9375):(t-=2.625/r,i=e*t*t+.984375),i}};Te.easeIn=Te["ease-in"]=Te["<"],Te.easeOut=Te["ease-out"]=Te[">"],Te.easeInOut=Te["ease-in-out"]=Te["<>"],Te["back-in"]=Te.backIn,Te["back-out"]=Te.backOut;var Ee=[],Me=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){setTimeout(t,16)},Ne=function(){for(var r=+new Date,i=0;i<Ee.length;i++){var n=Ee[i];if(!n.el.removed&&!n.paused){var a=r-n.start,s=n.ms,o=n.easing,l=n.from,h=n.diff,u=n.to,c=n.t,f=n.el,p={},d,g={},v;if(n.initstatus?(a=(n.initstatus*n.anim.top-n.prev)/(n.percent-n.prev)*s,n.status=n.initstatus,delete n.initstatus,n.stop&&Ee.splice(i--,1)):n.status=(n.prev+(n.percent-n.prev)*(a/s))/n.anim.top,!(a<0))if(a<s){var x=o(a/s);for(var y in l)if(l[A](y)){switch(pt[y]){case $:d=+l[y]+x*s*h[y];break;case"colour":d="rgb("+[Le(ot(l[y].r+x*s*h[y].r)),Le(ot(l[y].g+x*s*h[y].g)),Le(ot(l[y].b+x*s*h[y].b))].join(",")+")";break;case"path":d=[];for(var m=0,_=l[y].length;m<_;m++){d[m]=[l[y][m][0]];for(var w=1,k=l[y][m].length;w<k;w++)d[m][w]=+l[y][m][w]+x*s*h[y][m][w];d[m]=d[m].join(j)}d=d.join(j);break;case"transform":if(h[y].real)for(d=[],m=0,_=l[y].length;m<_;m++)for(d[m]=[l[y][m][0]],w=1,k=l[y][m].length;w<k;w++)d[m][w]=l[y][m][w]+x*s*h[y][m][w];else{var B=function(t){return+l[y][t]+x*s*h[y][t]};d=[["m",B(0),B(1),B(2),B(3),B(4),B(5)]]}break;case"csv":if("clip-rect"==y)for(d=[],m=4;m--;)d[m]=+l[y][m]+x*s*h[y][m];break;default:var C=[][P](l[y]);for(d=[],m=f.paper.customAttributes[y].length;m--;)d[m]=+C[m]+x*s*h[y][m]}p[y]=d}f.attr(p),function(e,r,i){setTimeout(function(){t("raphael.anim.frame."+e,r,i)})}(f.id,f,n.anim)}else{if(function(r,i,n){setTimeout(function(){t("raphael.anim.frame."+i.id,i,n),t("raphael.anim.finish."+i.id,i,n),e.is(r,"function")&&r.call(i)})}(n.callback,f,n.anim),f.attr(u),Ee.splice(i--,1),n.repeat>1&&!n.next){for(v in u)u[A](v)&&(g[v]=n.totalOrigin[v]);n.el.attr(g),b(n.anim,n.el,n.anim.percents[0],null,n.totalOrigin,n.repeat-1)}n.next&&!n.stop&&b(n.anim,n.el,n.next,null,n.totalOrigin,n.repeat)}}}Ee.length&&Me(Ne)},Le=function(t){return t>255?255:t<0?0:t};ye.animateWith=function(t,r,i,n,a,s){var o=this;if(o.removed)return s&&s.call(o),o;var l=i instanceof m?i:e.animation(i,n,a,s),h,u;b(l,o,l.percents[0],null,o.attr());for(var c=0,f=Ee.length;c<f;c++)if(Ee[c].anim==r&&Ee[c].el==t){Ee[f-1].start=Ee[c].start;break}return o},ye.onAnimation=function(e){return e?t.on("raphael.anim.frame."+this.id,e):t.unbind("raphael.anim.frame."+this.id),this},m.prototype.delay=function(t){var e=new m(this.anim,this.ms);return e.times=this.times,e.del=+t||0,e},m.prototype.repeat=function(t){var e=new m(this.anim,this.ms);return e.del=this.del,e.times=Y.floor(W(t,0))||1,e},e.animation=function(t,r,i,n){if(t instanceof m)return t;!e.is(i,"function")&&i||(n=n||i||null,i=null),t=Object(t),r=+r||0;var a={},s,o;for(o in t)t[A](o)&&ht(o)!=o&&ht(o)+"%"!=o&&(s=!0,a[o]=t[o]);if(s)return i&&(a.easing=i),n&&(a.callback=n),new m({100:a},r);if(n){var l=0;for(var h in t){var u=ut(h);t[A](h)&&u>l&&(l=u)}l+="%",!t[l].callback&&(t[l].callback=n)}return new m(t,r)},ye.animate=function(t,r,i,n){var a=this;if(a.removed)return n&&n.call(a),a;var s=t instanceof m?t:e.animation(t,r,i,n);return b(s,a,s.percents[0],null,a.attr()),a},ye.setTime=function(t,e){return t&&null!=e&&this.status(t,G(e,t.ms)/t.ms),this},ye.status=function(t,e){var r=[],i=0,n,a;if(null!=e)return b(t,this,-1,G(e,1)),this;for(n=Ee.length;i<n;i++)if(a=Ee[i],a.el.id==this.id&&(!t||a.anim==t)){if(t)return a.status;r.push({anim:a.anim,status:a.status})}return t?0:r},ye.pause=function(e){for(var r=0;r<Ee.length;r++)Ee[r].el.id!=this.id||e&&Ee[r].anim!=e||t("raphael.anim.pause."+this.id,this,Ee[r].anim)!==!1&&(Ee[r].paused=!0);return this},ye.resume=function(e){for(var r=0;r<Ee.length;r++)if(Ee[r].el.id==this.id&&(!e||Ee[r].anim==e)){var i=Ee[r];t("raphael.anim.resume."+this.id,this,i.anim)!==!1&&(delete i.paused,this.status(i.anim,i.status))}return this},ye.stop=function(e){for(var r=0;r<Ee.length;r++)Ee[r].el.id!=this.id||e&&Ee[r].anim!=e||t("raphael.anim.stop."+this.id,this,Ee[r].anim)!==!1&&Ee.splice(r--,1);return this},t.on("raphael.remove",_),t.on("raphael.clear",_),ye.toString=function(){return"Raphaël’s object"};var ze=function(t){if(this.items=[],this.length=0,this.type="set",t)for(var e=0,r=t.length;e<r;e++)!t[e]||t[e].constructor!=ye.constructor&&t[e].constructor!=ze||(this[this.items.length]=this.items[this.items.length]=t[e],this.length++)},Pe=ze.prototype;Pe.push=function(){for(var t,e,r=0,i=arguments.length;r<i;r++)t=arguments[r],!t||t.constructor!=ye.constructor&&t.constructor!=ze||(e=this.items.length,this[e]=this.items[e]=t,this.length++);return this},Pe.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},Pe.forEach=function(t,e){for(var r=0,i=this.items.length;r<i;r++)if(t.call(e,this.items[r],r)===!1)return this;return this};for(var Fe in ye)ye[A](Fe)&&(Pe[Fe]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t][z](r,e)})}}(Fe));return Pe.attr=function(t,r){if(t&&e.is(t,Q)&&e.is(t[0],"object"))for(var i=0,n=t.length;i<n;i++)this.items[i].attr(t[i]);else for(var a=0,s=this.items.length;a<s;a++)this.items[a].attr(t,r);return this},Pe.clear=function(){for(;this.length;)this.pop()},Pe.splice=function(t,e,r){t=t<0?W(this.length+t,0):t,e=W(0,G(this.length-t,e));var i=[],n=[],a=[],s;for(s=2;s<arguments.length;s++)a.push(arguments[s]);for(s=0;s<e;s++)n.push(this[t+s]);for(;s<this.length-t;s++)i.push(this[t+s]);var o=a.length;for(s=0;s<o+i.length;s++)this.items[t+s]=this[t+s]=s<o?a[s]:i[s-o];for(s=this.items.length=this.length-=e-o;this[s];)delete this[s++];return new ze(n)},Pe.exclude=function(t){for(var e=0,r=this.length;e<r;e++)if(this[e]==t)return this.splice(e,1),!0},Pe.animate=function(t,r,i,n){(e.is(i,"function")||!i)&&(n=i||null);var a=this.items.length,s=a,o,l=this,h;if(!a)return this;n&&(h=function(){!--a&&n.call(l)}),i=e.is(i,Z)?i:h;var u=e.animation(t,r,i,h);for(o=this.items[--s].animate(u);s--;)this.items[s]&&!this.items[s].removed&&this.items[s].animateWith(o,u,u),this.items[s]&&!this.items[s].removed||a--;return this},Pe.insertAfter=function(t){for(var e=this.items.length;e--;)this.items[e].insertAfter(t);return this},Pe.getBBox=function(){for(var t=[],e=[],r=[],i=[],n=this.items.length;n--;)if(!this.items[n].removed){var a=this.items[n].getBBox();t.push(a.x),e.push(a.y),r.push(a.x+a.width),i.push(a.y+a.height)}return t=G[z](0,t),e=G[z](0,e),r=W[z](0,r),i=W[z](0,i),{x:t,y:e,x2:r,y2:i,width:r-t,height:i-e}},Pe.clone=function(t){t=this.paper.set();for(var e=0,r=this.items.length;e<r;e++)t.push(this.items[e].clone());return t},Pe.toString=function(){return"Raphaël‘s set"},Pe.glow=function(t){var e=this.paper.set();return this.forEach(function(r,i){var n=r.glow(t);null!=n&&n.forEach(function(t,r){e.push(t)})}),e},Pe.isPointInside=function(t,e){var r=!1;return this.forEach(function(i){if(i.isPointInside(t,e))return r=!0,!1}),r},e.registerFont=function(t){if(!t.face)return t;this.fonts=this.fonts||{};var e={w:t.w,face:{},glyphs:{}},r=t.face["font-family"];for(var i in t.face)t.face[A](i)&&(e.face[i]=t.face[i]);if(this.fonts[r]?this.fonts[r].push(e):this.fonts[r]=[e],!t.svg){e.face["units-per-em"]=ut(t.face["units-per-em"],10);for(var n in t.glyphs)if(t.glyphs[A](n)){var a=t.glyphs[n];if(e.glyphs[n]={w:a.w,k:{},d:a.d&&"M"+a.d.replace(/[mlcxtrv]/g,function(t){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[t]||"M"})+"z"},a.k)for(var s in a.k)a[A](s)&&(e.glyphs[n].k[s]=a.k[s])}}return t},N.getFont=function(t,r,i,n){if(n=n||"normal",i=i||"normal",r=+r||{normal:400,bold:700,lighter:300,bolder:800}[r]||400,e.fonts){var a=e.fonts[t];if(!a){var s=new RegExp("(^|\\s)"+t.replace(/[^\w\d\s+!~.:_-]/g,R)+"(\\s|$)","i");for(var o in e.fonts)if(e.fonts[A](o)&&s.test(o)){a=e.fonts[o];break}}var l;if(a)for(var h=0,u=a.length;h<u&&(l=a[h],l.face["font-weight"]!=r||l.face["font-style"]!=i&&l.face["font-style"]||l.face["font-stretch"]!=n);h++);return l}},N.print=function(t,r,i,n,a,s,o,l){s=s||"middle",o=W(G(o||0,1),-1),l=W(G(l||1,3),1);var h=I(i)[q](R),u=0,c=0,f=R,p;if(e.is(n,"string")&&(n=this.getFont(n)),n){p=(a||16)/n.face["units-per-em"];for(var d=n.face.bbox[q](k),g=+d[0],v=d[3]-d[1],x=0,y=+d[1]+("baseline"==s?v+ +n.face.descent:v/2),m=0,b=h.length;m<b;m++){if("\n"==h[m])u=0,w=0,c=0,x+=v*l;else{var _=c&&n.glyphs[h[m-1]]||{},w=n.glyphs[h[m]];u+=c?(_.w||n.w)+(_.k&&_.k[h[m]]||0)+n.w*o:0,c=1}w&&w.d&&(f+=e.transformPath(w.d,["t",u*p,x*p,"s",p,p,g,y,"t",(t-g)/p,(r-y)/p]))}}return this.path(f).attr({fill:"#000",stroke:"none"})},N.add=function(t){if(e.is(t,"array"))for(var r=this.set(),i=0,n=t.length,a;i<n;i++)a=t[i]||{},B[A](a.type)&&r.push(this[a.type]().attr(a));return r},e.format=function(t,r){var i=e.is(r,Q)?[0][P](r):arguments;return t&&e.is(t,Z)&&i.length-1&&(t=t.replace(C,function(t,e){return null==i[++e]?R:i[e]})),t||R},e.fullfill=function(){var t=/\{([^\}]+)\}/g,e=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,r=function(t,r,i){var n=i;return r.replace(e,function(t,e,r,i,a){e=e||i,n&&(e in n&&(n=n[e]),"function"==typeof n&&a&&(n=n()))}),n=(null==n||n==i?t:n)+""};return function(e,i){return String(e).replace(t,function(t,e){return r(t,e,i)})}}(),e.ninja=function(){if(E.was)T.win.Raphael=E.is;else{window.Raphael=void 0;try{delete window.Raphael}catch(t){}}return e},e.st=Pe,t.on("raphael.DOMload",function(){w=!0}),function(t,r,i){function n(){/in/.test(t.readyState)?setTimeout(n,9):e.eve("raphael.DOMload")}null==t.readyState&&t.addEventListener&&(t.addEventListener(r,i=function(){t.removeEventListener(r,i,!1),t.readyState="complete"},!1),t.readyState="loading"),n()}(document,"DOMContentLoaded"),e}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;!function(r){var a="0.5.0",s="hasOwnProperty",o=/[\.\/]/,l=/\s*,\s*/,h="*",u=function(){},c=function(t,e){return t-e},f,p,d={n:{}},g=function(){for(var t=0,e=this.length;t<e;t++)if("undefined"!=typeof this[t])return this[t]},v=function(){for(var t=this.length;--t;)if("undefined"!=typeof this[t])return this[t]},x=Object.prototype.toString,y=String,m=Array.isArray||function(t){return t instanceof Array||"[object Array]"==x.call(t)};eve=function(t,e){var r=d,i=p,n=Array.prototype.slice.call(arguments,2),a=eve.listeners(t),s=0,o=!1,l,h=[],u={},x=[],y=f,m=[];x.firstDefined=g,x.lastDefined=v,f=t,p=0;for(var b=0,_=a.length;b<_;b++)"zIndex"in a[b]&&(h.push(a[b].zIndex),a[b].zIndex<0&&(u[a[b].zIndex]=a[b]));for(h.sort(c);h[s]<0;)if(l=u[h[s++]],x.push(l.apply(e,n)),p)return p=i,x;for(b=0;b<_;b++)if(l=a[b],"zIndex"in l)if(l.zIndex==h[s]){if(x.push(l.apply(e,n)),p)break;do if(s++,l=u[h[s]],l&&x.push(l.apply(e,n)),p)break;while(l)}else u[l.zIndex]=l;else if(x.push(l.apply(e,n)),p)break;return p=i,f=y,x},eve._events=d,eve.listeners=function(t){var e=m(t)?t:t.split(o),r=d,i,n,a,s,l,u,c,f,p=[r],g=[];for(s=0,l=e.length;s<l;s++){for(f=[],u=0,c=p.length;u<c;u++)for(r=p[u].n,n=[r[e[s]],r[h]],a=2;a--;)i=n[a],i&&(f.push(i),g=g.concat(i.f||[]));p=f}return g},eve.separator=function(t){t?(t=y(t).replace(/(?=[\.\^\]\[\-])/g,"\\"),t="["+t+"]",o=new RegExp(t)):o=/[\.\/]/},eve.on=function(t,e){if("function"!=typeof e)return function(){};for(var r=m(t)?m(t[0])?t:[t]:y(t).split(l),i=0,n=r.length;i<n;i++)!function(t){for(var r=m(t)?t:y(t).split(o),i=d,n,a=0,s=r.length;a<s;a++)i=i.n,i=i.hasOwnProperty(r[a])&&i[r[a]]||(i[r[a]]={n:{}});for(i.f=i.f||[],a=0,s=i.f.length;a<s;a++)if(i.f[a]==e){n=!0;break}!n&&i.f.push(e)}(r[i]);return function(t){+t==+t&&(e.zIndex=+t)}},eve.f=function(t){var e=[].slice.call(arguments,1);return function(){eve.apply(null,[t,null].concat(e).concat([].slice.call(arguments,0)))}},eve.stop=function(){p=1},eve.nt=function(t){var e=m(f)?f.join("."):f;return t?new RegExp("(?:\\.|\\/|^)"+t+"(?:\\.|\\/|$)").test(e):e},eve.nts=function(){return m(f)?f:f.split(o)},eve.off=eve.unbind=function(t,e){if(!t)return void(eve._events=d={n:{}});var r=m(t)?m(t[0])?t:[t]:y(t).split(l);if(r.length>1)for(var i=0,n=r.length;i<n;i++)eve.off(r[i],e);else{r=m(t)?t:y(t).split(o);var a,u,c,i,n,f,p,g=[d];for(i=0,n=r.length;i<n;i++)for(f=0;f<g.length;f+=c.length-2){if(c=[f,1],a=g[f].n,r[i]!=h)a[r[i]]&&c.push(a[r[i]]);else for(u in a)a[s](u)&&c.push(a[u]);g.splice.apply(g,c)}for(i=0,n=g.length;i<n;i++)for(a=g[i];a.n;){if(e){if(a.f){for(f=0,p=a.f.length;f<p;f++)if(a.f[f]==e){a.f.splice(f,1);break}!a.f.length&&delete a.f}for(u in a.n)if(a.n[s](u)&&a.n[u].f){var v=a.n[u].f;for(f=0,p=v.length;f<p;f++)if(v[f]==e){v.splice(f,1);break}!v.length&&delete a.n[u].f}}else{delete a.f;for(u in a.n)a.n[s](u)&&a.n[u].f&&delete a.n[u].f}a=a.n}}},eve.once=function(t,e){var r=function(){return eve.off(t,r),e.apply(this,arguments)};return eve.on(t,r)},eve.version=a,eve.toString=function(){return"You are running Eve "+a},"undefined"!=typeof t&&t.exports?t.exports=eve:(i=[],n=function(){return eve}.apply(e,i),!(void 0!==n&&(t.exports=n)))}(this)},function(t,e,r){var i,n;i=[r(1)],n=function(t){if(!t||t.svg){var e="hasOwnProperty",r=String,i=parseFloat,n=parseInt,a=Math,s=a.max,o=a.abs,l=a.pow,h=/[, ]+/,u=t.eve,c="",f=" ",p="http://www.w3.org/1999/xlink",d={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},g={};t.toString=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version};var v=function(i,n){if(n){"string"==typeof i&&(i=v(i));for(var a in n)n[e](a)&&("xlink:"==a.substring(0,6)?i.setAttributeNS(p,a.substring(6),r(n[a])):i.setAttribute(a,r(n[a])))}else i=t._g.doc.createElementNS("http://www.w3.org/2000/svg",i),i.style&&(i.style.webkitTapHighlightColor="rgba(0,0,0,0)");return i},x=function(e,n){var h="linear",u=e.id+n,f=.5,p=.5,d=e.node,g=e.paper,x=d.style,y=t._g.doc.getElementById(u);if(!y){if(n=r(n).replace(t._radial_gradient,function(t,e,r){if(h="radial",e&&r){f=i(e),p=i(r);var n=2*(p>.5)-1;l(f-.5,2)+l(p-.5,2)>.25&&(p=a.sqrt(.25-l(f-.5,2))*n+.5)&&.5!=p&&(p=p.toFixed(5)-1e-5*n)}return c}),n=n.split(/\s*\-\s*/),"linear"==h){var b=n.shift();if(b=-i(b),isNaN(b))return null;var _=[0,0,a.cos(t.rad(b)),a.sin(t.rad(b))],w=1/(s(o(_[2]),o(_[3]))||1);_[2]*=w,_[3]*=w,_[2]<0&&(_[0]=-_[2],_[2]=0),_[3]<0&&(_[1]=-_[3],_[3]=0)}var k=t._parseDots(n);if(!k)return null;if(u=u.replace(/[\(\)\s,\xb0#]/g,"_"),e.gradient&&u!=e.gradient.id&&(g.defs.removeChild(e.gradient),delete e.gradient),!e.gradient){y=v(h+"Gradient",{id:u}),e.gradient=y,v(y,"radial"==h?{fx:f,fy:p}:{x1:_[0],y1:_[1],x2:_[2],y2:_[3],gradientTransform:e.matrix.invert()}),g.defs.appendChild(y);for(var B=0,C=k.length;B<C;B++)y.appendChild(v("stop",{offset:k[B].offset?k[B].offset:B?"100%":"0%","stop-color":k[B].color||"#fff","stop-opacity":isFinite(k[B].opacity)?k[B].opacity:1}))}}return v(d,{fill:m(u),opacity:1,"fill-opacity":1}),x.fill=c,x.opacity=1,x.fillOpacity=1,1},y=function(){var t=document.documentMode;return t&&(9===t||10===t)},m=function(t){if(y())return"url('#"+t+"')";var e=document.location,r=e.protocol+"//"+e.host+e.pathname+e.search;return"url('"+r+"#"+t+"')"},b=function(t){var e=t.getBBox(1);v(t.pattern,{patternTransform:t.matrix.invert()+" translate("+e.x+","+e.y+")"})},_=function(i,n,a){if("path"==i.type){for(var s=r(n).toLowerCase().split("-"),o=i.paper,l=a?"end":"start",h=i.node,u=i.attrs,f=u["stroke-width"],p=s.length,x="classic",y,m,b,_,w,k=3,B=3,C=5;p--;)switch(s[p]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":x=s[p];break;case"wide":B=5;break;case"narrow":B=2;break;case"long":k=5;break;case"short":k=2}if("open"==x?(k+=2,B+=2,C+=2,b=1,_=a?4:1,w={fill:"none",stroke:u.stroke}):(_=b=k/2,w={fill:u.stroke,stroke:"none"}),i._.arrows?a?(i._.arrows.endPath&&g[i._.arrows.endPath]--,i._.arrows.endMarker&&g[i._.arrows.endMarker]--):(i._.arrows.startPath&&g[i._.arrows.startPath]--,i._.arrows.startMarker&&g[i._.arrows.startMarker]--):i._.arrows={},"none"!=x){var S="raphael-marker-"+x,A="raphael-marker-"+l+x+k+B+"-obj"+i.id;t._g.doc.getElementById(S)?g[S]++:(o.defs.appendChild(v(v("path"),{"stroke-linecap":"round",d:d[x],id:S})),g[S]=1);var T=t._g.doc.getElementById(A),E;T?(g[A]++,E=T.getElementsByTagName("use")[0]):(T=v(v("marker"),{id:A,markerHeight:B,markerWidth:k,orient:"auto",refX:_,refY:B/2}),E=v(v("use"),{"xlink:href":"#"+S,transform:(a?"rotate(180 "+k/2+" "+B/2+") ":c)+"scale("+k/C+","+B/C+")","stroke-width":(1/((k/C+B/C)/2)).toFixed(4)}),T.appendChild(E),o.defs.appendChild(T),g[A]=1),v(E,w);var M=b*("diamond"!=x&&"oval"!=x);a?(y=i._.arrows.startdx*f||0,m=t.getTotalLength(u.path)-M*f):(y=M*f,m=t.getTotalLength(u.path)-(i._.arrows.enddx*f||0)),w={},w["marker-"+l]="url(#"+A+")",(m||y)&&(w.d=t.getSubpath(u.path,y,m)),v(h,w),i._.arrows[l+"Path"]=S,i._.arrows[l+"Marker"]=A,i._.arrows[l+"dx"]=M,i._.arrows[l+"Type"]=x,i._.arrows[l+"String"]=n}else a?(y=i._.arrows.startdx*f||0,m=t.getTotalLength(u.path)-y):(y=0,m=t.getTotalLength(u.path)-(i._.arrows.enddx*f||0)),i._.arrows[l+"Path"]&&v(h,{d:t.getSubpath(u.path,y,m)}),delete i._.arrows[l+"Path"],delete i._.arrows[l+"Marker"],delete i._.arrows[l+"dx"],delete i._.arrows[l+"Type"],delete i._.arrows[l+"String"];for(w in g)if(g[e](w)&&!g[w]){var N=t._g.doc.getElementById(w);N&&N.parentNode.removeChild(N)}}},w={"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},k=function(t,e,i){if(e=w[r(e).toLowerCase()]){for(var n=t.attrs["stroke-width"]||"1",a={round:n,square:n,butt:0}[t.attrs["stroke-linecap"]||i["stroke-linecap"]]||0,s=[],o=e.length;o--;)s[o]=e[o]*n+(o%2?1:-1)*a;v(t.node,{"stroke-dasharray":s.join(",")})}else v(t.node,{"stroke-dasharray":"none"})},B=function(i,a){var l=i.node,u=i.attrs,f=l.style.visibility;l.style.visibility="hidden";for(var d in a)if(a[e](d)){if(!t._availableAttrs[e](d))continue;var g=a[d];switch(u[d]=g,d){case"blur":i.blur(g);break;case"title":var y=l.getElementsByTagName("title");if(y.length&&(y=y[0]))y.firstChild.nodeValue=g;else{y=v("title");var m=t._g.doc.createTextNode(g);y.appendChild(m),l.appendChild(y)}break;case"href":case"target":var w=l.parentNode;if("a"!=w.tagName.toLowerCase()){var B=v("a");w.insertBefore(B,l),B.appendChild(l),w=B}"target"==d?w.setAttributeNS(p,"show","blank"==g?"new":g):w.setAttributeNS(p,d,g);break;case"cursor":l.style.cursor=g;break;case"transform":i.transform(g);break;case"arrow-start":_(i,g);break;case"arrow-end":_(i,g,1);break;case"clip-rect":var C=r(g).split(h);if(4==C.length){i.clip&&i.clip.parentNode.parentNode.removeChild(i.clip.parentNode);var A=v("clipPath"),T=v("rect");A.id=t.createUUID(),v(T,{x:C[0],y:C[1],width:C[2],height:C[3]}),A.appendChild(T),i.paper.defs.appendChild(A),v(l,{"clip-path":"url(#"+A.id+")"}),i.clip=T}if(!g){var E=l.getAttribute("clip-path");if(E){var M=t._g.doc.getElementById(E.replace(/(^url\(#|\)$)/g,c));M&&M.parentNode.removeChild(M),v(l,{"clip-path":c}),delete i.clip}}break;case"path":"path"==i.type&&(v(l,{d:g?u.path=t._pathToAbsolute(g):"M0,0"}),i._.dirty=1,i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1)));break;case"width":if(l.setAttribute(d,g),i._.dirty=1,!u.fx)break;d="x",g=u.x;case"x":u.fx&&(g=-u.x-(u.width||0));case"rx":if("rx"==d&&"rect"==i.type)break;case"cx":l.setAttribute(d,g),i.pattern&&b(i),i._.dirty=1;break;case"height":if(l.setAttribute(d,g),i._.dirty=1,!u.fy)break;d="y",g=u.y;case"y":u.fy&&(g=-u.y-(u.height||0));case"ry":if("ry"==d&&"rect"==i.type)break;case"cy":l.setAttribute(d,g),i.pattern&&b(i),i._.dirty=1;break;case"r":"rect"==i.type?v(l,{rx:g,ry:g}):l.setAttribute(d,g),i._.dirty=1;break;case"src":"image"==i.type&&l.setAttributeNS(p,"href",g);break;case"stroke-width":1==i._.sx&&1==i._.sy||(g/=s(o(i._.sx),o(i._.sy))||1),l.setAttribute(d,g),u["stroke-dasharray"]&&k(i,u["stroke-dasharray"],a),
i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1));break;case"stroke-dasharray":k(i,g,a);break;case"fill":var N=r(g).match(t._ISURL);if(N){A=v("pattern");var L=v("image");A.id=t.createUUID(),v(A,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),v(L,{x:0,y:0,"xlink:href":N[1]}),A.appendChild(L),function(e){t._preload(N[1],function(){var t=this.offsetWidth,r=this.offsetHeight;v(e,{width:t,height:r}),v(L,{width:t,height:r})})}(A),i.paper.defs.appendChild(A),v(l,{fill:"url(#"+A.id+")"}),i.pattern=A,i.pattern&&b(i);break}var z=t.getRGB(g);if(z.error){if(("circle"==i.type||"ellipse"==i.type||"r"!=r(g).charAt())&&x(i,g)){if("opacity"in u||"fill-opacity"in u){var P=t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g,c));if(P){var F=P.getElementsByTagName("stop");v(F[F.length-1],{"stop-opacity":("opacity"in u?u.opacity:1)*("fill-opacity"in u?u["fill-opacity"]:1)})}}u.gradient=g,u.fill="none";break}}else delete a.gradient,delete u.gradient,!t.is(u.opacity,"undefined")&&t.is(a.opacity,"undefined")&&v(l,{opacity:u.opacity}),!t.is(u["fill-opacity"],"undefined")&&t.is(a["fill-opacity"],"undefined")&&v(l,{"fill-opacity":u["fill-opacity"]});z[e]("opacity")&&v(l,{"fill-opacity":z.opacity>1?z.opacity/100:z.opacity});case"stroke":z=t.getRGB(g),l.setAttribute(d,z.hex),"stroke"==d&&z[e]("opacity")&&v(l,{"stroke-opacity":z.opacity>1?z.opacity/100:z.opacity}),"stroke"==d&&i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1));break;case"gradient":("circle"==i.type||"ellipse"==i.type||"r"!=r(g).charAt())&&x(i,g);break;case"opacity":u.gradient&&!u[e]("stroke-opacity")&&v(l,{"stroke-opacity":g>1?g/100:g});case"fill-opacity":if(u.gradient){P=t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g,c)),P&&(F=P.getElementsByTagName("stop"),v(F[F.length-1],{"stop-opacity":g}));break}default:"font-size"==d&&(g=n(g,10)+"px");var R=d.replace(/(\-.)/g,function(t){return t.substring(1).toUpperCase()});l.style[R]=g,i._.dirty=1,l.setAttribute(d,g)}}S(i,a),l.style.visibility=f},C=1.2,S=function(i,a){if("text"==i.type&&(a[e]("text")||a[e]("font")||a[e]("font-size")||a[e]("x")||a[e]("y"))){var s=i.attrs,o=i.node,l=o.firstChild?n(t._g.doc.defaultView.getComputedStyle(o.firstChild,c).getPropertyValue("font-size"),10):10;if(a[e]("text")){for(s.text=a.text;o.firstChild;)o.removeChild(o.firstChild);for(var h=r(a.text).split("\n"),u=[],f,p=0,d=h.length;p<d;p++)f=v("tspan"),p&&v(f,{dy:l*C,x:s.x}),f.appendChild(t._g.doc.createTextNode(h[p])),o.appendChild(f),u[p]=f}else for(u=o.getElementsByTagName("tspan"),p=0,d=u.length;p<d;p++)p?v(u[p],{dy:l*C,x:s.x}):v(u[0],{dy:0});v(o,{x:s.x,y:s.y}),i._.dirty=1;var g=i._getBBox(),x=s.y-(g.y+g.height/2);x&&t.is(x,"finite")&&v(u[0],{dy:x})}},A=function(t){return t.parentNode&&"a"===t.parentNode.tagName.toLowerCase()?t.parentNode:t},T=function(e,r){function i(){return("0000"+(Math.random()*Math.pow(36,5)<<0).toString(36)).slice(-5)}var n=0,a=0;this[0]=this.node=e,e.raphael=!0,this.id=i(),e.raphaelid=this.id,this.matrix=t.matrix(),this.realPath=null,this.paper=r,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},E=t.el;T.prototype=E,E.constructor=T,t._engine.path=function(t,e){var r=v("path");e.canvas&&e.canvas.appendChild(r);var i=new T(r,e);return i.type="path",B(i,{fill:"none",stroke:"#000",path:t}),i},E.rotate=function(t,e,n){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this.transform(this._.transform.concat([["r",t,e,n]])),this},E.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3])),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this},E.translate=function(t,e){return this.removed?this:(t=r(t).split(h),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this.transform(this._.transform.concat([["t",t,e]])),this)},E.transform=function(r){var i=this._;if(null==r)return i.transform;if(t._extractTransform(this,r),this.clip&&v(this.clip,{transform:this.matrix.invert()}),this.pattern&&b(this),this.node&&v(this.node,{transform:this.matrix}),1!=i.sx||1!=i.sy){var n=this.attrs[e]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":n})}return this},E.hide=function(){return this.removed||(this.node.style.display="none"),this},E.show=function(){return this.removed||(this.node.style.display=""),this},E.remove=function(){var e=A(this.node);if(!this.removed&&e.parentNode){var r=this.paper;r.__set__&&r.__set__.exclude(this),u.unbind("raphael.*.*."+this.id),this.gradient&&r.defs.removeChild(this.gradient),t._tear(this,r),e.parentNode.removeChild(e),this.removeData();for(var i in this)this[i]="function"==typeof this[i]?t._removedFactory(i):null;this.removed=!0}},E._getBBox=function(){if("none"==this.node.style.display){this.show();var t=!0}var e=!1,r;this.paper.canvas.parentElement?r=this.paper.canvas.parentElement.style:this.paper.canvas.parentNode&&(r=this.paper.canvas.parentNode.style),r&&"none"==r.display&&(e=!0,r.display="");var i={};try{i=this.node.getBBox()}catch(n){i={x:this.node.clientLeft,y:this.node.clientTop,width:this.node.clientWidth,height:this.node.clientHeight}}finally{i=i||{},e&&(r.display="none")}return t&&this.hide(),i},E.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if("fill"==r&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;if("transform"==r)return this._.transform;for(var s=r.split(h),o={},l=0,c=s.length;l<c;l++)r=s[l],r in this.attrs?o[r]=this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?o[r]=this.paper.customAttributes[r].def:o[r]=t._availableAttrs[r];return c-1?o:o[s[0]]}if(null==i&&t.is(r,"array")){for(o={},l=0,c=r.length;l<c;l++)o[r[l]]=this.attr(r[l]);return o}if(null!=i){var f={};f[r]=i}else null!=r&&t.is(r,"object")&&(f=r);for(var p in f)u("raphael.attr."+p+"."+this.id,this,f[p]);for(p in this.paper.customAttributes)if(this.paper.customAttributes[e](p)&&f[e](p)&&t.is(this.paper.customAttributes[p],"function")){var d=this.paper.customAttributes[p].apply(this,[].concat(f[p]));this.attrs[p]=f[p];for(var g in d)d[e](g)&&(f[g]=d[g])}return B(this,f),this},E.toFront=function(){if(this.removed)return this;var e=A(this.node);e.parentNode.appendChild(e);var r=this.paper;return r.top!=this&&t._tofront(this,r),this},E.toBack=function(){if(this.removed)return this;var e=A(this.node),r=e.parentNode;r.insertBefore(e,r.firstChild),t._toback(this,this.paper);var i=this.paper;return this},E.insertAfter=function(e){if(this.removed||!e)return this;var r=A(this.node),i=A(e.node||e[e.length-1].node);return i.nextSibling?i.parentNode.insertBefore(r,i.nextSibling):i.parentNode.appendChild(r),t._insertafter(this,e,this.paper),this},E.insertBefore=function(e){if(this.removed||!e)return this;var r=A(this.node),i=A(e.node||e[0].node);return i.parentNode.insertBefore(r,i),t._insertbefore(this,e,this.paper),this},E.blur=function(e){var r=this;if(0!==+e){var i=v("filter"),n=v("feGaussianBlur");r.attrs.blur=e,i.id=t.createUUID(),v(n,{stdDeviation:+e||1.5}),i.appendChild(n),r.paper.defs.appendChild(i),r._blur=i,v(r.node,{filter:"url(#"+i.id+")"})}else r._blur&&(r._blur.parentNode.removeChild(r._blur),delete r._blur,delete r.attrs.blur),r.node.removeAttribute("filter");return r},t._engine.circle=function(t,e,r,i){var n=v("circle");t.canvas&&t.canvas.appendChild(n);var a=new T(n,t);return a.attrs={cx:e,cy:r,r:i,fill:"none",stroke:"#000"},a.type="circle",v(n,a.attrs),a},t._engine.rect=function(t,e,r,i,n,a){var s=v("rect");t.canvas&&t.canvas.appendChild(s);var o=new T(s,t);return o.attrs={x:e,y:r,width:i,height:n,rx:a||0,ry:a||0,fill:"none",stroke:"#000"},o.type="rect",v(s,o.attrs),o},t._engine.ellipse=function(t,e,r,i,n){var a=v("ellipse");t.canvas&&t.canvas.appendChild(a);var s=new T(a,t);return s.attrs={cx:e,cy:r,rx:i,ry:n,fill:"none",stroke:"#000"},s.type="ellipse",v(a,s.attrs),s},t._engine.image=function(t,e,r,i,n,a){var s=v("image");v(s,{x:r,y:i,width:n,height:a,preserveAspectRatio:"none"}),s.setAttributeNS(p,"href",e),t.canvas&&t.canvas.appendChild(s);var o=new T(s,t);return o.attrs={x:r,y:i,width:n,height:a,src:e},o.type="image",o},t._engine.text=function(e,r,i,n){var a=v("text");e.canvas&&e.canvas.appendChild(a);var s=new T(a,e);return s.attrs={x:r,y:i,"text-anchor":"middle",text:n,"font-family":t._availableAttrs["font-family"],"font-size":t._availableAttrs["font-size"],stroke:"none",fill:"#000"},s.type="text",B(s,s.attrs),s},t._engine.setSize=function(t,e){return this.width=t||this.width,this.height=e||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox),this},t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e&&e.container,i=e.x,n=e.y,a=e.width,s=e.height;if(!r)throw new Error("SVG container not found.");var o=v("svg"),l="overflow:hidden;",h;return i=i||0,n=n||0,a=a||512,s=s||342,v(o,{height:s,version:1.1,width:a,xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}),1==r?(o.style.cssText=l+"position:absolute;left:"+i+"px;top:"+n+"px",t._g.doc.body.appendChild(o),h=1):(o.style.cssText=l+"position:relative",r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o)),r=new t._Paper,r.width=a,r.height=s,r.canvas=o,r.clear(),r._left=r._top=0,h&&(r.renderfix=function(){}),r.renderfix(),r},t._engine.setViewBox=function(t,e,r,i,n){u("raphael.setViewBox",this,this._viewBox,[t,e,r,i,n]);var a=this.getSize(),o=s(r/a.width,i/a.height),l=this.top,h=n?"xMidYMid meet":"xMinYMin",c,p;for(null==t?(this._vbSize&&(o=1),delete this._vbSize,c="0 0 "+this.width+f+this.height):(this._vbSize=o,c=t+f+e+f+r+f+i),v(this.canvas,{viewBox:c,preserveAspectRatio:h});o&&l;)p="stroke-width"in l.attrs?l.attrs["stroke-width"]:1,l.attr({"stroke-width":p}),l._.dirty=1,l._.dirtyT=1,l=l.prev;return this._viewBox=[t,e,r,i,!!n],this},t.prototype.renderfix=function(){var t=this.canvas,e=t.style,r;try{r=t.getScreenCTM()||t.createSVGMatrix()}catch(i){r=t.createSVGMatrix()}var n=-r.e%1,a=-r.f%1;(n||a)&&(n&&(this._left=(this._left+n)%1,e.left=this._left+"px"),a&&(this._top=(this._top+a)%1,e.top=this._top+"px"))},t.prototype.clear=function(){t.eve("raphael.clear",this);for(var e=this.canvas;e.firstChild;)e.removeChild(e.firstChild);this.bottom=this.top=null,(this.desc=v("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël "+t.version)),e.appendChild(this.desc),e.appendChild(this.defs=v("defs"))},t.prototype.remove=function(){u("raphael.remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null};var M=t.st;for(var N in E)E[e](N)&&!M[e](N)&&(M[N]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(N))}}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;i=[r(1)],n=function(t){if(!t||t.vml){var e="hasOwnProperty",r=String,i=parseFloat,n=Math,a=n.round,s=n.max,o=n.min,l=n.abs,h="fill",u=/[, ]+/,c=t.eve,f=" progid:DXImageTransform.Microsoft",p=" ",d="",g={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},v=/([clmz]),?([^clmz]*)/gi,x=/ progid:\S+Blur\([^\)]+\)/g,y=/-?[^,\s-]+/g,m="position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)",b=21600,_={path:1,rect:1,image:1},w={circle:1,ellipse:1},k=function(e){var i=/[ahqstv]/gi,n=t._pathToAbsolute;if(r(e).match(i)&&(n=t._path2curve),i=/[clmz]/g,n==t._pathToAbsolute&&!r(e).match(i)){var s=r(e).replace(v,function(t,e,r){var i=[],n="m"==e.toLowerCase(),s=g[e];return r.replace(y,function(t){n&&2==i.length&&(s+=i+g["m"==e?"l":"L"],i=[]),i.push(a(t*b))}),s+i});return s}var o=n(e),l,h;s=[];for(var u=0,c=o.length;u<c;u++){l=o[u],h=o[u][0].toLowerCase(),"z"==h&&(h="x");for(var f=1,x=l.length;f<x;f++)h+=a(l[f]*b)+(f!=x-1?",":d);s.push(h)}return s.join(p)},B=function(e,r,i){var n=t.matrix();return n.rotate(-e,.5,.5),{dx:n.x(r,i),dy:n.y(r,i)}},C=function(t,e,r,i,n,a){var s=t._,o=t.matrix,u=s.fillpos,c=t.node,f=c.style,d=1,g="",v,x=b/e,y=b/r;if(f.visibility="hidden",e&&r){if(c.coordsize=l(x)+p+l(y),f.rotation=a*(e*r<0?-1:1),a){var m=B(a,i,n);i=m.dx,n=m.dy}if(e<0&&(g+="x"),r<0&&(g+=" y")&&(d=-1),f.flip=g,c.coordorigin=i*-x+p+n*-y,u||s.fillsize){var _=c.getElementsByTagName(h);_=_&&_[0],c.removeChild(_),u&&(m=B(a,o.x(u[0],u[1]),o.y(u[0],u[1])),_.position=m.dx*d+p+m.dy*d),s.fillsize&&(_.size=s.fillsize[0]*l(e)+p+s.fillsize[1]*l(r)),c.appendChild(_)}f.visibility="visible"}};t.toString=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version};var S=function(t,e,i){for(var n=r(e).toLowerCase().split("-"),a=i?"end":"start",s=n.length,o="classic",l="medium",h="medium";s--;)switch(n[s]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":o=n[s];break;case"wide":case"narrow":h=n[s];break;case"long":case"short":l=n[s]}var u=t.node.getElementsByTagName("stroke")[0];u[a+"arrow"]=o,u[a+"arrowlength"]=l,u[a+"arrowwidth"]=h},A=function(n,l){n.attrs=n.attrs||{};var c=n.node,f=n.attrs,g=c.style,v,x=_[n.type]&&(l.x!=f.x||l.y!=f.y||l.width!=f.width||l.height!=f.height||l.cx!=f.cx||l.cy!=f.cy||l.rx!=f.rx||l.ry!=f.ry||l.r!=f.r),y=w[n.type]&&(f.cx!=l.cx||f.cy!=l.cy||f.r!=l.r||f.rx!=l.rx||f.ry!=l.ry),m=n;for(var B in l)l[e](B)&&(f[B]=l[B]);if(x&&(f.path=t._getPath[n.type](n),n._.dirty=1),l.href&&(c.href=l.href),l.title&&(c.title=l.title),l.target&&(c.target=l.target),l.cursor&&(g.cursor=l.cursor),"blur"in l&&n.blur(l.blur),(l.path&&"path"==n.type||x)&&(c.path=k(~r(f.path).toLowerCase().indexOf("r")?t._pathToAbsolute(f.path):f.path),n._.dirty=1,"image"==n.type&&(n._.fillpos=[f.x,f.y],n._.fillsize=[f.width,f.height],C(n,1,1,0,0,0))),"transform"in l&&n.transform(l.transform),y){var A=+f.cx,E=+f.cy,M=+f.rx||+f.r||0,L=+f.ry||+f.r||0;c.path=t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",a((A-M)*b),a((E-L)*b),a((A+M)*b),a((E+L)*b),a(A*b)),n._.dirty=1}if("clip-rect"in l){var z=r(l["clip-rect"]).split(u);if(4==z.length){z[2]=+z[2]+ +z[0],z[3]=+z[3]+ +z[1];var P=c.clipRect||t._g.doc.createElement("div"),F=P.style;F.clip=t.format("rect({1}px {2}px {3}px {0}px)",z),c.clipRect||(F.position="absolute",F.top=0,F.left=0,F.width=n.paper.width+"px",F.height=n.paper.height+"px",c.parentNode.insertBefore(P,c),P.appendChild(c),c.clipRect=P)}l["clip-rect"]||c.clipRect&&(c.clipRect.style.clip="auto")}if(n.textpath){var R=n.textpath.style;l.font&&(R.font=l.font),l["font-family"]&&(R.fontFamily='"'+l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,d)+'"'),l["font-size"]&&(R.fontSize=l["font-size"]),l["font-weight"]&&(R.fontWeight=l["font-weight"]),l["font-style"]&&(R.fontStyle=l["font-style"])}if("arrow-start"in l&&S(m,l["arrow-start"]),"arrow-end"in l&&S(m,l["arrow-end"],1),null!=l.opacity||null!=l.fill||null!=l.src||null!=l.stroke||null!=l["stroke-width"]||null!=l["stroke-opacity"]||null!=l["fill-opacity"]||null!=l["stroke-dasharray"]||null!=l["stroke-miterlimit"]||null!=l["stroke-linejoin"]||null!=l["stroke-linecap"]){var j=c.getElementsByTagName(h),I=!1;if(j=j&&j[0],!j&&(I=j=N(h)),"image"==n.type&&l.src&&(j.src=l.src),l.fill&&(j.on=!0),null!=j.on&&"none"!=l.fill&&null!==l.fill||(j.on=!1),j.on&&l.fill){var q=r(l.fill).match(t._ISURL);if(q){j.parentNode==c&&c.removeChild(j),j.rotate=!0,j.src=q[1],j.type="tile";var D=n.getBBox(1);j.position=D.x+p+D.y,n._.fillpos=[D.x,D.y],t._preload(q[1],function(){n._.fillsize=[this.offsetWidth,this.offsetHeight]})}else j.color=t.getRGB(l.fill).hex,j.src=d,j.type="solid",t.getRGB(l.fill).error&&(m.type in{circle:1,ellipse:1}||"r"!=r(l.fill).charAt())&&T(m,l.fill,j)&&(f.fill="none",f.gradient=l.fill,j.rotate=!1)}if("fill-opacity"in l||"opacity"in l){var V=((+f["fill-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+t.getRGB(l.fill).o+1||2)-1);V=o(s(V,0),1),j.opacity=V,j.src&&(j.color="none")}c.appendChild(j);var O=c.getElementsByTagName("stroke")&&c.getElementsByTagName("stroke")[0],Y=!1;!O&&(Y=O=N("stroke")),(l.stroke&&"none"!=l.stroke||l["stroke-width"]||null!=l["stroke-opacity"]||l["stroke-dasharray"]||l["stroke-miterlimit"]||l["stroke-linejoin"]||l["stroke-linecap"])&&(O.on=!0),("none"==l.stroke||null===l.stroke||null==O.on||0==l.stroke||0==l["stroke-width"])&&(O.on=!1);var W=t.getRGB(l.stroke);O.on&&l.stroke&&(O.color=W.hex),V=((+f["stroke-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+W.o+1||2)-1);var G=.75*(i(l["stroke-width"])||1);if(V=o(s(V,0),1),null==l["stroke-width"]&&(G=f["stroke-width"]),l["stroke-width"]&&(O.weight=G),G&&G<1&&(V*=G)&&(O.weight=1),O.opacity=V,l["stroke-linejoin"]&&(O.joinstyle=l["stroke-linejoin"]||"miter"),O.miterlimit=l["stroke-miterlimit"]||8,l["stroke-linecap"]&&(O.endcap="butt"==l["stroke-linecap"]?"flat":"square"==l["stroke-linecap"]?"square":"round"),"stroke-dasharray"in l){var H={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};O.dashstyle=H[e](l["stroke-dasharray"])?H[l["stroke-dasharray"]]:d}Y&&c.appendChild(O)}if("text"==m.type){m.paper.canvas.style.display=d;var X=m.paper.span,U=100,$=f.font&&f.font.match(/\d+(?:\.\d*)?(?=px)/);g=X.style,f.font&&(g.font=f.font),f["font-family"]&&(g.fontFamily=f["font-family"]),f["font-weight"]&&(g.fontWeight=f["font-weight"]),f["font-style"]&&(g.fontStyle=f["font-style"]),$=i(f["font-size"]||$&&$[0])||10,g.fontSize=$*U+"px",m.textpath.string&&(X.innerHTML=r(m.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var Z=X.getBoundingClientRect();m.W=f.w=(Z.right-Z.left)/U,m.H=f.h=(Z.bottom-Z.top)/U,m.X=f.x,m.Y=f.y+m.H/2,("x"in l||"y"in l)&&(m.path.v=t.format("m{0},{1}l{2},{1}",a(f.x*b),a(f.y*b),a(f.x*b)+1));for(var Q=["x","y","text","font","font-family","font-weight","font-style","font-size"],J=0,K=Q.length;J<K;J++)if(Q[J]in l){m._.dirty=1;break}switch(f["text-anchor"]){case"start":m.textpath.style["v-text-align"]="left",m.bbx=m.W/2;break;case"end":m.textpath.style["v-text-align"]="right",m.bbx=-m.W/2;break;default:m.textpath.style["v-text-align"]="center",m.bbx=0}m.textpath.style["v-text-kern"]=!0}},T=function(e,a,s){e.attrs=e.attrs||{};var o=e.attrs,l=Math.pow,h,u,c="linear",f=".5 .5";if(e.attrs.gradient=a,a=r(a).replace(t._radial_gradient,function(t,e,r){return c="radial",e&&r&&(e=i(e),r=i(r),l(e-.5,2)+l(r-.5,2)>.25&&(r=n.sqrt(.25-l(e-.5,2))*(2*(r>.5)-1)+.5),f=e+p+r),d}),a=a.split(/\s*\-\s*/),"linear"==c){var g=a.shift();if(g=-i(g),isNaN(g))return null}var v=t._parseDots(a);if(!v)return null;if(e=e.shape||e.node,v.length){e.removeChild(s),s.on=!0,s.method="none",s.color=v[0].color,s.color2=v[v.length-1].color;for(var x=[],y=0,m=v.length;y<m;y++)v[y].offset&&x.push(v[y].offset+p+v[y].color);s.colors=x.length?x.join():"0% "+s.color,"radial"==c?(s.type="gradientTitle",s.focus="100%",s.focussize="0 0",s.focusposition=f,s.angle=0):(s.type="gradient",s.angle=(270-g)%360),e.appendChild(s)}return 1},E=function(e,r){this[0]=this.node=e,e.raphael=!0,this.id=t._oid++,e.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=r,this.matrix=t.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},M=t.el;E.prototype=M,M.constructor=E,M.transform=function(e){if(null==e)return this._.transform;var i=this.paper._viewBoxShift,n=i?"s"+[i.scale,i.scale]+"-1-1t"+[i.dx,i.dy]:d,a;i&&(a=e=r(e).replace(/\.{3}|\u2026/g,this._.transform||d)),t._extractTransform(this,n+e);var s=this.matrix.clone(),o=this.skew,l=this.node,h,u=~r(this.attrs.fill).indexOf("-"),c=!r(this.attrs.fill).indexOf("url(");if(s.translate(1,1),c||u||"image"==this.type)if(o.matrix="1 0 0 1",o.offset="0 0",h=s.split(),u&&h.noRotation||!h.isSimple){l.style.filter=s.toFilter();var f=this.getBBox(),g=this.getBBox(1),v=f.x-g.x,x=f.y-g.y;l.coordorigin=v*-b+p+x*-b,C(this,1,1,v,x,0)}else l.style.filter=d,C(this,h.scalex,h.scaley,h.dx,h.dy,h.rotate);else l.style.filter=d,o.matrix=r(s),o.offset=s.offset();return null!==a&&(this._.transform=a,t._extractTransform(this,a)),this},M.rotate=function(t,e,n){if(this.removed)return this;if(null!=t){if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this._.dirtyT=1,this.transform(this._.transform.concat([["r",t,e,n]])),this}},M.translate=function(t,e){return this.removed?this:(t=r(t).split(u),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this._.bbox&&(this._.bbox.x+=t,this._.bbox.y+=e),this.transform(this._.transform.concat([["t",t,e]])),this)},M.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3]),isNaN(n)&&(n=null),isNaN(a)&&(a=null)),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this._.dirtyT=1,this},M.hide=function(){return!this.removed&&(this.node.style.display="none"),this},M.show=function(){return!this.removed&&(this.node.style.display=d),this},M.auxGetBBox=t.el.getBBox,M.getBBox=function(){var t=this.auxGetBBox();if(this.paper&&this.paper._viewBoxShift){var e={},r=1/this.paper._viewBoxShift.scale;return e.x=t.x-this.paper._viewBoxShift.dx,e.x*=r,e.y=t.y-this.paper._viewBoxShift.dy,e.y*=r,e.width=t.width*r,e.height=t.height*r,e.x2=e.x+e.width,e.y2=e.y+e.height,e}return t},M._getBBox=function(){return this.removed?{}:{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},M.remove=function(){if(!this.removed&&this.node.parentNode){this.paper.__set__&&this.paper.__set__.exclude(this),t.eve.unbind("raphael.*.*."+this.id),t._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;this.removed=!0}},M.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if(r==h&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;for(var s=r.split(u),o={},l=0,f=s.length;l<f;l++)r=s[l],r in this.attrs?o[r]=this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?o[r]=this.paper.customAttributes[r].def:o[r]=t._availableAttrs[r];return f-1?o:o[s[0]]}if(this.attrs&&null==i&&t.is(r,"array")){for(o={},l=0,f=r.length;l<f;l++)o[r[l]]=this.attr(r[l]);return o}var p;null!=i&&(p={},p[r]=i),null==i&&t.is(r,"object")&&(p=r);for(var d in p)c("raphael.attr."+d+"."+this.id,this,p[d]);if(p){for(d in this.paper.customAttributes)if(this.paper.customAttributes[e](d)&&p[e](d)&&t.is(this.paper.customAttributes[d],"function")){var g=this.paper.customAttributes[d].apply(this,[].concat(p[d]));this.attrs[d]=p[d];for(var v in g)g[e](v)&&(p[v]=g[v])}p.text&&"text"==this.type&&(this.textpath.string=p.text),A(this,p)}return this},M.toFront=function(){return!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&t._tofront(this,this.paper),this},M.toBack=function(){return this.removed?this:(this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),t._toback(this,this.paper)),this)},M.insertAfter=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[e.length-1]),e.node.nextSibling?e.node.parentNode.insertBefore(this.node,e.node.nextSibling):e.node.parentNode.appendChild(this.node),t._insertafter(this,e,this.paper),this)},M.insertBefore=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[0]),e.node.parentNode.insertBefore(this.node,e.node),t._insertbefore(this,e,this.paper),this)},M.blur=function(e){var r=this.node.runtimeStyle,i=r.filter;return i=i.replace(x,d),0!==+e?(this.attrs.blur=e,r.filter=i+p+f+".Blur(pixelradius="+(+e||1.5)+")",r.margin=t.format("-{0}px 0 0 -{0}px",a(+e||1.5))):(r.filter=i,r.margin=0,delete this.attrs.blur),this},t._engine.path=function(t,e){var r=N("shape");r.style.cssText=m,r.coordsize=b+p+b,r.coordorigin=e.coordorigin;var i=new E(r,e),n={fill:"none",stroke:"#000"};t&&(n.path=t),i.type="path",i.path=[],i.Path=d,A(i,n),e.canvas&&e.canvas.appendChild(r);var a=N("skew");return a.on=!0,r.appendChild(a),i.skew=a,i.transform(d),i},t._engine.rect=function(e,r,i,n,a,s){var o=t._rectPath(r,i,n,a,s),l=e.path(o),h=l.attrs;return l.X=h.x=r,l.Y=h.y=i,l.W=h.width=n,l.H=h.height=a,h.r=s,h.path=o,l.type="rect",l},t._engine.ellipse=function(t,e,r,i,n){var a=t.path(),s=a.attrs;return a.X=e-i,a.Y=r-n,a.W=2*i,a.H=2*n,a.type="ellipse",A(a,{cx:e,cy:r,rx:i,ry:n}),a},t._engine.circle=function(t,e,r,i){var n=t.path(),a=n.attrs;return n.X=e-i,n.Y=r-i,n.W=n.H=2*i,n.type="circle",A(n,{cx:e,cy:r,r:i}),n},t._engine.image=function(e,r,i,n,a,s){var o=t._rectPath(i,n,a,s),l=e.path(o).attr({stroke:"none"}),u=l.attrs,c=l.node,f=c.getElementsByTagName(h)[0];return u.src=r,l.X=u.x=i,l.Y=u.y=n,l.W=u.width=a,l.H=u.height=s,u.path=o,l.type="image",f.parentNode==c&&c.removeChild(f),f.rotate=!0,f.src=r,f.type="tile",l._.fillpos=[i,n],l._.fillsize=[a,s],c.appendChild(f),C(l,1,1,0,0,0),l},t._engine.text=function(e,i,n,s){var o=N("shape"),l=N("path"),h=N("textpath");i=i||0,n=n||0,s=s||"",l.v=t.format("m{0},{1}l{2},{1}",a(i*b),a(n*b),a(i*b)+1),l.textpathok=!0,h.string=r(s),h.on=!0,o.style.cssText=m,o.coordsize=b+p+b,o.coordorigin="0 0";var u=new E(o,e),c={fill:"#000",stroke:"none",font:t._availableAttrs.font,text:s};u.shape=o,u.path=l,u.textpath=h,u.type="text",u.attrs.text=r(s),u.attrs.x=i,u.attrs.y=n,u.attrs.w=1,u.attrs.h=1,A(u,c),o.appendChild(h),o.appendChild(l),e.canvas.appendChild(o);var f=N("skew");return f.on=!0,o.appendChild(f),u.skew=f,u.transform(d),u},t._engine.setSize=function(e,r){var i=this.canvas.style;return this.width=e,this.height=r,e==+e&&(e+="px"),r==+r&&(r+="px"),i.width=e,i.height=r,i.clip="rect(0 "+e+" "+r+" 0)",this._viewBox&&t._engine.setViewBox.apply(this,this._viewBox),this},t._engine.setViewBox=function(e,r,i,n,a){t.eve("raphael.setViewBox",this,this._viewBox,[e,r,i,n,a]);var s=this.getSize(),o=s.width,l=s.height,h,u;return a&&(h=l/n,u=o/i,i*h<o&&(e-=(o-i*h)/2/h),n*u<l&&(r-=(l-n*u)/2/u)),this._viewBox=[e,r,i,n,!!a],this._viewBoxShift={dx:-e,dy:-r,scale:s},this.forEach(function(t){t.transform("...")}),this};var N;t._engine.initWin=function(t){var e=t.document;e.styleSheets.length<31?e.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)"):e.styleSheets[0].addRule(".rvml","behavior:url(#default#VML)");try{!e.namespaces.rvml&&e.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),N=function(t){return e.createElement("<rvml:"+t+' class="rvml">')}}catch(r){N=function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},t._engine.initWin(t._g.win),t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e.container,i=e.height,n,a=e.width,s=e.x,o=e.y;if(!r)throw new Error("VML container not found.");var l=new t._Paper,h=l.canvas=t._g.doc.createElement("div"),u=h.style;return s=s||0,o=o||0,a=a||512,i=i||342,l.width=a,l.height=i,a==+a&&(a+="px"),i==+i&&(i+="px"),l.coordsize=1e3*b+p+1e3*b,l.coordorigin="0 0",l.span=t._g.doc.createElement("span"),l.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",h.appendChild(l.span),u.cssText=t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",a,i),1==r?(t._g.doc.body.appendChild(h),u.left=s+"px",u.top=o+"px",u.position="absolute"):r.firstChild?r.insertBefore(h,r.firstChild):r.appendChild(h),l.renderfix=function(){},l},t.prototype.clear=function(){t.eve("raphael.clear",this),this.canvas.innerHTML=d,this.span=t._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},t.prototype.remove=function(){t.eve("raphael.remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;return!0};var L=t.st;for(var z in M)M[e](z)&&!L[e](z)&&(L[z]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(z))}}.apply(e,i),!(void 0!==n&&(t.exports=n))}])});
var Chess=function(fen){var BLACK='b';var WHITE='w';var EMPTY=-1;var PAWN='p';var KNIGHT='n';var BISHOP='b';var ROOK='r';var QUEEN='q';var KING='k';var SYMBOLS='pnbrqkPNBRQK';var DEFAULT_POSITION='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';var POSSIBLE_RESULTS=['1-0','0-1','1/2-1/2','*'];var PAWN_OFFSETS={b:[16,32,17,15],w:[-16,-32,-17,-15]};var PIECE_OFFSETS={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]};var ATTACKS=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20];var RAYS=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17];var SHIFTS={p:0,n:1,b:2,r:3,q:4,k:5};var FLAGS={NORMAL:'n',CAPTURE:'c',BIG_PAWN:'b',EP_CAPTURE:'e',PROMOTION:'p',KSIDE_CASTLE:'k',QSIDE_CASTLE:'q'};var BITS={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64};var RANK_1=7;var RANK_2=6;var RANK_3=5;var RANK_4=4;var RANK_5=3;var RANK_6=2;var RANK_7=1;var RANK_8=0;var SQUARES={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119};var ROOKS={w:[{square:SQUARES.a1,flag:BITS.QSIDE_CASTLE},{square:SQUARES.h1,flag:BITS.KSIDE_CASTLE}],b:[{square:SQUARES.a8,flag:BITS.QSIDE_CASTLE},{square:SQUARES.h8,flag:BITS.KSIDE_CASTLE}]};var board=new Array(128);var kings={w:EMPTY,b:EMPTY};var turn=WHITE;var castling={w:0,b:0};var ep_square=EMPTY;var half_moves=0;var move_number=1;var history=[];var header={};if(typeof fen==='undefined'){load(DEFAULT_POSITION);}else{load(fen);}
function clear(){board=new Array(128);kings={w:EMPTY,b:EMPTY};turn=WHITE;castling={w:0,b:0};ep_square=EMPTY;half_moves=0;move_number=1;history=[];header={};update_setup(generate_fen());}
function reset(){load(DEFAULT_POSITION);}
function load(fen){var tokens=fen.split(/\s+/);var position=tokens[0];var square=0;if(!validate_fen(fen).valid){return false;}
clear();for(var i=0;i<position.length;i++){var piece=position.charAt(i);if(piece==='/'){square+=8;}else if(is_digit(piece)){square+=parseInt(piece,10);}else{var color=(piece<'a')?WHITE:BLACK;put({type:piece.toLowerCase(),color:color},algebraic(square));square++;}}
turn=tokens[1];if(tokens[2].indexOf('K')>-1){castling.w|=BITS.KSIDE_CASTLE;}
if(tokens[2].indexOf('Q')>-1){castling.w|=BITS.QSIDE_CASTLE;}
if(tokens[2].indexOf('k')>-1){castling.b|=BITS.KSIDE_CASTLE;}
if(tokens[2].indexOf('q')>-1){castling.b|=BITS.QSIDE_CASTLE;}
ep_square=(tokens[3]==='-')?EMPTY:SQUARES[tokens[3]];half_moves=parseInt(tokens[4],10);move_number=parseInt(tokens[5],10);update_setup(generate_fen());return true;}
function validate_fen(fen){var errors={0:'No errors.',1:'FEN string must contain six space-delimited fields.',2:'6th field (move number) must be a positive integer.',3:'5th field (half move counter) must be a non-negative integer.',4:'4th field (en-passant square) is invalid.',5:'3rd field (castling availability) is invalid.',6:'2nd field (side to move) is invalid.',7:'1st field (piece positions) does not contain 8 \'/\'-delimited rows.',8:'1st field (piece positions) is invalid [consecutive numbers].',9:'1st field (piece positions) is invalid [invalid piece].',10:'1st field (piece positions) is invalid [row too large].',11:'Illegal en-passant square',};var tokens=fen.split(/\s+/);if(tokens.length!==6){return{valid:false,error_number:1,error:errors[1]};}
if(isNaN(tokens[5])||(parseInt(tokens[5],10)<=0)){return{valid:false,error_number:2,error:errors[2]};}
if(isNaN(tokens[4])||(parseInt(tokens[4],10)<0)){return{valid:false,error_number:3,error:errors[3]};}
if(!/^(-|[abcdefgh][36])$/.test(tokens[3])){return{valid:false,error_number:4,error:errors[4]};}
if(!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])){return{valid:false,error_number:5,error:errors[5]};}
if(!/^(w|b)$/.test(tokens[1])){return{valid:false,error_number:6,error:errors[6]};}
var rows=tokens[0].split('/');if(rows.length!==8){return{valid:false,error_number:7,error:errors[7]};}
for(var i=0;i<rows.length;i++){var sum_fields=0;var previous_was_number=false;for(var k=0;k<rows[i].length;k++){if(!isNaN(rows[i][k])){if(previous_was_number){return{valid:false,error_number:8,error:errors[8]};}
sum_fields+=parseInt(rows[i][k],10);previous_was_number=true;}else{if(!/^[prnbqkPRNBQK]$/.test(rows[i][k])){return{valid:false,error_number:9,error:errors[9]};}
sum_fields+=1;previous_was_number=false;}}
if(sum_fields!==8){return{valid:false,error_number:10,error:errors[10]};}}
if((tokens[3][1]=='3'&&tokens[1]=='w')||(tokens[3][1]=='6'&&tokens[1]=='b')){return{valid:false,error_number:11,error:errors[11]};}
return{valid:true,error_number:0,error:errors[0]};}
function generate_fen(){var empty=0;var fen='';for(var i=SQUARES.a8;i<=SQUARES.h1;i++){if(board[i]==null){empty++;}else{if(empty>0){fen+=empty;empty=0;}
var color=board[i].color;var piece=board[i].type;fen+=(color===WHITE)?piece.toUpperCase():piece.toLowerCase();}
if((i+1)&0x88){if(empty>0){fen+=empty;}
if(i!==SQUARES.h1){fen+='/';}
empty=0;i+=8;}}
var cflags='';if(castling[WHITE]&BITS.KSIDE_CASTLE){cflags+='K';}
if(castling[WHITE]&BITS.QSIDE_CASTLE){cflags+='Q';}
if(castling[BLACK]&BITS.KSIDE_CASTLE){cflags+='k';}
if(castling[BLACK]&BITS.QSIDE_CASTLE){cflags+='q';}
cflags=cflags||'-';var epflags=(ep_square===EMPTY)?'-':algebraic(ep_square);return[fen,turn,cflags,epflags,half_moves,move_number].join(' ');}
function set_header(args){for(var i=0;i<args.length;i+=2){if(typeof args[i]==='string'&&typeof args[i+1]==='string'){header[args[i]]=args[i+1];}}
return header;}
function update_setup(fen){if(history.length>0)return;if(fen!==DEFAULT_POSITION){header['SetUp']='1';header['FEN']=fen;}else{delete header['SetUp'];delete header['FEN'];}}
function get(square){var piece=board[SQUARES[square]];return(piece)?{type:piece.type,color:piece.color}:null;}
function put(piece,square){if(!('type'in piece&&'color'in piece)){return false;}
if(SYMBOLS.indexOf(piece.type.toLowerCase())===-1){return false;}
if(!(square in SQUARES)){return false;}
var sq=SQUARES[square];if(piece.type==KING&&!(kings[piece.color]==EMPTY||kings[piece.color]==sq)){return false;}
board[sq]={type:piece.type,color:piece.color};if(piece.type===KING){kings[piece.color]=sq;}
update_setup(generate_fen());return true;}
function remove(square){var piece=get(square);board[SQUARES[square]]=null;if(piece&&piece.type===KING){kings[piece.color]=EMPTY;}
update_setup(generate_fen());return piece;}
function build_move(board,from,to,flags,promotion){var move={color:turn,from:from,to:to,flags:flags,piece:board[from].type};if(promotion){move.flags|=BITS.PROMOTION;move.promotion=promotion;}
if(board[to]){move.captured=board[to].type;}else if(flags&BITS.EP_CAPTURE){move.captured=PAWN;}
return move;}
function generate_moves(options){function add_move(board,moves,from,to,flags){if(board[from].type===PAWN&&(rank(to)===RANK_8||rank(to)===RANK_1)){var pieces=[QUEEN,ROOK,BISHOP,KNIGHT];for(var i=0,len=pieces.length;i<len;i++){moves.push(build_move(board,from,to,flags,pieces[i]));}}else{moves.push(build_move(board,from,to,flags));}}
var moves=[];var us=turn;var them=swap_color(us);var second_rank={b:RANK_7,w:RANK_2};var first_sq=SQUARES.a8;var last_sq=SQUARES.h1;var single_square=false;var legal=(typeof options!=='undefined'&&'legal'in options)?options.legal:true;if(typeof options!=='undefined'&&'square'in options){if(options.square in SQUARES){first_sq=last_sq=SQUARES[options.square];single_square=true;}else{return[];}}
for(var i=first_sq;i<=last_sq;i++){if(i&0x88){i+=7;continue;}
var piece=board[i];if(piece==null||piece.color!==us){continue;}
if(piece.type===PAWN){var square=i+PAWN_OFFSETS[us][0];if(board[square]==null){add_move(board,moves,i,square,BITS.NORMAL);var square=i+PAWN_OFFSETS[us][1];if(second_rank[us]===rank(i)&&board[square]==null){add_move(board,moves,i,square,BITS.BIG_PAWN);}}
for(j=2;j<4;j++){var square=i+PAWN_OFFSETS[us][j];if(square&0x88)continue;if(board[square]!=null&&board[square].color===them){add_move(board,moves,i,square,BITS.CAPTURE);}else if(square===ep_square){add_move(board,moves,i,ep_square,BITS.EP_CAPTURE);}}}else{for(var j=0,len=PIECE_OFFSETS[piece.type].length;j<len;j++){var offset=PIECE_OFFSETS[piece.type][j];var square=i;while(true){square+=offset;if(square&0x88)break;if(board[square]==null){add_move(board,moves,i,square,BITS.NORMAL);}else{if(board[square].color===us)break;add_move(board,moves,i,square,BITS.CAPTURE);break;}
if(piece.type==='n'||piece.type==='k')break;}}}}
if((!single_square)||last_sq===kings[us]){if(castling[us]&BITS.KSIDE_CASTLE){var castling_from=kings[us];var castling_to=castling_from+2;if(board[castling_from+1]==null&&board[castling_to]==null&&!attacked(them,kings[us])&&!attacked(them,castling_from+1)&&!attacked(them,castling_to)){add_move(board,moves,kings[us],castling_to,BITS.KSIDE_CASTLE);}}
if(castling[us]&BITS.QSIDE_CASTLE){var castling_from=kings[us];var castling_to=castling_from-2;if(board[castling_from-1]==null&&board[castling_from-2]==null&&board[castling_from-3]==null&&!attacked(them,kings[us])&&!attacked(them,castling_from-1)&&!attacked(them,castling_to)){add_move(board,moves,kings[us],castling_to,BITS.QSIDE_CASTLE);}}}
if(!legal){return moves;}
var legal_moves=[];for(var i=0,len=moves.length;i<len;i++){make_move(moves[i]);if(!king_attacked(us)){legal_moves.push(moves[i]);}
undo_move();}
return legal_moves;}
function move_to_san(move,sloppy){var output='';if(move.flags&BITS.KSIDE_CASTLE){output='O-O';}else if(move.flags&BITS.QSIDE_CASTLE){output='O-O-O';}else{var disambiguator=get_disambiguator(move,sloppy);if(move.piece!==PAWN){output+=move.piece.toUpperCase()+disambiguator;}
if(move.flags&(BITS.CAPTURE|BITS.EP_CAPTURE)){if(move.piece===PAWN){output+=algebraic(move.from)[0];}
output+='x';}
output+=algebraic(move.to);if(move.flags&BITS.PROMOTION){output+='='+move.promotion.toUpperCase();}}
make_move(move);if(in_check()){if(in_checkmate()){output+='#';}else{output+='+';}}
undo_move();return output;}
function stripped_san(move){return move.replace(/=/,'').replace(/[+#]?[?!]*$/,'');}
function attacked(color,square){for(var i=SQUARES.a8;i<=SQUARES.h1;i++){if(i&0x88){i+=7;continue;}
if(board[i]==null||board[i].color!==color)continue;var piece=board[i];var difference=i-square;var index=difference+119;if(ATTACKS[index]&(1<<SHIFTS[piece.type])){if(piece.type===PAWN){if(difference>0){if(piece.color===WHITE)return true;}else{if(piece.color===BLACK)return true;}
continue;}
if(piece.type==='n'||piece.type==='k')return true;var offset=RAYS[index];var j=i+offset;var blocked=false;while(j!==square){if(board[j]!=null){blocked=true;break;}
j+=offset;}
if(!blocked)return true;}}
return false;}
function king_attacked(color){return attacked(swap_color(color),kings[color]);}
function in_check(){return king_attacked(turn);}
function in_checkmate(){return in_check()&&generate_moves().length===0;}
function in_stalemate(){return!in_check()&&generate_moves().length===0;}
function insufficient_material(){var pieces={};var bishops=[];var num_pieces=0;var sq_color=0;for(var i=SQUARES.a8;i<=SQUARES.h1;i++){sq_color=(sq_color+1)%2;if(i&0x88){i+=7;continue;}
var piece=board[i];if(piece){pieces[piece.type]=(piece.type in pieces)?pieces[piece.type]+1:1;if(piece.type===BISHOP){bishops.push(sq_color);}
num_pieces++;}}
if(num_pieces===2){return true;}
else if(num_pieces===3&&(pieces[BISHOP]===1||pieces[KNIGHT]===1)){return true;}
else if(num_pieces===pieces[BISHOP]+2){var sum=0;var len=bishops.length;for(var i=0;i<len;i++){sum+=bishops[i];}
if(sum===0||sum===len){return true;}}
return false;}
function in_threefold_repetition(){var moves=[];var positions={};var repetition=false;while(true){var move=undo_move();if(!move)break;moves.push(move);}
while(true){var fen=generate_fen().split(' ').slice(0,4).join(' ');positions[fen]=(fen in positions)?positions[fen]+1:1;if(positions[fen]>=3){repetition=true;}
if(!moves.length){break;}
make_move(moves.pop());}
return repetition;}
function push(move){history.push({move:move,kings:{b:kings.b,w:kings.w},turn:turn,castling:{b:castling.b,w:castling.w},ep_square:ep_square,half_moves:half_moves,move_number:move_number});}
function make_move(move){var us=turn;var them=swap_color(us);push(move);board[move.to]=board[move.from];board[move.from]=null;if(move.flags&BITS.EP_CAPTURE){if(turn===BLACK){board[move.to-16]=null;}else{board[move.to+16]=null;}}
if(move.flags&BITS.PROMOTION){board[move.to]={type:move.promotion,color:us};}
if(board[move.to].type===KING){kings[board[move.to].color]=move.to;if(move.flags&BITS.KSIDE_CASTLE){var castling_to=move.to-1;var castling_from=move.to+1;board[castling_to]=board[castling_from];board[castling_from]=null;}else if(move.flags&BITS.QSIDE_CASTLE){var castling_to=move.to+1;var castling_from=move.to-2;board[castling_to]=board[castling_from];board[castling_from]=null;}
castling[us]='';}
if(castling[us]){for(var i=0,len=ROOKS[us].length;i<len;i++){if(move.from===ROOKS[us][i].square&&castling[us]&ROOKS[us][i].flag){castling[us]^=ROOKS[us][i].flag;break;}}}
if(castling[them]){for(var i=0,len=ROOKS[them].length;i<len;i++){if(move.to===ROOKS[them][i].square&&castling[them]&ROOKS[them][i].flag){castling[them]^=ROOKS[them][i].flag;break;}}}
if(move.flags&BITS.BIG_PAWN){if(turn==='b'){ep_square=move.to-16;}else{ep_square=move.to+16;}}else{ep_square=EMPTY;}
if(move.piece===PAWN){half_moves=0;}else if(move.flags&(BITS.CAPTURE|BITS.EP_CAPTURE)){half_moves=0;}else{half_moves++;}
if(turn===BLACK){move_number++;}
turn=swap_color(turn);}
function undo_move(){var old=history.pop();if(old==null){return null;}
var move=old.move;kings=old.kings;turn=old.turn;castling=old.castling;ep_square=old.ep_square;half_moves=old.half_moves;move_number=old.move_number;var us=turn;var them=swap_color(turn);board[move.from]=board[move.to];board[move.from].type=move.piece;board[move.to]=null;if(move.flags&BITS.CAPTURE){board[move.to]={type:move.captured,color:them};}else if(move.flags&BITS.EP_CAPTURE){var index;if(us===BLACK){index=move.to-16;}else{index=move.to+16;}
board[index]={type:PAWN,color:them};}
if(move.flags&(BITS.KSIDE_CASTLE|BITS.QSIDE_CASTLE)){var castling_to,castling_from;if(move.flags&BITS.KSIDE_CASTLE){castling_to=move.to+1;castling_from=move.to-1;}else if(move.flags&BITS.QSIDE_CASTLE){castling_to=move.to-2;castling_from=move.to+1;}
board[castling_to]=board[castling_from];board[castling_from]=null;}
return move;}
function get_disambiguator(move,sloppy){var moves=generate_moves({legal:!sloppy});var from=move.from;var to=move.to;var piece=move.piece;var ambiguities=0;var same_rank=0;var same_file=0;for(var i=0,len=moves.length;i<len;i++){var ambig_from=moves[i].from;var ambig_to=moves[i].to;var ambig_piece=moves[i].piece;if(piece===ambig_piece&&from!==ambig_from&&to===ambig_to){ambiguities++;if(rank(from)===rank(ambig_from)){same_rank++;}
if(file(from)===file(ambig_from)){same_file++;}}}
if(ambiguities>0){if(same_rank>0&&same_file>0){return algebraic(from);}
else if(same_file>0){return algebraic(from).charAt(1);}
else{return algebraic(from).charAt(0);}}
return'';}
function ascii(){var s='   +------------------------+\n';for(var i=SQUARES.a8;i<=SQUARES.h1;i++){if(file(i)===0){s+=' '+'87654321'[rank(i)]+' |';}
if(board[i]==null){s+=' . ';}else{var piece=board[i].type;var color=board[i].color;var symbol=(color===WHITE)?piece.toUpperCase():piece.toLowerCase();s+=' '+symbol+' ';}
if((i+1)&0x88){s+='|\n';i+=8;}}
s+='   +------------------------+\n';s+='     a  b  c  d  e  f  g  h\n';return s;}
function move_from_san(move,sloppy){var clean_move=stripped_san(move);if(sloppy){var matches=clean_move.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/);if(matches){var piece=matches[1];var from=matches[2];var to=matches[3];var promotion=matches[4];}}
var moves=generate_moves();for(var i=0,len=moves.length;i<len;i++){if((clean_move===stripped_san(move_to_san(moves[i])))||(sloppy&&clean_move===stripped_san(move_to_san(moves[i],true)))){return moves[i];}else{if(matches&&(!piece||piece.toLowerCase()==moves[i].piece)&&SQUARES[from]==moves[i].from&&SQUARES[to]==moves[i].to&&(!promotion||promotion.toLowerCase()==moves[i].promotion)){return moves[i];}}}
return null;}
function rank(i){return i>>4;}
function file(i){return i&15;}
function algebraic(i){var f=file(i),r=rank(i);return'abcdefgh'.substring(f,f+1)+'87654321'.substring(r,r+1);}
function swap_color(c){return c===WHITE?BLACK:WHITE;}
function is_digit(c){return'0123456789'.indexOf(c)!==-1;}
function make_pretty(ugly_move){var move=clone(ugly_move);move.san=move_to_san(move,false);move.to=algebraic(move.to);move.from=algebraic(move.from);var flags='';for(var flag in BITS){if(BITS[flag]&move.flags){flags+=FLAGS[flag];}}
move.flags=flags;return move;}
function clone(obj){var dupe=(obj instanceof Array)?[]:{};for(var property in obj){if(typeof property==='object'){dupe[property]=clone(obj[property]);}else{dupe[property]=obj[property];}}
return dupe;}
function trim(str){return str.replace(/^\s+|\s+$/g,'');}
function perft(depth){var moves=generate_moves({legal:false});var nodes=0;var color=turn;for(var i=0,len=moves.length;i<len;i++){make_move(moves[i]);if(!king_attacked(color)){if(depth-1>0){var child_nodes=perft(depth-1);nodes+=child_nodes;}else{nodes++;}}
undo_move();}
return nodes;}
return{WHITE:WHITE,BLACK:BLACK,PAWN:PAWN,KNIGHT:KNIGHT,BISHOP:BISHOP,ROOK:ROOK,QUEEN:QUEEN,KING:KING,SQUARES:(function(){var keys=[];for(var i=SQUARES.a8;i<=SQUARES.h1;i++){if(i&0x88){i+=7;continue;}
keys.push(algebraic(i));}
return keys;})(),FLAGS:FLAGS,load:function(fen){return load(fen);},reset:function(){return reset();},moves:function(options){var ugly_moves=generate_moves(options);var moves=[];for(var i=0,len=ugly_moves.length;i<len;i++){if(typeof options!=='undefined'&&'verbose'in options&&options.verbose){moves.push(make_pretty(ugly_moves[i]));}else{moves.push(move_to_san(ugly_moves[i],false));}}
return moves;},in_check:function(){return in_check();},in_checkmate:function(){return in_checkmate();},in_stalemate:function(){return in_stalemate();},in_draw:function(){return half_moves>=100||in_stalemate()||insufficient_material()||in_threefold_repetition();},insufficient_material:function(){return insufficient_material();},in_threefold_repetition:function(){return in_threefold_repetition();},game_over:function(){return half_moves>=100||in_checkmate()||in_stalemate()||insufficient_material()||in_threefold_repetition();},validate_fen:function(fen){return validate_fen(fen);},fen:function(){return generate_fen();},pgn:function(options){var newline=(typeof options==='object'&&typeof options.newline_char==='string')?options.newline_char:'\n';var max_width=(typeof options==='object'&&typeof options.max_width==='number')?options.max_width:0;var result=[];var header_exists=false;for(var i in header){result.push('['+i+' \"'+header[i]+'\"]'+newline);header_exists=true;}
if(header_exists&&history.length){result.push(newline);}
var reversed_history=[];while(history.length>0){reversed_history.push(undo_move());}
var moves=[];var move_string='';while(reversed_history.length>0){var move=reversed_history.pop();if(!history.length&&move.color==='b'){move_string=move_number+'. ...';}else if(move.color==='w'){if(move_string.length){moves.push(move_string);}
move_string=move_number+'.';}
move_string=move_string+' '+move_to_san(move,false);make_move(move);}
if(move_string.length){moves.push(move_string);}
if(typeof header.Result!=='undefined'){moves.push(header.Result);}
if(max_width===0){return result.join('')+moves.join(' ');}
var current_width=0;for(var i=0;i<moves.length;i++){if(current_width+moves[i].length>max_width&&i!==0){if(result[result.length-1]===' '){result.pop();}
result.push(newline);current_width=0;}else if(i!==0){result.push(' ');current_width++;}
result.push(moves[i]);current_width+=moves[i].length;}
return result.join('');},load_pgn:function(pgn,options){var sloppy=(typeof options!=='undefined'&&'sloppy'in options)?options.sloppy:false;function mask(str){return str.replace(/\\/g,'\\');}
function has_keys(object){for(var key in object){return true;}
return false;}
function parse_pgn_header(header,options){var newline_char=(typeof options==='object'&&typeof options.newline_char==='string')?options.newline_char:'\r?\n';var header_obj={};var headers=header.split(new RegExp(mask(newline_char)));var key='';var value='';for(var i=0;i<headers.length;i++){key=headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/,'$1');value=headers[i].replace(/^\[[A-Za-z]+\s"(.*)"\]$/,'$1');if(trim(key).length>0){header_obj[key]=value;}}
return header_obj;}
var newline_char=(typeof options==='object'&&typeof options.newline_char==='string')?options.newline_char:'\r?\n';var regex=new RegExp('^(\\[(.|'+mask(newline_char)+')*\\])'+'('+mask(newline_char)+')*'+'1.('+mask(newline_char)+'|.)*$','g');var header_string=pgn.replace(regex,'$1');if(header_string[0]!=='['){header_string='';}
reset();var headers=parse_pgn_header(header_string,options);for(var key in headers){set_header([key,headers[key]]);}
if(headers['SetUp']==='1'){if(!(('FEN'in headers)&&load(headers['FEN']))){return false;}}
var ms=pgn.replace(header_string,'').replace(new RegExp(mask(newline_char),'g'),' ');ms=ms.replace(/(\{[^}]+\})+?/g,'');var rav_regex=/(\([^\(\)]+\))+?/g
while(rav_regex.test(ms)){ms=ms.replace(rav_regex,'');}
ms=ms.replace(/\d+\.(\.\.)?/g,'');ms=ms.replace(/\.\.\./g,'');ms=ms.replace(/\$\d+/g,'');var moves=trim(ms).split(new RegExp(/\s+/));moves=moves.join(',').replace(/,,+/g,',').split(',');var move='';for(var half_move=0;half_move<moves.length-1;half_move++){move=move_from_san(moves[half_move],sloppy);if(move==null){return false;}else{make_move(move);}}
move=moves[moves.length-1];if(POSSIBLE_RESULTS.indexOf(move)>-1){if(has_keys(header)&&typeof header.Result==='undefined'){set_header(['Result',move]);}}
else{move=move_from_san(move,sloppy);if(move==null){return false;}else{make_move(move);}}
return true;},header:function(){return set_header(arguments);},ascii:function(){return ascii();},turn:function(){return turn;},move:function(move,options){var sloppy=(typeof options!=='undefined'&&'sloppy'in options)?options.sloppy:false;var move_obj=null;if(typeof move==='string'){move_obj=move_from_san(move,sloppy);}else if(typeof move==='object'){var moves=generate_moves();for(var i=0,len=moves.length;i<len;i++){if(move.from===algebraic(moves[i].from)&&move.to===algebraic(moves[i].to)&&(!('promotion'in moves[i])||move.promotion===moves[i].promotion)){move_obj=moves[i];break;}}}
if(!move_obj){return null;}
var pretty_move=make_pretty(move_obj);make_move(move_obj);return pretty_move;},undo:function(){var move=undo_move();return(move)?make_pretty(move):null;},clear:function(){return clear();},put:function(piece,square){return put(piece,square);},get:function(square){return get(square);},remove:function(square){return remove(square);},perft:function(depth){return perft(depth);},square_color:function(square){if(square in SQUARES){var sq_0x88=SQUARES[square];return((rank(sq_0x88)+file(sq_0x88))%2===0)?'light':'dark';}
return null;},history:function(options){var reversed_history=[];var move_history=[];var verbose=(typeof options!=='undefined'&&'verbose'in options&&options.verbose);while(history.length>0){reversed_history.push(undo_move());}
while(reversed_history.length>0){var move=reversed_history.pop();if(verbose){move_history.push(make_pretty(move));}else{move_history.push(move_to_san(move));}
make_move(move);}
return move_history;}};};if(typeof exports!=='undefined')exports.Chess=Chess;if(typeof define!=='undefined')define(function(){return Chess;});/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class represents a piece on the board: color, type The instance also has
  a data field that could be used for private data attached to the piece.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var BoardPiece = Class.create(/** @lends BoardPiece.prototype */{
  /**
    constructs a new object.
    @this {BoardPiece}
    @param {string} color color of this piece (black/white).
    @param {string} type type of this piece
    (rook/knight/bishop/queen/king/pawn).
    @return {BoardPiece} the new object created.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(color, type) {
    this.color = color;
    this.type = type;
    this.data = undefined;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {BoardPiece}
    @return {string} string representation of this object.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return 'BoardPiece: ' + [this.color, this.type, this.data].join();
  },
  /**
    Method to set secret data for this piece
    @this {BoardPiece}
    @param {anything} data the extra data to hold for this piece.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  setData: function(data) {
    this.data = data;
  },
  /**
    Method to get secret data for this piece
    @this {BoardPiece}
    @return {anything} the secret data associated with this piece.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getData: function() {
    return this.data;
  },
  /**
    Method to unset secret data for this piece
    @this {BoardPiece}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  unsetData: function() {
    this.data = undefined;
  }
});
/* vim:set filetype=javascript:*/
/*jsl:import BoardPiece.js*/
/*jsl:import PieceColor.js*/
/*jsl:import PieceType.js*/
/*jsl:import PiecePosition.js*/
/*global Class, BoardPiece, PieceColor, PieceType, PiecePosition */


/**
  @class represents a full position of the board
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var BoardPosition = Class.create(/** @lends BoardPosition.prototype */{
  /**
    constructs a new object
    @this {BoardPosition}
    @return {BoardPosition} a new object of this type.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
    this.pieces = [];
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {BoardPosition}
    @return {string} a string representation of this object.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return this.pieces.join();
  },
  /**
    Add a piece to the position
    @this {BoardPosition}
    @param {string} color the color of the piece (black/white).
    @param {string} type the type of the piece
    (rook/knight/bishop/queen/king/pawn).
    @param {number} x the x position of the piece [0..8).
    @param {number} y the y position of the piece [0..8).
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  addPiece: function(color, type, x, y) {
    var boardPiece = new BoardPiece(new PieceColor(color), new PieceType(type));
    var piecePosition = new PiecePosition(x, y);
    this.pieces.push([boardPiece, piecePosition]);
  },
  /**
    Run a function for each piece in this position
    @this {BoardPosition}
    @param {function()} f function to run getting each piece in turn.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  forEachPiece: function(f) {
    this.pieces.forEach(function(pieceAndPos) {
      var boardPiece = pieceAndPos[0];
      var position = pieceAndPos[1];
      f(boardPiece, position);
    });
  }
});


/**
  Static method that returns a starting position in standard chess.
  @return {BoardPosition} A standard chess starting position.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
BoardPosition.startPos = function() {
  /*
  var newPos=new BoardPosition();
  newPos.addPiece('white','rook',0,0);
  newPos.addPiece('white','knight',1,0);
  newPos.addPiece('white','bishop',2,0);
  newPos.addPiece('white','queen',3,0);
  newPos.addPiece('white','king',4,0);
  newPos.addPiece('white','bishop',5,0);
  newPos.addPiece('white','knight',6,0);
  newPos.addPiece('white','rook',7,0);
  newPos.addPiece('white','pawn',0,1);
  newPos.addPiece('white','pawn',1,1);
  newPos.addPiece('white','pawn',2,1);
  newPos.addPiece('white','pawn',3,1);
  newPos.addPiece('white','pawn',4,1);
  newPos.addPiece('white','pawn',5,1);
  newPos.addPiece('white','pawn',6,1);
  newPos.addPiece('white','pawn',7,1);

  newPos.addPiece('black','rook',0,7);
  newPos.addPiece('black','knight',1,7);
  newPos.addPiece('black','bishop',2,7);
  newPos.addPiece('black','queen',3,7);
  newPos.addPiece('black','king',4,7);
  newPos.addPiece('black','bishop',5,7);
  newPos.addPiece('black','knight',6,7);
  newPos.addPiece('black','rook',7,7);
  newPos.addPiece('black','pawn',0,6);
  newPos.addPiece('black','pawn',1,6);
  newPos.addPiece('black','pawn',2,6);
  newPos.addPiece('black','pawn',3,6);
  newPos.addPiece('black','pawn',4,6);
  newPos.addPiece('black','pawn',5,6);
  newPos.addPiece('black','pawn',6,6);
  newPos.addPiece('black','pawn',7,6);
  return newPos;
  */
  return BoardPosition.setupFEN(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  );
};


/**
  Setup a position according to FEN notation.
  See Forsyth–Edwards Notation in wikipedia for more details.
  Example of start position is:
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  @param {string} fen a string describing a chess board position in FEN
  notation.
  @return {BoardPosition} A position object corresponding to the FEN
  notation given.
  @author mark.veltzer@gmail.com (Mark Veltzer)
  TODO
  - add more sanity tests (regexp) for the whole input.
  - parse the 5 other blocks after the position itself
  (what do I do with that ?!?).
*/
BoardPosition.setupFEN = function(fen) {
  var irank, iletter, rank, letter;
  var blocks = fen.split(' ');
  if (blocks.length !== 6) {
    throw 'parse error - number of blocks is not 6';
  }
  var ranks = blocks[0].split('/');
  if (ranks.length !== 8) {
    throw 'parse error - number of ranks is not 8';
  }
  var newPos = new BoardPosition();
  for (irank = 7; irank >= 0; irank--) {
    rank = ranks[7 - irank];
    for (iletter = 0; iletter < rank.length; iletter++) {
      letter = rank[iletter];
      switch (letter) {
        case 'r':
          newPos.addPiece('black', 'rook', iletter, irank);
          break;
        case 'R':
          newPos.addPiece('white', 'rook', iletter, irank);
          break;
        case 'n':
          newPos.addPiece('black', 'knight', iletter, irank);
          break;
        case 'N':
          newPos.addPiece('white', 'knight', iletter, irank);
          break;
        case 'b':
          newPos.addPiece('black', 'bishop', iletter, irank);
          break;
        case 'B':
          newPos.addPiece('white', 'bishop', iletter, irank);
          break;
        case 'q':
          newPos.addPiece('black', 'queen', iletter, irank);
          break;
        case 'Q':
          newPos.addPiece('white', 'queen', iletter, irank);
          break;
        case 'k':
          newPos.addPiece('black', 'king', iletter, irank);
          break;
        case 'K':
          newPos.addPiece('white', 'king', iletter, irank);
          break;
        case 'p':
          newPos.addPiece('black', 'pawn', iletter, irank);
          break;
        case 'P':
          newPos.addPiece('white', 'pawn', iletter, irank);
          break;
        default:
          iletter += Number(letter) - 1;
          break;
      }
    }
  }
  return newPos;
};
/* vim:set filetype=javascript:*/
/*jsl:import Utils.js*/
/*global Class */


/**
  @class Type safe config class
  The config class is basically a fancy dictionary. The difference
  between it and a dictionary is that it consults a template object
  when setting and getting a value.
  - When setting a value it makes sure that you are giving a name
  of a parameter that exists in the template and that the value
  that you gave to the parameter is correctly converted to the
  type expected.
  - When getting a value it makes sure you use the right name for
  the key.
  The idea is that the user will not be able to accidently put config
  options which are not used and will only be able to supply the right
  types.
  In addition, some config options will <b>have</b> to be supplied by the user
  (div id where to create some HTML elements is an example of this).
  Config will also supply a method by which config options by the user
  will override anything in the default config.
  This class <b>should not</b> be a singleton since the user may want to put
  two boards on the page and have each configured differently.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var Config = Class.create(/** @lends Config.prototype */{
  /**
    creates a new instance.
    @this {Config}
    @param {object} tmpl template to use.
    @return {Config} new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(tmpl) {
    // the dictionary holding the current config
    this.d = {};
    // the template to be used
    this.tmpl = tmpl;
  },
  /**
    get a value for a key.
    @this {Config}
    @param {anything} key key to store in the config.
    @return {anything} the value associated with the key.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getValue: function(key) {
    if (this.tmpl.hasKey(key)) {
      if (this.d[key] !== undefined) {
        return this.d[key];
      }
      return this.tmpl.getDefaultValue(key);
    }
    throw 'request for bad key [' + key + ']';
  },
  /**
    set a key to a certain value in the current configuration
    @this {Config}
    @param {anything} key key to store in the config.
    @param {anything} value value to store in the config.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  setValue: function(key, value) {
    // check that the key and value are ok.
    this.tmpl.check(key, value);
    this.d[key] = value;
  },
  /**
    set many values at once
    @this {Config}
    @param {object} d dictionary of values.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  override: function(d) {
    var x;
    for (x in d) {
      this.setValue(x, d[x]);
    }
  },
  /**
    check that the config is good to go
    for instance: check that all required arguments are set
    @this {Config}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  check: function() {
    // TODO
    return;
  }
});
/* vim:set filetype=javascript:*/
/*jsl:import Utils.js*/
/*global Utils, Class */


/**
  @class Type safe config class
  This is a configuration template, it has, for each configuration key,
  the following:
  - the key itself (string).
  - the type of the value for that key.
  - the default value for the key (of the same type).
  - an optional validation function.
  - is this option required
  - description of the option
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var ConfigTmpl = Class.create(/** @lends ConfigTmpl.prototype */{
  /**
    create a new instance of this class.
    @this {ConfigTmpl}
    @return {ConfigTmpl} a new instance of this class.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
    // the dictionary holding the current config
    this.tuples = {};
    this.tuplist = [];
  },
  /**
    add another option to this template
    @this {ConfigTmpl}
    @param {object} s config option with all needed properties.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  add: function(s) {
    Utils.checkEquals(s, ConfigTmpl.fullSet);
    if (!(ConfigTmpl.types.hasOwnProperty(s.type))) {
      throw 'bad type [' + s.type + ']';
    }
    if (this.tuples.hasOwnProperty(s.name)) {
      throw 'repeat of key [' + s.name + ']';
    }
    this.tuples[s.name] = s;
    this.tuplist.push(s);
  },
  /**
    check that a key,value combo is ok
    This method will throw an exception if it finds anything wrong.
    @this {ConfigTmpl}
    @param {string} key key to check.
    @param {anything} value value to check.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  check: function(key, value) {
    if (!(this.tuples.hasOwnProperty(key))) {
      throw 'wrong key [' + key + ']';
    }
    var type_to_check = this.tuples[key].type;
    var our_type = ConfigTmpl.types[type_to_check];
    Utils.checkType(value, our_type);
  },
  /**
    return whether the template has a key
    @this {ConfigTmpl}
    @param {string} key the key to check.
    @return {boolean} is the key part of this config template.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  hasKey: function(key) {
    return this.tuples.hasOwnProperty(key);
  },
  /**
    return the default value for a key
    @this {ConfigTmpl}
    @param {string} key the key to fetch the value for.
    @return {anything} the default value for the given key.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getDefaultValue: function(key) {
    return this.tuples[key].defaultValue;
  },
  /**
    show HTML that lists all config options for the current template
    @this {ConfigTmpl}
    @return {string} HTML representation of this config template.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getHTML: function() {
    var shtml = '';
    shtml += '<table border=\'1\'>';
    shtml += '<tr>';
    shtml += '<td>name</td>';
    shtml += '<td>type</td>';
    shtml += '<td>required</td>';
    shtml += '<td>description</td>';
    shtml += '<td>defaultValue</td>';
    shtml += '</tr>';
    this.tuplist.forEach(function(e) {
      shtml += '<tr>';
      shtml += '<td>' + e.name + '</td>';
      shtml += '<td>' + e.type + '</td>';
      shtml += '<td>' + e.required + '</td>';
      shtml += '<td>' + e.description + '</td>';
      shtml += '<td>' + e.defaultValue + '</td>';
      shtml += '</tr>';
    });
    shtml += '</table>';
    return shtml;
  }
});


/**
  All needed properties for each config option.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
ConfigTmpl.fullSet = {
  name: undefined,
  type: undefined,
  required: undefined,
  description: undefined,
  defaultValue: undefined
};


/**
  All allowed types for config options.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
ConfigTmpl.types = {
  t_string: 'string',
  t_number: 'number',
  t_boolean: 'boolean'
};
/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class A full game of chess. Contains the starting position
  including a full set of moves of type GameMove.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var Game = Class.create(/** @lends Game.prototype */{
  /**
    creates a new instance of this class.
    @return {Game} new instance of this class.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
    return;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @return {string} string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return 'no toString for type Game';
  }
});
/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class A single move in a game
  contains the position from which the move starts,
  the position where it ends, the piecetype and color doing the
  moving.
  Also potentially more things:
  - A piece which was removed as a result of this move and its
  position before the capture (the position is needed since the piece
  could be in a different position than the capturing position like
  in en passant).
  - info about whether this was a 0-0 or 0-0-0 (all other info
  needed for castling).
  - info about what the piece turns to (in case the piece turns
  into some other piece like in the case of coronation).
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var GameMove = Class.create(/** @lends GameMove.prototype */{
  /**
    creates a new instance
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
    return;
  },
  /**
    Debug method that allows you to get a nice printout for this type
    @return {string} the string representation
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return 'no toString for type GameMove';
  }
});
/* vim:set filetype=javascript:*/
/*jsl:import Utils.js*/
/*global Ajax, Class, Chess, Utils */


/**
  @class A PGN reader. A class that knows how to read a PGN file and give
  instructions to a board.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var PgnReader = Class.create(/** @lends PgnReader.prototype */{
  /**
    creates a new instance
    @return {PgnReader} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
    return;
  },
  /**
    toString method so that you can get a nice printout of instances of
    this type
    @return {string} string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    throw 'toString for PgnReader not implemented yet';
  },
  /**
    A method to read a pgn file via ajax.
    @param {string} url url to do the GET from (same server).
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  get: function(url) {
    //Utils.fakeUse(url);
    // we use prototype to do HTTP GET
    var req = new Ajax.Request(url, {
      method: 'get',
      onSuccess: function(transport) {
        var response = transport.responseText;
        //console.log('got response ' + response);
        var chess = new Chess();
        chess.load_pgn(response);
        console.log(chess.history({ verbose: true }));
      },
      onFailure: function(transport) {
        console.log('error in transport for url ' + url);
        console.dir(transport);
      }
    });
    Utils.fakeUse(req);
  }
});
/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class represents a piece color (white,black)
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var PieceColor = Class.create(/** @lends PieceColor.prototype */{
  /**
    creates a new instance
    @this {PieceColor}
    @param {string} color string which represents
    the color of the piece. Must be one of 'white' or 'black'.
    @return {PieceColor} new instance of this class.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(color) {
    if (!(PieceColor.colors.hasOwnProperty(color))) {
      throw 'illegal piecetype ' + color;
    }
    this.color = color;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {PieceColor}
    @return {string} string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return this.color;
  },
  /**
    Return whether the piece is white
    @this {PieceColor}
    @return {boolean} boolean indicating whether the piece is white.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isWhite: function() {
    return this.color === 'white';
  },
  /**
    Return whether the piece is black
    @this {PieceColor}
    @return {boolean} boolean indicating whether the piece is black.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isBlack: function() {
    return this.color === 'black';
  }
});


/**
  Array of piece colors
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
PieceColor.colors = {
  white: undefined,
  black: undefined
};
/* vim:set filetype=javascript:*/
/*jsl:import Utils.js*/
/*global Class, Utils */


/**
  @class represents a position on the board
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var PiecePosition = Class.create(/** @lends PiecePosition.prototype */{
  /**
    creates a new instance
    @this {PiecePosition}
    @param {number} x x co-ordinate.
    @param {number} y y co-ordinate.
    @return {PiecePosition} the new instance of this class.
    The method checks if the values given to it are in the 0..7 range.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(x, y) {
    Utils.checkType(x, 'number');
    Utils.checkType(y, 'number');
    if (x < 0 || x > 7) {
      throw 'bad value for x ' + x + ',' + typeof x;
    }
    if (y < 0 || y > 7) {
      throw 'bad value for y ' + y + ',' + typeof y;
    }
    this.x = x;
    this.y = y;
  },
  /**
    toString method so that you can get a nice printout of
    instances of this type
    @this {PiecePosition}
    @return {string} the string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return 'PiecePosition: (' + this.x + ',' + this.y + ')';
  },
  /**
    compare one position to another
    @this {PiecePosition}
    @param {PiecePosition} otherPos the position to compare to
    @return {boolean} is this position to some other position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  notEqual: function(otherPos) {
    if (!(otherPos instanceof PiecePosition)) {
      throw 'bad type passed';
    }
    return otherPos.x !== this.x || otherPos.y !== this.y;
  },
  /**
    compare one position to another
    @this {PiecePosition}
    @param {PiecePosition} otherPos the position to compare to
    @return {boolean} is this position to some other position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  equal: function(otherPos) {
    if (!(otherPos instanceof PiecePosition)) {
      throw 'bad type passed';
    }
    return otherPos.x === this.x && otherPos.y === this.y;
  }
});
/* vim:set filetype=javascript:*/
/*global Class*/


/**
  @class represents a piece type (rook,knight,bishop,queen,king,pawn)
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var PieceType = Class.create(/** @lends PieceType.prototype */{
  /**
    creates a new instance
    @this {PieceType}
    @param {string} type the type of the piece.
    @return {PieceType} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(type) {
    if (!(PieceType.types.hasOwnProperty(type))) {
      throw 'illegal piecetype ' + type;
    }
    this.type = type;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {PieceType}
    @return {string} string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return this.type;
  },
  /**
    Return whether the piece is a rook
    @this {PieceType}
    @return {boolean} is this piece a rook.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isRook: function() {
    return this.type === 'rook';
  },
  /**
    Return whether the piece is a knight
    @this {PieceType}
    @return {boolean} is this piece a knight.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isKnight: function() {
    return this.type === 'knight';
  },
  /**
    Return whether the piece is a bishop
    @this {PieceType}
    @return {boolean} is this piece a bishop.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isBishop: function() {
    return this.type === 'bishop';
  },
  /**
    Return whether the piece is a queen
    @this {PieceType}
    @return {boolean} is this piece a queen.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isQueen: function() {
    return this.type === 'queen';
  },
  /**
    Return whether the piece is a king
    @this {PieceType}
    @return {boolean} is this piece a king.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isKing: function() {
    return this.type === 'king';
  },
  /**
    Return whether the piece is a pawn
    @this {PieceType}
    @return {boolean} is this piece a pawn.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  isPawn: function() {
    return this.type === 'pawn';
  }
});


/**
  Array of piece types
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
PieceType.types = {
  rook: undefined,
  knight: undefined,
  bishop: undefined,
  queen: undefined,
  king: undefined,
  pawn: undefined
};
/* vim:set filetype=javascript:*/
/*jsl:import ConfigTmpl.js*/
/*global ConfigTmpl, Class */


/**
  @class Singleton configuration for jschess
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var SvgConfigTmpl = Class.create(ConfigTmpl,/** @lends SvgConfigTmpl.prototype */ {
  /**
    creates a new instance
    @this {SvgConfigTmpl}
    @param {parent} $super prototype.js parent to enable to call the
    parent constructur.
    @return {SvgConfigTmpl} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function($super) {
    $super();
    this.add({
      name: 'id',
      type: 't_string',
      required: true,
      description: 'id where to place the board',
      defaultValue: undefined
    });
    this.add({
      name: 'size',
      type: 't_number',
      required: false,
      description: 'size of the board',
      defaultValue: 500
    });
    this.add({
      name: 'black_color',
      type: 't_string',
      required: false,
      description: 'color of the black pieces',
      defaultValue: '#000000'
    });
    this.add({
      name: 'white_color',
      type: 't_string',
      required: false,
      description: 'color of the white pieces',
      defaultValue: '#ffffff'
    });
    this.add({
      name: 'black_square_color',
      type: 't_string',
      required: false,
      description: 'color of the black squares',
      defaultValue: '#819faa'
    });
    this.add({
      name: 'white_square_color',
      type: 't_string',
      required: false,
      description: 'color of the white squares',
      defaultValue: '#ffffff'
    });
    this.add({
      name: 'black_square_gradient',
      type: 't_string',
      required: false,
      description: 'gradient for black squares',
      defaultValue: '0-#91afba:0-#819faa:50-#819faa:100'
    });
    this.add({
      name: 'white_square_gradient',
      type: 't_string',
      required: false,
      description: 'gradient for white squares',
      defaultValue: '0-#eee:0-#fff:50-#fff:100'
    });
    // TODO: turn this to an enum: white, black, left, right
    this.add({
      name: 'boardview',
      type: 't_string',
      required: false,
      description: 'what board view to use',
      defaultValue: 'white'
    });
    this.add({
      name: 'move_ms',
      type: 't_number',
      required: false,
      description: 'ms for moving animation',
      defaultValue: 350
    });
    this.add({
      name: 'flip_ms',
      type: 't_number',
      required: false,
      description: 'how fast should flip work in ms',
      defaultValue: 350
    });
    this.add({
      name: 'pencolor',
      type: 't_string',
      required: false,
      description: 'pen color for drawing the shapes',
      defaultValue: 'black'
    });
    this.add({
      name: 'gradients',
      type: 't_boolean',
      required: false,
      description: 'should we use gradients?',
      defaultValue: true
    });
    this.add({
      name: 'select_color',
      type: 't_string',
      required: false,
      description: 'color of selected squares',
      defaultValue: '#ffff00'
    });
    this.add({
      name: 'over_color',
      type: 't_string',
      required: false,
      description: 'color of selected squares',
      defaultValue: '#00ff00'
    });
    this.add({
      name: 'do_select_click',
      type: 't_boolean',
      required: false,
      description: 'should we select clicks',
      defaultValue: false
    });
    this.add({
      name: 'do_select_square',
      type: 't_boolean',
      required: false,
      description: 'should we select squares',
      defaultValue: true
    });
    this.add({
      name: 'do_select_piece',
      type: 't_boolean',
      required: false,
      description: 'should we select pieces',
      defaultValue: true
    });
    this.add({
      name: 'do_select_global',
      type: 't_boolean',
      required: false,
      description: 'should we select pieces via the global variables',
      defaultValue: false
    });
    this.add({
      name: 'do_select_piecerec',
      type: 't_boolean',
      required: false,
      description: 'should we select pieces via the global variables',
      defaultValue: false
    });
    this.add({
      name: 'do_letters',
      type: 't_boolean',
      required: false,
      description: 'draw letters around the board',
      defaultValue: true
    });
    this.add({
      name: 'rec_stroke_color',
      type: 't_string',
      required: false,
      description: 'rectangles stroke color',
      defaultValue: 'black'
    });
    this.add({
      name: 'rec_stroke_width',
      type: 't_number',
      required: false,
      description: 'rectangles stroke width',
      defaultValue: 0.1
    });
    this.add({
      name: 'glow_width',
      type: 't_number',
      required: false,
      description: 'glow width',
      defaultValue: 7
    });
    this.add({
      name: 'glow_fill',
      type: 't_boolean',
      required: false,
      description: 'glow fill',
      defaultValue: false
    });
    this.add({
      name: 'glow_opacity',
      type: 't_number',
      required: false,
      description: 'glow opacity',
      defaultValue: 0.5
    });
    this.add({
      name: 'glow_offsetx',
      type: 't_number',
      required: false,
      description: 'glow offsetx',
      defaultValue: 0
    });
    this.add({
      name: 'glow_offsety',
      type: 't_number',
      required: false,
      description: 'glow offsety',
      defaultValue: 0
    });
    this.add({
      name: 'glow_color',
      type: 't_string',
      required: false,
      description: 'glow color',
      defaultValue: 'black'
    });
    this.add({
      name: 'partial',
      type: 't_number',
      required: false,
      description: 'how many squares for borders',
      defaultValue: 0.6
    });
  }
});


/**
  The static singleton instance.
  This is part of the singleton pattern.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
SvgConfigTmpl.instance = undefined;


/**
  The static singleton instance.
  This is part of the singleton pattern.
  @return {SvgConfigTmpl} the singleton SvgConfigTmpl instance.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
SvgConfigTmpl.getInstance = function() {
  if (SvgConfigTmpl.instance === undefined) {
    SvgConfigTmpl.instance = new SvgConfigTmpl();
  }
  return SvgConfigTmpl.instance;
};
/* vim:set filetype=javascript:*/
/*jsl:import SvgPieceData.js*/
/*jsl:import SvgCreator.js*/
/*jsl:import SvgPixelPosition.js*/
/*jsl:import PiecePosition.js*/
/*jsl:import Board.js*/
/*jsl:import WRaphael.js*/
/*jsl:import Utils.js*/
/*jsl:import Config.js*/
/*jsl:import SvgConfigTmpl.js*/
/*global Class, Config, SvgConfigTmpl, $, WRaphael, Utils, Raphael, PiecePosition, SvgPieceData, SvgCreator, SvgPixelPosition */


/**
  @class a whole board to play with
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var SvgBoard = Class.create(/** @lends SvgBoard.prototype */{
  /**
    creates a new instance
    @this {SvgBoard}
    @param {Board} board instance to use as the abstract board.
    @param {object} dict overridables to the configuration for this object.
    @return {SvgBoard} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(board, dict) {
    // lets create a config connected to our singleton template
    this.config = new Config(SvgConfigTmpl.getInstance());
    // lets override with user preferences
    this.config.override(dict);
    // lets check the config
    this.config.check();
    // now we are ready to go...
    // get RW vars from the config
    this.boardview = this.getValue('boardview');
    this.size = this.getValue('size');
    if (this.getValue('do_letters')) {
      var partial = this.getValue('partial');
      this.square = this.getValue('size') / (8 + partial);
      this.offX = this.square * (partial / 2);
      this.offY = this.square * (partial / 2);
    } else {
      this.square = this.getValue('size') / 8.0;
      this.offX = 0;
      this.offY = 0;
    }
    // real code starts here
    this.board = board;
    this.raphaelPrep();
    this.drawBoard();
    if (this.getValue('do_letters')) {
      this.drawBorder();
    }
    // hook the board to our graphics
    var that = this;
    this.board.addPiecePostAddCallback(function(boardPiece, piecePosition) {
      that.postAddPiece(boardPiece, piecePosition);
    });
    this.board.addPiecePostRemoveCallback(function(boardPiece, piecePosition) {
      that.postRemovePiece(boardPiece, piecePosition);
    });
    this.board.addPiecePostMoveCallback(function(boardPiece, fromPos, toPos) {
      that.postMovePiece(boardPiece, fromPos, toPos);
    });
    this.overlay();
    // build the glow object
    this.glow_obj = {};
    this.glow_obj.width = this.getValue('glow_width');
    this.glow_obj.fill = this.getValue('glow_fill');
    this.glow_obj.opacity = this.getValue('glow_opacity');
    this.glow_obj.offsetx = this.getValue('glow_offsetx');
    this.glow_obj.offsety = this.getValue('glow_offsety');
    this.glow_obj.color = this.getValue('glow_color');
    // selection variables
    // last board position
    this.lastPos = undefined;
    // current board position
    this.currentPos = undefined;
    // selected piece
    this.selectedPiece = undefined;
    // selected rec
    this.selectedRec = undefined;
  },
  /**
    get the logical board [Board] associated with this SvgBoard
    @this {SvgBoard}
    @return {Board} the logical board associated with this SvgBoard.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getBoard: function() {
    return this.board;
  },
  /**
    get the config value for a key
    @this {SvgBoard}
    @param {string} key the key to get the config for.
    @return {anything} the value of the configuration option.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getValue: function(key) {
    return this.config.getValue(key);
  },
  /**
    Prepare the raphael paper so we could do graphics
    @this {SvgBoard}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  raphaelPrep: function() {
    // async way
    /*
    var widget=this
    Raphael(this.getValue('id'),this.getValue('size'),
        this.getValue('size'),function() {
      widget.paper=this
      widget.drawBoard()
    })
    */
    // sync way
    this.paper = new WRaphael(
        this.getValue('id'),
        this.getValue('size'),
        this.getValue('size'));
    /*
    this.paper=Raphael(
        this.getValue('id'),
        this.getValue('size'),
        this.getValue('size'));
    */
    this.elem = $(this.getValue('id'));
    var offset = this.elem.cumulativeOffset();
    this.startX = offset.left;
    this.startY = offset.top;
  },
  /**
    Fill a rectangle using the default color
    This method must take board rotation into consideration
    It currently doesn't because the board looks the same in terms
    of white/black square when you totally flip it. If we ever support
    90% flips then this method must be modified.
    @this {SvgBoard}
    @param {rect} rec Raphael.js rectangle object to fill.
    @param {boolean} anim do you want animation (slow transition).
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  rectFill: function(rec, anim) {
    var piecePosition = rec.data('pos');
    var mod;
    if (this.boardview === 'white' || this.boardview === 'black') {
      mod = 1;
    } else {
      mod = 0;
    }
    var val;
    if ((piecePosition.x + piecePosition.y) % 2 === mod) {
      if (this.getValue('gradients')) {
        val = this.getValue('white_square_gradient');
      } else {
        val = this.getValue('white_square_color');
      }
    } else {
      if (this.getValue('gradients')) {
        val = this.getValue('black_square_gradient');
      } else {
        val = this.getValue('black_square_color');
      }
    }
    if (anim) {
      // TODO: animation with gradients looks bad
      if (this.getValue('gradients')) {
        rec.attr('fill', val);
      } else {
        var ms = this.getValue('move_ms');
        rec.animate({fill: val},ms);
      }
    } else {
      rec.attr('fill', val);
    }
  },
  /**
    Draw the border
    @this {SvgBoard}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  drawBorder: function() {
    var x, y, txt1, txt2, txt3, txt4;
    var part = 0.5;
    var partial = this.getValue('partial');
    this.texts = [];
    for (y = 0; y < 8; y++) {
      txt1 = this.paper.text(
          this.square * (partial / 2) * part,
          (y + 0.5) * this.square + this.offY,
          8 - y);
      this.texts.push(txt1);
      txt2 = this.paper.text(
          this.offX + this.square * 8.0 + this.square * (partial / 2) * part,
          (y + 0.5) * this.square + this.offY,
          8 - y);
      this.texts.push(txt2);
    }
    for (x = 0; x < 8; x++) {
      txt3 = this.paper.text(
          (x + 0.5) * this.square + this.offX,
          this.square * (partial / 2) * part,
          String.fromCharCode(x + 'A'.charCodeAt(0)));
      this.texts.push(txt3);
      txt4 = this.paper.text(
          (x + 0.5) * this.square + this.offX,
          this.offY + this.square * 8.0 + this.square * (partial / 2) * part,
          String.fromCharCode(x + 'A'.charCodeAt(0)));
      this.texts.push(txt4);
    }
  },
  /**
    Translate a position from a rectangle position
    to a logical position according to board rotation.
    @this {SvgBoard}
    @param {PiecePosition} pos the position to translate.
    @return {PiecePosition} the logical position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  translatePos: function(pos) {
    if (this.boardview === 'white') {
      return new PiecePosition(pos.x, pos.y);
    }
    if (this.boardview === 'black') {
      return new PiecePosition(7 - pos.x, 7 - pos.y);
    }
    if (this.boardview === 'left') {
      return new PiecePosition(pos.y, pos.x);
    }
    if (this.boardview === 'right') {
      return new PiecePosition(7 - pos.y, 7 - pos.x);
    }
    throw 'boardview is not correct';
  },
  /**
    Draw the board (white and black squares)
    @this {SvgBoard}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  drawBoard: function() {
    var x, y, rec_line, rec, piecePosition;
    var that = this;
    var f = function(tpos, trec, type) {
      return function() {
        var ttpos = that.translatePos(tpos);
        that.eventPosition(ttpos, trec, type);
      };
    };
    this.recs = [];
    for (x = 0; x < 8; x++) {
      rec_line = [];
      for (y = 0; y < 8; y++) {
        rec = this.paper.rect(
            x * this.square + this.offX,
            y * this.square + this.offY,
            this.square,
            this.square);
        rec.attr({
          stroke: this.getValue('rec_stroke_color'),
          'stroke-width': this.getValue('rec_stroke_width')
        });
        rec_line.push(rec);
        piecePosition = new PiecePosition(x, 7 - y);
        rec.data('pos', piecePosition);
        this.rectFill(rec, false);
        rec.click(f(piecePosition, rec, 'click'));
        rec.mousedown(f(piecePosition, rec, 'mousedown'));
        /* rec.mousemove(f(piecePosition, rec, 'mousemove')); */
        rec.mouseout(f(piecePosition, rec, 'mouseout'));
        rec.mouseover(f(piecePosition, rec, 'mouseover'));
        rec.mouseup(f(piecePosition, rec, 'mouseup'));
      }
      rec_line.reverse();
      this.recs.push(rec_line);
    }
  },
  /**
    Create an overlay rectange for the entire board
    @this {SvgBoard}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  overlay: function() {
    if (this.getValue('do_select_global')) {
      var that = this;
      var delta = 0;
      var rec = this.paper.rect(this.offX + delta, this.offY + delta,
          this.square * 8.0 - delta, this.square * 8.0 - delta);
      rec.attr({fill: Raphael.getColor()});
      rec.attr({opacity: 0.0});
      /*
      rec.mousemove(function(evt, x, y) {
        that.eventGlobal(evt,x-that.startX-that.offX,y-that.startY-that.offY,'mousemove');
      });
      */
      rec.mouseover(function(evt, x, y) {
        that.eventGlobal(evt, x - that.startX - that.offX,
            y - that.startY - that.offY, 'mouseover');
      });
      rec.mouseout(function(evt, x, y) {
        that.eventGlobal(evt, x - that.startX - that.offX,
            y - that.startY - that.offY, 'mouseout');
      });
      rec.toFront();
      this.fullRec = rec;
    }
    /*
    if(this.getValue('do_select_piecerec')) {
      var rec_out=this.paper.rect(this.offX+delta,this.offY+delta,
          this.square*8.0-delta,this.square*8.0-delta);
      rec_out.attr({opacity:0.0});
      rec_out.mouseout(function(evt, x, y) {
        that.eventGlobal(evt,x-that.startX-that.offX,y-that.startY-that.offY,'mouseout');
      });
      rec_out.toFront();
    }
    */
  },
  /**
    Callback method that is called whenever a piece is added to the board
    This method is to be used to do something after a piece is added,
    removed etc.
    @this {SvgBoard}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  postGraphics: function() {
    if (this.getValue('do_select_global')) {
      this.fullRec.toFront();
    }
  },
  /**
    Callback method that is called after the logical board adds a piece.
    This is where we add the SVG representation of the piece in real graphics.
    @this {SvgBoard}
    @param {BoardPiece} boardPiece the piece that was added.
    @param {PiecePosition} piecePosition the position where the piece was added.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  postAddPiece: function(boardPiece, piecePosition) {
    var that = this;
    var svgPiece = SvgCreator.createPiece(
        this.config, boardPiece.color, boardPiece.type);
    // calculate transform (move and scale)
    var pixelPos = this.posToPixels(piecePosition);
    var m = Raphael.matrix();
    m.translate(pixelPos.x + this.offX, pixelPos.y + this.offY);
    m.scale(this.square / svgPiece.size, this.square / svgPiece.size);
    var transform = m.toTransformString();
    // now put it on the paper
    var set = svgPiece.toSet(this.paper, transform);
    set.eventRegister((function(iboardPiece) {
      return function(eventName) {
        that.eventPiece(iboardPiece, eventName);
      };
    }(boardPiece)), ['click', 'mouseover', 'mouseout']);
    //}(boardPiece),['click','mouseover','mouseout','mousemove','mouseup','mousedown']);
    // lets put our own data with the piece
    var svgPieceData = new SvgPieceData(set, pixelPos);
    boardPiece.setData(svgPieceData);
    this.postGraphics();
  },
  /**
    Callback method that is called after the logical board removes a piece.
    @param {BoardPiece} boardPiece the piece to add.
    @param {PiecePosition} piecePosition the position where the piece was
    removed.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  postRemovePiece: function(boardPiece, piecePosition) {
    Utils.fakeUse(piecePosition);
    var svgPieceData = boardPiece.getData();
    svgPieceData.set.remove();
    boardPiece.unsetData();
  },
  /**
    Translates position (0..7,0..7) to pixels
    This method must take board rotation into consideration
    @this {SvgBoard}
    @param {PiecePosition} piecePosition logical (0..7,0..7) to translate.
    @return {SvgPixelPosition} position in pixels.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  posToPixels: function(piecePosition) {
    if (this.boardview === 'white') {
      return new SvgPixelPosition(
          piecePosition.x * this.square,
          (7 - piecePosition.y) * this.square
      );
    }
    if (this.boardview === 'black') {
      return new SvgPixelPosition(
          (7 - piecePosition.x) * this.square,
          piecePosition.y * this.square
      );
    }
    if (this.boardview === 'left') {
      return new SvgPixelPosition(
          piecePosition.y * this.square,
          (7 - piecePosition.x) * this.square
      );
    }
    if (this.boardview === 'right') {
      return new SvgPixelPosition(
          (7 - piecePosition.y) * this.square,
          piecePosition.x * this.square
      );
    }
    throw 'boardview is bad';
  },
  /**
    Translates pixel position (x,y) to board position (0..7,0..7)
    This method must take board rotation into consideration
    @this {SvgBoard}
    @param {SvgPixelPosition} svgPixelPosition object to translate.
    @return {PiecePosition} logical position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  pixelsToPos: function(svgPixelPosition) {
    var x = Math.floor((svgPixelPosition.x) / this.square);
    var y = Math.floor((svgPixelPosition.y) / this.square);
    if (this.boardview === 'white') {
      return new PiecePosition(x, 7 - y);
    }
    if (this.boardview === 'black') {
      return new PiecePosition(7 - x, y);
    }
    if (this.boardview === 'left') {
      return new PiecePosition(y, 7 - x);
    }
    if (this.boardview === 'right') {
      return new PiecePosition(7 - y, x);
    }
    throw 'boardview is bad';
  },
  /**
    Forgiving version of the previous function.
    @this {SvgBoard}
    @param {SvgPixelPosition} svgPixelPosition object to translate.
    @return {PiecePosition} logical position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  pixelsToPosForgiving: function(svgPixelPosition) {
    var x = Math.floor((svgPixelPosition.x) / this.square);
    var y = Math.floor((svgPixelPosition.y) / this.square);
    if (x > 7 || x < 0 || y > 7 || y < 0) {
      return undefined;
    }
    if (this.boardview === 'white') {
      return new PiecePosition(x, 7 - y);
    }
    if (this.boardview === 'black') {
      return new PiecePosition(7 - x, y);
    }
    if (this.boardview === 'left') {
      return new PiecePosition(y, 7 - x);
    }
    if (this.boardview === 'right') {
      return new PiecePosition(7 - y, x);
    }
    throw 'boardview is bad';
  },
  /**
    Resize the board
    @this {SvgBoard}
    @param {set} set Raphael set to resize.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  resize: function(set) {
    var m = Raphael.matrix();
    m.scale(1.7, 1.7);
    var transformString = m.toTransformString();
    set.forEach(function(el) {
      //el.animate({transform: transformString},ms);
      el.transform(transformString);
      //el.scale(5,5);
    },this);
  },
  /**
    Shows or hides a given piece according to parameter
    @this {SvgBoard}
    @param {BoardPiece} boardPiece piece to show or hide.
    @param {boolean} hide show or hide the piece.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  showHidePiece: function(boardPiece, hide) {
    var data = boardPiece.getData();
    data.forEach(function(el) {
      if (hide) {
        el.hide();
      } else {
        el.show();
      }
    });
  },
  /**
    Quick method to show a piece
    @this {SvgBoard}
    @param {BoardPiece} boardPiece the piece to show.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  showPiece: function(boardPiece) {
    this.showHidePiece(boardPiece, false);
  },
  /**
    Quick method to hide a piece
    @this {SvgBoard}
    @param {BoardPiece} boardPiece the piece to hide.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  hidePiece: function(boardPiece) {
    this.showHidePiece(boardPiece, true);
  },
  /**
    Callback called when the logical board moves a piece
    @this {SvgBoard}
    @param {BoardPiece} boardPiece the piece to move.
    @param {PiecePosition} fromPiecePosition position from which to move.
    @param {PiecePosition} toPiecePosition position to which to move.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  postMovePiece: function(boardPiece, fromPiecePosition, toPiecePosition) {
    this.timeMovePiece(boardPiece, fromPiecePosition, toPiecePosition);
  },
  /**
    Move a piece on the board (including animation if so configured)
    @this {SvgBoard}
    @param {BoardPiece} boardPiece the piece to move.
    @param {PiecePosition} fromPiecePosition position from which to move.
    @param {PiecePosition} toPiecePosition position to which to move.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  timeMovePiece: function(boardPiece, fromPiecePosition, toPiecePosition) {
    Utils.fakeUse(fromPiecePosition);
    var ms = this.getValue('move_ms');
    var pixelPosFrom = boardPiece.getData().pixelPos;
    var pixelPosTo = this.posToPixels(toPiecePosition);
    boardPiece.getData().forEach(function(el) {
      var m = Raphael.matrix();
      m.translate(pixelPosTo.x - pixelPosFrom.x, pixelPosTo.y - pixelPosFrom.y);
      var transformString = m.toTransformString();
      el.animate({transform: transformString},ms);
    });
  },
  /**
    Flips the board (see it from the other side)
    If the board is 90 deg left it be will 90 deg right.
    Black view will turn to white and white to black.
    @this {SvgBoard}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  flip: function() {
    var oldview = this.boardview;
    switch (this.boardview) {
      case 'white':
        this.boardview = 'black';
        break;
      case 'black':
        this.boardview = 'white';
        break;
      case 'left':
        this.boardview = 'right';
        break;
      case 'right':
        this.boardview = 'left';
        break;
      default:
        throw 'boardview is bad';
    }
    // now redraw the board (after the change of view)
    this.redraw(oldview);
  },
  /**
    Rotate the board to the right 90 degrees
    @this {SvgBoard}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  rotateright: function() {
    var oldview = this.boardview;
    if (!(SvgBoard.ObjRotateRight.hasOwnProperty(oldview))) {
      throw 'boardview is bad';
    }
    this.boardview = SvgBoard.ObjRotateRight[this.boardview];
    // now redraw the board (after the change of view)
    this.redraw(oldview);
  },
  /**
    Rotate the board to the left 90 degrees
    @this {SvgBoard}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  rotateleft: function() {
    var oldview = this.boardview;
    if (!(SvgBoard.ObjRotateLeft.hasOwnProperty(oldview))) {
      throw 'boardview is bad';
    }
    this.boardview = SvgBoard.ObjRotateLeft[this.boardview];
    // now redraw the board (after the change of view)
    this.redraw(oldview);
  },
  /**
    toString function
    This method is not yet implemented and will throw an exception.
    @this {SvgBoard}
    @return {string} a string representation of this object.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    throw 'not yet implemented';
  },
  /**
    Make a piece glow
    @this {SvgBoard}
    @param {BoardPiece} boardPiece the piece to make glow.
    @param {object} glow properties to pass to the glow function as per
    Raphael.js.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  glow: function(boardPiece, glow) {
    var svgPieceData = boardPiece.getData();
    if (glow) {
      svgPieceData.extra = svgPieceData.set.glow(this.glow_obj);
    } else {
      svgPieceData.extra.remove();
      svgPieceData.extra = undefined;
    }
  },
  /**
    Redraw the entire board
    @this {SvgBoard}
    @param {viewType} oldview the old view of the board.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  redraw: function(oldview) {
    var x, y;
    Utils.fakeUse(oldview);
    // redraw the pieces
    var that = this;
    this.board.forEachPiece(function(boardPiece, position) {
      that.timeMovePiece(boardPiece, position, position);
    });
    // redraw the squares
    for (x = 0; x < 8; x++) {
      for (y = 0; y < 8; y++) {
        this.rectFill(this.getRec(new PiecePosition(x, y)), true);
      }
    }
  },
  /**
    Event handler for events happening on the pieces.
    Types of events: click, mouseover and more...
    @this {SvgBoard}
    @param {BoardPiece} boardPiece instance the event happened on.
    @param {string} type the type of event that happened.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  eventPiece: function(boardPiece, type) {
    //Utils.fakeUse(boardPiece,type);
    if (this.getValue('do_select_piecerec')) {
      if (type === 'mouseover') {
        var piecePosition = this.board.getPiecePosition(boardPiece);
        if (this.currentPos === undefined ||
            piecePosition.notEqual(this.currentPos)) {
          this.lastPos = this.currentPos;
          this.currentPos = piecePosition;
          this.newPosition();
        }
      }
    }
  },
  /**
    Events for position. Positions are logical and do
    not depend on the flipping of the board.
    Types of events: mouseover, mouseout, click and more.
    @this {SvgBoard}
    @param {PiecePosition} piecePosition the position of the event.
    @param {rect} rec the Raphael.js rectangle where the event happened.
    @param {string} type which is the name of the event that happened.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  eventPosition: function(piecePosition, rec, type) {
    if (this.getValue('do_select_piecerec')) {
      if (type === 'mouseover') {
        this.lastPos = this.currentPos;
        this.currentPos = piecePosition;
        this.newPosition();
      }
      if (type === 'mouseout') {
        this.lastPos = this.currentPos;
        this.currentPos = undefined;
        this.newPosition();
      }
      /*
      if(type=='mouseout') {
        // this is done with a timeout just for getting out of the board...
        var pos=this.currentPos;
        var that=this;
        window.setTimeout(function() {
          if(pos!=undefined && pos.equal(that.currentPos)) {
            that.lastPos=that.currentPos;
            that.currentPos=undefined;
            that.newPosition();
          }
        },100);
      }
      */
    }
    if (this.getValue('do_select_click')) {
      if (type === 'click') {
        if (this.selected) {
          if (this.selected === rec) {
            this.rectFill(this.selected, false);
            this.selected = undefined;
          } else {
            this.rectFill(this.selected, false);
            rec.attr('fill', this.getValue('select_color'));
            this.selected = rec;
          }
        } else {
          rec.attr('fill', this.getValue('select_color'));
          this.selected = rec;
        }
      }
    }
  },
  /**
    Events for position. Positions are logical and do
    not depend on the flipping of the board.
    Types of events: mouseover, mouseout, click and more.
    @this {SvgBoard}
    @param {string} eventtype which event happened.
    @param {int} x x position of event.
    @param {int} y y position of event.
    @param {string} type which event happened.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  eventGlobal: function(eventtype, x, y, type) {
    Utils.fakeUse(eventtype);
    if (this.getValue('do_select_global')) {
      if (type === 'mouseover' || type === 'mousemove') {
        var piecePosition =
            this.pixelsToPosForgiving(new SvgPixelPosition(x, y));
        if (piecePosition !== undefined) {
          if (this.currentPos === undefined) {
            this.lastPos = undefined;
            this.currentPos = piecePosition;
            this.newPosition();
          } else {
            if (piecePosition.notEqual(this.currentPos)) {
              this.lastPos = this.currentPos;
              this.currentPos = piecePosition;
              this.newPosition();
            }
          }
        } else {
          // forget about this event?!?
          Utils.pass();
        }
      }
      if (type === 'mouseout') {
        this.lastPos = this.currentPos;
        this.currentPos = undefined;
        this.newPosition();
      }
    }
    if (this.getValue('do_select_piecerec')) {
      if (type === 'mouseout') {
        this.lastPos = this.currentPos;
        this.currentPos = undefined;
        this.newPosition();
      }
    }
  },
  /**
    Internal method. This method is called whenever
    the cursor changes position over the board and ONLY when
    it changes position.
    No parameters are passed because This method uses:
    this.selectedPiece, this.selectedRec, this.lastPos, this.currentPos
    to do it's work.
    @this {SvgBoard}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  newPosition: function() {
    if (this.currentPos === undefined) {
      if (this.selectedPiece !== undefined) {
        if (this.getValue('do_select_piece')) {
          this.glow(this.selectedPiece, false);
          this.selectedPiece = undefined;
        }
      }
      if (this.selectedRec !== undefined) {
        if (this.getValue('do_select_square')) {
          this.rectFill(this.selectedRec, false);
          this.selectedRec = undefined;
        }
      }
    } else {
      if (this.board.hasPieceAtPosition(this.currentPos)) {
        var boardPiece = this.board.getPieceAtPosition(this.currentPos);
        //this.eventPiece(boardPiece,'square'+type);
        if (this.getValue('do_select_piece')) {
          if (this.selectedPiece === undefined) {
            this.selectedPiece = boardPiece;
            this.glow(this.selectedPiece, true);
          } else {
            this.glow(this.selectedPiece, false);
            this.selectedPiece = boardPiece;
            this.glow(this.selectedPiece, true);
          }
        }
      } else {
        if (this.selectedPiece !== undefined) {
          if (this.getValue('do_select_piece')) {
            this.glow(this.selectedPiece, false);
            this.selectedPiece = undefined;
          }
        }
      }
      if (this.getValue('do_select_square')) {
        var rec = this.getRec(this.currentPos);
        if (this.selectedRec === undefined) {
          this.selectedRec = rec;
          this.selectedRec.attr('fill', this.getValue('over_color'));
        } else {
          this.rectFill(this.selectedRec, false);
          this.selectedRec = rec;
          this.selectedRec.attr('fill', this.getValue('over_color'));
        }
      }
    }
  },
  /**
    Return the square at a position.
    This method must take into consideraton board rotation
    @this {SvgBoard}
    @param {PiecePosition} piecePosition the logical position for which to
    return the square.
    @return {rec} the Raphael.js rec in question.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getRec: function(piecePosition) {
    if (this.boardview === 'white') {
      return this.recs[piecePosition.x][piecePosition.y];
    }
    if (this.boardview === 'black') {
      return this.recs[7 - piecePosition.x][7 - piecePosition.y];
    }
    if (this.boardview === 'left') {
      return this.recs[piecePosition.y][piecePosition.x];
    }
    if (this.boardview === 'right') {
      return this.recs[7 - piecePosition.y][7 - piecePosition.x];
    }
    throw 'boardview is bad';
  }
});


/**
  Which sides go to which when rotating right.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
SvgBoard.ObjRotateRight = {
  white: 'left',
  left: 'black',
  black: 'right',
  right: 'white'
};


/**
  Which sides go to which when rotating left.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
SvgBoard.ObjRotateLeft = {
  white: 'right',
  right: 'black',
  black: 'left',
  left: 'white'
};
/* vim:set filetype=javascript:*/
/*jsl:import BoardPiece.js*/
/*jsl:import BoardPosition.js*/
/*jsl:import PieceColor.js*/
/*jsl:import PieceType.js*/
/*jsl:import PiecePosition.js*/
/*global Class, BoardPiece, PieceColor, PieceType, PiecePosition, BoardPosition */


/**
  @class Represents a full board This is the main class to interact with.
  Using this class you can: 1. Use pieces: put, remove and move them.
  2. Do something with all pieces.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var Board = Class.create(/** @lends Board.prototype */{
  /**
    creates a new instance
    @this {Board}
    @return {Board} the new object created.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
    var i, j, ar;
    // create 8x8 undefined squares
    this.bd = [];
    for (i = 0; i < 8; i++) {
      ar = [];
      for (j = 0; j < 8; j++) {
        ar.push(undefined);
      }
      this.bd.push(ar);
    }
    this.pieces = [];
    // callbacks
    this.preAddCB = [];
    this.postAddCB = [];
    this.preRemoveCB = [];
    this.postRemoveCB = [];
    this.preMoveCB = [];
    this.postMoveCB = [];
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {Board}
    @return {string} string representation of this object.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    var i, j;
    var str = '';
    for (i = 0; i < 8; i++) {
      for (j = 0; j < 8; j++) {
        str += this.bd[i][j];
      }
      str += '\n';
    }
    return str;
  },
  /**
    Check that no piece is at a certain position.
    Will throw an exception if that is not the case.
    @this {Board}
    @param {PiecePosition} piecePosition position to check that no piece is at.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  checkNoPieceAt: function(piecePosition) {
    if (this.bd[piecePosition.x][piecePosition.y] !== undefined) {
      throw 'already have piece at position ' + piecePosition.toString();
    }
  },
  /**
    Check that piece is at a certain position.
    Will throw an exception if that is not the case.
    @this {Board}
    @param {PiecePosition} piecePosition position to check that a piece is at.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  checkPieceAt: function(piecePosition) {
    if (this.bd[piecePosition.x][piecePosition.y] === undefined) {
      throw 'dont have piece at position ' + piecePosition.toString();
    }
  },
  /**
    Check that a certain piece is at a certain position.
    Will throw an exception if that is not the case.
    @this {Board}
    @param {BoardPiece} boardPiece the piece in question.
    @param {PiecePosition} piecePosition position to check that a piece is at.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  checkBoardPieceAt: function(boardPiece, piecePosition) {
    if (this.bd[piecePosition.x][piecePosition.y] !== boardPiece) {
      throw 'wrong piece at position ' + piecePosition.toString();
    }
  },
  /**
    Add a piece to the position
    @this {Board}
    @param {BoardPiece} boardPiece piece to add.
    @param {PiecePosition} piecePosition where to add the piece.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  addPiece: function(boardPiece, piecePosition) {
    this.preAddCB.forEach(function(f) {
      f(boardPiece, piecePosition);
    });
    this.checkNoPieceAt(piecePosition);
    this.bd[piecePosition.x][piecePosition.y] = boardPiece;
    this.postAddCB.forEach(function(f) {
      f(boardPiece, piecePosition);
    });
  },
  /**
    Remove a piece
    @this {Board}
    @param {BoardPiece} boardPiece piece to remove.
    @param {PiecePosition} piecePosition the position to remove it from.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  removePiece: function(boardPiece, piecePosition) {
    this.checkBoardPieceAt(boardPiece, piecePosition);
    this.preRemoveCB.forEach(function(f) {
      f(boardPiece, piecePosition);
    });
    this.bd[piecePosition.x][piecePosition.y] = undefined;
    this.postRemoveCB.forEach(function(f) {
      f(boardPiece, piecePosition);
    });
  },
  /**
    Move a piece
    @this {Board}
    @param {BoardPiece} boardPiece piece to move.
    @param {PiecePosition} fromPiecePosition from where to move the piece.
    @param {PiecePosition} toPiecePosition to where to move the piece.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  movePiece: function(boardPiece, fromPiecePosition, toPiecePosition) {
    this.checkPieceAt(fromPiecePosition);
    this.checkNoPieceAt(toPiecePosition);
    this.preMoveCB.forEach(function(f) {
      f(boardPiece, fromPiecePosition, toPiecePosition);
    });
    this.bd[fromPiecePosition.x][fromPiecePosition.y] = undefined;
    this.bd[toPiecePosition.x][toPiecePosition.y] = boardPiece;
    this.postMoveCB.forEach(function(f) {
      f(boardPiece, fromPiecePosition, toPiecePosition);
    });
  },
  /**
    Clear the board
    @this {Board}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  clearPieces: function() {
    var that = this;
    this.forEachPiece(function(boardPiece, piecePosition) {
      that.removePiece(boardPiece, piecePosition); });
  },
  /**
    Add a piece to the position (seperate pieces of data).
    @this {Board}
    @param {string} color color of the piece (black/white).
    @param {string} type type of the piece (rook/knight/bishop/queen/king/pawn).
    @param {number} x x location of the piece [0..8).
    @param {number} y y location of the piece [0..8).
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  addPieceVals: function(color, type , x, y) {
    var boardPiece = new BoardPiece(
        new PieceColor(color),
        new PieceType(type));
    this.addPiece(boardPiece, new PiecePosition(x, y));
  },
  /**
    Run a function for each piece in this position
    @this {Board}
    @param {function()} f function to be called back for each piece.
    This function should receive the piece to work on.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  forEachPiece: function(f) {
    var i, j;
    for (i = 0; i < 8; i++) {
      for (j = 0; j < 8; j++) {
        if (this.bd[i][j] !== undefined) {
          f(this.bd[i][j], new PiecePosition(i, j));
        }
      }
    }
  },
  /**
    Get a piece at a specific position
    @this {Board}
    @param {PiecePosition} piecePosition position to get the piece at.
    @return {BoardPiece} the piece at the specified position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getPieceAtPosition: function(piecePosition) {
    this.checkPieceAt(piecePosition);
    return this.bd[piecePosition.x][piecePosition.y];
  },
  /**
    Get a piece at a specific position (in parts)
    @this {Board}
    @param {number} x x position to get piece at [0..8).
    @param {number} y y position to get piece at [0..8).
    @return {BoardPiece} the piece at the specified position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getPieceAtPositionVals: function(x, y) {
    return this.getPieceAtPosition(new PiecePosition(x, y));
  },
  /**
    Do we have a piece in a specific position?
    @this {Board}
    @param {PiecePosition} piecePosition position to check for a piece at.
    @return {boolean} whether there is a piece at the position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  hasPieceAtPosition: function(piecePosition) {
    return this.bd[piecePosition.x][piecePosition.y] !== undefined;
  },
  /**
    Do we have a piece in a specific position?
    @this {Board}
    @param {number} x x position to check for piece at [0..8).
    @param {number} y y position to check for piece at [0..8).
    @return {boolean} is there a piece at position.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  hasPieceAtPositionVals: function(x, y) {
    return this.hasPieceAtPosition(new PiecePosition(x, y));
  },
  /**
    Add a callback for adding a piece
    @this {Board}
    @param {function()} f callback function.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  addPiecePostAddCallback: function(f) {
    this.postAddCB.push(f);
  },
  /**
    Add a callback for removing a piece
    @this {Board}
    @param {function()} f callback function.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  addPiecePostRemoveCallback: function(f) {
    this.postRemoveCB.push(f);
  },
  /**
    Add a callback for moving a piece
    @this {Board}
    @param {function()} f callback function.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  addPiecePostMoveCallback: function(f) {
    this.postMoveCB.push(f);
  },
  /**
    Clear the board and add a position to the current board
    @this {Board}
    @param {BoardPosition} boardPosition position to set.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  setPosition: function(boardPosition) {
    this.clearPieces();
    var that = this;
    boardPosition.forEachPiece(function(boardPiece, piecePosition) {
      that.addPiece(boardPiece, piecePosition); });
  },
  /**
    Put the board in starting position of standard chess.
    @this {Board}
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  startPosition: function() {
    this.setPosition(BoardPosition.startPos());
  },
  /**
    Move a piece according to positions.
    @this {Board}
    @param {PiecePosition} fromPiecePosition from where to move.
    @param {PiecePosition} toPiecePosition to where to move.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  movePieceByPos: function(fromPiecePosition, toPiecePosition) {
    var boardPiece = this.getPieceAtPosition(fromPiecePosition);
    this.movePiece(boardPiece, fromPiecePosition, toPiecePosition);
  },
  /**
    Get the position of a piece
    @this {Board}
    @param {BoardPiece} boardPiece piece to get the position for.
    @return {PiecePosition} the position of the piece in question.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  getPiecePosition: function(boardPiece) {
    var i, j;
    for (i = 0; i < 8; i++) {
      for (j = 0; j < 8; j++) {
        if (this.bd[i][j] === boardPiece) {
          return new PiecePosition(i, j);
        }
      }
    }
    throw 'piece not on board ' + boardPiece;
  }
});
/* vim:set filetype=javascript:*/
/*jsl:import Utils.js*/
/*global Class, Utils*/


/**
  @class Forward/Backwards controls.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var SvgControls = Class.create(/** @lends SvgControls.prototype */{
  /**
    creates a new instance
    @param {Config} config configuration for this instance.
    @return {SvgControls} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(config) {
    Utils.pass(config);
  }
});
/* vim:set filetype=javascript:*/
/*global Element, Class, $ */


/**
  @class A set of controls to control the game of chess.
  Includes 6 buttons: goto_start, prev_move, prev_play, next_play, next_move,
  goto_end
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var Controls = Class.create(/** @lends Controls.prototype */{
  /**
    creates a new instance of this class.
    @this {Controls}
    @param {object} dict A hash with initial values.
    @return {Controls} new instance of this class.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(dict) {
    this.id = dict.id;
    this.b_goto_start = new Element('button').update('goto_start');
    this.b_prev_move = new Element('button').update('prev_move');
    this.b_prev_play = new Element('button').update('prev_play');
    this.b_next_play = new Element('button').update('next_play');
    this.b_next_move = new Element('button').update('next_move');
    this.b_goto_end = new Element('button').update('goto_end');
    $(this.id).appendChild(this.b_goto_start);
    $(this.id).appendChild(this.b_prev_move);
    $(this.id).appendChild(this.b_prev_play);
    $(this.id).appendChild(this.b_next_play);
    $(this.id).appendChild(this.b_next_move);
    $(this.id).appendChild(this.b_goto_end);
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {Controls}
    @return {string} string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return 'no toString for type Controls';
  }
});
/* vim:set filetype=javascript:*/
/*jsl:import Utils.js*/
/*jsl:import SvgPathAndAttributes.js*/
/*jsl:import SvgPiece.js*/
/*global SvgPathAndAttributes, SvgPiece, Utils, Class */


/**
  @class static class to have just static methods for creating pieces
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var SvgCreator = Class.create(/** @lends SvgCreator.prototype */{
  /**
    creates a new instance
    @return {SvgCreator} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
    return;
  }
});


/**
  Method which creates a piece according to color and type
  @param {Config} config A configuration to work with.
  @param {PieceColor} pieceColor the color of the piece.
  @param {PieceType} pieceType the type of the piece.
  @return {SvgPiece} the newly created piece.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
SvgCreator.createPiece = function(config, pieceColor, pieceType) {
  // the 240.0 was found found empirically...
  var strokewidth = config.getValue('size') / 240.0;
  var stdatt = {
    'stroke-width': strokewidth,
    stroke: config.getValue('pencolor'),
    'stroke-linejoin': 'round',
    'stroke-linecap': 'round'
  };
  var svgPiece;
  if (pieceColor.isWhite()) {
    // the first 0 is the direction of the gradient in degrees (0 is horizontal)
    //'fill': '0-#fff:0-#ccc:100',
    //'fill': '0-#fff:0-#fff:50-#999:100',
    // this is not the right way to make it hidden
    //'opacity':0,
    if (config.getValue('gradients')) {
      stdatt.fill = '0-#fff:0-#fff:50-#999:100';
    } else {
      stdatt.fill = config.getValue('white_color');
    }
    if (pieceType.isRook()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L ' +
          '30,11 L 30,9 L 34,9 L 34,14', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 34,14 L 31,17 L 14,17 L 11,14', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 31,17 L 31,29.5 L 14,29.5 L 14,17', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11,14 L 34,14', stdatt));
      return svgPiece;
    }
    if (pieceType.isKnight()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18 ' +
          '24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 ' +
          'C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C ' +
          '9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 ' +
          'C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L ' +
          '18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z',
          stdatt));
      return svgPiece;
    }
    if (pieceType.isBishop()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,' +
          '35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 ' +
          '36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,' +
          '37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 ' +
          '9,36 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C ' +
          '30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,' +
          '14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5' +
          ' 15,32 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 25 8 A 2.5 2.5 0 1 1 20,8 A 2.5 2.5 0 1 1 25 8 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M' +
          ' 20,18 L 25,18', stdatt));
      return svgPiece;
    }
    if (pieceType.isQueen()) {
      svgPiece = new SvgPiece(45);
      // the head of the crown...
      svgPiece.add(new SvgPathAndAttributes(
          'M8,12C8,13.539600717839003,6.333333333333333,14.501851166488377,' +
          '5,13.732050807568877C4.381197846482994,13.374785217660714,4,' +
          '12.714531179816328,4,12C4,10.460399282160997,5.666666666666667,' +
          '9.498148833511623,7,10.267949192431123C7.618802153517006,' +
          '10.625214782339286,8,11.285468820183672,8,12C8,12,8,12,8,12',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M24.5,7.5C24.5,9.039600717839003,22.833333333333332,' +
          '10.001851166488377,21.5,9.232050807568877C20.881197846482994,' +
          '8.874785217660714,20.5,8.214531179816328,20.5,7.5C20.5,' +
          '5.9603992821609975,22.166666666666668,4.998148833511623,23.5,' +
          '5.767949192431123C24.118802153517006,6.125214782339286,24.5,' +
          '6.785468820183672,24.5,7.5C24.5,7.5,24.5,7.5,24.5,7.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M41,12C41,13.539600717839003,39.333333333333336,' +
          '14.501851166488377,38,13.732050807568877C37.38119784648299,' +
          '13.374785217660714,37,12.714531179816328,37,12C37,' +
          '10.460399282160997,38.666666666666664,9.498148833511623,40,' +
          '10.267949192431123C40.61880215351701,10.625214782339286,41,' +
          '11.285468820183672,41,12C41,12,41,12,41,12', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M16,8.5C16,10.039600717839003,14.333333333333332,' +
          '11.001851166488377,13,10.232050807568877C12.381197846482994,' +
          '9.874785217660714,12,9.214531179816328,12,8.5C12,' +
          '6.9603992821609975,13.666666666666668,5.998148833511623,15,' +
          '6.767949192431123C15.618802153517006,7.125214782339286,16,' +
          '7.785468820183672,16,8.5C16,8.5,16,8.5,16,8.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M33,9C33,10.539600717839003,31.333333333333332,' +
          '11.501851166488377,30,10.732050807568877C29.381197846482994,' +
          '10.374785217660714,29,9.714531179816328,29,9C29,' +
          '7.4603992821609975,30.666666666666668,6.498148833511623,32,' +
          '7.267949192431123C32.61880215351701,7.625214782339286,33,' +
          '8.285468820183672,33,9C33,9,33,9,33,9', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,' +
          '24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C ' +
          '10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5' +
          ' 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,' +
          '33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5' +
          ' 17.5,24.5 9,26 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,30 C 15,29 30,29 33.5,30', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 12,33.5 C 18,32.5 27,32.5 33,33.5', stdatt));
      return svgPiece;
    }
    if (pieceType.isKing()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 22.5,11.63 L 22.5,6', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 20,8 L 25,8', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 ' +
          '22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 ' +
          '41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L ' +
          '22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5' +
          ' L 11.5,37 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,30 C 17,27 27,27 32.5,30', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,37 C 17,34 27,34 32.5,37', stdatt));
      return svgPiece;
    }
    if (pieceType.isPawn()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 ' +
          '18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 ' +
          '16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 ' +
          'L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 ' +
          '28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,' +
          '14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z', stdatt));
      return svgPiece;
    }
  }
  if (pieceColor.isBlack()) {
    if (config.getValue('gradients')) {
      //stdatt.fill = '0-#000:0-#222:50-#555:100';
      stdatt.fill = '0-#555:0-#222:50-#000:100';
    } else {
      stdatt.fill = config.getValue('black_color');
    }
    if (pieceType.isRook()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L ' +
          '30,11 L 30,9 L 34,9 L 34,14 L 11,14 z', stdatt));
      stdatt = Utils.clone(stdatt);
      stdatt.stroke = '#fff';
      svgPiece.add(new SvgPathAndAttributes(
          'M 12,35.5 L 33,35.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 13,31.5 L 32,31.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 14,29.5 L 31,29.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 14,16.5 L 31,16.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11,14 L 34,14', stdatt));
      return svgPiece;
    }
    if (pieceType.isKnight()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 ' +
          '11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 ' +
          'C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 ' +
          '14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 ' +
          '16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10',
          stdatt));
      stdatt = Utils.clone(stdatt);
      stdatt.fill = '#fff';
      stdatt.stroke = '#fff';
      svgPiece.add(new SvgPathAndAttributes(
          'M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z',
          stdatt));
      stdatt = Utils.clone(stdatt);
      stdatt.fill = '#fff';
      stdatt.stroke = 'none';
      svgPiece.add(new SvgPathAndAttributes(
          'M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,' +
          '18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 ' +
          'L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,' +
          '11.02 25.06,10.5 L 24.55,10.4 z', stdatt));
      return svgPiece;
    }
    if (pieceType.isBishop()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 ' +
          '32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 ' +
          '37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C ' +
          '19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 ' +
          '6,38 C 7.354,36.06 9,36 9,36 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 ' +
          '30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 ' +
          '22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 ' +
          '15,30 C 15,30 14.5,30.5 15,32 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 25 8 A 2.5 2.5 0 1 1 20,8 A 2.5 2.5 0 1 1 25 8 z', stdatt));
      stdatt = Utils.clone(stdatt);
      stdatt.stroke = '#fff';
      svgPiece.add(new SvgPathAndAttributes(
          'M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M ' +
          '20,18 L 25,18', stdatt));
      return svgPiece;
    }
    if (pieceType.isQueen()) {
      svgPiece = new SvgPiece(45);
      // the head of the crown...
      svgPiece.add(new SvgPathAndAttributes(
          'M8,12C8,13.539600717839003,6.333333333333333,14.501851166488377,' +
          '5,13.732050807568877C4.381197846482994,13.374785217660714,4,' +
          '12.714531179816328,4,12C4,10.460399282160997,5.666666666666667,' +
          '9.498148833511623,7,10.267949192431123C7.618802153517006,' +
          '10.625214782339286,8,11.285468820183672,8,12C8,12,8,12,8,12',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M24.5,7.5C24.5,9.039600717839003,22.833333333333332,' +
          '10.001851166488377,21.5,9.232050807568877C20.881197846482994,' +
          '8.874785217660714,20.5,8.214531179816328,20.5,7.5C20.5,' +
          '5.9603992821609975,22.166666666666668,4.998148833511623,23.5,' +
          '5.767949192431123C24.118802153517006,6.125214782339286,24.5,' +
          '6.785468820183672,24.5,7.5C24.5,7.5,24.5,7.5,24.5,7.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M41,12C41,13.539600717839003,39.333333333333336,' +
          '14.501851166488377,38,13.732050807568877C37.38119784648299,' +
          '13.374785217660714,37,12.714531179816328,37,12C37,' +
          '10.460399282160997,38.666666666666664,9.498148833511623,40,' +
          '10.267949192431123C40.61880215351701,10.625214782339286,' +
          '41,11.285468820183672,41,12C41,12,41,12,41,12', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M16,8.5C16,10.039600717839003,14.333333333333332,' +
          '11.001851166488377,13,10.232050807568877C12.381197846482994,' +
          '9.874785217660714,12,9.214531179816328,12,8.5C12,' +
          '6.9603992821609975,13.666666666666668,5.998148833511623,' +
          '15,6.767949192431123C15.618802153517006,7.125214782339286,16,' +
          '7.785468820183672,16,8.5C16,8.5,16,8.5,16,8.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M33,9C33,10.539600717839003,31.333333333333332,11.501851166488377,' +
          '30,10.732050807568877C29.381197846482994,10.374785217660714,29,' +
          '9.714531179816328,29,9C29,7.4603992821609975,30.666666666666668,' +
          '6.498148833511623,32,7.267949192431123C32.61880215351701,' +
          '7.625214782339286,33,8.285468820183672,33,9C33,9,33,9,33,9',
          stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 ' +
          'L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 ' +
          'L 9,26 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 ' +
          'C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 ' +
          '27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 ' +
          '33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C ' +
          '27.5,24.5 17.5,24.5 9,26 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11,38.5 A 35,35 1 0 0 34,38.5', stdatt));
      stdatt = Utils.clone(stdatt);
      stdatt.stroke = '#fff';
      svgPiece.add(new SvgPathAndAttributes(
          'M 11,29 A 35,35 1 0 1 34,29', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 12.5,31.5 L 32.5,31.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,34.5 A 35,35 1 0 0 33.5,34.5', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 10.5,37.5 A 35,35 1 0 0 34.5,37.5', stdatt));
      return svgPiece;
    }
    if (pieceType.isKing()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes('M 22.5,11.63 L 22.5,6', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 ' +
          '24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C ' +
          '18,17.5 22.5,25 22.5,25', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,37 C 17,40.5 27,40.5 32.5,37 L ' +
          '32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C ' +
          '34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 ' +
          'C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 ' +
          '11.5,29.5 L 11.5,37 z', stdatt));
      svgPiece.add(new SvgPathAndAttributes('M 20,8 L 25,8', stdatt));
      stdatt = Utils.clone(stdatt);
      stdatt.stroke = '#fff';
      svgPiece.add(new SvgPathAndAttributes(
          'M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 ' +
          '25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 ' +
          '6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85', stdatt));
      svgPiece.add(new SvgPathAndAttributes(
          'M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 ' +
          '27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37', stdatt));
      return svgPiece;
    }
    if (pieceType.isPawn()) {
      svgPiece = new SvgPiece(45);
      svgPiece.add(new SvgPathAndAttributes('M 22,9 C 19.79,9 18,10.79 18,13 ' +
          'C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 ' +
          '15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 ' +
          '17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 ' +
          'L 33.5,39.5 C 33.5,31.58 29.09,27.09 ' +
          '26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C ' +
          '28.5,18.59 27.17,16.5 25.22,15.38 C ' +
          '25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 ' +
          '22,9 z', stdatt));
      return svgPiece;
    }
  }
  throw 'unknown piece ' + pieceType;
};
/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class a path + attributes two tuple object
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var SvgPathAndAttributes = Class.create(/** @lends SvgPathAndAttributes.prototype */{
  /**
    creates a new instance
    @this {SvgPathAndAttributes}
    @param {string} path string representing SVG path.
    @param {object} attr object with attributes for said path.
    @return {SvgPathAndAttributes} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(path, attr) {
    this.path = path;
    this.attr = attr;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {SvgPathAndAttributes}
    @return {string} string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return [this.path, this.attr].join();
  }
});
/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class represents a position + graphics
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var SvgPieceData = Class.create(/** @lends SvgPieceData.prototype */{
  /**
    creates a new instance
    @this {SvgPieceData}
    @param {set} set raphael set for the piece.
    @param {SvgPixelPosition} pixelPos position for the pieces origin.
    This is important to be able to move it to other places
    pixelPos is not the translation of pos to pixels!!!
    @return {SvgPieceData} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(set, pixelPos) {
    this.set = set;
    this.pixelPos = pixelPos;
    this.extra = undefined;
  },
  /**
    toString method that allows you to get a nice printout for this type
    @this {SvgPieceData}
    @return {string} a string representation of this instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return [this.set, this.pixelPos, this.extra].join();
  },
  /**
    ForEach method on all presentation elements
    @this {SvgPieceData}
    @param {function()} f function to activate on each element.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  forEach: function(f) {
    //var that=this;
    this.set.forEach(function(el) {
      f(el);
    });
    if (this.extra !== undefined) {
      this.extra.forEach(function(el) {
        f(el);
      });
    }
  }
});
/* vim:set filetype=javascript:*/
/*global Class, Raphael */


/**
  @class A single piece description.
  This includes: square size (assumes piece is 0,0,size,size)
  and array of paths and attributes to draw the path
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var SvgPiece = Class.create(/** @lends SvgPiece.prototype */{
  /**
    creates a new instance
    @this {SvgPiece}
    @param {number} size of the square of the piece.
    @return {SvgPiece} a new object of this type.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(size) {
    this.size = size;
    this.paas = [];
  },
  /**
    Adds a new path section to a piece description
    @this {SvgPiece}
    @param {PathAndAttributes} paa object to be added.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  add: function(paa) {
    this.paas.push(paa);
  },
  /**
    Create a Raphael.js set from this object
    @this {SvgPiece}
    @param {paper} paper Raphael.js paper to work on.
    @param {transform} transform Raphael.js transformating for this object.
    @return {set} the set after the transformation.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toSet: function(paper, transform) {
    var set = paper.set();
    this.paas.forEach(function(paa) {
      var orig_path = paa.path;
      var new_path = Raphael.transformPath(orig_path, transform);
      var el = paper.path(new_path);
      el.attr(paa.attr);
      //el.hide();
      set.push(el);
    });
    return set;
  }
});
/* vim:set filetype=javascript:*/
/*global Class */


/**
  @class represents a position on the screen (in pixels)
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var SvgPixelPosition = Class.create(/** @lends SvgPixelPosition.prototype */{
  /**
    creates a new instance
    @this {SvgPixelPosition}
    @param {number} x x co-ordinate.
    @param {number} y y co-ordinate.
    @return {SvgPixelPosition} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(x, y) {
    /*
    if(x<0) {
      throw 'bad value for x '+x+','+typeof(x);
    }
    if(y<0) {
      throw 'bad value for y '+y+','+typeof(y);
    }
    */
    this.x = x;
    this.y = y;
  },
  /**
    toString method so that you can get a nice printout of instances
    of this type
    @this {SvgPixelPosition}
    @return {string} string representation of this object.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  toString: function() {
    return '(' + this.x + ',' + this.y + ')';
  }
});
/* vim:set filetype=javascript:*/
/*global Class*/


/**
  @class a class to have static utility functions
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var Utils = Class.create(/** @lends Utils.prototype */{
  /**
    creates a new instance
    @return {Utils} the new instance.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
    return;
  }
});


/**
  Unite two javascript objects into a third one.
  Second trumps the first.
  @param {object} o1 first object.
  @param {object} o2 first object.
  @return {object} object which is the unification of the two objects.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.unite = function(o1, o2) {
  var ret = {};
  var x, y;
  for (x in o1) {
    ret[x] = o1[x];
  }
  for (y in o2) {
    ret[y] = o2[y];
  }
  return ret;
};


/**
  Clone a javascript object
  @param {object} o the object to shalow clone.
  @return {object} object which is a clone of the original one.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.clone = function(o) {
  var ret = {};
  var x;
  for (x in o) {
    ret[x] = o[x];
  }
  return ret;
};


/**
  Fake using a parameter.
  This is mainly used to avoid lint warnings.
  Pass as many args as you like to this function.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.fakeUse = function() {
  if (Utils.nottrue) {
    window.junkVar = 'junkVal';
  }
};


/**
  Fake doing something
  This is mainly used to avoid lint warnings.
  Pass as many args as you like to this function.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.pass = function() {
  return;
};


/**
  Shallow copy an array
  @param {Array} a the array to copy.
  @return {Array} The copy of the array.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.arrClone = function(a) {
  return a.slice();
  /*
  var ret=[];
  a.forEach(function(x) {
    ret.push(x);
  });
  return ret;
  */
};


/**
  Return the type of a variable
  @param {anything} v the variable
  @return {string} the type.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.getType = function(v) {
  return typeof v;
};


/**
  Check the type of a javascript variable
  This method will throw an exception if the check fails.
  @param {anything} v the variable to check.
  @param {string} t the string representation of the name of the
  type v should be of.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.checkType = function(v, t) {
  if (Utils.getType(v) !== t) {
    throw 'type is wrong';
  }
};


/**
  Checks whether one dictionary contains all the keys of the
  other Throws an exceptions if that is not the case.
  @param {object} s1 first set.
  @param {object} s2 second set.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.checkContains = function(s1, s2) {
  var x;
  for (x in s1) {
    if (!(s2.hasOwnProperty(x))) {
      throw 'key ' + x + ' is bad';
    }
  }
};


/**
  Checks whether one dictionary key set equals that of another.
  other Throws an exceptions if that is not the case.
  @param {object} s1 first set.
  @param {object} s2 second set.
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
Utils.checkEquals = function(s1, s2) {
  Utils.checkContains(s1, s2);
  Utils.checkContains(s2, s1);
};
/* vim:set filetype=javascript:*/
/*global Class, Raphael*/


/**
  @class Wrapper for Raphael.js set
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var WSet = Class.create(/** @lends WSet.prototype */{
  /**
    @this {WSet}
    @param {set} set the raphael set that this wraps.
    @param {wrapper} wrapper the raphael wrapper (with paper and all).
    @return {WSet} a new instance of this class.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function(set, wrapper) {
    this.set = set;
    this.wrapper = wrapper;
  },
  /**
    wrapper for the Raphael.js method of the same name.
    Pass anything you want to raphael.
    @this {WSet}
    @return {anything} anything that Raphael.js returns from this method.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  push: function() {
    var m = this.set.push;
    var r = m.apply(this.set, arguments);
    return r;
  },
  /**
    wrapper for the Raphael.js method of the same name.
    Pass anything you want to raphael.
    @this {WSet}
    @return {anything} anything that Raphael.js returns from this method.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  remove: function() {
    var m = this.set.remove;
    var r = m.apply(this.set, arguments);
    return r;
  },
  /**
    wrapper for the Raphael.js method of the same name.
    Pass anything you want to raphael.
    @this {WSet}
    @return {anything} anything that Raphael.js returns from this method.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  forEach: function() {
    var m = this.set.forEach;
    var r = m.apply(this.set, arguments);
    return r;
  },
  /**
    make a set glow
    @this {WSet}
    @param {object} glow_obj parameters to pass to the Raphael.js glow method.
    @return {set} the set of glow objects.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  glow: function(glow_obj) {
    var nset = this.wrapper.set();
    this.forEach(function(e) {
      nset.push(e.glow(glow_obj));
    },undefined);
    return nset;
  },
  /**
    setup events for this set
    @this {WSet}
    @param {function()} f callback. Callback should receive the type of the
      event.
    @param {object} names of events to register.
    supported are: click, mouseover, mouseout, mousemove, mouseup,
    mousedown.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  eventRegister: function(f, names) {
    var that = this;
    names.forEach(function(eventName) {
      that.forEach(function(e) {
        switch (eventName) {
          case 'click':
            e.click(function() {
              f(eventName);
            });
            break;
          case 'mouseover':
            e.mouseover(function() {
              f(eventName);
            });
            break;
          case 'mouseout':
            e.mouseout(function() {
              f(eventName);
            });
            break;
          case 'mousemove':
            e.mousemove(function() {
              f(eventName);
            });
            break;
          case 'mouseup':
            e.mouseup(function() {
              f(eventName);
            });
            break;
          case 'mousedown':
            e.mousedown(function() {
              f(eventName);
            });
            break;
          default:
            throw 'unknown event name ' + eventName;
        }
      });
    });
  }
});


/**
  @class Wrapper for Raphael.js
  @author mark.veltzer@gmail.com (Mark Veltzer)
*/
var WRaphael = Class.create(/** @lends WRaphael.prototype */{
  /**
    creates a new instance.
    Pass anything you want to raphael.
    @this {WRaphael}
    @return {WRaphael} a new instance of this class.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  initialize: function() {
    this.r = Raphael.apply(undefined, arguments);
  },
  /**
    create a rectangle on the paper.
    Pass anything you want to raphael.
    @this {WRaphael}
    @return {rect} whatever Raphael returns.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  rect: function() {
    var m = this.r.rect;
    var r = m.apply(this.r, arguments);
    return r;
  },
  /**
    create a set on the paper.
    Pass anything you want to raphael.
    @this {WRaphael}
    @return {set} our wrapper for Raphael sets.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  set: function() {
    var m = this.r.set;
    var r = m.apply(this.r, arguments);
    return new WSet(r, this);
  },
  /**
    create path on the paper.
    Pass anything you want to raphael.
    @this {WRaphael}
    @return {path} whatever Raphael returns.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  path: function() {
    var m = this.r.path;
    var r = m.apply(this.r, arguments);
    return r;
  },
  /**
    create text on the paper.
    Pass anything you want to raphael.
    @this {WRaphael}
    @return {text} whatever Raphael returns.
    @author mark.veltzer@gmail.com (Mark Veltzer)
  */
  text: function() {
    var m = this.r.text;
    var r = m.apply(this.r, arguments);
    return r;
  }
});
