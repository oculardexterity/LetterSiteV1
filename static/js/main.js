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
	}
  
  function expandContainer() {
  	var h = $(window).height() / 2 - 300;
  	var w = $(window).width() / 2 - 250;
    
    $('.letterContainer').animate({'height': '600px', 'width': '500px', 'opacity':1, 'top': h, 'left': w}, 200, 'swing');
    $('.closeLetter').show();
  }
 
  
  // explicitly return public methods when this object is instantiated
  return {
    ajaxRequest : ajaxRequest
  };
  
} )( window );



/*
	Interface bindings...
*/

/*
$('.closeLetter').click(function(e) {
	e.preventDefault();
	history.pushState('data', '', 'http://localhost:5000/');
	//windowManager.ajaxRequest();
	$('.letterContainer').hide();
	$('.closeLetter').hide();
})

$('.letterLink').click(function(e) {
	e.preventDefault();
	history.pushState('data', '', $(this).attr('href'));
	windowManager.ajaxRequest(e);
});

window.onpopstate = function(e) {
	//alert(window.location.pathname);
	if (window.location.pathname != "/") {
	  windowManager.ajaxRequest(e);
	}
	else {
		$('.letterContainer').hide();
		$('.closerLetter').hide();
	}
};

*/