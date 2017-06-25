Template.popularLocations.rendered =function(){
  $("#popularLocations-link").addClass('selected');
  $("#navigation-link").removeClass('selected');
  $("#locationSearch-link").removeClass('selected');
  $("#settings-link").removeClass('selected');
  $("#map-link").removeClass('selected');
}

//TODO: sort in order of most hits
//shows all locations for now
//Warning Direct access to global variable
Template.registerHelper('arrayify', function(obj) {
  var result = [];
  for (var key in finalMap) result.push({
    name: key
  });
  return result;
});
