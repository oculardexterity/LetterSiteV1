// TO DO --- parse window.location.pathname and trigger appropriate functions...

var windowManager = ( function( window, undefined ) {
   

  function ajaxRequest(path, callback) {
  	console.log('ajax called');
  	//$('.letterContainer').css({'height': 0, 'width': 0, 'opacity': 0});//, 'top': e.pageY, 'left': e.pageX});
    if (window.location.pathname in localStorage) {
    
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
	  	console.log(data);
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
	Interface bindings...
*/

/*






*/