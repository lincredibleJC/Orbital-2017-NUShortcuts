/////////////////////////////
// Pathfinding starts here //
/////////////////////////////
Graph = function() {
  //copies over from localMap
  this.vertices = localMap;

  //takes in start and end location and quiery number and returns the path
  this.shortestPath = function(start, finish, queryNum) {
    var nodes = new PriorityQueue(),
      path = [],
      smallest, v, e, localWeight, weightUsed;

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

      for (e in this.vertices[smallest].edgeList) {
        if (this.vertices[smallest].edgeList.hasOwnProperty(e)) {

          if (Session.get("transportMode") == "Walking and bus" && smallest.includes("Busstop") && e.includes("Busstop")){
            
            switch (queryNum) {
            case 1:
              weightUsed = this.vertices[smallest].edgeList[e].distance/busSpeed/60;//estimate 8m/s for bus
              break;
            case 2:
              weightUsed = 0;
              break;
            case 3:
              weightUsed = 0;
              break; //no default
            }

          }else{
            
            switch (queryNum) {
            case 1:
              weightUsed = this.vertices[smallest].edgeList[e].time;
              break;
            case 2:
              weightUsed = this.vertices[smallest].edgeList[e].stairsWeight;
              break;
            case 3:
              weightUsed = this.vertices[smallest].edgeList[e].shelterWeight;
              break; //no default
           }

          }

          localWeight = this.vertices[smallest].weight + weightUsed;

          if (localWeight < this.vertices[e].weight) {
            this.vertices[e].weight = localWeight;
            this.vertices[e].previous = smallest;
            nodes.enqueue(localWeight, e);
          }
        }
      }
    }
    return path.concat([start]).reverse(); //Adds the start vertex for improved readability
  };

  //takes in a path [array of vertex names], and outputs time taken for that path
  this.getPathtime = function(path) {
    var time = 0;
    for (var i = 0; i < path.length - 1; i++) {
      if (Session.get("transportMode") == "Walking and bus" && path[i].includes("Busstop") && path[i + 1].includes("Busstop")){
        time += g.vertices[path[i]].edgeList[path[i + 1]].distance/busSpeed/60;
      }else{
        time += g.vertices[path[i]].edgeList[path[i + 1]].time;
      }
    }
    return Math.ceil(time);
  };

  //takes in a path [array of vertex names], and outputs distance for that path
  this.getPathDistance = function(path) {
    var distance = 0;
    for (var i = 0; i < path.length - 1; i++) {
      if (Session.get("transportMode") == "Walking and bus" && path[i].includes("Busstop") && path[i + 1].includes("Busstop")){
        distance += 0;
      }else{
        distance += g.vertices[path[i]].edgeList[path[i + 1]].distance;
      }
    }
    return Math.ceil(distance);
  };

  //takes in 2 vertexes and returns the message of the forward direction
  this.getDirectedEdgeDirections = function(fromVert, toVert) {
    //given that they exist
    return g.vertices[fromVert].edgeList[toVert].directions;
  };

  //takes in 2 vertexes and returns array of links of the forward direction
  this.getDirectedEdgeimagelinks = function(fromVert, toVert) {
    //given that they exist
    return g.vertices[fromVert].edgeList[toVert].imageLinks;
  };

  //takes in a path and returns edge data in an array
  this.getArrayOfEdges = function(path) {
    var arrayOfEdges = [];
    for (var i = 0; i < path.length - 1; i++) { //-1 for last vertex
      arrayOfEdges.push({
        "vertexName": path[i],
		"nextVertexName": path[i+1],
        "vertexNameNoSpaces": path[i].replace(/\s/g, ''),
        "directions": g.getDirectedEdgeDirections(path[i], path[i + 1]),
        "imageLinks": g.getDirectedEdgeimagelinks(path[i], path[i + 1])
      });
    }
    return arrayOfEdges;
  }

  //takes in the start and finish location and outputs query data in a wrapper
  this.getQueryOutput = function(start, finish, queryNum) {
    var path, time, distance, queryName;
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
    path = g.shortestPath(start, finish, queryNum);
    time = g.getPathtime(path);
    distance = g.getPathDistance(path);
    var queryDataWrapper = {
      "queryName": queryName,
      "queryNameNoSpaces": queryName.replace(/\s/g, ''),
      "time": time,
      "distance": distance,
      "path": path.toString(),
      "edgeList": g.getArrayOfEdges(path)
    };
    return queryDataWrapper;
  }

  //returns array of all the query outputs
  this.getQueryArray = function(start, finish) {
    var queryArray = [];
    for (var i = 1; i <= 3; i++) {
      queryArray.push(g.getQueryOutput(start, finish, i));
    }
    return queryArray;
  }

};


//Initialising the graph on startup

var busSpeed = 8;//8 m/s is abouts 30km/s
//makes sure the walking speed is persistent
var walkingSpeed = Session.get("walkingSpeed");

if (walkingSpeed == null) {
  Session.setPersistent("walkingSpeed", 1.4);
}else{
  //modify the localMap data
  for (vertex in localMap) {
    if (localMap.hasOwnProperty(vertex)) {
      for (edge in localMap[vertex].edgeList) {
        if (localMap[vertex].edgeList.hasOwnProperty(edge)) {
          localMap[vertex].edgeList[edge].time = localMap[vertex].edgeList[edge].distance / walkingSpeed / 60;
        }
      }
    }
  }
}

g = new Graph();
