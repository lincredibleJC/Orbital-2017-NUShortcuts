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
            localWeight = this.vertices[smallest].weight + this.vertices[smallest].edges[e].distance;
            break;
          case 3:
            localWeight = this.vertices[smallest].weight + this.vertices[smallest].edges[e].stairsWeight;
            break;
          case 4:
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
    return g.vertices[fromVert].edges[toVert].directions;
  };

  //takes in 2 vertexes and returns array of links of the forward direction
  this.getEdgeImageLinks = function(fromVert, toVert) {
    return g.vertices[fromVert].edges[toVert].imageLink;
  };

  //takes in the start and finish location then outputs the path and time taken
  this.getQueryOutput = function(start, finish, queryNum) {
    var path, time;
    path = g.shortestPath(start, finish, queryNum);
    time = g.getPathtime(path);
    return (path + " : " + Math.ceil(time) + " min")
  }

};

//instantiate graph on startup
//global variable
g = new Graph();
