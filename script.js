window.bookmarklet = function(opts){fullFunc(opts)};
 
// These are the styles, scripts and callbacks we include in our bookmarklet:
window.bookmarklet({
 
	css : ['https://raw.github.com/sfcgeorge/Grid-Bookmarklet/master/style.css'],
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
		$.each(csfiles, function(i, val){
			$('<style />').load(val).appendTo('head');
		});
	}
 
	function getjQuery(filename) {
 
		// Create jQuery script element
		var fileref = document.createElement('script')
		fileref.type = 'text/javascript';
		fileref.src =  filename;
 
		// Once loaded, trigger other scripts and styles
		fileref.onload = function(){
 
			getCSS(opts.css); // load CSS files
			getJS(opts.js); // load JS files
 
		};
 
		document.body.appendChild(fileref);
	}
 
	getjQuery(opts.jqpath); // kick it off
 
}; // end of bookmarklet();