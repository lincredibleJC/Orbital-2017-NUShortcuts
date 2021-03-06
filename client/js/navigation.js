Template.navigation.onRendered(function() {
  $("#navigation-link").addClass('selected');
  $("#map-link,#locationSearch-link,#popularLocations-link,#settings-link,#feedback-link").removeClass('selected');


});

Template.navigation.onCreated(() => {
  let template = Template.instance();
  template.toDisplay = new ReactiveVar(false); //holds current value of search input
  Session.set("allQueriesData", null);
});

Template.navigation.helpers({
  toDisplay: function() {
    return Template.instance().toDisplay.get();
  },

  queryOutputArray: function() {
    return Session.get("allQueriesData");
  }

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

      Session.set("allQueriesData", g.getQueryArray(startLocation, endLocation));
      Template.instance().toDisplay.set(true);

      var locationId = LocationStats.findOne({locationName : startLocation})._id;
      Meteor.call("incLocationScore", locationId);
      
      locationId = LocationStats.findOne({locationName : endLocation})._id;
      Meteor.call("incLocationScore", locationId);
    } else {
      Template.instance().toDisplay.set(false);
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
  if (!localMap[location]) {
    Bert.alert("Location does not exist", "danger", "growl-top-right");
    return false;
  }
  return true;
};
