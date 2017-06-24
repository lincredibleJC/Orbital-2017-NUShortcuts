Template.navigation.rendered =function(){
  //alert("rendered");
}

Template.navigation.events({
  "submit .navigation": function(event){
    var startLocation = trimInput(event.target.startLocation.value);
    var endLocation = trimInput(event.target.endLocation.value);

    if(isNotEmpty(startLocation) &&
    isNotEmpty(endLocation) &&
    isValidLocation(startLocation) &&
    isValidLocation(endLocation) ){

      //TODO: link to Dijkstras algo
      //TODO: link to maps page
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
	Bert.alert("Please fill in all fields", "danger", "growl-top-right");
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
