Template.navigation.onRendered(function() {
  $("#navigation-link").addClass('selected');
  $("#settings-link").removeClass('selected');
  $("#locationSearch-link").removeClass('selected');
  $("#popularLocations-link").removeClass('selected');
  $("#map-link").removeClass('selected');
});

Template.navigation.events({
  "submit .navigation": function(event) {
    var startLocation = trimInput(event.target.startLocation.value);
    var endLocation = trimInput(event.target.endLocation.value);

    if (isNotEmpty(startLocation) &&
      isNotEmpty(endLocation) &&
      isValidLocation(startLocation) &&
      isValidLocation(endLocation)) {

      Bert.alert("Calculations done", "success", "growl-top-right");

      //calls dijkstras algo and puts results in the 4 query templates
      var timeResult = g.getQueryOutput(startLocation, endLocation, 1).split(" : ");
      $('#timeTime').text("Time needed: " + timeResult[1]);
      $('#timePath').text("Path: " + timeResult[0]);
      var distanceResult = g.getQueryOutput(startLocation, endLocation, 2).split(" : ");
      $('#distanceTime').text("Time needed: " + distanceResult[1]);
      $('#distancePath').text("Path: " + distanceResult[0]);
      var stairsResult = g.getQueryOutput(startLocation, endLocation, 3).split(" : ");
      $('#stairsTime').text("Time needed:  " + stairsResult[1]);
      $('#stairsPath').text("Path: " + stairsResult[0]);
      var shelterResult = g.getQueryOutput(startLocation, endLocation, 4).split(" : ");
      $('#shelterTime').text("Time needed: " + shelterResult[1]);
      $('#shelterPath').text("Path: " + shelterResult[0]);

      //shows the query layout
      $(".queryLayout").css('visibility', 'visible');

      //TODO: link to maps page for each query
    } else {
      //hides the query layout
      $(".queryLayout").css('visibility', 'hidden');
    }

    //keeps the input inside the field
    event.target.startLocation.value = startLocation;
    event.target.endLocation.value = endLocation;

    return false; //prevent submitting of form
  }
});

//Validation Rules

// Trim Helper
var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
};

var isNotEmpty = function(value) {
  if (value && value !== '') {
    return true;
  }
  Bert.alert("Please fill in all fields", "danger", "growl-top-right");
  return false;
};

// Check of locations in location fields exist
// Warning: direct access to finalMap
var isValidLocation = function(location) {
  if (!finalMap[location]) {
    Bert.alert("Location does not exist", "danger", "growl-top-right");
    return false;
  }
  return true;
};
