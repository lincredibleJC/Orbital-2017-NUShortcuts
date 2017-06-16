///////////////////
//Actual map data//
///////////////////

//Save frequently and have a backup
var fullMap  = {};


///////////////////////
//Vertex CRUD methods//
///////////////////////

//add a new vertex to the map
function addVertex(){
	var vertName = prompt("input Vertex Name");
	
	if (!fullMap[vertName]){	//only if it does not exist
		var faculty = prompt("input Faculty: \nDefault is engineering", "Engineering");
		var locationType = prompt("input type of location, e.g. Building, Junction, Busstop", "Busstop" );
		var coordinates = prompt("input latlong\nlat followed by a comma and space then long");	//copy from google maps or map box
		var latlong = coordinates.split(", ");		//", " to make copying easier

		//add vertex object
		fullMap[vertName] = {
			'faculty': faculty,		//change as needed for different faculties
			'locationType': locationType,
			'latlongCoordinates': [parseFloat(latlong[0]),parseFloat(latlong[1])],
			'roomList': [],
			'edgeList': {}
		};
		
		console.log( vertName + " : " + JSON.stringify(fullMap[vertName]));
		console.log( "Vertex " + vertName + " added");
	}else{
		console.log( "vertex already exists ");
	}
}

//edits some attributes of the vertex
function editVertex(){
	var vertName = prompt("input Vertex Name");

	if (fullMap[vertName]){	//only if it exists
		var faculty = prompt("input Faculty: \nDefault is engineering", "Engineering");
		var locationType = prompt("input type of location, e.g. Building, Junction, Busstop", "Busstop" );
		var coordinates = prompt("input latlong\nlat followed by a comma and space then long");	//copy from google maps or map box
		var latlong = coordinates.split(", ");		//", " to make copying easier

		fullMap[vertName].faculty = faculty;
		fullMap[vertName].locationType = locationType;
		fullMap[vertName].latlongCoordinates = [parseFloat(latlong[0]),parseFloat(latlong[1])];
		
		console.log( vertName + " : " + JSON.stringify(fullMap[vertName]));
		console.log( "Vertex " + vertName + " edited");
	}else{
		console.log( vertName + " does not exist" );
	}

}

//reads the vertex
function readVertex(){
	var vertName = prompt("input Vertex Name");
	
	if (fullMap[vertName]){	//only if it exists
		vertExists = true;
		console.log( vertName + " : " + JSON.stringify(fullMap[vertName]));
	}else{
		console.log( vertName + " does not exist" );
	}
}

//remove a vertex from the map
function removeVertex(){
	var vertName = prompt("input Vertex Name");
	
	if (fullMap[vertName]){	//only if it exists
		delete fullMap[vertName];
		console.log( vertName + " removed ");
	}else{
		console.log( vertName + " does not exist" );
	}
}

function readMap(){
	console.log(JSON.stringify(fullMap));
}



/////////////////////////////
//Paired Edges CRUD methods//
/////////////////////////////


//returns true only if both vertexes are linked both ways
function areVertexesLinked(name1,name2){
	var one = false;
	var two = false;
	
	for(item in vertexArr){
		for (edge in vertexArr[item].edgeList){
			if(vertexArr[item].vertex === name1 && vertexArr[item].edgeList[edge].destination === name2){
				one = true;	
			}
		}
	}
	for(item in vertexArr){
		for (edge in vertexArr[item].edgeList){
			if(vertexArr[item].vertex === name2 && vertexArr[item].edgeList[edge].destination === name1){
				two = true;
			}
		}
	}
	console.log("vertex 1 exists " + one);
	console.log("vertex 1 exists " + two);
	return one && two;
}

