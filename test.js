var fs = require('fs');
var data = JSON.parse(fs.readFileSync('graph.json', 'utf8'));

var createGraph = require('ngraph.graph');
var g = createGraph();




for (var i = 0, j = data.nodes.length; i < j; i++) {
  g.addNode(data.nodes[i].id, data.nodes[i]);
}



for (var i = 0, j = data.edges.length; i < j; i++) {
  g.addLink(data.edges[i].source, data.edges[i].target, data.edges[i]);
}



/*
g.forEachNode(function(node){
    console.log(node.id, node.data);
});
*/
var physicsSettings = {
  springLength: 6,
  springCoeff: 0.002,
  gravity: -1,
  theta: 2,
  dragCoeff: 0.02,
  timeStep: 20
};

ITERATIONS_COUNT = 100;
var layout = require('ngraph.forcelayout')(g, physicsSettings);
for (var i = 0; i < ITERATIONS_COUNT; ++i) {
  layout.step();
}




var nodes = []


g.forEachNode(function(node) {
	var l = layout.getNodePosition(node.id);

  node.data.x = l.x;
  node.data.y = l.y;

  nodes.push(node.data)
});

var new_data = {"nodes": nodes, "edges": data.edges};
console.log(JSON.stringify(new_data));