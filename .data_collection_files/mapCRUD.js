///////////////////
//Actual map data//
///////////////////
//Insert fullmap here with a name of fullMap
//var fullmap = {...};
//Save frequently and have a backup

///////////////////////
//Vertex CRUD methods//
///////////////////////

//add a new vertex to the map
function addVertex() {
  var vertName = prompt("input Vertex Name");

  if (!fullMap[vertName]) { //only if it does not exist
    var faculty = prompt("input Faculty: \nDefault is engineering", "Engineering");
    var locationType = prompt("input type of location, e.g. Building, Junction, Busstop", "Busstop");
    var coordinates = prompt("input latlong\nlat followed by a comma and space then long"); //copy from google maps or map box
    var latlong = coordinates.split(", "); //", " to make copying easier

    //add vertex object
    fullMap[vertName] = {
      'faculty': faculty, //change as needed for different faculties
      'locationType': locationType,
      'latlongCoordinates': [parseFloat(latlong[0]), parseFloat(latlong[1])],
      'roomList': [],
      'edges': {}
    };

    console.log(vertName + " : " + JSON.stringify(fullMap[vertName]));
    console.log("Vertex " + vertName + " added");
  } else {
    console.log("vertex already exists ");
  }
}

//edits some attributes of the vertex
function editVertex() {
  var vertName = prompt("input Vertex Name");

  if (fullMap[vertName]) { //only if it exists
    var faculty = prompt("input Faculty: \nDefault is engineering", "Engineering");
    var locationType = prompt("input type of location, e.g. Building, Junction, Busstop", "Busstop");
    var coordinates = prompt("input latlong\nlat followed by a comma and space then long"); //copy from google maps or map box
    var latlong = coordinates.split(", "); //", " to make copying easier

    fullMap[vertName].faculty = faculty;
    fullMap[vertName].locationType = locationType;
    fullMap[vertName].latlongCoordinates = [parseFloat(latlong[0]), parseFloat(latlong[1])];

    console.log(vertName + " : " + JSON.stringify(fullMap[vertName]));
    console.log("Vertex " + vertName + " edited");
  } else {
    console.log(vertName + " does not exist");
  }

}

//reads the vertex
function readVertex() {
  var vertName = prompt("input Vertex Name");

  if (fullMap[vertName]) { //only if it exists
    vertExists = true;
    console.log(vertName + " : " + JSON.stringify(fullMap[vertName]));
  } else {
    console.log(vertName + " does not exist");
  }
}

//remove a vertex from the map
function removeVertex() {
  var vertName = prompt("input Vertex Name");

  if (fullMap[vertName]) { //only if it exists
    delete fullMap[vertName];
    console.log(vertName + " removed ");
  } else {
    console.log(vertName + " does not exist");
  }
}

function readMap() {
  console.log(JSON.stringify(fullMap));
}


/////////////////////////////
//Paired Edges CRUD methods//
/////////////////////////////


//returns true only if both vertexes are linked both ways
function areVertexesLinked(name1, name2) {
  var one = false;
  var two = false;

  if (fullMap[name1] && fullMap[name1].edges[name2]) {
    one = true;
  }
  if (fullMap[name2] && fullMap[name2].edges[name1]) {
    two = true;
  }

  console.log("name1" + " to " + name2 + " exists " + one);
  console.log("name2" + " to " + name1 + " exists " + two);
  return one && two;
}

//input edges between two vertices both ways
function addEdges() {

  var name1 = prompt("from vertex");
  var name2 = prompt("to vertex");
  var walkingSpeed = 1.4;
  //if both directions do not exist
  if (areVertexesLinked(name1, name2) === false) {
    //input direction is name1 to name2
    //var time = parseFloat(prompt("timetaken"));
    var distance = parseFloat(prompt("distance"));
    var stairsDirection = parseFloat(prompt("number of flights of stairs diff\ndown 0, flat ground 1, up 2, \ndefault is flat ground", 1));
    var shelterMultiplier = parseFloat(prompt("shelter 0 for sheltered, 1 not sheltered\n default is sheltered ", 0));

    //from name 1 to name 2
    var weightedStairs = (stairsDirection === 2) ? stairsDirection * distance : distance;

    //add forward direction edge
    if (fullMap[name1]) { //if from vertex exists
      fullMap[name1].edges[name2] = {
        'time': distance / walkingSpeed / 60,
        'distance': distance,
        'stairsDirection': stairsDirection,
        'stairsWeight': weightedStairs,
        'shelterRating': shelterMultiplier * distance,
        'shelterMultiplier': shelterMultiplier,
        'directions': 'Insert directions',
        'imageLink': ['http://www.nus.edu.sg/identity/images/identity/logo/NUS_logo_full-horizontal.jpg']
      };
      console.log(name1 + " to " + name2 + " " + JSON.stringify(fullMap[name1].edges[name2]));
    } else {
      console.log(name1 + " does not exist");
    }

    //add reverse direction edge
    if (fullMap[name2]) { //if to vertex exists
      var flippedDirection = (stairsDirection === 1) ? 1 : ((stairsDirection === 0) ? 2 : 0);
      var weightedStairs = (flippedDirection === 2) ? flippedDirection * distance : distance;

      //add reverse direction edge
      fullMap[name2].edges[name1] = {
        'time': distance / walkingSpeed / 60,
        'distance': distance,
        //if it is 0 , dont change, else swap between 0(down) and 2(up)
        'stairsDirection': flippedDirection,
        'stairsWeight': weightedStairs,
        'shelterRating': shelterMultiplier * distance,
        'shelterMultiplier': shelterMultiplier,
        'directions': 'Insert directions',
        'imageLink': ['http://www.nus.edu.sg/identity/images/identity/logo/NUS_logo_full-horizontal.jpg']
      };
      console.log(name2 + " to " + name1 + " " + JSON.stringify(fullMap[name2].edges[name1]));
    } else {
      console.log(name2 + " does not exist");
    }
    console.log(name1 + " <-> " + name2);
    console.log("2 edges added")
  } else {
    console.log("pair of edges" + name1 + " <-> " + name2 + "already exists")
  }

}