//input edges between two vertices both ways 
function addEdges(){

	var name1 = prompt("from vertex");
	var name2 = prompt("to vertex");
	var walkingSpeed = 1.4;
	//if both directions do not exist
	if (areVertexesLinked(name1,name2) === false){
		//input direction is name1 to name2
		//var time = parseFloat(prompt("timetaken"));
		var distance = parseFloat(prompt("distance"));
		var stairsDirection = parseFloat(prompt("number of flights of stairs diff\ndown 0, flat ground 1, up 2, \ndefault is flat ground", 1 ));
		var shelterMultiplier = parseFloat(prompt("shelter 0 for sheltered, 1 not sheltered\n default is sheltered ", 0 ));
		
		//find name1 
		for(item in vertexArr){
			if(vertexArr[item].vertex === name1){
				
				var weightedStairs = (stairsDirection=== 2 ) ? stairsDirection * distance : distance;

				//add forward direction edge
				vertexArr[item].edgeList.push({
					'destination': name2,
					'time': distance/walkingSpeed/60,
					'distance': distance,
					'stairsWeight': weightedStairs,
					'stairsDirection':stairsDirection,
					'shelterRating': shelterMultiplier * distance,
					'shelterMultiplier': shelterMultiplier,
					'directions': 'Insert directions',
					'imageLink': ['http://www.nus.edu.sg/identity/images/identity/logo/NUS_logo_full-horizontal.jpg']
				});
				console.log(vertexArr[item].edgeList[vertexArr[item].edgeList.length-1]);
			}
		}
		//find name2
		for(item in vertexArr){
			if(vertexArr[item].vertex === name2){

				var flippedDirection = (stairsDirection === 1 ) ? 1 : ( (stairsDirection === 0) ? 2 : 0);
				var weightedStairs = (flippedDirection === 2 ) ? flippedDirection * distance : distance;

				//add reverse direction edge
				vertexArr[item].edgeList.push({
					'destination': name1,
					'time': distance/walkingSpeed/60,
					'distance': distance,

				  //if it is 0 , dont change, else swap between 0(down) and 2(up)
				  'stairsDirection': flippedDirection,
				  'stairsWeight': weightedStairs,

				  'shelterRating': shelterMultiplier * distance,
				  'shelterMultiplier': shelterMultiplier,
				  'directions': 'Insert directions',
				  'imageLink': ['http://www.nus.edu.sg/identity/images/identity/logo/NUS_logo_full-horizontal.jpg']
				});
				console.log(vertexArr[item].edgeList[vertexArr[item].edgeList.length-1]);
			}
		}

		console.log(name1 + " <-> " + name2 );
		console.log("2 edges added")
		
	}else{
		console.log("pair of edges" + name1 + " <-> " + name2 + "already exists")
	}

}

