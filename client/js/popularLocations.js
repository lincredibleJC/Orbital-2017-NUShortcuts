Template.popularLocations.rendered = function() {
  $("#popularLocations-link").addClass('selected');
  $("#navigation-link,#map-link,#locationSearch-link,#settings-link").removeClass('selected');
}

//just shows the top 20 locations
Template.popularLocations.helpers({
  top20Locations: function(){
    var result = [];
    var counter = 0;
    for (var key in localMap){
      if (!key.includes("Junction") && !key.includes("Busstop")) {
        result.push({name: key});
        if (++counter>=20) break;
      }
    }
    return result;
  }
});
