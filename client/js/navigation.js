Template.navigation.onRendered(function() {
  $("#navigation-link").addClass('selected');
  $("#settings-link").removeClass('selected');
  $("#locationSearch-link").removeClass('selected');
  $("#popularLocations-link").removeClass('selected');
  $("#map-link").removeClass('selected');

});

Template.navigation.onCreated(() => {
  let template = Template.instance();
  template.toDisplay = new ReactiveVar(false); //holds current value of search input
});

Template.navigation.helpers({
  toDisplay: function(){
    return Template.instance().toDisplay.get();
  },

  queryOutputArray: function(){
    //warning, global variable
    return ans;
  },

});

//Warning Direct access to global variable
Template.registerHelper('arrayify', function(obj) {
  var result = [];
  for (var key in finalMap) result.push({
    name: key
  });
  return result;
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
      //warning, global variable
      ans = g.getQueryArray(startLocation, endLocation);
      console.log();
      Template.instance().toDisplay.set(true);
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
  if (!finalMap[location]) {
    Bert.alert("Location does not exist", "danger", "growl-top-right");
    return false;
  }
  return true;
};
