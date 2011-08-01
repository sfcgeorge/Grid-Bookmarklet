/*
 * jQuery Bookmarklet - version 1.0
 * Originally written by: Brett Barros
 * With modifications by: Paul Irish
 *
 * If you use this script, please link back to the source
 *
 * Copyright (c) 2010 Latent Motion (http://latentmotion.com/how-to-create-a-jquery-bookmarklet/)
 * Released under the Creative Commons Attribution 3.0 Unported License,
 * as defined here: http://creativecommons.org/licenses/by/3.0/
 *
 */
 
window.bookmarklet = function(opts){fullFunc(opts)};
 
// These are the styles, scripts and callbacks we include in our bookmarklet:
window.bookmarklet({
 
	css : ['style.css'],
	js  : ['https://raw.github.com/DmitryBaranovskiy/raphael/master/raphael-min.js', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min.js'],    
	ready : function(){
 		
		// The meat of your jQuery code goes here
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
				.append( $('<label />')
					.html('Color:')
					.append( $('<input />')
						.attr({
							id: 'OGColor',
							value: '#000'
						})
					)
				)
				.append( $('<label />')
					.html('Opacity:')
					.append( $('<input />')
						.attr({
							id: 'OGOpacity',
							value: '0.3'
						})
					)
				)
				.append( $('<label />')
					.html('Y spacing:')
					.append( $('<input />')
						.attr({
							id: 'OGVerticalPX',
							value: 20
						})
					)
				)
				.append( $('<label />')
					.html('X spacing:')
					.append( $('<input />')
						.attr({
							id: 'OGHorizontalPX',
							value: 0
						})
					)
				)
				.append( $('<label />')
					.html('Y offset:')
					.append( $('<input />')
						.attr({
							id: 'OGVerticalOffset',
							value: 0
						})
					)
				)
				.append( $('<label />')
					.html('X offset:')
					.append( $('<input />')
						.attr({
							id: 'OGHorizontalOffset',
							value: 0
						})
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
		
		
		$('#OGOptions').draggable();
		
		
		$('#OGCloseButton').click(function () {
			$('#OGOptions').hide(400);
			$('#OGCanvas').fadeOut(400, function () {
				$('#OGContainer').remove();
			});
		});
		
		
		$('#OGOptions input').change(function () {
			OGRender();
		});
		
		
		OGRender();
			

 		function OGRender() {
	 		$('#OGCanvas').css({
	 			'top': $('#OGVerticalOffset').val()*1,
	 			'left': $('#OGHorizontalOffset').val()*1
	 		});
	 		
	 		$('#OGCanvas').html('');
	 		
	 		var paper = Raphael('OGCanvas', $(window).width(), $(window).height());
	 		
	 		var linesX = linesY = [];
	 		 
	 		var verticalPX = $('#OGVerticalPX').val();
	 		var horizontalPX = $('#OGHorizontalPX').val();
		 	
		 	var strokeColor = $('#OGColor').val();
		 	var strokeOpacity = $('#OGOpacity').val();
		 	
		 	if (verticalPX > 0) {
		 		for (var line = 0; line < $(window).height()/verticalPX; line++) {
			 		linesY[line] = paper.path("M0 "+(line*verticalPX)+"l"+$(window).width()+" 0");
			 		linesY[line].attr({
			 			'stroke': strokeColor,
			 			'stroke-width': '1px',
			 			'stroke-opacity': strokeOpacity
			 		});
			 		
			 		$(linesY[line].node).css('shapeRendering', 'crispEdges');
	 			}
	 		}
	 		if (horizontalPX > 0) {
	 			for (var line = 0; line < ($(window).width()/horizontalPX); line++) {
	 				linesX[line] = paper.path("M"+(line*horizontalPX)+" 0 l0 "+$(window).height());

	 				linesX[line].attr({
	 					'stroke': strokeColor,
	 					'stroke-width': '1px',
	 					'stroke-opacity': strokeOpacity
	 				});
	 				
	 				$(linesX[line].node).css('shapeRendering', 'crispEdges');
	 			}
	 		}
	 	}
   	}
})
 
function fullFunc(a){function d(b){if(b.length===0){a.ready();return false}$.getScript(b[0],function(){d(b.slice(1))})}function e(b){$.each(b,function(c,f){$("<link>").attr({href:f,rel:"stylesheet"}).appendTo("head")})}a.jqpath=a.jqpath||"http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js";(function(b){var c=document.createElement("script");c.type="text/javascript";c.src=b;c.onload=function(){e(a.css);d(a.js)};document.body.appendChild(c)})(a.jqpath)};