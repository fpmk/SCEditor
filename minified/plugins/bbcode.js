/* SCEditor v1.4.5 | (C) 2011-2013, Sam Clarke | sceditor.com/license */
!function(a,b,c){"use strict";a.sceditor.BBCodeParser=function(b){if(!(this instanceof a.sceditor.BBCodeParser))return new a.sceditor.BBCodeParser(b);var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s=this,t={open:"open",content:"content",newline:"newline",close:"close"},u=function(a,b,c,d,e,f){var g=this;g.type=a,g.name=b,g.val=c,g.attrs=d||{},g.children=e||[],g.closing=f||null};u.prototype={clone:function(a){var b=this;return new u(b.type,b.name,b.val,b.attrs,a?b.children:[],b.closing?b.closing.clone():null)},splitAt:function(b){var c,d=this,e=0,f=d.children.length;if("number"!=typeof object&&(b=a.inArray(b,d.children)),0>b||b>f)return null;for(;f--;)f>=b?e++:f=0;return c=d.clone(),c.children=d.children.splice(b,e),c}},d=function(){s.opts=a.extend({},a.sceditor.BBCodeParser.defaults,b),s.bbcodes=a.sceditor.plugins.bbcode.bbcodes},s.tokenize=function(a){var b,c,d,f=[],g=[{type:"close",regex:/^\[\/[^\[\]]+\]/},{type:"open",regex:/^\[[^\[\]]+\]/},{type:"newline",regex:/^(\r\n|\r|\n)/},{type:"content",regex:/^([^\[\r\n]+|\[)/}];g.reverse();a:for(;a.length;){for(d=g.length;d--;)if(c=g[d].type,(b=a.match(g[d].regex))&&b[0]){f.push(e(c,b[0])),a=a.substr(b[0].length);continue a}a.length&&f.push(e(t.content,a)),a=""}return f},e=function(b,c){var d,e,g;return"open"===b&&(d=c.match(/\[([^\]\s=]+)(?:([^\]]+))?\]/))?(g=q(d[1]),d[2]&&(d[2]=a.trim(d[2]))&&(e=f(d[2]))):"close"===b&&(d=c.match(/\[\/([^\[\]]+)\]/))?g=q(d[1]):"newline"===b&&(g="#newline"),g&&("open"!==b&&"close"!==b||a.sceditor.plugins.bbcode.bbcodes[g])||(b="content",g="#"),new u(b,g,c,e)},f=function(b){var c,d=/([^\s=]+)=(?:(?:(["'])((?:\\\2|[^\2])*?)\2)|((?:.(?!\s\S+=))*.))/g,e=a.sceditor.plugins.bbcode.stripQuotes,f={};if("="===b.charAt(0)&&b.indexOf("=",1)<0)f.defaultattr=e(b.substr(1));else for("="===b.charAt(0)&&(b="defaultattr"+b);c=d.exec(b);)f[q(c[1])]=e(c[3])||c[4];return f},s.parse=function(a,b){var c=g(s.tokenize(a));return s.opts.fixInvalidChildren&&l(c),s.opts.removeEmptyTags&&k(c),s.opts.fixInvalidNesting&&i(c),h(c,null,b),s.opts.removeEmptyTags&&k(c),c},o=function(a,b,c){for(var d=c.length;d--;)if(c[d].type===b&&c[d].name===a)return!0;return!1},j=function(b,c){var d=b?s.bbcodes[b.name]:null,e=d?d.allowedChildren:null;return s.opts.fixInvalidChildren&&e?e&&a.inArray(c.name||"#",e)<0?!1:!0:!0},g=function(b){for(var c,d,e,f,g,h,i,j=[],k=[],l=[],m=function(){return r(l)},n=function(a){m()?m().children.push(a):k.push(a)},p=function(b){return m()&&(d=s.bbcodes[m().name])&&d.closedBy&&a.inArray(b,d.closedBy)>-1};c=b.shift();){switch(i=b[0],c.type){case t.open:p(c.name)&&l.pop(),n(c),d=s.bbcodes[c.name],d&&d.isSelfClosing||!d.closedBy&&!o(c.name,t.close,b)?d&&d.isSelfClosing||(c.type=t.content):l.push(c);break;case t.close:if(m()&&c.name!==m().name&&p("/"+c.name)&&l.pop(),m()&&c.name===m().name)m().closing=c,l.pop();else if(o(c.name,t.open,l)){for(;e=l.pop();){if(e.name===c.name){e.closing=c;break}f=e.clone(),j.length>1&&f.children.push(r(j)),j.push(f)}for(n(r(j)),g=j.length;g--;)l.push(j[g]);j.length=0}else c.type=t.content,n(c);break;case t.newline:m()&&i&&p((i.type===t.close?"/":"")+i.name)&&(i.type!==t.close||i.name!==m().name)&&(d=s.bbcodes[m().name],d&&d.breakAfter?l.pop():d&&d.isInline===!1&&s.opts.breakAfterBlock&&d.breakAfter!==!1&&l.pop()),n(c);break;default:n(c)}h=c}return k},h=function(a,b,c){var d,e,f,g,i,j,k,l,m=a.length,n=m;for(b&&(g=s.bbcodes[b.name]);n--;)if(d=a[n])if(d.type===t.newline){if(e=n>0?a[n-1]:null,f=m-1>n?a[n+1]:null,l=!1,!c&&g&&g.isSelfClosing!==!0&&(e?j||f||(g.isInline===!1&&s.opts.breakEndBlock&&g.breakEnd!==!1&&(l=!0),g.breakEnd&&(l=!0),j=l):(g.isInline===!1&&s.opts.breakStartBlock&&g.breakStart!==!1&&(l=!0),g.breakStart&&(l=!0))),e&&e.type===t.open&&(i=s.bbcodes[e.name])&&(c?i.isInline===!1&&(l=!0):(i.isInline===!1&&s.opts.breakAfterBlock&&i.breakAfter!==!1&&(l=!0),i.breakAfter&&(l=!0))),!c&&!k&&f&&f.type===t.open&&(i=s.bbcodes[f.name])&&(i.isInline===!1&&s.opts.breakBeforeBlock&&i.breakBefore!==!1&&(l=!0),i.breakBefore&&(l=!0),k=l,l)){a.splice(n,1);continue}l&&a.splice(n,1),k=!1}else d.type===t.open&&h(d.children,d,c)},i=function(b,c,d,e){var f,g,h,j,k,l,m=function(a){var b=s.bbcodes[a.name];return!b||b.isInline!==!1};for(c=c||[],e=e||b,g=0;g<b.length;g++)if((f=b[g])&&f.type===t.open){if(!m(f)&&d&&(h=r(c),l=h.splitAt(f),k=c.length>1?c[c.length-2].children:e,(j=a.inArray(h,k))>-1))return l.children.splice(a.inArray(f,l.children),1),k.splice(j+1,0,f,l),void 0;c.push(f),i(f.children,c,d||m(f),e),c.pop(f)}},l=function(a,b){for(var c,d,e=a.length;e--;)(c=a[e])&&(j(b,c)||(c.name=null,c.type=t.content,j(b,c)?(d=[e+1,0].concat(c.children),c.closing&&(c.closing.name=null,c.closing.type=t.content,d.push(c.closing)),e+=d.length-1,Array.prototype.splice.apply(a,d)):b.children.splice(e,1)),c.type===t.open&&l(c.children,c))},k=function(b){var c,d,e,f=b.length;for(e=function(a){for(var b=a.length;b--;){if(a[b].type===t.open)return!1;if(a[b].type===t.close)return!1;if(a[b].type===t.content&&a[b].val&&/\S|\u00A0/.test(a[b].val))return!1}return!0};f--;)(c=b[f])&&c.type===t.open&&(d=s.bbcodes[c.name],k(c.children),e(c.children)&&d&&!d.isSelfClosing&&!d.allowsEmpty&&b.splice.apply(b,a.merge([f,1],c.children)))},s.toHTML=function(a,b){return m(s.parse(a,b),!0)},m=function(b,d){var e,f,g,h,i,j,k,l,n=[];for(k=function(a){return(!a||("undefined"!=typeof a.isHtmlInline?a.isHtmlInline:a.isInline))!==!1};b.length>0;)if(e=b.shift()){if(e.type===t.open)l=e.children[e.children.length-1]||{},f=s.bbcodes[e.name],i=d&&k(f),g=m(e.children,!1),f&&f.html?(k(f)||!k(s.bbcodes[l.name])||f.isPreFormatted||f.skipLastLineBreak||a.sceditor.ie||(g+="<br />"),h=a.isFunction(f.html)?f.html.call(s,e,e.attrs,g):a.sceditor.plugins.bbcode.formatString(f.html,g)):h=e.val+g+(e.closing?e.closing.val:"");else{if(e.type===t.newline){if(!d){n.push("<br />");continue}j||(n.push("<div>"),(c.documentMode&&c.documentMode<8||a.sceditor.ie<8)&&n.push(" ")),a.sceditor.ie||n.push("<br />"),b.length||n.push("<br />"),n.push("</div>\n"),j=!1;continue}i=d,h=a.sceditor.escapeEntities(e.val)}i&&!j?(n.push("<div>"),j=!0):!i&&j&&(n.push("</div>\n"),j=!1),n.push(h)}return j&&n.push("</div>\n"),n.join("")},s.toBBCode=function(a,b){return n(s.parse(a,b))},n=function(b){for(var c,d,e,f,g,h,i,j,k,l,m=[];b.length>0;)if(c=b.shift())if(e=s.bbcodes[c.name],f=!(!e||e.isInline!==!1),g=e&&e.isSelfClosing,i=f&&s.opts.breakBeforeBlock&&e.breakBefore!==!1||e&&e.breakBefore,j=f&&!g&&s.opts.breakStartBlock&&e.breakStart!==!1||e&&e.breakStart,k=f&&s.opts.breakEndBlock&&e.breakEnd!==!1||e&&e.breakEnd,l=f&&s.opts.breakAfterBlock&&e.breakAfter!==!1||e&&e.breakAfter,h=(e?e.quoteType:null)||s.opts.quoteType||a.sceditor.BBCodeParser.QuoteType.auto,e||c.type!==t.open)if(c.type===t.open){if(i&&m.push("\n"),m.push("["+c.name),c.attrs){c.attrs.defaultattr&&(m.push("="+p(c.attrs.defaultattr,h,"defaultattr")),delete c.attrs.defaultattr);for(d in c.attrs)c.attrs.hasOwnProperty(d)&&m.push(" "+d+"="+p(c.attrs[d],h,d))}m.push("]"),j&&m.push("\n"),c.children&&m.push(n(c.children)),g||e.excludeClosing||(k&&m.push("\n"),m.push("[/"+c.name+"]")),l&&m.push("\n"),c.closing&&g&&m.push(c.closing.val)}else m.push(c.val);else m.push(c.val),c.children&&m.push(n(c.children)),c.closing&&m.push(c.closing.val);return m.join("")},p=function(b,c,d){var e=a.sceditor.BBCodeParser.QuoteType,f=/\s|=/.test(b);return a.isFunction(c)?c(b,d):c===e.never||c===e.auto&&!f?b:'"'+b.replace("\\","\\\\").replace('"','\\"')+'"'},r=function(a){return a.length?a[a.length-1]:null},q=function(a){return a.toLowerCase()},d()},a.sceditor.BBCodeParser.QuoteType={always:1,never:2,auto:3},a.sceditor.BBCodeParser.defaults={breakBeforeBlock:!1,breakStartBlock:!1,breakEndBlock:!1,breakAfterBlock:!0,removeEmptyTags:!0,fixInvalidNesting:!0,fixInvalidChildren:!0,quoteType:a.sceditor.BBCodeParser.QuoteType.auto},a.sceditorBBCodePlugin=a.sceditor.plugins.bbcode=function(){var b,d,e,f,g,h,i,j=this;f=a.sceditor.plugins.bbcode.formatString,j.bbcodes=a.sceditor.plugins.bbcode.bbcodes,j.stripQuotes=a.sceditor.plugins.bbcode.stripQuotes;var k={},l={},m={ul:["li","ol","ul"],ol:["li","ol","ul"],table:["tr"],tr:["td","th"],code:["br","p","div"]},n={};j.init=function(){j.opts=this.opts,b(),h(this),this.toBBCode=j.signalToSource,this.fromBBCode=j.signalToWysiwyg},h=function(b){var c=a.sceditor.command.get,d={bold:{txtExec:["[b]","[/b]"]},italic:{txtExec:["[i]","[/i]"]},underline:{txtExec:["[u]","[/u]"]},strike:{txtExec:["[s]","[/s]"]},subscript:{txtExec:["[sub]","[/sub]"]},superscript:{txtExec:["[sup]","[/sup]"]},left:{txtExec:["[left]","[/left]"]},center:{txtExec:["[center]","[/center]"]},right:{txtExec:["[right]","[/right]"]},justify:{txtExec:["[justify]","[/justify]"]},font:{txtExec:function(a){var b=this;c("font")._dropDown(b,a,function(a){b.insertText("[font="+a+"]","[/font]")})}},size:{txtExec:function(a){var b=this;c("size")._dropDown(b,a,function(a){b.insertText("[size="+a+"]","[/size]")})}},color:{txtExec:function(a){var b=this;c("color")._dropDown(b,a,function(a){b.insertText("[color="+a+"]","[/color]")})}},bulletlist:{txtExec:function(c,d){var e="";a.each(d.split(/\r?\n/),function(){e+=(e?"\n":"")+"[li]"+this+"[/li]"}),b.insertText("[ul]\n"+e+"\n[/ul]")}},orderedlist:{txtExec:function(c,d){var e="";a.each(d.split(/\r?\n/),function(){e+=(e?"\n":"")+"[li]"+this+"[/li]"}),a.sceditor.plugins.bbcode.bbcode.get(""),b.insertText("[ol]\n"+e+"\n[/ol]")}},table:{txtExec:["[table][tr][td]","[/td][/tr][/table]"]},horizontalrule:{txtExec:["[hr]"]},code:{txtExec:["[code]","[/code]"]},image:{txtExec:function(a,b){var c=prompt(this._("Enter the image URL:"),b);c&&this.insertText("[img]"+c+"[/img]")}},email:{txtExec:function(a,b){var c=b&&b.indexOf("@")>-1?null:b,d=prompt(this._("Enter the e-mail address:"),c?"":b),e=prompt(this._("Enter the displayed text:"),c||d)||d;d&&this.insertText("[email="+d+"]"+e+"[/email]")}},link:{txtExec:function(b,c){var d=/^[a-z]+:\/\//i.test(a.trim(c))?null:c,e=prompt(this._("Enter URL:"),d?"http://":a.trim(c)),f=prompt(this._("Enter the displayed text:"),d||e)||e;e&&this.insertText("[url="+e+"]"+f+"[/url]")}},quote:{txtExec:["[quote]","[/quote]"]},youtube:{txtExec:function(a){var b=this;c("youtube")._dropDown(b,a,function(a){b.insertText("[youtube]"+a+"[/youtube]")})}},rtl:{txtExec:["[rtl]","[/rtl]"]},ltr:{txtExec:["[ltr]","[/ltr]"]}};b.commands=a.extend(!0,{},d,b.commands)},b=function(){a.each(j.bbcodes,function(b){j.bbcodes[b].tags&&a.each(j.bbcodes[b].tags,function(a,c){var d=j.bbcodes[b].isInline===!1;k[a]=k[a]||{},k[a][d]=k[a][d]||{},k[a][d][b]=c}),j.bbcodes[b].styles&&a.each(j.bbcodes[b].styles,function(a,c){var d=j.bbcodes[b].isInline===!1;l[d]=l[d]||{},l[d][a]=l[d][a]||{},l[d][a][b]=c})})},g=function(b,c){var d,e,f,g,h,i=b.style;return i?(n[c]||(n[c]=a.camelCase(c)),h=n[c],"text-align"===c?(d=a(b),f=i.direction,g=i[h]||d.css(c),d.parent().css(c)===g||"block"!==d.css("display")||d.is("hr")||d.is("th")||(e=g),f&&e&&(/right/i.test(e)&&"rtl"===f||/left/i.test(e)&&"ltr"===f)?null:e):i[h]):null},d=function(b,c,d){var e;return d=!!d,l[d]?(a.each(l[d],function(d,h){e=g(b[0],d),e&&g(b.parent()[0],d)!==e&&a.each(h,function(d,g){(!g||a.inArray(e.toString(),g)>-1)&&(c=a.isFunction(j.bbcodes[d].format)?j.bbcodes[d].format.call(j,b,c):f(j.bbcodes[d].format,c))})}),c):c},e=function(b,c,d){var e,g=b[0],h=g.nodeName.toLowerCase();if(d=!!d,k[h]&&k[h][d]&&a.each(k[h][d],function(d,g){(!g||(e=!1,a.each(g,function(c,d){return!b.attr(c)||d&&a.inArray(b.attr(c),d)<0?void 0:(e=!0,!1)}),e))&&(c=a.isFunction(j.bbcodes[d].format)?j.bbcodes[d].format.call(j,b,c):f(j.bbcodes[d].format,c))}),d&&(!a.sceditor.dom.isInline(g,!0)||"br"===h)){for(var i=g.parentNode,l=i.lastChild,m=g.previousSibling,n=a.sceditor.dom.isInline(i,!0);m&&a(m).hasClass("sceditor-ignore");)m=m.previousSibling;for(;a(l).hasClass("sceditor-ignore");)l=l.previousSibling;(n||l!==g||"li"===h||"br"===h&&a.sceditor.ie)&&(c+="\n"),"br"!==h&&m&&"br"!==m.nodeName.toLowerCase()&&a.sceditor.dom.isInline(m,!0)&&(c="\n"+c)}return c},j.signalToSource=function(b,d){var e,f,g=new a.sceditor.BBCodeParser(j.opts.parserOptions);return d||("string"==typeof b?(e=a("<div />").css("visibility","hidden").appendTo(c.body).html(b),d=e):d=a(b)),d&&d.jquery?(a.sceditor.dom.removeWhiteSpace(d[0]),f=j.elementToBbcode(d),e&&e.remove(),f=g.toBBCode(f,!0),j.opts.bbcodeTrim&&(f=a.trim(f)),f):""},j.elementToBbcode=function(b){return function c(b,f){var g="";return a.sceditor.dom.traverse(b,function(b){var h=a(b),i="",j=b.nodeType,k=b.nodeName.toLowerCase(),l=m[k],n=b.firstChild,o=!0;if("object"==typeof f&&(o=a.inArray(k,f)>-1,h.is("img")&&h.data("sceditor-emoticon")&&(o=!0),o||(l=f)),3===j||1===j)if(1===j){if(h.hasClass("sceditor-ignore"))return;if(h.hasClass("sceditor-nlf")&&(!n||!a.sceditor.ie&&1===b.childNodes.length&&/br/i.test(n.nodeName)))return;"iframe"!==k&&(i=c(b,l)),o?("code"!==k&&(i=d(h,i),i=e(h,i),i=d(h,i,!0)),g+=e(h,i,!0)):g+=i}else!b.wholeText||b.previousSibling&&3===b.previousSibling.nodeType?b.wholeText||(g+=b.nodeValue):g+=0===h.parents("code").length?b.wholeText.replace(/ +/g," "):b.wholeText},!1,!0),g}(b[0])},j.signalToWysiwyg=function(b,c){var d=new a.sceditor.BBCodeParser(j.opts.parserOptions),e=d.toHTML(j.opts.bbcodeTrim?a.trim(b):b);return c?i(e):e},i=function(b){var d,e,f,g=a("<div />").hide().appendTo(c.body),h=g[0];return f=function(b,d){if(!a.sceditor.dom.hasStyling(b)){if(a.sceditor.ie||1!==b.childNodes.length||!a(b.firstChild).is("br"))for(;e=b.firstChild;)h.insertBefore(e,b);if(d){var f=h.lastChild;b!==f&&a(f).is("div")&&b.nextSibling===f&&h.insertBefore(c.createElement("br"),b)}h.removeChild(b)}},h.innerHTML=b.replace(/<\/div>\n/g,"</div>"),(d=h.firstChild)&&a(d).is("div")&&f(d,!0),(d=h.lastChild)&&a(d).is("div")&&f(d),h=h.innerHTML,g.remove(),h}},a.sceditor.plugins.bbcode.stripQuotes=function(a){return a?a.replace(/\\(.)/g,"$1").replace(/^(["'])(.*?)\1$/,"$2"):a},a.sceditor.plugins.bbcode.formatString=function(){var a=arguments;return a[0].replace(/\{(\d+)\}/g,function(b,c){return"undefined"!=typeof a[c-0+1]?a[c-0+1]:"{"+c+"}"})};var d=a.sceditor.plugins.bbcode.normaliseColour=function(a){var b,c;return c=function(a){return a=parseInt(a,10),isNaN(a)?"00":(a=Math.max(0,Math.min(a,255)).toString(16),a.length<2?"0"+a:a)},a=a||"#000",(b=a.match(/rgb\((\d{1,3}),\s*?(\d{1,3}),\s*?(\d{1,3})\)/i))?"#"+c(b[1])+c(b[2]-0)+c(b[3]-0):(b=a.match(/#([0-f])([0-f])([0-f])\s*?$/i))?"#"+b[1]+b[1]+b[2]+b[2]+b[3]+b[3]:a};a.sceditor.plugins.bbcode.bbcodes={b:{tags:{b:null,strong:null},styles:{"font-weight":["bold","bolder","401","700","800","900"]},format:"[b]{0}[/b]",html:"<strong>{0}</strong>"},i:{tags:{i:null,em:null},styles:{"font-style":["italic","oblique"]},format:"[i]{0}[/i]",html:"<em>{0}</em>"},u:{tags:{u:null},styles:{"text-decoration":["underline"]},format:"[u]{0}[/u]",html:"<u>{0}</u>"},s:{tags:{s:null,strike:null},styles:{"text-decoration":["line-through"]},format:"[s]{0}[/s]",html:"<s>{0}</s>"},sub:{tags:{sub:null},format:"[sub]{0}[/sub]",html:"<sub>{0}</sub>"},sup:{tags:{sup:null},format:"[sup]{0}[/sup]",html:"<sup>{0}</sup>"},font:{tags:{font:{face:null}},styles:{"font-family":null},quoteType:a.sceditor.BBCodeParser.QuoteType.never,format:function(a,b){var c;return"font"===a[0].nodeName.toLowerCase()&&(c=a.attr("face"))||(c=a.css("font-family")),"[font="+this.stripQuotes(c)+"]"+b+"[/font]"},html:function(a,b,c){return'<font face="'+b.defaultattr+'">'+c+"</font>"}},size:{tags:{font:{size:null}},styles:{"font-size":null},format:function(a,b){var c=a.attr("size"),d=1;return c||(c=a.css("fontSize")),c.indexOf("px")>-1?(c=c.replace("px","")-0,c>12&&(d=2),c>15&&(d=3),c>17&&(d=4),c>23&&(d=5),c>31&&(d=6),c>47&&(d=7)):d=c,"[size="+d+"]"+b+"[/size]"},html:function(a,b,c){return'<font size="'+b.defaultattr+'">'+c+"</font>"}},color:{tags:{font:{color:null}},styles:{color:null},quoteType:a.sceditor.BBCodeParser.QuoteType.never,format:function(a,b){var c,e=a[0];return"font"===e.nodeName.toLowerCase()&&(c=a.attr("color"))||(c=e.style.color||a.css("color")),"[color="+d(c)+"]"+b+"[/color]"},html:function(a,b,c){return'<font color="'+d(b.defaultattr)+'">'+c+"</font>"}},ul:{tags:{ul:null},breakStart:!0,isInline:!1,skipLastLineBreak:!0,format:"[ul]{0}[/ul]",html:"<ul>{0}</ul>"},list:{breakStart:!0,isInline:!1,skipLastLineBreak:!0,html:"<ul>{0}</ul>"},ol:{tags:{ol:null},breakStart:!0,isInline:!1,skipLastLineBreak:!0,format:"[ol]{0}[/ol]",html:"<ol>{0}</ol>"},li:{tags:{li:null},isInline:!1,closedBy:["/ul","/ol","/list","*","li"],format:"[li]{0}[/li]",html:"<li>{0}</li>"},"*":{isInline:!1,closedBy:["/ul","/ol","/list","*","li"],html:"<li>{0}</li>"},table:{tags:{table:null},isInline:!1,isHtmlInline:!0,skipLastLineBreak:!0,format:"[table]{0}[/table]",html:"<table>{0}</table>"},tr:{tags:{tr:null},isInline:!1,skipLastLineBreak:!0,format:"[tr]{0}[/tr]",html:"<tr>{0}</tr>"},th:{tags:{th:null},allowsEmpty:!0,isInline:!1,format:"[th]{0}[/th]",html:"<th>{0}</th>"},td:{tags:{td:null},allowsEmpty:!0,isInline:!1,format:"[td]{0}[/td]",html:"<td>{0}</td>"},emoticon:{allowsEmpty:!0,tags:{img:{src:null,"data-sceditor-emoticon":null}},format:function(a,b){return a.data("sceditor-emoticon")+b},html:"{0}"},hr:{tags:{hr:null},allowsEmpty:!0,isSelfClosing:!0,isInline:!1,format:"[hr]{0}",html:"<hr />"},img:{allowsEmpty:!0,tags:{img:{src:null}},quoteType:a.sceditor.BBCodeParser.QuoteType.never,format:function(a,b){var c,d,e="",f=a[0],g=function(a){return f.style?f.style[a]:null};return a.attr("data-sceditor-emoticon")?b:(c=a.attr("width")||g("width"),d=a.attr("height")||g("height"),(f.complete&&(c||d)||c&&d)&&(e="="+a.width()+"x"+a.height()),"[img"+e+"]"+a.attr("src")+"[/img]")},html:function(a,b,c){var d,e="";return"undefined"!=typeof b.width&&(e+=' width="'+b.width+'"'),"undefined"!=typeof b.height&&(e+=' height="'+b.height+'"'),b.defaultattr&&(d=b.defaultattr.split(/x/i),e=' width="'+d[0]+'"'+' height="'+(2===d.length?d[1]:d[0])+'"'),"<img"+e+' src="'+c+'" />'}},url:{allowsEmpty:!0,tags:{a:{href:null}},quoteType:a.sceditor.BBCodeParser.QuoteType.never,format:function(a,b){var c=a.attr("href");return"mailto:"===c.substr(0,7)?'[email="'+c.substr(7)+'"]'+b+"[/email]":"[url="+decodeURI(c)+"]"+b+"[/url]"},html:function(a,b,c){return'<a href="'+encodeURI(b.defaultattr||c)+'">'+c+"</a>"}},email:{quoteType:a.sceditor.BBCodeParser.QuoteType.never,html:function(a,b,c){return'<a href="mailto:'+(b.defaultattr||c)+'">'+c+"</a>"}},quote:{tags:{blockquote:null},isInline:!1,quoteType:a.sceditor.BBCodeParser.QuoteType.never,format:function(b,c){var d="",e=a(b),f=e.children("cite").first();return(1===f.length||e.data("author"))&&(d=f.text()||e.data("author"),e.data("author",d),f.remove(),c=this.elementToBbcode(a(b)),d="="+d,e.prepend(f)),"[quote"+d+"]"+c+"[/quote]"},html:function(a,b,c){return b.defaultattr&&(c="<cite>"+b.defaultattr+"</cite>"+c),"<blockquote>"+c+"</blockquote>"}},code:{tags:{code:null},isInline:!1,allowedChildren:["#","#newline"],format:"[code]{0}[/code]",html:"<code>{0}</code>"},left:{styles:{"text-align":["left","-webkit-left","-moz-left","-khtml-left"]},isInline:!1,format:"[left]{0}[/left]",html:'<div align="left">{0}</div>'},center:{styles:{"text-align":["center","-webkit-center","-moz-center","-khtml-center"]},isInline:!1,format:"[center]{0}[/center]",html:'<div align="center">{0}</div>'},right:{styles:{"text-align":["right","-webkit-right","-moz-right","-khtml-right"]},isInline:!1,format:"[right]{0}[/right]",html:'<div align="right">{0}</div>'},justify:{styles:{"text-align":["justify","-webkit-justify","-moz-justify","-khtml-justify"]},isInline:!1,format:"[justify]{0}[/justify]",html:'<div align="justify">{0}</div>'},youtube:{allowsEmpty:!0,tags:{iframe:{"data-youtube-id":null}},format:function(a,b){return a=a.attr("data-youtube-id"),a?"[youtube]"+a+"[/youtube]":b},html:'<iframe width="560" height="315" src="http://www.youtube.com/embed/{0}?wmode=opaque" data-youtube-id="{0}" frameborder="0" allowfullscreen></iframe>'},rtl:{styles:{direction:["rtl"]},format:"[rtl]{0}[/rtl]",html:'<div style="direction: rtl">{0}</div>'},ltr:{styles:{direction:["ltr"]},format:"[ltr]{0}[/ltr]",html:'<div style="direction: ltr">{0}</div>'},ignore:{}},a.sceditor.plugins.bbcode.bbcode={get:function(b){return a.sceditor.plugins.bbcode.bbcodes[b]||null},set:function(b,c){return b&&c?(c=a.extend(a.sceditor.plugins.bbcode.bbcodes[b]||{},c),c.remove=function(){a.sceditor.plugins.bbcode.bbcode.remove(b)},a.sceditor.plugins.bbcode.bbcodes[b]=c,this):!1},rename:function(a,b){return this.hasOwnProperty(a)?(this[b]=this[a],this.remove(a),this):!1},remove:function(b){return a.sceditor.plugins.bbcode.bbcodes[b]&&delete a.sceditor.plugins.bbcode.bbcodes[b],this}},a.fn.sceditorBBCodePlugin=function(b){return b=b||{},a.isPlainObject(b)&&(b.plugins=(b.plugins?b.plugins:"")+"bbcode"),this.sceditor(b)}}(jQuery,window,document);