Template.popularLocations.rendered = function() {
  $("#popularLocations-link").addClass('selected');
  $("#navigation-link,#map-link,#locationSearch-link,#settings-link,#feedback-link").removeClass('selected');
}

//just shows the top 20 locations
Template.popularLocations.helpers({
  topLocations: function() {

    var locations = LocationStats.find({}, {sort: {locationScore: -1}, skip: 0, limit: 15, reactive : true});

    return locations;
  }

});
