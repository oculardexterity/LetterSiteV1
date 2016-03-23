var letterManager = (function(config) {



    console.log(config);



  
    $(config['closeLetterDiv']).click(closeLetter);



	function showLetterContent(data) {
		$(config['closeLetterDiv']).show();
		$(config['container']).html(data).show();
	}


	function closeLetter() {
		//console.log('closeletterclicked');
		$(config['closeLetterDiv']).hide();
		$(config['container']).hide();
		router.url.removeVar('letter');
	};
 
 	return {
 		showLetterContent: showLetterContent,
 		closeLetter: closeLetter
 	}
  
});