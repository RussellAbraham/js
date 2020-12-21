
function Graph(){
    this.adjacencyList = {};
}

// chmod
Graph.prototype = Object.create(Object.prototype, {
	constructor : {
		value : Graph,
		enumerable : true,
		writeable : true,
		configurable : true
	}
});

Graph.prototype = {

    addVertex : function(vertex){
        if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    },

    addEdge : function(v1,v2){
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);        
    },

    removeEdge : function(vertex1, vertex2){
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(function(v){
            return v !== vertex2;
        });
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(function(v){
            return v !== vertex1;
        });        
    },

    removeVertex : function(vertex){
        while(this.adjacencyList[vertex].length){
            var adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex,adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }

}

const g = new Graph();

console.log(g instanceof Graph);

console.log(g instanceof Object);


g.addVertex('left');
g.addVertex('middle');
g.addVertex('right');

g.addEdge('left', 'middle');
g.addEdge('right', 'middle');
g.addEdge('left', 'right');

/*
Object {
 left : ['middle', 'right'],
 middle : ['left','right'],
 right : ['middle','left']
}
*/
