(function( window, document, req_version, callback, $, script, done, readystate ){
	// If jQuery isn't loaded, or is a lower version than specified, load the
	// specified version and call the callback, otherwise just call the callback.
	if ( !($ = window.jQuery) || req_version > $.fn.jquery || callback( $ ) ) {
		
		// Create a script element.
		script = document.createElement( 'script' );
		script.type = 'text/javascript';
		
		// Load the specified jQuery from the Google AJAX API server (minified).
		script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/' + req_version + '/jquery.min.js';
		
		// When the script is loaded, remove it, execute jQuery.noConflict( true )
		// on the newly-loaded jQuery (thus reverting any previous version to its
		// original state), and call the callback with the newly-loaded jQuery.
		script.onload = script.onreadystatechange = function() {
			if ( !done && ( !( readystate = this.readyState )
				|| readystate == 'loaded' || readystate == 'complete' ) ) {
				
				callback( ($ = window.jQuery).noConflict(1), done = 1 );
				
				$( script ).remove();
			}
		};
		
		// Add the script element to either the head or body, it doesn't matter.
		document.documentElement.childNodes[0].appendChild( script );
	}
})( window, document,
	
	// Minimum jQuery version required. Change this as-needed.
	'1.6.2',
	
	// Your jQuery code goes inside this callback. $ refers to the jQuery object,
	// and L is a boolean that indicates whether an external jQuery file was "L"oaded.
	function( $, L ) {
		'$:nomunge, L:nomunge'; // Used by YUI compressor.
		
		
		var jQuery = $;
		
		
		/* YOUR JQUERY CODE GOES HERE */
		
		
		getJS(['https://raw.github.com/DmitryBaranovskiy/raphael/master/raphael-min.js']);
		
		function getJS(jsfiles) {
			// Check if we've processed all of the JS files (or if there are none)
			if (jsfiles.length === 0) {
				OGRender();
				
				return false;
			}
	
			// Load the first js file in the array
			$.getScript(jsfiles[0],  function(){ 
				// When it's done loading, remove it from the queue and call the function again    
				getJS(jsfiles.slice(1));
			});
		}	
	 		
		
		$("body")
		.append( $('<div />')
			.attr({
				id: 'OGContainer'
			})
			.append( $('<div />')
				.attr({
					id: 'OGCanvas'
				})
			)
			.append( $('<div />')
				.attr({
					id: 'OGOptions'
				})
				.append( $('<form />')
					.attr({
						id: 'OGForm',
						method: 'get',
						action: ''
					})
					.append( $('<div />')
						.attr({
							'class': 'OGGrid'
						})
						.append( $('<span />')
							.html('- Horizontal Grid')
						)
						.append( $('<div />')
							.attr({
								'class': 'OGGridOptions'
							})
							.append( $('<label />')
								.html('Color:')
								.append( $('<input />')
									.attr({
										id: 'OGHorizontalColor',
										value: '#000'
									})
								)
							)
							.append( $('<label />')
								.html('Opacity:')
								.append( $('<input />')
									.attr({
										id: 'OGHorizontalOpacity',
										value: '0.3'
									})
								)
							)
							.append( $('<label />')
								.html('Grid spacing:')
								.append( $('<input />')
									.attr({
										id: 'OGHorizontalPX',
										value: 20
									})
								)
							)
							.append( $('<label />')
								.html('Gutter spacing:')
								.append( $('<input />')
									.attr({
										id: 'OGHorizontalGutter',
										value: 0
									})
								)
							)
							.append( $('<label />')
								.html('Offset:')
								.append( $('<input />')
									.attr({
										id: 'OGHorizontalOffset',
										value: 0
									})
								)
							)
						)
					)
					.append( $('<div />')
						.attr({
							'class': 'OGGrid'
						})
						.append( $('<span />')
							.html('- Vertical Grid')
						)
						.append( $('<div />')
							.attr({
								'class': 'OGGridOptions'
							})
							.append( $('<label />')
								.html('Color:')
								.append( $('<input />')
									.attr({
										id: 'OGVerticalColor',
										value: '#000'
									})
								)
							)
							.append( $('<label />')
								.html('Opacity:')
								.append( $('<input />')
									.attr({
										id: 'OGVerticalOpacity',
										value: '0.3'
									})
								)
							)
							.append( $('<label />')
								.html('Grid spacing:')
								.append( $('<input />')
									.attr({
										id: 'OGVerticalPX',
										value: 0
									})
								)
							)
							.append( $('<label />')
								.html('Gutter spacing:')
								.append( $('<input />')
									.attr({
										id: 'OGVerticalGutter',
										value: 0
									})
								)
							)
							.append( $('<label />')
								.html('Offset:')
								.append( $('<input />')
									.attr({
										id: 'OGVerticalOffset',
										value: 0
									})
								)
							)
						)
					)
					.append( $('<div />')
						.attr({
							'class': 'OGGrid',
							'style': 'display: none'
						})
						.append( $('<span />')
							.html('+ Settings')
						)
						.append( $('<div />')
							.attr({
								'class': 'OGGridOptions',
								'style': 'display: none'
							})
							.append( $('<input />')
								.attr({
									'type': 'submit',
									'value': 'Set default for page'
								})
							)
							.append( $('<input />')
								.attr({
									'type': 'button',
									'value': 'Clear default for page'
								})
							)
						)
					)
				)
				.append( $('<div />')
					.html('&times;')
					.attr({
						id: 'OGCloseButton',
					})
				)
			)
		);
		
		
		
		
		
		$('#OGCloseButton').click(function () {
			$('#OGOptions').hide(400);
			$('#OGCanvas').fadeOut(400, function () {
				$('#OGContainer').remove();
			});
		});
		
		
		$('#OGOptions input').change(function () {
			OGRender();
		});
		
		
		$('.OGGrid').click(function () {
			$(this).find('.OGGridOptions').slideToggle(300);
			var title = $(this).find('span').html();
			$(this).find('span').html(
				title.charAt(0)=='-' ? title.replace('-', '+') : title.replace('+', '-')
			);
		});
		$('.OGGridOptions').click(function (event) {
			event.stopPropagation();
			return false;
		});	

 		function OGRender() {
	 		var verticalOffset = $('#OGVerticalOffset').val()*1;
	 		var horizontalOffset = $('#OGHorizontalOffset').val()*1;
	 		
	 		var verticalPX = $('#OGVerticalPX').val()*1;
	 		var horizontalPX = $('#OGHorizontalPX').val()*1;
	 		
	 		var verticalGutter = $('#OGVerticalGutter').val()*1;
	 		var horizontalGutter = $('#OGHorizontalGutter').val()*1;
	 		
	 		$('#OGCanvas').html('');
	 		
	 		var paper = Raphael('OGCanvas', $(window).width()-verticalOffset, $(document).height()-horizontalOffset);
	 		
	 		var linesX = linesY = rectsX = rectsY = [];
		 	
		 	
		 	
		 	if (verticalPX > 0) {
			 	if (verticalGutter > 0) {
			 		for (var line = 0; line < ($(window).width()-verticalOffset)/verticalPX; line++) {
			 			rectsX[line] = paper.rect(line*(verticalPX+verticalGutter), 0, verticalPX, $(document).height());
			 			
			 			rectsX[line].attr({
			 				'fill': $('#OGVerticalColor').val(),
			 				'stroke-width': '0px',
			 				'fill-opacity': $('#OGVerticalOpacity').val()
			 			});
			 			
			 			$(rectsX[line].node).css('shapeRendering', 'crispEdges');
			 		}
			 	}
			 	else {	
			 		for (var line = 0; line < ($(window).width()-verticalOffset)/verticalPX; line++) {
				 		linesX[line] = paper.path("M"+(line*verticalPX)+" 0 l0 "+$(document).height());
				 		
				 		linesX[line].attr({
				 			'stroke': $('#OGVerticalColor').val(),
				 			'stroke-width': '1px',
				 			'stroke-opacity': $('#OGVerticalOpacity').val()
				 		});
				 		
				 		$(linesX[line].node).css('shapeRendering', 'crispEdges');
		 			}
		 		}
	 		}
	 		
	 		
	 		if (horizontalPX > 0) {
		 		if (horizontalGutter > 0) {
		 			for (var line = 0; line < ($(document).height()-horizontalOffset)/horizontalPX; line++) {
		 				rectsY[line] = paper.rect(0, line*(horizontalPX+horizontalGutter), $(window).width(), horizontalPX);
		 				
		 				rectsY[line].attr({
		 					'fill': $('#OGHorizontalColor').val(),
		 					'stroke-width': '0px',
		 					'fill-opacity': $('#OGHorizontalOpacity').val()
		 				});
		 				
		 				$(rectsY[line].node).css('shapeRendering', 'crispEdges');
		 			}
		 		}
		 		else {	
		 			for (var line = 0; line < ($(document).height()-horizontalOffset)/horizontalPX; line++) {
						linesY[line] = paper.path("M0 "+(line*horizontalPX)+"l"+$(window).width()+" 0");
						
		 				linesY[line].attr({
		 					'stroke': $('#OGHorizontalColor').val(),
		 					'stroke-width': '1px',
		 					'stroke-opacity': $('#OGHorizontalOpacity').val()
		 				});
		 				
		 				$(linesY[line].node).css('shapeRendering', 'crispEdges');
		 			}
		 		}
	 		}
	 		
	 		
	 		$('#OGCanvas').css({
	 			'top': horizontalOffset,
	 			'left': verticalOffset
	 		});
	 	}
	 	
	 	
	 	
	 	$('<style />').html('#OGContainer{z-index:900000000}#OGContainer,#OGCanvas{position:absolute;top:0;left:0;width:100%;height:100%}#OGCloseButton{position:absolute;top:2px;left:4px;height:14px;width:14px;background:#bbb;color:#000;text-shadow:none;text-align:center;line-height:12px;font-size:14px;-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:7px;cursor:pointer}#OGCloseButton:hover{background:#ddd}#OGOptions{background:#444;opacity:0.9;border:1px solid #666;border-bottom:0;display:inline-block;position:relative;-webkit-border-top-left-radius:5px;-moz-border-radius-topleft:5px;border-top-left-radius:5px;-webkit-border-top-right-radius:5px;-moz-border-radius-topright:5px;border-top-right-radius:5px;font:12px sans-serif;-moz-box-shadow:0 4px 10px rgba(0,0,0,0.7);-webkit-box-shadow:0 4px 10px rgba(0,0,0,0.7);box-shadow:0 4px 10px rgba(0,0,0,0.7);padding:20px 0 0}#OGOptions::before{content:"";position:absolute;width:100%;height:18px;top:0;left:0;background:#111;border-bottom:1px solid #555;border-top:1px solid #999;-moz-box-shadow:inset 0 16px 16px -16px rgba(255,255,255,0.9);-webkit-box-shadow:inset 0 16px 16px -16px rgba(255,255,255,0.9);box-shadow:inset 0 16px 16px -16px rgba(255,255,255,0.9);-webkit-border-top-left-radius:4px;-moz-border-radius-topleft:4px;border-top-left-radius:4px;-webkit-border-top-right-radius:4px;-moz-border-radius-topright:4px;border-top-right-radius:4px}.OGGrid{-moz-box-shadow:inset 0 16px 0 rgba(0,0,0,0.6), inset 0 17px 0 #666;-webkit-box-shadow:inset 0 16px 0 rgba(0,0,0,0.6), inset 0 17px 0 #666;box-shadow:inset 0 16px 0 rgba(0,0,0,0.6), inset 0 17px 0 #666;line-height:16px;border-bottom:1px solid #666;cursor:pointer;color:#bbb;text-transform:uppercase;text-shadow:0 -1px 0 #000;padding:0 8px}.OGGridOptions{cursor:default;color:#eee;text-shadow:none;text-transform:capitalize;padding:8px 0}#OGOptions input{width:30px;margin:0 0 0 5px}#OGOptions label{margin:0 0 0 20px}#OGOptions label:first-child{margin:0}#OGOptions label:first-child input{width:60px}').appendTo('head');
	 	
	 	
	 	
	 	
	 	
	 	
	 	
	 	
	 	/* https://www.github.com/jas-/jQuery.handleStorage */
	 	(function(a){a.fn.handleStorage=function(d){var k={appID:"jQuery.handleStorage",storage:"localStorage",ads:false,uuid:"",form:a(this).attr("id"),data:{}};var w={init:function(y){var x=a.extend({},k,y);if(m(x)){x.data[x.appID]=(e(x))?e(x):{};var z=c(x);if((typeof z==="object")&&(h(z)>0)){t(x,z)}a("#"+x.form).live("submit",function(A){f(x)});return true}else{return false}}};var h=function(x){var y=0;a.each(x,function(A,z){if(x.hasOwnProperty(A)){y++}});return y};var q=function(B,A,z){var y=false;B=(b(B))?B:"cookie";switch(B){case"localStorage":y=o(A,z);break;case"sessionStorage":y=I(A,z);break;case"cookie":y=u(A,z);break;default:y=o(A,z);break}return y};var n=function(A,z){var y=false;A=(b(A))?A:"cookie";switch(A){case"localStorage":y=j(z);break;case"sessionStorage":y=g(z);break;case"cookie":y=s(z);break;default:y=j(z);break}return y};var o=function(y,x){return(localStorage.setItem(y,x))?false:true};var I=function(y,x){return(sessionStorage.setItem(y,x))?false:true};var u=function(y,x){if(typeof a.cookie==="function"){return(a.cookie(y,x,{expires:7}))?true:false}else{return false}};var j=function(x){return(localStorage.getItem(x))?localStorage.getItem(x):false};var g=function(x){return(sessionStorage.getItem(x))?sessionStorage.getItem(x):false};var s=function(x){if(typeof a.cookie==="function"){return(a.cookie(x))?a.cookie(x):false}else{return false}};var e=function(x){return(n(x.storage,x.appID))?JSON.parse(n(x.storage,x.appID)):false};var c=function(A){var z={},y;if(typeof A.data[A.appID][A.form]==="object"){a.each(a("#"+A.form+" > :input"),function(B,x){if((p(x.name)!==false)&&(p(A.data[A.appID][A.form][x.name])!==false)){z[x.name]=((A.aes)&&(A.data[A.appID][A.form]["uuid"])&&(y!==false))?GibberishAES.dec(A.data[A.appID][A.form][x.name],A.data[A.appID][A.form]["uuid"]):A.data[A.appID][A.form][x.name]}})}return z};var t=function(y,x){if(h(x)>0){a.each(x,function(A,z){if((a("#"+y.form+" > input[name="+A+"]").attr("name")===A)||(a("#"+y.form+" > textarea[name="+A+"]").attr("name")===A)&&(p(z)!==false)){a("#"+y.form+" > input[name="+A+"], #"+y.form+" > textarea[name="+A+"]").val(z)}})}};var f=function(z){l(z.data);var y={};y[z.form]={};a.each(a("#"+z.form+" > :input"),function(A,x){if((p(x.value)!==false)&&(p(x.name)!==false)){if((z.aes)&&(!z.uuid)){z.uuid=v(z);y[z.form]["uuid"]=z.uuid}y[z.form][x.name]=((z.aes)&&(y[z.form]["uuid"]))?GibberishAES.enc(x.value,y[z.form]["uuid"]):x.value}});z.data[z.appID]=(h(z.data[z.appID])>0)?a.extend({},z.data[z.appID],y):y;q(z.storage,z.appID,JSON.strIngIfy(z.data[z.appID]))};var p=function(x){if(x){return((x===false)||(x.length===0)||(!x)||(x===null)||(x==="")||(typeof x==="undefined"))?false:true}else{return false}};var b=function(x){try{return((x in window)&&(window[x]))?true:false}catch(y){return false}};var m=function(y){var x=true;if(y.aes){if(!a.isFunction(GibberishAES.enc)){console.log("AES use specified but required libraries not available.Please include the Gibberish-AES libs…");x=false}}if(y.storage==="cookie"){if(!a.isFunction(a.cookie)){console.log("Cookie use specified but required libraries not available.Please include the jQuery cookie plugin…");x=false}}return x};var r=function(x){var C="0123456789abcdef".split("");var A=[],z=Math.random,B;A[8]=A[13]=A[18]=A[23]="-";A[14]="4";for(var y=0;y<36;y++){if(!A[y]){B=0|z()*16;A[y]=C[(y==19)?(B&3)|8:B&15]}}return(x!==null)?A.join("").replace(/-/g,"").split("",x).join(""):A.join("")};var v=function(A){if(A.aes){var z=(e(A))?e(A):{};z[A.form]=(z[A.form])?z[A.form]:{};var B=(p(z[A.form]["uuid"]))?z[A.form]["uuid"]:r(null);return B}};var l=function(x){a.each(x,function(z,A){if(typeof A==="object"){l(A)}else{console.log(z+" => "+A)}})};if(w[d]){return w[d].apply(this,Array.prototype.slice.call(arguments,1))}else{if((typeof d==="object")||(!d)){return w.init.apply(this,arguments)}else{a.error("Method "+d+" does not exist on "+opts.name)}}}})(jQuery);
	 	
	 	
	 	$('#OGForm').handleStorage();
	 	
	 	
	 	
	 	
	 	
	 	
	 	
	 	
	 	
	 	/*!
	 	 * jQuery UI 1.8.14
	 	 *
	 	 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
	 	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 	 * http://jquery.org/license
	 	 *
	 	 * http://docs.jquery.com/UI
	 	 */
	 	(function(c,j){function k(a,b){var d=a.nodeName.toLowerCase();if("area"===d){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&l(a)}return(/input|select|textarea|button|object/.test(d)?!a.disabled:"a"==d?a.href||b:b)&&l(a)}function l(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.14",
	 	keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();
	 	b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,
	 	"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"),10);if(!isNaN(b)&&b!==0)return b}a=a.parent()}}return 0},disableSelection:function(){return this.bind((c.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",
	 	function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});c.each(["Width","Height"],function(a,b){function d(f,g,m,n){c.each(e,function(){g-=parseFloat(c.curCSS(f,"padding"+this,true))||0;if(m)g-=parseFloat(c.curCSS(f,"border"+this+"Width",true))||0;if(n)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,
	 	outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c(this).css(h,d(this,f)+"px")})};c.fn["outer"+b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c(this).css(h,d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){return k(a,!isNaN(c.attr(a,"tabindex")))},tabbable:function(a){var b=c.attr(a,"tabindex"),d=isNaN(b);
	 	return(d||b>=0)&&k(a,!d)}});c(function(){var a=document.body,b=a.appendChild(b=document.createElement("div"));c.extend(b.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.offsetHeight===100;c.support.selectstart="onselectstart"in b;a.removeChild(b).style.display="none"});c.extend(c.ui,{plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=
	 	0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)}})}})(jQuery);
	 	;/*!
	 	 * jQuery UI Widget 1.8.14
	 	 *
	 	 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
	 	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 	 * http://jquery.org/license
	 	 *
	 	 * http://docs.jquery.com/UI/Widget
	 	 */
	 	(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)b(d).triggerHandler("remove");k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,
	 	a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.charAt(0)==="_")return h;
	 	e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,
	 	this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},
	 	widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},
	 	enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
	 	;/*!
	 	 * jQuery UI Mouse 1.8.14
	 	 *
	 	 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
	 	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 	 * http://jquery.org/license
	 	 *
	 	 * http://docs.jquery.com/UI/Mouse
	 	 *
	 	 * Depends:
	 	 *	jquery.ui.widget.js
	 	 */
	 	(function(b){var d=false;b(document).mousedown(function(){d=false});b.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(c){return a._mouseDown(c)}).bind("click."+this.widgetName,function(c){if(true===b.data(c.target,a.widgetName+".preventClickEvent")){b.removeData(c.target,a.widgetName+".preventClickEvent");c.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+
	 	this.widgetName)},_mouseDown:function(a){if(!d){this._mouseStarted&&this._mouseUp(a);this._mouseDownEvent=a;var c=this,f=a.which==1,g=typeof this.options.cancel=="string"?b(a.target).closest(this.options.cancel).length:false;if(!f||g||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=this._mouseStart(a)!==
	 	false;if(!this._mouseStarted){a.preventDefault();return true}}true===b.data(a.target,this.widgetName+".preventClickEvent")&&b.removeData(a.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(e){return c._mouseMove(e)};this._mouseUpDelegate=function(e){return c._mouseUp(e)};b(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.preventDefault();return d=true}},_mouseMove:function(a){if(b.browser.msie&&
	 	!(document.documentMode>=9)&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=
	 	false;a.target==this._mouseDownEvent.target&&b.data(a.target,this.widgetName+".preventClickEvent",true);this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
	 	;/*
	 	 * jQuery UI Draggable 1.8.14
	 	 *
	 	 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
	 	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 	 * http://jquery.org/license
	 	 *
	 	 * http://docs.jquery.com/UI/Draggables
	 	 *
	 	 * Depends:
	 	 *	jquery.ui.core.js
	 	 *	jquery.ui.mouse.js
	 	 *	jquery.ui.widget.js
	 	 */
	 	(function(d){d.widget("ui.draggable",d.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper==
	 	"original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";this.options.addClasses&&this.element.addClass("ui-draggable");this.options.disabled&&this.element.addClass("ui-draggable-disabled");this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();return this}},_mouseCapture:function(a){var b=
	 	this.options;if(this.helper||b.disabled||d(a.target).is(".ui-resizable-handle"))return false;this.handle=this._getHandle(a);if(!this.handle)return false;d(b.iframeFix===true?"iframe":b.iframeFix).each(function(){d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1E3}).css(d(this).offset()).appendTo("body")});return true},_mouseStart:function(a){var b=this.options;this.helper=
	 	this._createHelper(a);this._cacheHelperProportions();if(d.ui.ddmanager)d.ui.ddmanager.current=this;this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
	 	this.originalPosition=this.position=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);b.containment&&this._setContainment();if(this._trigger("start",a)===false){this._clear();return false}this._cacheHelperProportions();d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.helper.addClass("ui-draggable-dragging");this._mouseDrag(a,true);d.ui.ddmanager&&d.ui.ddmanager.dragStart(this,a);return true},
	 	_mouseDrag:function(a,b){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!b){b=this._uiHash();if(this._trigger("drag",a,b)===false){this._mouseUp({});return false}this.position=b.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);return false},_mouseStop:function(a){var b=
	 	false;if(d.ui.ddmanager&&!this.options.dropBehaviour)b=d.ui.ddmanager.drop(this,a);if(this.dropped){b=this.dropped;this.dropped=false}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return false;if(this.options.revert=="invalid"&&!b||this.options.revert=="valid"&&b||this.options.revert===true||d.isFunction(this.options.revert)&&this.options.revert.call(this.element,b)){var c=this;d(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,
	 	10),function(){c._trigger("stop",a)!==false&&c._clear()})}else this._trigger("stop",a)!==false&&this._clear();return false},_mouseUp:function(a){this.options.iframeFix===true&&d("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)});d.ui.ddmanager&&d.ui.ddmanager.dragStop(this,a);return d.ui.mouse.prototype._mouseUp.call(this,a)},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(a){var b=!this.options.handle||
	 	!d(this.options.handle,this.element).length?true:false;d(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==a.target)b=true});return b},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a])):b.helper=="clone"?this.element.clone().removeAttr("id"):this.element;a.parents("body").length||a.appendTo(b.appendTo=="parent"?this.element[0].parentNode:b.appendTo);a[0]!=this.element[0]&&!/(fixed|absolute)/.test(a.css("position"))&&
	 	a.css("position","absolute");return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=
	 	this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),
	 	10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),
	 	10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[a.containment=="document"?0:d(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,a.containment=="document"?0:d(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,
	 	(a.containment=="document"?0:d(window).scrollLeft())+d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a.containment=="document"?0:d(window).scrollTop())+(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)&&a.containment.constructor!=Array){a=d(a.containment);var b=a[0];if(b){a.offset();var c=d(b).css("overflow")!=
	 	"hidden";this.containment=[(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0),(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0),(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),
	 	10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];this.relative_container=a}}else if(a.containment.constructor==Array)this.containment=a.containment},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName);return{top:b.top+
	 	this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&
	 	!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName),e=a.pageX,h=a.pageY;if(this.originalPosition){var g;if(this.containment){if(this.relative_container){g=this.relative_container.offset();g=[this.containment[0]+g.left,this.containment[1]+g.top,this.containment[2]+g.left,this.containment[3]+g.top]}else g=this.containment;if(a.pageX-this.offset.click.left<g[0])e=g[0]+this.offset.click.left;
	 	if(a.pageY-this.offset.click.top<g[1])h=g[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>g[2])e=g[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>g[3])h=g[3]+this.offset.click.top}if(b.grid){h=b.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/b.grid[1])*b.grid[1]:this.originalPageY;h=g?!(h-this.offset.click.top<g[1]||h-this.offset.click.top>g[3])?h:!(h-this.offset.click.top<g[1])?h-b.grid[1]:h+b.grid[1]:h;e=b.grid[0]?this.originalPageX+Math.round((e-this.originalPageX)/
	 	b.grid[0])*b.grid[0]:this.originalPageX;e=g?!(e-this.offset.click.left<g[0]||e-this.offset.click.left>g[2])?e:!(e-this.offset.click.left<g[0])?e-b.grid[0]:e+b.grid[0]:e}}return{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop()),left:e-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&d.browser.version<
	 	526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},_trigger:function(a,b,c){c=c||this._uiHash();d.ui.plugin.call(this,a,[b,c]);if(a=="drag")this.positionAbs=this._convertPositionTo("absolute");return d.Widget.prototype._trigger.call(this,a,b,
	 	c)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}});d.extend(d.ui.draggable,{version:"1.8.14"});d.ui.plugin.add("draggable","connectToSortable",{start:function(a,b){var c=d(this).data("draggable"),f=c.options,e=d.extend({},b,{item:c.element});c.sortables=[];d(f.connectToSortable).each(function(){var h=d.data(this,"sortable");if(h&&!h.options.disabled){c.sortables.push({instance:h,shouldRevert:h.options.revert});
	 	h.refreshPositions();h._trigger("activate",a,e)}})},stop:function(a,b){var c=d(this).data("draggable"),f=d.extend({},b,{item:c.element});d.each(c.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;c.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance._mouseStop(a);this.instance.options.helper=this.instance.options._helper;c.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})}else{this.instance.cancelHelperRemoval=
	 	false;this.instance._trigger("deactivate",a,f)}})},drag:function(a,b){var c=d(this).data("draggable"),f=this;d.each(c.sortables,function(){this.instance.positionAbs=c.positionAbs;this.instance.helperProportions=c.helperProportions;this.instance.offset.click=c.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=d(f).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);
	 	this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return b.helper[0]};a.target=this.instance.currentItem[0];this.instance._mouseCapture(a,true);this.instance._mouseStart(a,true,true);this.instance.offset.click.top=c.offset.click.top;this.instance.offset.click.left=c.offset.click.left;this.instance.offset.parent.left-=c.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=c.offset.parent.top-this.instance.offset.parent.top;
	 	c._trigger("toSortable",a);c.dropped=this.instance.element;c.currentItem=c.element;this.instance.fromOutside=c}this.instance.currentItem&&this.instance._mouseDrag(a)}else if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",a,this.instance._uiHash(this.instance));this.instance._mouseStop(a,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();this.instance.placeholder&&
	 	this.instance.placeholder.remove();c._trigger("fromSortable",a);c.dropped=false}})}});d.ui.plugin.add("draggable","cursor",{start:function(){var a=d("body"),b=d(this).data("draggable").options;if(a.css("cursor"))b._cursor=a.css("cursor");a.css("cursor",b.cursor)},stop:function(){var a=d(this).data("draggable").options;a._cursor&&d("body").css("cursor",a._cursor)}});d.ui.plugin.add("draggable","opacity",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("opacity"))b._opacity=
	 	a.css("opacity");a.css("opacity",b.opacity)},stop:function(a,b){a=d(this).data("draggable").options;a._opacity&&d(b.helper).css("opacity",a._opacity)}});d.ui.plugin.add("draggable","scroll",{start:function(){var a=d(this).data("draggable");if(a.scrollParent[0]!=document&&a.scrollParent[0].tagName!="HTML")a.overflowOffset=a.scrollParent.offset()},drag:function(a){var b=d(this).data("draggable"),c=b.options,f=false;if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){if(!c.axis||c.axis!=
	 	"x")if(b.overflowOffset.top+b.scrollParent[0].offsetHeight-a.pageY<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop+c.scrollSpeed;else if(a.pageY-b.overflowOffset.top<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop-c.scrollSpeed;if(!c.axis||c.axis!="y")if(b.overflowOffset.left+b.scrollParent[0].offsetWidth-a.pageX<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft+c.scrollSpeed;else if(a.pageX-b.overflowOffset.left<
	 	c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft-c.scrollSpeed}else{if(!c.axis||c.axis!="x")if(a.pageY-d(document).scrollTop()<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()-c.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()+c.scrollSpeed);if(!c.axis||c.axis!="y")if(a.pageX-d(document).scrollLeft()<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()-
	 	c.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()+c.scrollSpeed)}f!==false&&d.ui.ddmanager&&!c.dropBehaviour&&d.ui.ddmanager.prepareOffsets(b,a)}});d.ui.plugin.add("draggable","snap",{start:function(){var a=d(this).data("draggable"),b=a.options;a.snapElements=[];d(b.snap.constructor!=String?b.snap.items||":data(draggable)":b.snap).each(function(){var c=d(this),f=c.offset();this!=a.element[0]&&a.snapElements.push({item:this,
	 	width:c.outerWidth(),height:c.outerHeight(),top:f.top,left:f.left})})},drag:function(a,b){for(var c=d(this).data("draggable"),f=c.options,e=f.snapTolerance,h=b.offset.left,g=h+c.helperProportions.width,n=b.offset.top,o=n+c.helperProportions.height,i=c.snapElements.length-1;i>=0;i--){var j=c.snapElements[i].left,l=j+c.snapElements[i].width,k=c.snapElements[i].top,m=k+c.snapElements[i].height;if(j-e<h&&h<l+e&&k-e<n&&n<m+e||j-e<h&&h<l+e&&k-e<o&&o<m+e||j-e<g&&g<l+e&&k-e<n&&n<m+e||j-e<g&&g<l+e&&k-e<o&&
	 	o<m+e){if(f.snapMode!="inner"){var p=Math.abs(k-o)<=e,q=Math.abs(m-n)<=e,r=Math.abs(j-g)<=e,s=Math.abs(l-h)<=e;if(p)b.position.top=c._convertPositionTo("relative",{top:k-c.helperProportions.height,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:m,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:j-c.helperProportions.width}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:l}).left-c.margins.left}var t=
	 	p||q||r||s;if(f.snapMode!="outer"){p=Math.abs(k-n)<=e;q=Math.abs(m-o)<=e;r=Math.abs(j-h)<=e;s=Math.abs(l-g)<=e;if(p)b.position.top=c._convertPositionTo("relative",{top:k,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:m-c.helperProportions.height,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:j}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:l-c.helperProportions.width}).left-c.margins.left}if(!c.snapElements[i].snapping&&
	 	(p||q||r||s||t))c.options.snap.snap&&c.options.snap.snap.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[i].item}));c.snapElements[i].snapping=p||q||r||s||t}else{c.snapElements[i].snapping&&c.options.snap.release&&c.options.snap.release.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[i].item}));c.snapElements[i].snapping=false}}}});d.ui.plugin.add("draggable","stack",{start:function(){var a=d(this).data("draggable").options;a=d.makeArray(d(a.stack)).sort(function(c,f){return(parseInt(d(c).css("zIndex"),
	 	10)||0)-(parseInt(d(f).css("zIndex"),10)||0)});if(a.length){var b=parseInt(a[0].style.zIndex)||0;d(a).each(function(c){this.style.zIndex=b+c});this[0].style.zIndex=b+a.length}}});d.ui.plugin.add("draggable","zIndex",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("zIndex"))b._zIndex=a.css("zIndex");a.css("zIndex",b.zIndex)},stop:function(a,b){a=d(this).data("draggable").options;a._zIndex&&d(b.helper).css("zIndex",a._zIndex)}})})(jQuery);
	 	
	 	
	 	
	 	
	 	$('#OGOptions').draggable();
   	}
);