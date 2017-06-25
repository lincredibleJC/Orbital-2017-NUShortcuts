Template.map.rendered = function(){
  $("#map-link").addClass('selected');
  $("#navigation-link").removeClass('selected');
  $("#locationSearch-link").removeClass('selected');
  $("#popularLocations-link").removeClass('selected');
  $("#settings-link").removeClass('selected');
}

Template.map.events({
    'click': function(){
        console.log("You clicked something");
    }
});
