//Warning Direct access to global variable
Template.registerHelper('allLocations', function(obj) {
  var result = [];
  for (var key in finalMap) result.push({
    name: key
  });
  return result;
});

//Warning Direct access to global variable
Template.registerHelper('onlyBuildings', function(obj) {
  var result = [];
  for (var key in finalMap){
    if (!key.includes("Junction") && !key.includes("Busstop")) {
      result.push({name: key});
    }
  }
  return result;
});
