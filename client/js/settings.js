Template.settings.rendered = function() {
  $("#settings-link").addClass('selected');
  $("#navigation-link,#map-link,#locationSearch-link,#popularLocations-link").removeClass('selected');
}

Template.settings.helpers({
  transportSelection: function() {
    return (Session.get("transportMode") === this.transportMode) ? 'selected' : '';
  },

  speedSelection: function() {
    return (Session.get("walkingSpeed") === this.speed) ? 'selected' : '';
  },

  transportList: function() {
    return [{
        "transportMode": "Walking only"
      },
      {
        "transportMode": "Walking and bus"
      }
    ]
  },

  speedList: function() {
    return [{
        "description": "Snail's pace",
        "speed": 0.013
      },
      {
        "description": "Slightly slower than average",
        "speed": 1.2
      },
      {
        "description": "Average walking pace",
        "speed": 1.4
      },
      {
        "description": "Slightly faster than average",
        "speed": 1.6
      },
      {
        "description": "Racewalking",
        "speed": 2.2
      },
      {
        "description": "Running speed",
        "speed": 3
      },
      {
        "description": "Usain Bolt",
        "speed": 12.42
      }
    ]
  }
});

Template.settings.events({
  "change #transportMode": function(event) {
    var newValue = event.target.value;
    Session.setPersistent("transportMode", newValue)
    return false; //prevent submitting of form
  },

  "change #walkingSpeed": function(event) {
    var newValue = event.target.value; //integer value
    Session.setPersistent("walkingSpeed", newValue)
    console.log(event.target.selectedIndex);
    console.log(event.target.length);
    return false; //prevent submitting of form
  },

  'change input': function(event) {
    var newValue = event.target.checked; //integer value
    Session.setPersistent("darkMode", newValue)
    console.log(event.target.checked);
    return false; //prevent submitting of form
  }

});
