// TO DO --- parse window.location.pathname and trigger appropriate functions...

var testingOverride = true;








	



/*
	On document ready::
*/
var graph, router, letter;


$(document).ready(function() {


	letter = letterManager({
		container: '.letterContainer',
		closeLetterDiv: '.closeLetter'
	});


	// Initialise some shit:
	graph = graphManager({
		container: 'graphContainer',
		initialGraph: 'defaultGraph'
	});

	
	router = routerModule();
	router.initialise();

	/// DOES this query need to be pushed into some graphManager func?
      
});






