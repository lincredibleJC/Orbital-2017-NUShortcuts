//Warning Direct access to global variable
Template.registerHelper('allLocations', function() {
  var result = [];
  for (var key in localMap) result.push({
    name: key
  });
  return result;
});

//Warning Direct access to global variable
Template.registerHelper('onlyBuildings', function() {
  var result = [];
  for (var key in localMap) {
    if (!key.includes("Junction") && !key.includes("Busstop")) {
      result.push({
        name: key
      });
    }
  }
  return result;
});