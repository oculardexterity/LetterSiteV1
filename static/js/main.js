// TO DO --- parse window.location.pathname and trigger appropriate functions...

var windowManager = ( function( window, undefined ) {
   

  function ajaxRequest(e, path, callback) {
  	//console.log(localStorage)
  	//console.log(e.pageY, e.pageX);
  	$('.container').css({'height': 0, 'width': 0, 'opacity': 0, 'top': e.pageY, 'left': e.pageX});
    if (window.location.pathname in localStorage) {
    	console.log('from localStorage');
	    letterRenderer(e)(localStorage[window.location.pathname]);
		}
		else {
			console.log('from ajaxRequest');
			$.ajax({
	  		url: "http://localhost:5000/ajax" + window.location.pathname
			}).done(letterRenderer(e));
		}
  }

  function letterRenderer(e) {
	  function func(data) {
	  	//console.log(e);
	  	expandContainer(e);
	  	$('.container').html(data).show();
	  	localStorage[window.location.pathname] = data;
	  }
	  return func;
	}
  
  function expandContainer(e) {
  	var h = $(window).height() / 2 - 300;
  	var w = $(window).width() / 2 - 250;
    
    $('.container').animate({'height': '600px', 'width': '500px', 'opacity':1, 'top': h, 'left': w}, 200, 'swing');
    $('.closeLetter').show();
  }
 
  
  // explicitly return public methods when this object is instantiated
  return {
    ajaxRequest : ajaxRequest
  };
  
} )( window );


$(document).ready(function(e) {
	//console.log(window.location);
	console.log("http://localhost:5000/ajax" + window.location.pathname)
	windowManager.ajaxRequest(e);
});

/*
	Interface bindings...
*/
$('.closeLetter').click(function(e) {
	e.preventDefault();
	history.pushState('data', '', 'http://localhost:5000/');
	//windowManager.ajaxRequest();
	$('.container').hide();
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
		$('.container').hide();
		$('.closerLetter').hide();
	}
};

