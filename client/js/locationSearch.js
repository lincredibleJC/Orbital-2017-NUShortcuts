Template.locationSearch.onRendered(function() {
  $("#locationSearch-link").addClass('selected');
  $("#navigation-link,#map-link,#popularLocations-link,#settings-link").removeClass('selected');

});

Template.locationSearch.onCreated(() => {
  let template = Template.instance();
  template.toDisplay = new ReactiveVar(false); //holds current value of search input
  Session.set("locationData", null);
});

Template.locationSearch.helpers({
  toDisplay: function() {
    return Template.instance().toDisplay.get();
  },
  locationData: function() {
    return Session.get("locationData");
  },

});

Template.locationSearch.events({
  "submit .locationSearch": function(event) {
    var locationToFind = trimInput(event.target.locationToFind.value);

    if (isNotEmpty(locationToFind) &&
      isValidLocation(locationToFind)) {
      Bert.alert("Location found", "success", "growl-top-right");

      //process the data for the vertex
      var v = finalMap[locationToFind];
      v.locationName = locationToFind;
      v.latitude = v.latlongCoordinates[0];
      v.longitude = v.latlongCoordinates[1];
      v.roomNames = [];
      for (room in v.roomList) {
        v.roomNames.push(room);
      }
      v.edgeNames = [];
      for (edge in v.edges) {
        v.edgeNames.push(edge);
      }
      console.log(v.edgeNames);
      Session.set("locationData", v);

      // //shows the location details layout
      Template.instance().toDisplay.set(true);
    } else {
      //shows the location details layout
      Template.instance().toDisplay.set(false);
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