//edits both edges of 2 vertices
function editEdges(){

	var name1 = prompt("from vertex");
	var name2 = prompt("to vertex");
	var walkingSpeed = 1.4;

	//if both directions edge exist
	if (areVertexesLinked(name1,name2) === true){
		//input direction is name1 to name2
		//var time = parseFloat(prompt("timetaken"));
		var distance = parseFloat(prompt("distance"));
		var stairsDirection = parseFloat(prompt("number of flights of stairs diff\ndown 0, flat ground 1, up 2, \ndefault is flat ground", 1 ));
		var shelterMultiplier = parseFloat(prompt("shelter 0 for sheltered, 1 not sheltered\n default is sheltered ", 0 ));
		
		//find name1 edge to name 2
		for(item in vertexArr){
			if(vertexArr[item].vertex === name1){
				for (edge in vertexArr[item].edgeList){
					if(vertexArr[item].edgeList[edge].destination === name2){
						vertexArr[item].edgeList[edge].time = distance/walkingSpeed/60;
						vertexArr[item].edgeList[edge].distance = distance ;
						
						var weightedStairs = (stairsDirection === 2 ) ? stairsDirection * distance : distance;
						vertexArr[item].edgeList[edge].stairsWeight = weightedStairs;
						vertexArr[item].edgeList[edge].stairsDirection = stairsDirection;
						
						vertexArr[item].edgeList[edge].shelterRating = shelterMultiplier* distance;
						vertexArr[item].edgeList[edge].shelterMultiplier = shelterMultiplier;
						
						console.log((vertexArr[item].edgeList[edge]));
					}
				}
			}
		}
		//find name2 edge to name 1
		for(item in vertexArr){
			if(vertexArr[item].vertex === name2){
				for (edge in vertexArr[item].edgeList){
					if(vertexArr[item].edgeList[edge].destination === name1){
						vertexArr[item].edgeList[edge].time = distance/walkingSpeed/60;
						vertexArr[item].edgeList[edge].distance = distance;
						
						var flippedDirection = (stairsDirection === 1 ) ? 1 : ( (stairsDirection === 0) ? 2 : 0);
						var weightedStairs = (flippedDirection === 2 ) ? flippedDirection * distance : distance;

						vertexArr[item].edgeList[edge].stairsWeight = weightedStairs;
						//if it is 0 , dont change, else swap between 0(down) and 2(up)
						vertexArr[item].edgeList[edge].stairsDirection = flippedDirection;
						
						vertexArr[item].edgeList[edge].shelterRating = shelterMultiplier* distance;
						vertexArr[item].edgeList[edge].shelterMultiplier = shelterMultiplier;					

						console.log((vertexArr[item].edgeList[edge]));
					}
				}
			}
		}
		console.log("2 edges edited")
		
	}else{
		console.log("one or two edges do not exists(maybe vertex too)")
	}
	console.log(name1 + " <-> " + name2 );

}

//reads both edges of 2 vertices
function readEdges(){

	var name1 = prompt("from vertex");
	var name2 = prompt("to vertex");

	//if both directions edge exist
	if (areVertexesLinked(name1,name2) === true){

		//find name1 edge to name 2
		for(item in vertexArr){
			if(vertexArr[item].vertex === name1){
				for (edge in vertexArr[item].edgeList){
					if(vertexArr[item].edgeList[edge].destination === name2){
						console.log(vertexArr[item].edgeList[edge]);
					}
				}
			}
		}
		//find name2 edge to name 1
		for(item in vertexArr){
			if(vertexArr[item].vertex === name2){
				for (edge in vertexArr[item].edgeList){
					if(vertexArr[item].edgeList[edge].destination === name1){
						console.log(vertexArr[item].edgeList[edge]);
					}
				}
			}
		}
		console.log("2 edges read")
		
	}else{
		console.log("one or two edges does not exists(maybe vertex too)");
	}
	console.log(name1 + " <-> " + name2 );

}


//removes both edges connceting 2 vertices
function removeEdges(){

	var name1 = prompt("from vertex");
	var name2 = prompt("to vertex");

	//if both directions edge exist
	if (areVertexesLinked(name1,name2) === true){

		//find name1 edge to name 2
		for(item in vertexArr){
			if(vertexArr[item].vertex === name1){
				for (edge in vertexArr[item].edgeList){
					if(vertexArr[item].edgeList[edge].destination === name2){

						vertexArr[item].edgeList.splice(edge,1);
					}
				}
			}
		}
		//find name2 edge to name 1
		for(item in vertexArr){
			if(vertexArr[item].vertex === name2){
				for (edge in vertexArr[item].edgeList){
					if(vertexArr[item].edgeList[edge].destination === name1){
						vertexArr[item].edgeList.splice(edge,1);
					}
				}
			}
		}
		console.log("2 edges removed")
		
	}else{
		console.log("one or two edges does not exists(maybe vertex too)");
	}
	console.log(name1 + " <-> " + name2 );

}

function changeWalkingSpeed(){
	var walkingSpeed = prompt("Input the new walking speed in m/s?", 1.4);
	for (vert in vertexArr){
		for (edge in vertexArr[vert].edgeList){
			var time = vertexArr[vert].edgeList[edge].distance / walkingSpeed / 60;
			vertexArr[vert].edgeList[edge].time = time;
		}
	}
}