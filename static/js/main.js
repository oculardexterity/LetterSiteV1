// TO DO --- parse window.location.pathname and trigger appropriate functions...

var testingOverride = true;

var windowManager = ( function( window, undefined ) {
   

  function ajaxRequest(path, callback) {
  	
  	//$('.letterContainer').css({'height': 0, 'width': 0, 'opacity': 0});//, 'top': e.pageY, 'left': e.pageX});
    if (window.location.pathname in localStorage) {
      console.log('from cache');
	    letterRenderer(localStorage[window.location.pathname]);
		}
		else {
			console.log('from ajaxRequest');
			$.ajax({
	  		url: "http://localhost:5000/ajax" + window.location.pathname
			}).done(letterRenderer);
		}
  }

  function letterRenderer(data) {
	  	
	  	//expandContainer();
	  	$('.letterContainer').html(data);
	  	localStorage[window.location.pathname] = data;
	  	expandContainer();
	}
  
  function expandContainer() {
  	
    $('.letterContainer').show();
    $('.letterContainer').animate({ 'opacity':1}, 200, 'swing');
    


    $('.closeLetter').show();
  }
 
  
  // explicitly return public methods when this object is instantiated
  return {
    ajaxRequest : ajaxRequest
  };
  
} )( window );


$(document).ready(function() {
	$('.closeLetter').click(function(e){
		$('.letterContainer').hide();
		$('.closeLetter').hide();
	})

	window.onpopstate = function(e) {
		//alert(window.location.pathname);
		if (window.location.pathname != "/") {
		  windowManager.ajaxRequest(e);
		}
		else {
			$('.letterContainer').hide();
			$('.closeLetter').hide();
		}
	};
})


/*
	On document ready::
*/
var graph, router;


$(document).ready(function() {


	


	// Initialise some shit:
	graph = graphManager({
		container: 'graphContainer',
		initialGraph: 'defaultGraph'
	});

	
	router = routerModule(graph);

	/// DOES this query need to be pushed into some graphManager func?
      
});