//edits both edges of 2 vertices
function editEdges() {

  var name1 = prompt("from vertex");
  var name2 = prompt("to vertex");
  var walkingSpeed = 1.4;

  //if both directions edges exist
  if (areVertexesLinked(name1, name2) === true) {
    //input direction is name1 to name2
    //var time = parseFloat(prompt("timetaken"));
    var distance = parseFloat(prompt("distance"));
    var stairsDirection = parseFloat(prompt("number of flights of stairs diff\ndown 0, flat ground 1, up 2, \ndefault is flat ground", 1));
    var shelterMultiplier = parseFloat(prompt("shelter 0 for sheltered, 1 not sheltered\n default is sheltered ", 0));

    //edit forward direction
    fullMap[name1].edges[name2].time = distance / walkingSpeed / 60;
    fullMap[name1].edges[name2].distance = distance;

    var weightedStairs = (stairsDirection === 2) ? stairsDirection * distance : distance;

    fullMap[name1].edges[name2].stairsWeight = weightedStairs;
    fullMap[name1].edges[name2].stairsDirection = stairsDirection;

    fullMap[name1].edges[name2].shelterRating = shelterMultiplier * distance;
    fullMap[name1].edges[name2].shelterMultiplier = shelterMultiplier;

    console.log(name1 + " to " + name2 + " " + JSON.stringify(fullMap[name1].edges[name2]));


    //edit reverse direction
    fullMap[name2].edges[name1].time = distance / walkingSpeed / 60;
    fullMap[name2].edges[name1].distance = distance;

    //if it is 1 , dont change, else swap between 0(down) and 2(up)
    var flippedDirection = (stairsDirection === 1) ? 1 : ((stairsDirection === 0) ? 2 : 0);
    weightedStairs = (flippedDirection === 2) ? flippedDirection * distance : distance;

    fullMap[name2].edges[name1].stairsWeight = weightedStairs;
    fullMap[name2].edges[name1].stairsDirection = flippedDirection;

    fullMap[name2].edges[name1].shelterRating = shelterMultiplier * distance;
    fullMap[name2].edges[name1].shelterMultiplier = shelterMultiplier;

    console.log(name2 + " to " + name1 + " " + JSON.stringify(fullMap[name2].edges[name1]));

    console.log("2 edges edited")

  } else {
    console.log("the 2 vertices are not linked")
  }
  console.log(name1 + " <-> " + name2);

}

//reads both edges of 2 vertices
function readEdges() {

  var name1 = prompt("from vertex");
  var name2 = prompt("to vertex");

  //if both directions edge exist
  if (areVertexesLinked(name1, name2) === true) {

    //name1 edge to name 2
    console.log(name1 + " to " + name2 + " " + JSON.stringify(fullMap[name1].edges[name2]));

    //name2 edge to name 1
    console.log(name2 + " to " + name1 + " " + JSON.stringify(fullMap[name2].edges[name1]));

    console.log("2 edges read")

  } else {
    console.log("either the edges do not exist or they are not linked");
  }
  console.log(name1 + " <-> " + name2);

}


//removes both edges connceting 2 vertices
function removeEdges() {

  var name1 = prompt("from vertex");
  var name2 = prompt("to vertex");

  //if both directions edge exist
  if (areVertexesLinked(name1, name2) === true) {
    console.log(fullMap[name1].edges[name2])
    //delete name1 edge to name2
    delete fullMap[name1].edges[name2];

    //delete name2 edge to name1
    delete fullMap[name2].edges[name1];

    console.log("2 edges removed")

  } else {
    console.log("either the edges do not exist or they are not linked");
  }
  console.log(name1 + " <-> " + name2);

}

function changeWalkingSpeed() {
  var walkingSpeed = prompt("Input the new walking speed in m/s?", 1.4);
  for (v in fullMap) {
    for (e in fullMap[v].edges) {
      var time = fullMap[v].edges[e].distance / walkingSpeed / 60;
      fullMap[v].edges[e].time = time;
    }
  }
}
