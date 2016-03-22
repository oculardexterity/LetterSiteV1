String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

var routerModule = (function(graph) {
		

		(function () {	// Intialise as self-calling anonymous...
			console.log('router init called');
			callFromUrls();


		})();


		/*
			TO DO: define some proper routes and the things calling them and all that it is etc.
		*/
		function callFromUrls() {
			console.log('callFromUrls called');
			var pn = window.location.pathname;
			console.log(pn);
			if (pn === '/' || pn.contains('graph/default') ) {
				console.log(pn, 'pn loads default graph');
				getData('defaultGraph', graph.drawGraph);
			}

		}



		function getData(dataIdentifier, callback) {
			console.log('getData called');
			//console.log(localStorage.dataIdentifier);

			function addToCacheAndDo(data) {
				console.log('addToCacheAndDo called');
				localStorage[dataIdentifier] = data;
				callback(data);
			}

			if (dataIdentifier in localStorage && !testingOverride) {
				console.log('Data loaded from cache');
				//console.log(localStorage[dataIdentifier]);
				callback(localStorage[dataIdentifier]);
			}
			else {
				console.log('Data ajaxed in');
				$.ajax({
		    		url: "http://localhost:5000/ajax/" + dataIdentifier 
		    	}).done(addToCacheAndDo);
		    }
		} 

    	return {
    	
    	}
});