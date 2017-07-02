/////////////////////////////
// Pathfinding starts here //
/////////////////////////////
Graph = function() {
  //copies over from finalMap
  this.vertices = finalMap;

  //takes in start and end location and quiery number and returns the path
  this.shortestPath = function(start, finish, queryNum) {
    var nodes = new PriorityQueue(),
      path = [],
      smallest, v, e, localWeight;

    for (v in this.vertices) {

      if (v === start) {
        this.vertices[v].weight = 0;
        nodes.enqueue(0, v); //only give the name
      } else {
        this.vertices[v].weight = Infinity;
        nodes.enqueue(Infinity, v);
      }
      this.vertices[v].previous = null;
    }

    while (!nodes.isEmpty()) {
      smallest = nodes.dequeue();

      //have reached the destination
      if (smallest === finish) {
        path = [];

        while (this.vertices[smallest].previous) {
          path.push(smallest);
          smallest = this.vertices[smallest].previous;
        }
        break;
      }

      if (!smallest || this.vertices[smallest].weight === Infinity) {
        continue;
      }

      for (e in this.vertices[smallest].edges) {
        var localWeight;
        switch (queryNum) {
          case 1:
            localWeight = this.vertices[smallest].weight + this.vertices[smallest].edges[e].time;
            break;
          case 2:
            localWeight = this.vertices[smallest].weight + this.vertices[smallest].edges[e].stairsWeight;
            break;
          case 3:
            localWeight = this.vertices[smallest].weight + this.vertices[smallest].edges[e].shelterRating;
            break; //no default
        };

        if (localWeight < this.vertices[e].weight) {
          this.vertices[e].weight = localWeight;
          this.vertices[e].previous = smallest;
          nodes.enqueue(localWeight, e);
        }
      }
    }
    return path.concat([start]).reverse(); //Adds the start vertex for improved readability
  };

  //takes in a path [array of vertex names], and outputs time taken for taht path
  this.getPathtime = function(path) {
    var time = 0;
    for (var i = 0; i < path.length - 1; i++) {
      time += g.vertices[path[i]].edges[path[i + 1]].time;
    }
    return time;
  };

  //takes in 2 vertexes and returns the message of the forward direction
  this.getEdgeDirections = function(fromVert, toVert) {
    //given that they exist
    return g.vertices[fromVert].edges[toVert].directions;
  };

  //takes in 2 vertexes and returns array of links of the forward direction
  this.getEdgeImageLink = function(fromVert, toVert) {
    //given that they exist
    return g.vertices[fromVert].edges[toVert].imageLink[0];
  };

  //takes in a path and returns edge data ni an array
  this.getEdgeArray = function(path) {
    var edgeArray = [];
    for (var  i = 0; i<path.length-1; i++){//-1 for last vertex
      edgeArray.push({
        "vertexName": path[i] ,
        "vertexNameNoSpaces": path[i].replace(/\s/g, '') ,
        "instructions": g.getEdgeDirections(path[i], path[i+1]) ,
        "link": g.getEdgeImageLink(path[i], path[i+1])
      });
    }
    return edgeArray;
  }

  //takes in the start and finish location and outputs query data in a wrapper
  this.getQueryOutput = function(start, finish, queryNum) {
    var path, time, queryName;
    switch (queryNum) {
      case 1:
        queryName = "Fastest Route";
        break;
      case 2:
        queryName = "Least Stairs Route";
        break;
      case 3:
        queryName = "Most Sheltered Route";
    }
    var path = g.shortestPath(start, finish, queryNum);
    var time = Math.ceil(g.getPathtime(path));
    var wrapper = {
      "queryName": queryName,
      "queryNameNoSpaces": queryName.replace(/\s/g, ''),
      "time": time,
      "path": path.toString(),
      "edges": g.getEdgeArray(path)
    };
    return wrapper
  }

  //returns array of all the query outputs
  this.getQueryArray = function(start, finish){
    var queryArray = [];
    for (var i=1; i<=3; i++){
      queryArray.push(g.getQueryOutput(start, finish, i));
    }
    return queryArray;
  }

};

//instantiate graph on startup
//global variable
g = new Graph();
