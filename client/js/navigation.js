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

  pathTemplateCounter: function() {
    Template.instance().toDisplay.set(Template.instance().toDisplay.get() + 1);
    return Template.instance().toDisplay.get();
  },


  queryOutputArray: function(){
    return [{
        "queryName": 1234,
        "time": 1122,
        "path": "qwertyuiy",
        "edges":[{
          "vertexName":"qweasdfasdrty",
          "instructions": "go fk yoursekf"
        },{
          "vertexName":"qwasdfaerty",
          "instructions": "go fasdfasfk yoursekf"
        },{
          "vertexName":"qwafsdfaerty",
          "instructions": "go fasdfafk yoursekf"
        }]

    },{
        "queryName": 3456,
        "time": 1223411,
        "path": "asdfghjkk",
        "edges":[{
          "vertexName":"E901823",
          "instructions": "go fk yoursekf"
        },{
          "vertexName":"E9018aasdfsdfas23",
          "instructions": "go fasasdfdfasfk yoursekf"
        },{
          "vertexName":"E90dfsdf1823",
          "instructions": "go fasdasdffafk yoursekf"
        }]
    },{
        "queryName": 6789,
        "time": 121234,
        "path": "zxcvvbnvm",
        "edges":[{
          "vertexName":"qweE123rsdfty",
          "instructions": "go fk asdfyoursekf"
        },{
          "vertexName":"qwsfer12312ty",
          "instructions": "go fasdfasfk yoursekf"
        },{
          "vertexName":"qwer12312ty",
          "instructions": "go fasdfafk yoursekf"
        }]
    }]
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
