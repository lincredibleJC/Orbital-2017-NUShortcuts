Template.settings.rendered = function() {
  $("#settings-link").addClass('selected');
  $("#navigation-link").removeClass('selected');
  $("#locationSearch-link").removeClass('selected');
  $("#popularLocations-link").removeClass('selected');
  $("#map-link").removeClass('selected');
}

Template.settings.events({
  "click .settings": function(event) {//for debugging
    console.log("Clicked");
  },

  "change #transportMode": function(event) {
    var newValue = event.target.value;
    Session.setPersistent("transportMode", newValue)
    return false; //prevent submitting of form
  },

  "change #walkingSpeed": function(event) {
    var newValue = event.target.value;//integer value
    Session.setPersistent("walkingSpeed", newValue)
    console.log(event.target.selectedIndex);
    console.log(event.target.length);
    return false; //prevent submitting of form
  },

  'change input': function(event) {
    var newValue = event.target.checked;//integer value
    Session.setPersistent("darkMode", newValue)
    console.log(event.target.checked);
    return false; //prevent submitting of form
 }

});
