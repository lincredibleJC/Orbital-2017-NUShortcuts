///////////////////
//Actual map data//
///////////////////
//Insert fullmap here with a name of fullMap
//var fullmap = {...};
//Save frequently and have a backup

////////////////////////////////////////
//Basic priority queue implementation.//
////////////////////////////////////////
// If a better priority queue is wanted/needed,
//this code works with the implementation in google's closure library (https://code.google.com/p/closure-library/).
//Use goog.require('goog.structs.PriorityQueue'); and new goog.structs.PriorityQueue()
function PriorityQueue() {
  this._nodes = [];

  this.enqueue = function(priority, key) {
    this._nodes.push({
      key: key,
      priority: priority
    });
    this.sort();
  };
  this.dequeue = function() {
    return this._nodes.shift().key;
  };
  this.sort = function() {
    this._nodes.sort(function(a, b) {
      return a.priority - b.priority;
    });
  };
  this.isEmpty = function() {
    return !this._nodes.length;
  };
}

/////////////////////////////
// Pathfinding starts here //
/////////////////////////////
function Graph() {
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

  //takes in the start and finish location then outputs the path
  this.printAllOutputs = function() {
    var start = prompt("Input start location");
    var finish = prompt("Input destination");
    var path, time;
    for (var i = 1; i <= 4; i++) {
      path = g.shortestPath(start, finish, i);
      time = g.getPathtime(path);
      console.log(path + " : " + Math.ceil(time) + " min")
    }
  };

}

//graph must be instantiated
var g = new Graph();
g.printAllOutputs();
