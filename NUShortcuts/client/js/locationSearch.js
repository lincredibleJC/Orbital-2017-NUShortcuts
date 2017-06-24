Template.locationSearch.rendered =function(){
  //alert("rendered");
}

Template.locationSearch.events({
  "submit .locationInput": function(event){
    var locationToFind = trimInput(event.target.locationSearch.value);

    if(isNotEmpty(locationToFind) &&
    isValidLocation(locationToFind) ){

      //TODO: link to the list of locations
      //TODO: return location info
      //TODO: return Listof rooms
    }

    return false;//prevent submitting of form
  }
});

//Validation Rules

// Trim Helper
var trimInput = function(val){
	return val.replace(/^\s*|\s*$/g, "");
};

var isNotEmpty = function(value){
	if (value && value !== ''){
		return true;
	}
	Bert.alert("Please fill in the fields", "danger", "growl-top-right");
	return false;
};

// Check location fields
isValidLocation = function(location){
  //supposed to be checkign list of locations
  //TODO:
	if(location==asdf){
		Bert.alert("location is not valid", "danger", "growl-top-right");
		return false;
	}
	return true;
};
