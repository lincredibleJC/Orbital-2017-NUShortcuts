Template.settings.rendered = function(){
  $("#settings-link").addClass('selected');
  $("#navigation-link").removeClass('selected');
  $("#locationSearch-link").removeClass('selected');
  $("#popularLocations-link").removeClass('selected');
  $("#map-link").removeClass('selected');
  //alert("rendered");
}

Template.settings.events({
  "change .transportMode": function(event){
    var transportMode = event.target.transportMode.value;

      if(isNotEmpty(transportMode) & isValidTransport(transportMode)){

      //TODO: link to the list of locations
      //TODO: return location info
      //TODO: return Listof rooms
    }

    return false;//prevent submitting of form
  },
/*
  "change .walkingSpeed":function(event){
    var newSpeed = event.target.walkingSpeed.value;

    if(isNotEmpty(locationToFind) & isValidNumber(newSpeed)){

      //TODO: link to the map CRUD to change data
    }

    return false;//prevent submitting of form
  }
*/
});

//Validation Rules

var isNotEmpty = function(value){
	if (value && value !== ''){
		return true;
	}
	Bert.alert("Please fill in the fields", "danger", "growl-top-right");
	return false;
};

// Validate transport mode
isValidTransport = function(value) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(filter.test(value)) {
		return true;
	}
	Bert.alert("Please choose a valid mod of transport", "danger", "growl-top-right");
	return false;
};

// Validate speed
isValidNumber = function(value) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(filter.test(value)) {
		return true;
	}
	Bert.alert("Please uenter a valid number", "danger", "growl-top-right");
	return false;
};
