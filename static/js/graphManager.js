var graphManager = (function(config) {
	console.log(config);
	
	var container = document.getElementById(config.container);
	
	var sigmaWebgl = new sigma({
			
			renderer: {
			    container: container, 
			    type: 'canvas'

			},
			settings: {
			    drawLabels: true,
			    nodesPowRatio: 0.001,
			    rescaleIgnoreSize: true,
			    autoResize: false,
			    zoomMax: 1000,
			    minNodeSize: 2,
			    maxNodeSize: 4,
			    maxEdgeSize: 0.4,
			    nodeActiveLevel: 5

			}
	});


	var tooltipConfig = {
	    	node: {
		    	show: 'clickNode',
		        cssClass: 'sigma-tooltip',
		    	position: 'top',
		        //autoadjust: true,
		        //template: letterLabelTemplate,
	 
		    	renderer: function(node, template) {
		        	// The function context is s.graph
		        	//node.degree = this.degree(node.id);
		      
		        	console.log(node, 'hi')

				    if (node.data.type === 'letter') {
			        // Returns an HTML string:
				    	return Mustache.render(letterLabelTemplate(), node);
		    		}
		      		else {
		        		return Mustache.render(personLabelTemplate(), node)
		        	}

		        	// Returns a DOM Element:
		        	//var el = document.createElement('div');
		        	//return el.innerHTML = Mustache.render(template, node);
			    }
			}
		};

	var tooltipsWebgl = sigma.plugins.tooltips(sigmaWebgl, sigmaWebgl.renderers[0], tooltipConfig);

	var cam = sigmaWebgl.camera;



	function drawGraphWithData(data) {
		console.log(data);

		var g = JSON.parse(data);

		sigmaWebgl.graph.read(g);
		sigmaWebgl.refresh();
		bindTooltips();
	}

	function bindTooltips() {

		tooltipsWebgl.bind('shown', function(event) {
			console.log(router);
		    $(".showLetterLink").click(function(e){
			    e.preventDefault();
			    var url = $(this).attr('href');
			    
			    router.getData('letter/' + url, letter.showLetterContent);
			    router.url.setVar('letter', url);
		    });
		});

		tooltipsWebgl.bind('hidden', function(event) {
		  //console.log('tooltip hidden', event);
		});
	
	}

	return {
		// Expose a default drawGraph method (takes JSON)
		drawGraph: drawGraphWithData,

		// Expose the sigma instance...
		sigma: sigmaWebgl,
		camera: cam
	}
});