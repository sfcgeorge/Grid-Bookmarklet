window.bookmarklet = function(opts){fullFunc(opts)};
 
// These are the styles, scripts and callbacks we include in our bookmarklet:
window.bookmarklet({
 
	css : [''],
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
 
function fullFunc(opts){
 
	// User doesn't have to set jquery, we have a default.
	opts.jqpath = opts.jqpath || "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js";
 
	function getJS(jsfiles){
 
	// Check if we've processed all of the JS files (or if there are none)
	if (jsfiles.length === 0) {
		opts.ready();
		return false;
	}
 
		// Load the first js file in the array
		$.getScript(jsfiles[0],  function(){ 
 
			// When it's done loading, remove it from the queue and call the function again    
			getJS(jsfiles.slice(1));
 
		})
 
	}
 
	// Synchronous loop for css files
	function getCSS(csfiles){
		$('<style />').html('#OGContainer,#OGCanvas{position:absolute;top:0;left:0;width:100%;height:100%}#OGCloseButton{position:absolute;top:2px;left:4px;height:14px;width:14px;background:#bbb;text-align:center;line-height:12px;font-size:14px;-webkit-border-radius:7px;-moz-border-radius:7px;border-radius:7px;cursor:pointer}#OGCloseButton:hover{background:#ddd}#OGOptions{background:#444;opacity:0.9;border:1px solid #666;display:inline-block;position:relative;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;font:12px sans-serif;-moz-box-shadow:0 4px 10px rgba(0,0,0,0.7);-webkit-box-shadow:0 4px 10px rgba(0,0,0,0.7);box-shadow:0 4px 10px rgba(0,0,0,0.7);padding:28px 8px 8px}#OGOptions::before{content:"";position:absolute;width:100%;height:18px;top:0;left:0;background:#111;border-bottom:1px solid #555;border-top:1px solid #999;-moz-box-shadow:inset 0 16px 16px -16px rgba(255,255,255,0.9);-webkit-box-shadow:inset 0 16px 16px -16px rgba(255,255,255,0.9);box-shadow:inset 0 16px 16px -16px rgba(255,255,255,0.9);-webkit-border-top-left-radius:4px;-moz-border-radius-topleft:4px;border-top-left-radius:4px;-webkit-border-top-right-radius:4px;-moz-border-radius-topright:4px;border-top-right-radius:4px}#OGOptions input{width:30px;margin:0 0 0 5px}#OGOptions label{color:#eee;text-shadow:0 -1px 0 rgba(0,0,0,0.9);margin:0 0 0 20px}#OGOptions label:first-child{margin:0}#OGOptions label:first-child input{width:60px}').appendTo('head');
	}
 
	function getjQuery(filename) {
 
		// Create jQuery script element
		var fileref = document.createElement('script')
		fileref.type = 'text/javascript';
		fileref.src =  filename;
 
		// Once loaded, trigger other scripts and styles
		fileref.onload = function(){
 
			getCSS(); // load CSS files
			getJS(opts.js); // load JS files
 
		};
 
		document.body.appendChild(fileref);
	}
 
	getjQuery(opts.jqpath); // kick it off
 
}; // end of bookmarklet();