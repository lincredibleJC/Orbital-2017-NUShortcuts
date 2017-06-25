Template.locationSearch.onRendered(function() {
  $("#locationSearch-link").addClass('selected');
  $("#navigation-link").removeClass('selected');
  $("#settings-link").removeClass('selected');
  $("#popularLocations-link").removeClass('selected');
  $("#map-link").removeClass('selected');
});

Template.locationSearch.events({
  "submit .locationSearch": function(event) {
    var locationToFind = trimInput(event.target.locationToFind.value);

    if (isNotEmpty(locationToFind) &&
      isValidLocation(locationToFind)) {
      Bert.alert("Location found", "success", "growl-top-right");

      //render the location details
      var v = finalMap[locationToFind];
      $('#locationName').text(locationToFind);
      $('#faculty').text("Faculty: " + v.faculty);
      //coordinates
      var coordinates = v.latlongCoordinates;
      $('#coordinates').text("Latitude: " + coordinates[0])
      $('#coordinates').append("<br />" + "Longitude: " + coordinates[1]);
      //roomList
      $('#roomList').text("List of Rooms: ").append("<br />");
      for(room in v.roomList){
        $('#roomList').append("<br />" + v.roomList[room]);
      }
      //edges
      $('#edges').text("Places you can go to from here:").append("<br />");
      for(edge in v.edges){
        $('#edges').append("<br />" + edge);
      }

      //shows the location details layout
      $(".locationDetails").css('visibility', 'visible');

    } else {
      //shows the location details layout
      $(".locationDetails").css('visibility', 'hidden');
    }

    //keeps the input inside the field
    event.target.locationToFind.value = locationToFind;

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
