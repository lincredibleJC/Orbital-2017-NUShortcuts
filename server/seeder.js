Meteor.startup(function() {

	for (name in localMap){

		var location = LocationStats.findOne({locationName: name});
		if (!location) {
			// if location not in db
	        LocationStats.insert({
	        	locationName: name,
	        	locationScore: 0
	        }, function( error, result) {
		        if ( error ) console.log ( error ); //info about what went wrong
		    	if ( result ) console.log ( result ); //the _id of new object if successful
	 		});

	 		console.log(name + " created");
		}
        
	}

	console.log("Location DB Updated");
});