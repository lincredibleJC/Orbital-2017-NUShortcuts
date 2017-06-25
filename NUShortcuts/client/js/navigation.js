Template.navigation.onCreated = function(){

};

Template.navigation.rendered = function(){
  $("#navigation-link").addClass('selected');
  $("#settings-link").removeClass('selected');
  $("#locationSearch-link").removeClass('selected');
  $("#popularLocations-link").removeClass('selected');
  $("#map-link").removeClass('selected');
};

Template.navigation.events({
  "submit .navigation": function(event){
    var startLocation = trimInput(event.target.startLocation.value);
    var endLocation = trimInput(event.target.endLocation.value);

    if(isNotEmpty(startLocation) &&
    isNotEmpty(endLocation) &&
    isValidLocation(startLocation) &&
    isValidLocation(endLocation) ){

      Bert.alert("Calculating paths", "success", "growl-top-right");

      event.target.startLocation.value = startLocation;
      event.target.endLocation.value =  endLocation;
      console.log(mapData);
      //run the queries and populate the layouts
      Meteor.call( 'calculatePaths', startLocation, endLocation);

      //show the query layout
      $(".queryLayout").css('visibility', 'visible');



      //TODO: link to maps page
    }else {
      //hides the query layout
      $(".queryLayout").css('visibility', 'hidden');
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
  //TODO:supposed to be checkign list of locations
	if(false){
		Bert.alert("location is not valid", "danger", "growl-top-right");
		return false;
	}
	return true;
};
